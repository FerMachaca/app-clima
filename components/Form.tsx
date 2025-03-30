/** @format */

import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";
import { GEO_API_URL, geoApiOptions } from "@/hooks/useCity";
// Definir estos tipos en un archivo types.ts
import { FormProps, CityOption, City } from "@/types"; // Importar los tipos
import { useState } from "react";

const Form: React.FC<FormProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<CityOption | null>(null);

  const loadOptions = async (inputValue: string) => {
    try {
      const response = await axios.get(`${GEO_API_URL}/cities`, {
        params: { minPopulation: 150000, namePrefix: inputValue },
        headers: geoApiOptions.headers,
      });

      const options = response.data.data.map((city: City) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

      return { options };
    } catch (error) {
      console.error("Error fetching cities:", error);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData: CityOption | null) => {
    setSearch(searchData);
    if (searchData) {
      const [latitude, longitude] = searchData.value.split(" ");
      onSearchChange({ latitude, longitude });
    }
  };

  return (
    <AsyncPaginate
      placeholder="Busque su ciudad"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadingMessage={() => "Cargando opciones..."}
      loadOptions={loadOptions}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "transparent",
          border: "1px solid #ccc",
          boxShadow: "none",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "rgba(255, 255, 255, 0.7)",
          textAlign: "left",
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "transparent",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent",
          color: "white",
          textAlign: "left",
        }),
      }}
      className="text-black bg-transparent"
    />
  );
};

export default Form;
