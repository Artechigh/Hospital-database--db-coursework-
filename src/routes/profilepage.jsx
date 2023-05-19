import React, { useEffect, useState } from 'react'


const ProfilePage = () => {
    const user = sessionStorage.getItem('user')
    const [isDoctor, setIsDoctor] = useState("")

    useEffect(() => {
      if (JSON.parse(user)?.Patient) {
        setIsDoctor("patient")
      } else if (JSON.parse(user)?.Doctor) {
        setIsDoctor("doctor")
      }
    }, [])
    

  return (
    <div>
        <div className='flex flex-col justify-start items-center'>
            <div className='font-bold text-3xl'>
                {JSON.parse(user)?.name}
            </div>
            <div className='text-xl'>
                Электронная почта: {JSON.parse(user)?.email}
            </div>
            <div className='text-xl'>
                Дата рождения: {JSON.parse(user)?.birthDate}
            </div>
            <div className='text-md'>
                Пол: {JSON.parse(user)?.gender}
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