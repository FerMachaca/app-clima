/** @format */
import axios from "axios";
import { z } from "zod";
import { useMemo, useState } from "react";

// Zod schema para el clima actual
const Weather = z.object({
  name: z.string(),
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
    humidity: z.number(),
    pressure: z.number(),
  }),
  visibility: z.number().optional(),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
  clouds: z.object({
    all: z.number(),
  }),
});

// Zod schema para la previsión del clima
const ForecastWeather = z.object({
  list: z.array(
    z.object({
      dt: z.number(), // Fecha en formato UNIX
      main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
        humidity: z.number(),
        pressure: z.number(),
      }),
      weather: z.array(
        z.object({
          main: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      ),
      clouds: z.object({
        all: z.number(),
      }),
      wind: z.object({
        speed: z.number(),
        deg: z.number(),
      }),
      // sys: z.object({}),
      dt_txt: z.string(),
      visibility: z.number().optional(),
    })
  ),
});

export type Weather = z.infer<typeof Weather>;
export type ForecastWeather = z.infer<typeof ForecastWeather>;

const initialWeather = {
  name: "",
  weather: [
    {
      main: "",
      description: "",
      icon: "",
    },
  ],
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    pressure: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
  },
  clouds: {
    all: 0,
  },
};

const initialForecast = {
  list: [],
};

const useWeather = () => {
  const [weather, setWeather] = useState<Weather>(initialWeather);
  const [forecast, setForecast] = useState<ForecastWeather>(initialForecast); // Estado para la previsión
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (latitude: string, longitude: string) => {
    const appId = process.env.NEXT_PUBLIC_APP_ID;
    setLoading(true);
    setWeather(initialWeather);
    setForecast(initialForecast); // Reiniciar previsión
    setNotFound(false);

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&appid=${appId}`;
      const foreCastweatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=sp&appid=${appId}`;

      const { data: weatherResult } = await axios.get(weatherUrl);
      const { data: forecastResult } = await axios.get(foreCastweatherUrl); // Obtener previsión

      const result = Weather.safeParse(weatherResult);
      const forecastParsed = ForecastWeather.safeParse(forecastResult); // Validar previsión
      console.log(foreCastweatherUrl);
      if (result.success) {
        setWeather(result.data);
      } else {
        console.log("Error en los datos del clima:", result.error);
      }

      if (forecastParsed.success) {
        setForecast(forecastParsed.data);
      } else {
        console.log(
          "Error en los datos de la previsión:",
          forecastParsed.error
        );
      }
    } catch (error) {
      console.error("Error al buscar el clima:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name !== "", [weather]);

  return {
    weather,
    forecast, // Devolver previsión
    loading,
    notFound,
    fetchWeather,
    hasWeatherData,
  };
};

export default useWeather;
