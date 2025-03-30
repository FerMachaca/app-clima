/** @format */

import React from "react";
import HumidityChart from "./HumidityChart";
import Image from "next/image";
import { formatWords } from "@/utils";
import { ForecastWeather } from "@/hooks/useWeather";

const week_days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
type forecasProps = {
  forecast: ForecastWeather;
};
const Forecast = ({ forecast }: forecasProps) => {
  const dayInWeek = new Date().getDay();

  // Filtrar pronósticos para obtener los primeros 5 días completos
  const getDailyForecasts = (forecast: ForecastWeather) => {
    const dailyForecasts = [];
    const seenDates = new Set();

    for (const item of forecast.list) {
      const date = new Date(item.dt * 1000).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      if (!seenDates.has(date)) {
        dailyForecasts.push(item);
        seenDates.add(date);
      }

      // Detener cuando tengamos los pronósticos de 5 días
      if (dailyForecasts.length === 5) break;
    }

    return dailyForecasts;
  };

  const forecastList = forecast ? getDailyForecasts(forecast) : [];

  return (
    <section className="mt-[2.5rem]">
      <h2 className="text-white text-2xl mb-[2.5rem]">
        Pronóstico de los próximos días
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
          {forecastList.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-md bg-white bg-opacity-10 backdrop-blur-md border border-gray-500 shadow-lg text-white ${
                index === 4 ? "col-span-2" : ""
              }`}
            >
              <div className="flex flex-col items-center">
                <Image
                  src={`/assets/Weather icons/Light bg/${item.weather[0].icon}.svg`}
                  alt="weather icon"
                  width={120}
                  height={120}
                />
                <div className="h-[2px] w-[96px] bg-white opacity-50"></div>
                <h3>{week_days[(dayInWeek + index) % 7]}</h3>
                <p>{Math.round(item.main.temp - 273.15)}°C</p>
                <p>{formatWords(item.weather[0].description)}</p>
                {/* <p>{item.main.humidity}%</p>
                <p>{item.main.pressure}</p>
                <p>{Math.round(item.main.temp_min - 273.15)}°C</p>
                <p>{Math.round(item.main.temp_max - 273.15)}°C</p> */}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-md bg-white bg-opacity-10 backdrop-blur-md border border-gray-500 shadow-lg text-white">
          <HumidityChart forecast={forecast} />
        </div>
      </div>
    </section>
  );
};

export default Forecast;
