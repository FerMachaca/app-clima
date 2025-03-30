/** @format */
"use client";
import { useEffect, useState, useCallback } from "react";
import useWeather from "@/hooks/useWeather";
import WeatherDetail from "@/components/WeatherDetail";
import Spinner from "@/components/Spinner";
import Alert from "@/components/Alert";
import Forecast from "@/components/Forecast";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { weather, loading, notFound, fetchWeather, hasWeatherData, forecast } =
    useWeather();
  const [bgUrl, setBgUrl] = useState("/assets/bg_clouds.webp");
  const [locationFetched, setLocationFetched] = useState(false); // Nuevo estado

  const handleOnSearchChange = useCallback(
    (searchData: { latitude: string; longitude: string }) => {
      if (!searchData) {
        console.error("searchData es undefined");
        return;
      }

      const { latitude, longitude } = searchData;
      if (latitude && longitude) {
        fetchWeather(latitude, longitude);
      } else {
        console.error("El valor de searchData no tiene el formato esperado");
      }
    },
    [fetchWeather]
  );

  useEffect(() => {
    // Establecer Lima como ubicación inicial solo una vez
    if (!locationFetched) {
      fetchWeather("-12.04318", "-77.02824");
      setLocationFetched(true); // Marcar como ubicación ya obtenida
    }
  }, [fetchWeather, locationFetched]);

  useEffect(() => {
    if (hasWeatherData) {
      let weatherCondition = weather.weather[0].main.toLowerCase();
      const atmosphereConditions = [
        "mist",
        "smoke",
        "haze",
        "dust",
        "fog",
        "sand",
        "ash",
        "squall",
        "tornado",
      ];

      if (atmosphereConditions.includes(weatherCondition)) {
        weatherCondition = "atmosphere";
      }
      setBgUrl(`/assets/bg_${weatherCondition}.webp`);
    }
  }, [weather, hasWeatherData]);

  console.log(bgUrl);
  return (
    <main
      className="relative h-full min-h-screen bg-no-repeat bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      {/* Navbar */}
      <Navbar onSearchChange={handleOnSearchChange} />

      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto pb-5">
        <div>
          {loading && (
            <div className="text-white text-2xl">
              <Spinner />
            </div>
          )}
          {hasWeatherData && <WeatherDetail weather={weather} />}
          <div className="relative">
            {hasWeatherData && <Forecast forecast={forecast} />}
            {notFound && <Alert>Ciudad No encontrada</Alert>}
          </div>
        </div>
      </div>
    </main>
  );
}
