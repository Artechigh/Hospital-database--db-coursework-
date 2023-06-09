import React, { useState, useEffect } from 'react'
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';


const hospitalsTemp = [{"id":1,"name":"H1","address":"street1","phone":"890890","doctors":[]},{"id":2,"name":"H2","address":"street2","phone":"123123","doctors":[{"id":1,"specialty":"surgeon","user":{"name":"Ursella Gun","email":"ur@mail.com"}},{"id":2,"specialty":"ophthalmologists","user":{"name":"Kratos Horacio","email":"kra@mail.com"}},{"id":4,"specialty":"surgeon","user":{"name":"ii","email":"ii"}}]}]


export default function Selector({getValue, getHId}) {
  const [hospitals, setHospitals] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/data/hospitals")
        .then((response) => {
          setHospitals(response.data)
        }).catch(function (response) {
        console.log(response)
      });

      // setHospitals(hospitalsTemp)
  }, []);


  useEffect(() => {
    setSelected2("")
  }, [selected])

  useEffect(() => {
    if (getValue && selected2) {
      const selectedHospital = hospitals?.filter(hosp => hosp?.name == selected)[0]
      const selectedDoctors = selectedHospital?.Doctors?.filter(doct => doct?.specialty == selected2)
      getValue(selectedDoctors)
      getHId(selectedHospital?.id)
    }
    // TODO забрать имя доктора
  }, [selected2])

    return (
      <div className='flex flex-row z-10'>
        <div className="w-72 font-medium mr-10">
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
            : "Выберите филиал:"}
          <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        </div>
        <ul
          className={`bg-slate-300 mt-2 overflow-y-auto ${
            open ? "max-h-60" : "max-h-0"
          } `}
        >
          <div className="flex items-center px-2 sticky top-0 bg-slate-400">
            <AiOutlineSearch size={18} className="text-gray-700" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Поиск филиала"
              className="placeholder:text-gray-700 bg-slate-400 p-2 outline-none"
            />
          </div>
          {hospitals?.map((hospital) => (
            <li
              key={hospital?.name}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                hospital?.name?.toLowerCase() === selected?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
              ${
                hospital?.name?.toLowerCase().indexOf(inputValue) >= 0
                  ? "block"
                  : "hidden"
              }`}
              onClick={() => {
                if (hospital?.name?.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(hospital?.name);
                  setOpen(false);
                  setInputValue("");
                }
              }}
            >
              <div className='text-md pb-2 font-bold'>{hospital?.name}</div>
              <div className='opacity-70'>{hospital?.phone}</div>
              <div>{hospital?.address}</div>
            </li>
          ))}
        </ul>
      </div>




      <div className="w-72 font-medium">
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
            : "Выберите профиль:"}
          <BiChevronDown size={20} className={`${open2 && "rotate-180"}`} />
        </div>
        <ul
          className={`bg-slate-300 mt-2 overflow-y-auto ${
            open2 ? "max-h-60" : "max-h-0"
          } `}
        >
          <div className="flex items-center px-2 sticky top-0 bg-slate-400">
            <AiOutlineSearch size={18} className="text-gray-700" />
            <input
              type="text"
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value.toLowerCase())}
              placeholder="Поиск профиля"
              className="placeholder:text-gray-700 bg-slate-400 p-2 outline-none"
            />
          </div>
          {
          Array.from( new Set(hospitals?.filter(hosp => hosp?.name == selected)[0]?.Doctors?.map((doctor) => doctor?.specialty)))?.map((speciality) => (
            <li
              key={speciality}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                speciality?.toLowerCase() === selected2?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
              ${
                speciality?.toLowerCase().indexOf(inputValue2) >= 0
                  ? "block"
                  : "hidden"
              }
              `}
              onClick={() => {
                if (speciality?.toLowerCase() !== selected2?.toLowerCase()) {
                  setSelected2(speciality);
                  setOpen2(false);
                }
              }}
            >
              {speciality}
            </li>
          ))}
          {!hospitals?.filter(hosp => hosp?.name == selected)[0]?.Doctors[0] ? <li className='p-2 text-sm hover:bg-sky-600 hover:text-white'> Доктор не найден.</li> : <li></li>}
        </ul>
      </div>
    </div>
    );
  }