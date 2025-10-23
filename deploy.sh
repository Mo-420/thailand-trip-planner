#!/bin/bash

# Build the project
npm run build

# Create a simple HTTP server for the dist folder
cd dist
python3 -m http.server 8000
