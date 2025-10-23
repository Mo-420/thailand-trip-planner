import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ItineraryContextType {
  selectedDestinations: string[];
  addDestination: (destination: string) => void;
  removeDestination: (destination: string) => void;
  isDestinationSelected: (destination: string) => boolean;
  clearDestinations: () => void;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};

interface ItineraryProviderProps {
  children: ReactNode;
}

export const ItineraryProvider: React.FC<ItineraryProviderProps> = ({ children }) => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  const addDestination = (destination: string) => {
    setSelectedDestinations(prev => 
      prev.includes(destination) ? prev : [...prev, destination]
    );
  };

  const removeDestination = (destination: string) => {
    setSelectedDestinations(prev => prev.filter(dest => dest !== destination));
  };

  const isDestinationSelected = (destination: string) => {
    return selectedDestinations.includes(destination);
  };

  const clearDestinations = () => {
    setSelectedDestinations([]);
  };

  const value: ItineraryContextType = {
    selectedDestinations,
    addDestination,
    removeDestination,
    isDestinationSelected,
    clearDestinations,
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};
