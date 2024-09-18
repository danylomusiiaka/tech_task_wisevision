"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFavCities } from "@/contexts/FavCitiesContext";

export default function Home() {
  const [city, setCity] = useState("");
  const { favCities } = useFavCities();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (city) {
      router.push(`/${city}`);
      setCity("");
    }
  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='text-center pb-20 p-5'>
        <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
          Welcome to Weather Forecast App!
        </h1>
        <form onSubmit={handleSubmit} className='flex items-center justify-center mt-6'>
          <input
            type='text'
            className='py-3 px-6 w-full max-w-[600px] text-lg rounded-3xl border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:outline-none bg-white-600/100 shadow-md'
            placeholder='Enter city'
            value={city}
            onChange={(event) => setCity(event.target.value)}
            autoFocus
            autoComplete='text'
          />
          <button
            type='submit'
            className='py-3 px-6 text-lg rounded-3xl bg-blue-500 text-white hover:bg-blue-600 focus:outline-none shadow-md'
          >
            Submit
          </button>
        </form>
        <div className='mt-10 flex items-center justify-center'>
          {favCities.length !== 0 && (
            <>
              <p className='text-md font-bold '>Recent Cities:</p>
              {favCities.map((city, index) => (
                <a key={index} href={`/${city}`} className='text-blue-500 hover:underline ml-2'>
                  {city}
                </a>
              ))}
            </>
          )}
         
        </div>
      </div>
    </div>
  );
}
