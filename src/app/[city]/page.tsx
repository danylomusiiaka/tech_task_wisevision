import WeatherCard from "@/components/WeatherCard";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPageProps } from "@/interfaces/CityPageProps";

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = params;
  return {
    title: `${city} weather`,
    description: `Check the weather in ${city}.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = params;
  const API_KEY = process.env.API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);
  if (response.status !== 200) {
    notFound();
  }

  const data = await response.json();

  return <WeatherCard result={data} />;
}
