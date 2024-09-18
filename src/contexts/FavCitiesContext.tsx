"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface FavCitiesContextProps {
  favCities: string[];
  addCity: (city: string) => void;
}

const FavCitiesContext = createContext<FavCitiesContextProps | undefined>(undefined);

export const FavCitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favCities, setFavCities] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedCities = localStorage.getItem("favCities");
      return storedCities ? JSON.parse(storedCities) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favCities", JSON.stringify(favCities));
    }
  }, [favCities]);

  const addCity = (city: string) => {
    setFavCities((prevCities) => {
      if (!prevCities.includes(city)) {
        if (prevCities.length >= 5) {
          return [...prevCities.slice(1), city];
        }
        return [...prevCities, city];
      }
      return prevCities;
    });
  };

  return (
    <FavCitiesContext.Provider value={{ favCities, addCity }}>{children}</FavCitiesContext.Provider>
  );
};

export const useFavCities = () => {
  const context = React.useContext(FavCitiesContext);
  if (context === undefined) {
    throw new Error("useFavCities must be used within a FavCitiesProvider");
  }
  return context;
};
