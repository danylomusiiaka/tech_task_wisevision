"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (city) router.push(`/${city}`);
  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='text-center pb-10'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Welcome to Weather Forecast App!</h1>
        <div className='flex items-center justify-center  mt-5'>
          <input
            type='text'
            className='py-3 px-6 w-full max-w-[600px] text-lg rounded-3xl border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:outline-none bg-white-600/100 shadow-md'
            placeholder='Enter city'
            onChange={(event) => setCity(event.target.value)}
          />
          <button
            className='py-3 px-6 text-lg rounded-3xl bg-blue-500 text-white hover:bg-blue-600 focus:outline-none shadow-md'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
