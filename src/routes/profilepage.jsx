import React, { useEffect, useState } from 'react'


const ProfilePage = () => {
    const user = sessionStorage.getItem('user')
    const [isDoctor, setIsDoctor] = useState(null)

    useEffect(() => {
      if (JSON.parse(user)?.Patient) {
        setIsDoctor(false)
      } else {
        setIsDoctor(true)
      }
    }, [])
    

  return (
    <div>
        {JSON.parse(user)?.name}
        {
            isDoctor ? <div> ВЫ - ДОКТОР =3 </div> : <div> ВЫ - пациент </div>
        }
    </div>
  )
}

export default ProfilePage