import React, { useState, useEffect } from 'react'
import { useId } from 'react';
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

// cуну const сюда
const hospitals = [{"id":1,"name":"H1","address":"street1","phone":"890890"},{"id":2,"name":"H2","address":"street2","phone":"123123"}]
//

export default function Appointment() {
  const [hospitals, setHospitals] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setHospitals(data);
      });
  }, []);


  useEffect(() => {

  }, [])
    return (
      <div className='flex flex-row'>
        <div className="w-72 font-medium h-80">
        <div
          onClick={() => setOpen(!open)}
          className={`bg-slate-300 w-full p-2 flex items-center justify-between rounded ${
            !selected && "text-gray-700"
          }`}
        >
          {selected
            ? selected?.length > 25
              ? selected?.substring(0, 25) + "..."
              : selected
            : "Выберите профиль:"}
          <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        </div>
        <ul
          className={`bg-slate-300 mt-2 overflow-y-auto ${
            open ? "max-h-60" : "max-h-0"
          } `}
        >
          <div className="flex items-center px-2 sticky top-0 bg-white">
            <AiOutlineSearch size={18} className="text-gray-700" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Поиск профиля"
              className="placeholder:text-gray-700 p-2 outline-none"
            />
          </div>
          {hospitals?.map((country) => (
            <li
              key={country?.name}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                country?.name?.toLowerCase() === selected2?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
              ${
                country?.name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
              onClick={() => {
                if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(country?.name);
                  setOpen(false);
                  setInputValue("");
                }
              }}
            >
              {country?.name}
            </li>
          ))}
        </ul>
      </div>




      <div className="w-72 font-medium h-80">
        <div
          onClick={() => setOpen2(!open2)}
          className={`bg-slate-300 w-full p-2 flex items-center justify-between rounded ${
            !selected2 && "text-gray-700"
          }`}
        >
          {selected2
            ? selected2?.length > 25
              ? selected2?.substring(0, 25) + "..."
              : selected2
            : "Выберите филиал:"}
          <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        </div>
        <ul
          className={`bg-slate-300 mt-2 overflow-y-auto ${
            open2 ? "max-h-60" : "max-h-0"
          } `}
        >
          {hospitals?.map((country) => (
            <li
              key={country?.name}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                country?.name?.toLowerCase() === selected?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
              `}
              onClick={() => {
                if (country?.name?.toLowerCase() !== selected2.toLowerCase()) {
                  setSelected2(country?.name);
                  setOpen2(false);
                }
              }}
            >
              {country?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
  }