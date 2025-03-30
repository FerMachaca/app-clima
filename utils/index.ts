/** @format */

export const formatTemperature = (temperature: number): number => {
  const kelvin = 273.15;
  return parseInt((temperature - kelvin).toString());
};
export const formatVisibility = (visibility: number) => {
  return (visibility / 1000).toFixed(1); // convertir metros a kilómetros
};

// Función para convertir la velocidad del viento de m/s a km/h
export const formatWindSpeed = (speed: number) => {
  return (speed * 3.6).toFixed(1); // convertir m/s a km/h
};
export const formatWords = (text: string): string => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
