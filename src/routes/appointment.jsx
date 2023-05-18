import React, { useState, useEffect } from 'react'
import Selector from '../components/selector.jsx';
import {Link} from "react-router-dom";
import axios from 'axios';


export default function Appointment() {

  const [doctors, setDoctors] = useState([])

  const eventhandler = data => {
    setDoctors(data)
  }

    // useEffect(() => {
    //   console.log(doctors)
    //     // axios.post("http://localhost:3000/data/doctor", {
    //     //   id: doctors?.id,
    //     //   specialty: doctors?.specialty
    //     // })
    //     // .then((response) => {
    //     //   console.log("pre-state: ")
    //     //   console.log(response?.data)
    //     //   setDoctorsInfo(response?.data);
    //     //   console.log("state: ")
    //     //   console.log(doctorsInfo)
    //     // }).catch(function (response) {
    //     //   console.log(response)
    //     // })
    //     // setDoctorsInfo(tempInfo)
    //   }, [doctors])

    return (
      <div className='flex flex-col items-center justify-start relative h-screen'>
        <h1 className='text-xl py-10 font-bold z-10 pt-28'>Выберите необходимый филиал и профиль специалиста для записи</h1>
        <Selector getValue={eventhandler} />
        {doctors[0] ? <div className='absolute top-56 text-xl font-bold py-10'> Выберите подходящего вам специалиста</div> : <></>}
        <div className='w-[41vw] h-96 absolute top-80 flex flex-col items-center justify-start overflow-scroll overflow-x-hidden'>
          {doctors.map(doct => (
            <div className='w-full bg-slate-300 flex flex-row items-center justify-between h-24 rounded-md mb-3'>
              <div className='flex flex-col items-start justify-center pl-5'>
                <div className='text-sm text-slate-600 pb-1'>
                  {doct?.specialty}
                </div>

                <div className='text-xl font-bold'>
                  {doct?.user?.name}
                </div>
    
                <div>
                  {doct?.user?.email}
                </div>
              </div>
              <div className='px-5 py-2 mr-5 border-2 border-slate-800 rounded-md bg-slate-400 hover:bg-slate-300 text-white hover:text-black'>
                <Link to={`../doctor/${doct?.id}`}>
                  Записаться на прием
                </Link>
              </div>
            </div>
          ))}
        </div>
    </div>
    );
          }