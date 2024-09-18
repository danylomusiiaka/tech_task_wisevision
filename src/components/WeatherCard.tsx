interface WeatherResult {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export default function WeatherCard({ result }: { result: WeatherResult }) {

  const iconUrl = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;

  return (
    <div className='max-w-sm mx-auto  rounded-xl  shadow-md overflow-hidden md:max-w-2xl'>
      <div className='p-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-gray-900'>Welcome to {result.name}!</h1>
          <img src={iconUrl} alt={result.weather[0].description} className='w-20 h-20' />
        </div>

        <p className='text-lg text-gray-700 mb-2'>Temperature: {result.main.temp}°C</p>
        <p className='text-lg text-gray-700 mb-2'>Feels like: {result.main.feels_like}°C</p>

        <p className='text-lg text-gray-700 mb-2'>Weather: {result.weather[0].description}</p>
      </div>
    </div>
  );
}
