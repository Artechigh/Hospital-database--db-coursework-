import React from 'react'


const ProfilePage = () => {
    const user = sessionStorage.getItem('user')

  return (
    <div>{JSON.parse(user)?.name}</div>
  )
}

export default ProfilePage