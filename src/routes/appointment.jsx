import React, { useState, useEffect } from 'react'
import Selector from '../components/selector.jsx';
import {Link} from "react-router-dom";
import axios from 'axios';


export default function Appointment() {

  const [doctors, setDoctors] = useState([])
  const [doctorsInfo, setDoctorsInfo] = useState([])

  const eventhandler = data => {
    setDoctors(data.map(doct => doct?.id))
  }

    useEffect(() => {
      doctors?.map(id => {
      axios.post("http://localhost:3000/data/doctor", {
        id: id,
      })
      .then((response) => {
        console.log(response.data.specialty);
      }).catch(function (response) {
        console.log(response)
      });
      })


    }, [doctors])

    return (
      <div className='flex flex-col items-center justify-start relative h-screen'>
        <h1 className='text-xl py-10 font-bold z-10 pt-28'>Выберите необходимый филиал и профиль специалиста для записи</h1>
        <Selector getValue={eventhandler} />
        <div className='w-[41vw] h-96 bg-slate-700 absolute top-80 flex flex-col items-center justify-start overflow-scroll overflow-x-hidden'>
          {doctors?.map(doct => (
            <div className='w-full bg-slate-300 flex flex-row items-center justify-between h-24 rounded-md'>
              <div className='flex flex-col items-start justify-center pl-5'>
                {doctorsInfo}
              </div>
              <div className=''>
                <Link to={`../doctor/${doct}`}>
                  {doct}
                </Link>
              </div>
            </div>
          ))}
        </div>
    </div>
    );
  }