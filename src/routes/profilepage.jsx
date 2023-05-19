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
        {JSON.parse(user)?.name}
        {isDoctor}
    </div>
  )
}

export default ProfilePage