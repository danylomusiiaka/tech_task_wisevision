"use client";

import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ForecastListProps } from "@/interfaces/props";

export default function WeatherCard({ result }: { result: ForecastListProps }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <h1 className='p-8 text-2xl font-bold text-gray-900'>Forecast for {result.dt_txt}</h1>
      <section className='flex flex-wrap md:flex-nowrap'>
        <div className='w-full rounded-xl shadow-md overflow-hidden m-4'>
          <div className='p-5 flex justify-between m-4'>
            <div>
              <p className='text-lg text-gray-700 mb-2'>
                Current temperature: {result.main.temp}°C
              </p>
              <p className='text-lg text-gray-700 mb-2'>Feels like: {result.main.feels_like}°C</p>
              <p className='text-lg text-gray-700 mb-2'>Weather: {result.weather[0].description}</p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
              className='w-20 h-20'
            />
          </div>
        </div>

        <div className='w-full rounded-xl shadow-md overflow-hidden m-4'>
          <div className='p-8 flex justify-between'>
            <div>
              <p className='text-lg text-gray-700 mb-2'> Temperature</p>
              <p className='text-lg text-gray-700 mb-2'> min: {result.main.temp_min}°C</p>
              <p className='text-lg text-gray-700 mb-2'> max: {result.main.temp_max}°C</p>
            </div>

            <img
              src='https://cdn-icons-png.flaticon.com/512/103/103945.png'
              className='w-20 h-20'
            />
          </div>
        </div>

        <div className='w-full h-full overflow-hidden m-4'>
          <Accordion
            expanded={expanded}
            onChange={() => {
              setExpanded(!expanded);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='additional-info-content'
              id='additional-info-header'
            >
              <Typography>Additional Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p className='text-lg text-gray-700 mb-2'>Wind Speed: {result.wind.speed} m/s</p>

              <p className='text-lg text-gray-700 mb-2'>Wind Gust: {result.wind.gust} m/s</p>
              <p className='text-lg text-gray-700 mb-2'>
                Visibility: {result.visibility / 1000} km
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    </>
  );
}
