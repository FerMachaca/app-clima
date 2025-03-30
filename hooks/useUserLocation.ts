/** @format */

import { useState, useEffect } from "react";

interface GeolocationData {
  latitude: number;
  longitude: number;
}

const useUserGeolocation = () => {
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no es soportada por este navegador.");
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const handleError = (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError("El usuario negó la solicitud de geolocalización.");
          break;
        case error.POSITION_UNAVAILABLE:
          setError("La ubicación no está disponible.");
          break;
        case error.TIMEOUT:
          setError(
            "El tiempo de espera para obtener la ubicación ha expirado."
          );
          break;
        default:
          setError("Ocurrió un error desconocido al obtener la ubicación.");
          break;
      }
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error };
};

export default useUserGeolocation;
