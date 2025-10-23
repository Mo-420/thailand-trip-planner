// node scripts/make_contact_sheet.mjs
import fs from 'node:fs/promises';
import PDFDocument from 'pdfkit';
import path from 'node:path';

const META = JSON.parse(await fs.readFile('data/th_images.json', 'utf-8'));
const OUT = 'exports/thailand-contact-sheet.pdf';

await fs.mkdir('exports', { recursive: true });

// Layout
const pageW = 842;  // A4 landscape points (72dpi): 842x595
const pageH = 595;
const cols = 4;
const rows = 3;
const margin = 24;
const gutter = 16;
const cellW = (pageW - margin*2 - gutter*(cols-1)) / cols;
const cellH = (pageH - margin*2 - gutter*(rows-1)) / rows;
const labelH = 22;

const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
doc.pipe((await import('node:fs')).createWriteStream(OUT));

let x = margin, y = margin, i = 0;

function drawCell(item) {
  // frame
  doc.roundedRect(x, y, cellW, cellH, 8).strokeColor('#dddddd').lineWidth(1).stroke();

  // image box (keep 16:9-ish inside the cell)
  const pad = 8;
  const imgH = cellH - labelH - pad*3;
  const imgW = cellW - pad*2;

  if (item.local) {
    const imgPath = path.join('public', item.local);
    try {
      doc.image(imgPath, x+pad, y+pad, { fit: [imgW, imgH], align: 'center', valign: 'center' });
    } catch {
      doc.rect(x+pad, y+pad, imgW, imgH).fillColor('#efefef').fill();
      doc.fillColor('#999').fontSize(10).text('No image', x+pad, y+pad+imgH/2-6, { width: imgW, align: 'center' });
    }
  } else {
    doc.rect(x+pad, y+pad, imgW, imgH).fillColor('#efefef').fill();
    doc.fillColor('#999').fontSize(10).text('No image', x+pad, y+pad+imgH/2-6, { width: imgW, align: 'center' });
  }

  // label
  doc.fillColor('#111').fontSize(12).text(item.name, x+pad, y+cellH-labelH, { width: imgW, align: 'center' });
}

for (const item of META.items) {
  if ((i>0) && (i % (cols*rows) === 0)) {
    doc.addPage({ size: 'A4', layout: 'landscape', margin: 0 });
    x = margin; y = margin;
  }
  drawCell(item);
  i++;
  if (i % cols === 0) { x = margin; y += cellH + gutter; } else { x += cellW + gutter; }
}

doc.end();
console.log('Built', OUT);
