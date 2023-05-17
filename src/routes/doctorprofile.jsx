import React from 'react'
import { useParams } from 'react-router-dom';

const DoctorProfile = () => {
    const { id } = useParams();

  return (
    <div>
        {id}
    </div>
  )
}

export default DoctorProfile