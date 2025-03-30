/** @format */
import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { WiHumidity } from "react-icons/wi";
import { ForecastWeather } from "@/hooks/useWeather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HumidityChartProps {
  forecast: ForecastWeather;
}
interface ForecastItem {
  dt: number;
  main: {
    humidity: number;
  };
}
const HumidityChart: FC<HumidityChartProps> = ({ forecast }) => {
  // Verifica que forecast.list exista y sea un array
  if (!forecast || !Array.isArray(forecast.list)) {
    return <p>No hay datos de pronóstico disponibles</p>;
  }

  // Filtrar pronósticos diarios como en Forecast
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

      if (dailyForecasts.length === 5) break;
    }

    return dailyForecasts;
  };

  const reducedForecast = getDailyForecasts(forecast);

  // Convertir el timestamp `dt` a una fecha legible
  const labels = reducedForecast.map((day: ForecastItem) => {
    const date = new Date(day.dt * 1000);
    date.setDate(date.getDate() + 1); // Adelantar un día
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "2-digit",
    });
  });

  const humidityData = reducedForecast.map(
    (day: ForecastItem) => day.main.humidity
  );

  // Configuración del gráfico
  const data = {
    labels,
    datasets: [
      {
        label: "Humedad (%)",
        data: humidityData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.6,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        //   position: "top",
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <h3 className="text-center text-2xl mt-4 mb-4">
          Gráfico de Humedad Pronosticada
        </h3>
        <WiHumidity size={35} className="ml-2" />
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default HumidityChart;
