import React, { useState, useEffect } from 'react'
import Selector from '../components/selector.jsx';


export default function Appointment() {

  const [doctors, setDoctors] = useState("")

  const eventhandler = data => {
    setDoctors(data.map(doct => doct?.user?.name))}

    return (
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-xl py-10 font-bold'>Выберите необходимый филиал и профиль специалиста для записи</h1>
        <Selector getValue={eventhandler}/>
        {doctors}
        {/* ЕСТЬ НАБОР ИМЕН ДОКТОРОВ. МОЖНО ЛИ ТУТ ЗАФЕТЧИТЬ ТЕБЕ */}
    </div>
    );
  }