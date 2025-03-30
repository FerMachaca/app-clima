/** @format */

export type DataCountries = {
  code: string;
  name: string;
};
export type SearchType = {
  city: string;
  country: string;
};
export type WeatherCondition = {
  main: string;
  description: string;
  icon: string;
};

export type WeatherType = {
  name: string;
  weather: WeatherCondition[];
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    pressure: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
};
// types.ts
export type CityOption = {
  value: string;
  label: string;
};

export type FormProps = {
  onSearchChange: (searchData: { latitude: string; longitude: string }) => void;
};
export type City = {
  latitude: string;
  longitude: string;
  name: string;
  countryCode: string;
};
