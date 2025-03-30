/** @format */
import { Weather } from "@/hooks/useWeather";
import {
  formatVisibility,
  formatWindSpeed,
  formatTemperature,
} from "@/utils/index";
import Image from "next/image";
import {
  WiHumidity, // Icono para Humedad
  WiBarometer, // Icono para Presión
  WiStrongWind, // Icono para Velocidad del viento
  WiCloud, // Icono para Nubes
  WiWindDeg, // Icono para Dirección del viento
  WiDayFog, // Icono para Visibilidad
} from "react-icons/wi";
/** @format */
type WeatherDetailProps = {
  weather: Weather;
};

const WeatherDetail = ({ weather }: WeatherDetailProps) => {
  return (
    <section className="md:flex mt-[-3rem] container  ">
      {/* Sección principal del clima */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-gray-500 shadow-lg text-white rounded-2xl p-4 text-2xl flex flex-col mt-28 md:mr-[2rem] w-auto md:w-[38rem]">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <Image
              src={`/assets/Weather icons/Light bg/${weather.weather[0].icon}.svg`}
              alt="weather icon"
              width={120}
              height={120}
              priority
            />
            <h2 className="uppercase text-3xl px-5"> {weather.name}</h2>
          </div>

          {/* Descripción del clima */}
          <p className="uppercase font-semibold text-center">
            {weather.weather[0].description}
          </p>
        </div>

        <div className="flex items-center justify-center mt-6">
          {/* Temperatura principal */}
          <p className="text-6xl px-5">
            {formatTemperature(weather.main.temp)}&deg;C
          </p>

          {/* Línea vertical blanca */}
          <div className="h-24 w-[2px] bg-white opacity-50  p-[1px]"></div>

          {/* Temperaturas mínima y máxima */}
          <div className="flex flex-col justify-center px-5">
            <p className="font-medium text-lg">
              Min:{" "}
              <span className="font-light text-2xl">
                {formatTemperature(weather.main.temp_min)}&deg;C
              </span>
            </p>
            <p className="font-medium text-lg mt-2">
              Max:{" "}
              <span className="font-light text-2xl">
                {formatTemperature(weather.main.temp_max)}&deg;C
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-gray-500 shadow-lg text-white rounded-2xl p-4 xl:text-xl flex flex-col justify-center mt-28 w-auto lg:w-[60rem]">
        <h3 className="text-center text-2xl mb-8 font-bold">
          Detalles adicionales
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
          <p className="flex justify-center">
            <WiHumidity className="mr-2 text-3xl" />
            <span className="font-bold">Humedad:</span> {weather.main.humidity}%
          </p>
          <p className="flex justify-center">
            <WiBarometer className="mr-2 text-3xl" />
            <span className="font-bold">Presión:</span> {weather.main.pressure}{" "}
            hPa
          </p>
          <p className="flex justify-center">
            <WiDayFog className="mr-2 text-3xl" />
            <span className="font-bold">Visibilidad:</span>{" "}
            {formatVisibility(weather.visibility ?? 0)} km
          </p>
          <p className="flex justify-center">
            <WiStrongWind className="mr-2 text-3xl" />
            <span className="font-bold">Velocidad de Viento:</span>{" "}
            {formatWindSpeed(weather.wind.speed)} km/h
          </p>
          <p className="flex justify-center">
            <WiWindDeg className="mr-2 text-3xl" />
            <span className="font-bold">Dirección de Viento:</span>{" "}
            {weather.wind.deg}&deg;
          </p>
          <p className="flex justify-center">
            <WiCloud className="mr-2 text-3xl" />
            <span className="font-bold">Nubes:</span> {weather.clouds.all}%
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeatherDetail;
