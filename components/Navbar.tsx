/** @format */

"use client";
import React, { FC } from "react";
import { FiMapPin } from "react-icons/fi"; // Importa el ícono de ubicación
import Form from "@/components/Form"; // Asegúrate de que tu componente Form esté correctamente importado
import Link from "next/link";

interface NavbarProps {
  onSearchChange: (searchData: { latitude: string; longitude: string }) => void;
}

const Navbar: FC<NavbarProps> = ({ onSearchChange }) => {
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearchChange({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          });
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
        }
      );
    } else {
      console.error("La geolocalización no es soportada en este navegador.");
    }
  };

  return (
    <nav className="backdrop-blur-md bg-white/10 top-0 w-full z-50 relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Buscador */}
        <div className="w-2/3 max-w-[30rem] px-8 flex items-center">
          <FiMapPin
            className="text-gray-200 text-2xl cursor-pointer mr-2 hover:text-3xl hover:text-cyan-900"
            onClick={requestLocation} // Llama a la función al hacer clic
            title="Usar mi ubicación"
          />
          <div className="w-full mr-[-1rem]">
            <Form onSearchChange={onSearchChange} />
          </div>
        </div>

        {/* Título */}
        <Link href="/" passHref>
          <h1 className="text-gray-200 font-extrabold text-xl md:text-3xl tracking-wide cursor-pointer">
            Clima360
          </h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
