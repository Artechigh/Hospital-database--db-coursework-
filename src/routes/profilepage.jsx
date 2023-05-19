import React, { useEffect, useState } from 'react'


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