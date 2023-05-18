import React, { useEffect, useState } from 'react'
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import { BiChevronDown } from "react-icons/bi";

const MyCalendar = ({dId}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [startDay, setStartDay] = useState("");
    const [startHour, setStartHour] = useState("");
    const [timesDay, setTimesDay] = useState([])
    const [inputValue, setInputValue] = useState("")


    // вот так выглядит обьект appointment
    // по идее фетч будет тебе post(idDoctor) а ты вернешь список всех, заполненных доктором

    const events = [
      {
        id: 1,
        text: "Запись",
        start: "2023-05-17T10:00:00",
        end: "2023-05-17T11:00:00",
        backColor: "#94a3b8",
        // idUser: "userID"
        idDoctor: dId,
        startDay: 17,
        startHour: 10,
      }
    ];

    const [mainEvents, setMainEvents] = useState([])

    useEffect(() => {
      axios.post("http://localhost:3000/data/doctor/nextAppointments", {
        id: dId
      })
      .then((response) => {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      });
      
    setMainEvents(events)
    }, [])
    


    const weeklist = [
      {n: 15, text:"Понедельник"}, 
      {n: 16, text:"Вторник"}, 
      {n: 17, text:"Среда"}, 
      {n: 18, text:"Четверг"}, 
      {n: 19, text:"Пятница"}
    ]

    const times = [
      {n: 10, text:"10:00"}, 
      {n: 11, text:"11:00"}, 
      {n: 12, text:"12:00"}, 
      {n: 13, text:"13:00"}, 
      {n: 14, text:"14:00"}, 
      {n: 15, text:"15:00"}, 
      {n: 16, text:"16:00"}, 
      {n: 17, text:"17:00"}
    ]


    function event(startD, startH, comment){
      this.id = startD + "" + startH
      this.text = "Запись"
      this.start = `2023-05-${startD}T${startH}:00:00`
      this.end =  `2023-05-${startD}T${startH + 1}:00:00`
      this.backColor = "#94a3b8"
      this.idDoctor = dId
      this.startDay = startD
      this.startHour = startH
      this.commentary = comment || ""
    }

      useEffect(() => {
        const mainevents_filtered_day = mainEvents.filter(event => event.startDay == startDay)
        const maintimes = mainevents_filtered_day.map(event => event.startHour)
        setTimesDay(maintimes)
    }, [mainEvents, startDay])

    function handleEventCreation() {
      const temp = new event(startDay, startHour, inputValue)
      console.log(mainEvents)
      setMainEvents([...mainEvents, temp])
    }


      
  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-start items-start'>
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
            : "Выберите день посещения:"}
          <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        </div>
        <ul
          className={`bg-slate-300 mt-2 overflow-y-auto ${
            open ? "max-h-60" : "max-h-0"
          } `}
        >
          {weeklist.map((day) => (
            <li
              key={day.n}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                day.text.toLowerCase() === selected?.toLowerCase() &&
                "bg-sky-600 text-white"
              }`}
              onClick={() => {
                if (day.text.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(day.text);
                  setStartDay(day.n)
                  setOpen(false);
                }
              }}
            >
              <div className='text-md pb-2 font-bold'>{day.text}</div>
              <div className='opacity-70'>{day.n} мая</div>
            </li>
          ))}
        </ul>

        <div className='w-80 h-1 font-semibold text-md pl-1 py-3'>Выберите время записи:</div>

        <div className={`grid grid-cols-4 text-center gap-4 pt-6 pl-1
          ${
            !startDay ? "hidden" : ""
          }
        `}>
          {times.map(time => (
            <button key={time.n} 
              onClick={() => {
                setStartHour(time.n)
              }}
              className={`px-2 py-1 rounded-md text-black bg-slate-300 border-2 border-slate-800
              ${
                timesDay.indexOf(time.n) < 0
                ? "block"
                : "hidden"
              }
              ${
                time.n === startHour &&
                "bg-slate-500 text-white"
              }
              hover:bg-slate-500 hover:text-white`}>
              {time.text}
            </button>
          ))}
        </div>
        <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Комментарий к записи"
              className={`placeholder:text-gray-700 bg-slate-300 py-2 px-1 rounded-md outline-none mt-5 w-full
                ${
                  !startHour ? "hidden" : ""
                }
                `}
            />

        <button
              onClick={handleEventCreation}
              className={`placeholder:text-gray-700 bg-slate-300 py-2 px-1 rounded-md outline-none mt-5 w-full border-2 border-slate-800
                ${
                  !startHour ? "hidden" : ""
                }
                `}
            >Записаться ко врачу</button>
      </div>


      </div>
              
        <div className='max-w-[50vw] max-h-[45vh] overflow-clip relative'>
            <div className='w-[49vw] h-[45vh] absolute  z-10 top-0 left-0'></div>
        <DayPilotCalendar 
            viewType="WorkWeek" 
            events={mainEvents}
            durationBarVisible="False"
            style={{ pointerEvents: 'none' }}
            className = "text-white pl-5"
        />
        </div>
    </div>
  )
}

export default MyCalendar