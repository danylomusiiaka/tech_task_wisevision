"use client";

import React, { useState, useEffect } from "react";
import WeatherDashboard from "./WeatherDashboard";
import { useRouter } from "next/navigation";
import { ForecastProps } from "@/interfaces/props";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useFavCities } from "@/contexts/FavCitiesContext";

const getUniqueDates = (list: any[]) => {
  const dates = list.map((item: { dt_txt: string | number | Date; }) => new Date(item.dt_txt).toLocaleDateString());
  return Array.from(new Set(dates));
};

const findIndexRangeForDate = (list: any[], date: string) => {
  const startIndex = list.findIndex((item: { dt_txt: string | number | Date; }) => new Date(item.dt_txt).toLocaleDateString() === date);
  if (startIndex === -1) return [-1, -1];

  const endIndex = list
    .slice(startIndex)
    .findIndex((item: { dt_txt: string | number | Date; }) => new Date(item.dt_txt).toLocaleDateString() !== date);
  return [startIndex, endIndex === -1 ? list.length - 1 : startIndex + endIndex - 1];
};

export default function Forecast({ result }: ForecastProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedDate, setSelectedDate] = useState("");
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [filteredResults, setFilteredResults] = useState(result.list);

  const router = useRouter();
  const { addCity } = useFavCities();

  useEffect(() => {
    addCity(result.city.name);
    const dates = getUniqueDates(result.list);
    setUniqueDates(dates);
  }, [result]);

  useEffect(() => {
    if (selectedDate) {
      const [start, end] = findIndexRangeForDate(result.list, selectedDate);
      if (start !== -1 && end !== -1) {
        setFilteredResults(result.list.slice(start, end + 1));
        setCurrentIndex(0);
      }
    }
  }, [selectedDate, result.list]);

  const handleNext = () => {
    if (currentIndex < filteredResults.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <h1 className='p-8 pb-3 text-4xl font-bold text-gray-900'>Welcome to {result.city.name}!</h1>
      <button
        className='mt-2 ml-6 px-4 py-4 bg-blue-400 text-white rounded-md'
        onClick={() => {
          router.push("/");
        }}
      >
        Return to home page
      </button>

      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id='date-select-label'>Select Date</InputLabel>
        <Select
          labelId='date-select-label'
          id='date-select'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          label='Select Date'
        >
          {uniqueDates.map((date) => (
            <MenuItem key={date} value={date}>
              {date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filteredResults.length > 0 && (
        <>
          <WeatherDashboard result={filteredResults[currentIndex]} />
          <div className='pb-5'>
            <button
              onClick={handleBack}
              className='mt-4 ml-6 px-4 py-2 bg-blue-500 text-white rounded-md'
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className='mt-4 ml-2 px-4 py-2 bg-blue-500 text-white rounded-md'
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}
