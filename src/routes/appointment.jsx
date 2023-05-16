import React, { useState, useEffect } from 'react'
import Selector from '../components/selector.jsx';


export default function Appointment() {
  
    return (
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-xl py-10 font-bold'>Выберите необходимый филиал и профиль специалиста для записи</h1>
        <Selector />
        {/* TODO забрать имя доктора и отправить на фетч форме записи к доктору */}
    </div>
    );
  }