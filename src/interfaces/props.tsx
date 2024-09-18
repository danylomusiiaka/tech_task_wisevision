export interface CityPageProps {
  params: {
    city: string;
  };
}

export interface ForecastProps {
  result: {
    city: {
      name: string;
    };
    list: any[];
  };
}

export interface ForecastListProps {
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;

    gust: number;
  };
  visibility: number;
}
