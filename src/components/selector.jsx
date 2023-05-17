import React, { useState, useEffect } from 'react'
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

// cуну const сюда
const hospitalsTemp = [{"name":"Больница им. Святого Александра И.","address":"ул. Большая Луговая, 17/29","phone":"+7(4852)24-31-31","doctors":[]},{"name":"H2","address":"street2","phone":"123123","doctors":[{"specialty":"Хирург","user":{"name":"me","birthDate":"2023-05-15T17:27:58.462Z","gender":""}},{"specialty":"Офтальмолог","user":{"name":"mem","birthDate":"1970-01-01T00:00:00.000Z","gender":""}}]}]
//

export default function Selector({getDoctorName}) {
  const [hospitals, setHospitals] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    // fetch("http://localhost:3000/data/hospitals")
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        // setHospitals(data);
        setHospitals(hospitalsTemp);
      });
  }, []);


  useEffect(() => {
    setSelected2("")
  }, [selected])

  useEffect(() => {
    // TODO забрать имя доктора
  }, [selected2])
    return (
      <div className='flex flex-row'>
        <div className="w-72 font-medium h-80 mr-10">
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
          {hospitals?.filter(hosp => hosp?.name == selected)[0]?.doctors?.map((doctor) => (
            <li
              key={doctor?.specialty}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                doctor?.specialty?.toLowerCase() === selected2?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
              ${
                doctor?.specialty?.toLowerCase().indexOf(inputValue2) >= 0
                  ? "block"
                  : "hidden"
              }
              `}
              onClick={() => {
                if (doctor?.specialty?.toLowerCase() !== selected2?.toLowerCase()) {
                  setSelected2(doctor?.specialty);
                  setOpen2(false);
                }
              }}
            >
              {doctor?.specialty}
            </li>
          ))}
          {!hospitals?.filter(hosp => hosp?.name == selected)[0]?.doctors[0] ? <li className='p-2 text-sm hover:bg-sky-600 hover:text-white'> Доктор не найден.</li> : <li></li>}
        </ul>
      </div>
      DoctorName:
      {hospitals?.filter(hosp => hosp?.name == selected)[0]?.doctors?.filter(doct => doct?.specialty == selected2)[0]?.user?.name}
    </div>
    );
  }