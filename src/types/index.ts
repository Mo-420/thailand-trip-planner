export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
  bestTime: string;
  duration: string;
  category: 'beach' | 'city' | 'culture' | 'nature' | 'temple';
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  location: string;
  image: string;
}

export interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  activities: Activity[];
  location: string;
  notes?: string;
}

export interface TripPlan {
  id: string;
  title: string;
  duration: number;
  destinations: Destination[];
  itinerary: ItineraryDay[];
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  bestTime: string;
  createdAt: Date;
}

export interface CulturalHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'festival' | 'tradition' | 'food' | 'art' | 'religion';
  significance: string;
  whenToExperience: string;
}
