import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MyCalendar from '../components/calendar.jsx';

const profileTemp = {"id":1,"specialty":"Хирург-кардиолог","user":{"name":"Ursella Gun","email":"ur@mail.com"}}


const DoctorProfile = () => {
    const { id } = useParams();

    const [profileInfo, setProfileInfo] = useState({})

    useEffect(() => {
      // фетчим данные

      setProfileInfo(profileTemp)
    }, [])
    

  return (
    <div>
      <div>
        <div className='text-6xl font-bold py-5'>
          {profileInfo?.user?.name}
        </div>
        <div className='text-xl pl-2'>
          {profileInfo?.specialty}
        </div>
        <div className='text-md font-light pt-4 pl-2'>
          {profileInfo?.user?.email}
        </div>
      </div>
        <MyCalendar dId={id}/>
    </div>
  )
}

export default DoctorProfile