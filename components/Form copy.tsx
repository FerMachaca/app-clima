/** @format */
"use client";
import { ChangeEvent, useState } from "react";
import { countries } from "./../constants/index";
import { SearchType } from "@/constants/types";
import Alert from "./Alert";
type FormProps = {
  fetchWeather: (s: SearchType) => Promise<void>;
};

const Form = ({ fetchWeather }: FormProps) => {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });
  const [alert, setalert] = useState(""); //no es necesario pasarñp un type porque solo es un string
  //HTMLInputElement;
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    console.log("target.name  : " + e.target.name);
    console.log("target value  : " + e.target.value);
  };
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(search).includes("")) {
      console.log("Hay campos vacios");
      setalert("Todos los campos son obligatorios");
      return;
    }
    //cuando apsemos la validacion haremos uso del useweather
    fetchWeather(search);
  };
  return (
    <form className=" flex flex-col gap-8 " onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className="flex flex-col gap-8 items-start">
        <label htmlFor="city" className="text-white mb-2 font-bold text-2xl">
          Ciudad
        </label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Escriba su ciudad"
          className="p-1 w-full   bg-transparent border-white border-2 text-white rounded-lg placeholder:text-white"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-8 items-start">
        <label htmlFor="country " className="font-bold text-2xl">
          País:
        </label>
        <select
          className="p-1 w-full bg-transparent border-white border-2  rounded-lg "
          id="country"
          name="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="" className="text-black">
            --Seleccione un Pais--
          </option>
          {countries.map((co) => (
            <option key={co.code} value={co.code} className="text-black">
              {co.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="submit"
        value="Consultar Clima"
        className="p-1 bg-blue-600 text-white rounded-lg text-xl cursor-pointer  uppercase hover:bg-blue-700"
      />
    </form>
  );
};

export default Form;
