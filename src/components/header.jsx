import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='bg-white/30 w-screen h-[50px] backdrop-blur-sm flex flex-row items-center justify-between fixed top-0 left-0 z-20 p-5'>
        <div className='font-semibold'>
            MyHospital
        </div>
        <div className='flex flex-row space-x-5 pl-10'>
          <Link to={"/appointment"} className='hover:underline hover:text-slate-900'>
            Запись
          </Link>
          <div className='hover:underline hover:text-slate-900'>
            Доктора
          </div>
        </div>
        <div className='flex flex-row space-x-5'>
            <Link to={"/register"} className='hover:underline hover:text-slate-900'>
              Регистрация
            </Link>
            <Link to={'/login'} className='hover:underline hover:text-slate-900'>
              Вход
            </Link>
        </div>
    </div>
  )
}

export default Header