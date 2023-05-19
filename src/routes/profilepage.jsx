import React, { useEffect, useState } from 'react'

const tempApp = {"Appointments":[{"id":1,"date":"2023-05-18T10:00:00.000Z","diagnosis":"","hospitalId":1,"doctorId":1,"patientId":1},{"id":5,"date":"2023-05-15T10:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":1},{"id":7,"date":"2023-05-16T10:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":1}]}
const tempHospApp = {"Hospitals":[{"name":"Первая городская больница"}],
"Appointments":[{"id":1,"date":"2023-05-18T10:00:00.000Z","diagnosis":"","hospitalName":"name","doctorId":1,"patientName":"name"},{"id":2,"date":"2023-05-18T11:00:00.000Z","diagnosis":"","hospitalId":1,"doctorId":1,"patientId":2},{"id":5,"date":"2023-05-15T10:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":1},{"id":6,"date":"2023-05-16T11:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":2},{"id":7,"date":"2023-05-16T10:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":1}]}


const ProfilePage = () => {
    const user = sessionStorage.getItem('user')
    const [isDoctor, setIsDoctor] = useState("")
    const [info, setInfo] = useState(null)

    useEffect(() => {
      // if (JSON.parse(user)?.Patient) {
      //   setIsDoctor("patient")
      //   axios.post("http://localhost:3000/data/patient/appointments", {
      //     id: JSON.parse(user)?.Patient?.id,
      //   })
      //   .then((response) => {
      //     setInfo(response.data);
      //   })
      // } else if (JSON.parse(user)?.Doctor) {
      //   setIsDoctor("doctor")
      //   axios.post("http://localhost:3000/data/doctor/hopitalsAndAppointments", {
      //     id: JSON.parse(user)?.Doctor?.id,
      //   })
      //   .then((response) => {
      //     setInfo(response.data);
      //   })
      // }
      setInfo(tempHospApp)
      setIsDoctor("doctor")
    }, [])
    
    

  return (
    <div>
        <div className='flex flex-col justify-center items-start space-y-4 pt-16'>
            <div className='font-bold text-2xl pb-3'>
                {JSON.parse(user)?.name}
            </div>
            <div className='text-lg'>
                Электронная почта: {JSON.parse(user)?.email}
            </div>
            <div className='text-lg'>
                Дата рождения: {JSON.parse(user)?.birthDate}
            </div>
            <div className='text-lg'>
                Пол: {JSON.parse(user)?.gender.substring(0, 10)}
            </div>
        </div>
        {isDoctor === "doctor" ?
            <div>
              <div className='text-lg font-medium pt-8 pb-2'>Больницы, в которых вы работаете:</div>
              <div className='flex flex-col justify-start'>
                {info?.Hospitals?.map(hospital => (
                  <div className='font-light'>
                    {hospital?.name}
                  </div>
                ))}
              </div>

              <div className='text-lg font-medium pt-8 pb-2'>Список ближайших записей:</div>
              <div className='flex flex-col justify-start space-y-2 max-h-60 overflow-scroll overflow-x-hidden'>
                    {info?.Appointments?.map(appointment => (
                      <div className='py-3 px-5 border-slate-800 border-2 rounded-md'>
                        <div className='font-medium pb-2'>{appointment?.patientName}</div>
                        <div className='font-light'>{appointment?.date.substring(0,10)} в {appointment?.date.substring(11,16)}</div>
                        <div className='font-light text-sm'>{appointment?.hospitalName}</div>
                      </div>
                    ))
                  }
              </div>
            </div> : <></>
        }
        {isDoctor === "patient"
            // Аппоинтмнты, прескрипшн
        }
    </div>
  )
}

export default ProfilePage