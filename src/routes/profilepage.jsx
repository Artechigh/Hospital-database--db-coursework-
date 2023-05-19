import React, { useEffect, useState } from 'react'

const tempApp = {"Appointments":[{"id":1,"date":"2023-05-18T10:00:00.000Z","diagnosis":"","hospitalId":1,"doctorId":1,"patientId":1},{"id":5,"date":"2023-05-15T10:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":1},{"id":7,"date":"2023-05-16T10:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":1}]}
const tempHospApp = {"Hospitals":[{"name":"Первая городская больница"}],"Appointments":[{"id":1,"date":"2023-05-18T10:00:00.000Z","diagnosis":"","hospitalId":1,"doctorId":1,"patientId":1},{"id":2,"date":"2023-05-18T11:00:00.000Z","diagnosis":"","hospitalId":1,"doctorId":1,"patientId":2},{"id":5,"date":"2023-05-15T10:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":1},{"id":6,"date":"2023-05-16T11:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":2},{"id":7,"date":"2023-05-16T10:00:00.000Z","diagnosis":null,"hospitalId":1,"doctorId":1,"patientId":1}]}


const ProfilePage = () => {
    const user = sessionStorage.getItem('user')
    const [isDoctor, setIsDoctor] = useState("")

    useEffect(() => {
      if (JSON.parse(user)?.Patient) {
        setIsDoctor("patient")
        axios.post("http://localhost:3000/data/patient/appointments", {
          id: JSON.parse(user)?.Patient?.id,
        })
        .then((response) => {
          console.log(response.data);
        })
      } else if (JSON.parse(user)?.Doctor) {
        setIsDoctor("doctor")
        axios.post("http://localhost:3000/data/doctor/hopitalsAndAppointments", {
          id: JSON.parse(user)?.Doctor?.id,
        })
        .then((response) => {
          console.log(response.data);
        })
      }
    }, [])
    
    

  return (
    <div>
        <div className='flex flex-col justify-center items-start space-y-4'>
            <div className='font-bold text-4xl pb-3'>
                {JSON.parse(user)?.name}
            </div>
            <div className='text-xl'>
                Электронная почта: {JSON.parse(user)?.email}
            </div>
            <div className='text-xl'>
                Дата рождения: {JSON.parse(user)?.birthDate}
            </div>
            <div className='text-xl'>
                Пол: {JSON.parse(user)?.gender.substring(0, 10)}
            </div>
        </div>
        {isDoctor
            // больницы, аппоинтменты
        }
        {/* {!isDoctor
            // Аппоинтмнты, прескрипшн
        } */}
    </div>
  )
}

export default ProfilePage