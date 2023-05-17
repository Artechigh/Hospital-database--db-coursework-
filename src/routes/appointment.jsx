import React, { useState, useEffect } from 'react'
import Selector from '../components/selector.jsx';
import {Link} from "react-router-dom";
import axios from 'axios';


export default function Appointment() {

  const [doctors, setDoctors] = useState([])
  const [doctorsInfo, setDoctorsInfo] = useState([])

  const eventhandler = data => {
    setDoctors(data.map(doct => doct?.id))
    console.log("Parsed ids:")
    console.log(doctors)
  }
  const tempInfo = [{"id":"1","specialty":"surgeon","user":{"name":"Ursella Gun","email":"ur@mail.com","birthDate":"2000-01-01T00:00:00.000Z","gender":"female"}}, {"id":"2","specialty":"ophthalmologists","user":{"name":"Kratos Horacio","email":"kra@mail.com","birthDate":"2000-01-15T17:27:58.462Z","gender":"male"}}]

    useEffect(() => {
      setDoctorsInfo([])
      console.log()
      // doctors?.map(id => {
      //   console.log("fetch for id :", id)
      //   axios.post("http://localhost:3000/data/doctor", {
      //     id: id,
      //   })
      //   .then((response) => {
      //     console.log("pre-state: ")
      //     console.log([...doctorsInfo, response?.data])
      //     setDoctorsInfo([...doctorsInfo, response?.data]);
      //     console.log("state: ")
      //     console.log(doctorsInfo)
      //   }).catch(function (response) {
      //     console.log(response)
      //   });
        // setDoctorsInfo(tempInfo)
      // })
    }, [doctors])

    return (
      <div className='flex flex-col items-center justify-start relative h-screen'>
        <h1 className='text-xl py-10 font-bold z-10 pt-28'>Выберите необходимый филиал и профиль специалиста для записи</h1>
        <Selector getValue={eventhandler} />
        <div className='w-[41vw] h-96 absolute top-80 flex flex-col items-center justify-start overflow-scroll overflow-x-hidden'>
          {doctorsInfo?.map(doct => (
            <div className='w-full bg-slate-300 flex flex-row items-center justify-between h-24 rounded-md'>
              <div className='flex flex-col items-start justify-center pl-5'>
                {doct?.user?.name}
              </div>
              <div className=''>
                <Link to={`../doctor/${doct?.id}`}>
                  {doct?.id}
                </Link>
              </div>
            </div>
          ))}
        </div>
    </div>
    );
          }