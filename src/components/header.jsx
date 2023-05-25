import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    navigate("/")
    window.location.reload(false)
  }


  return (
    <div className='bg-white/30 w-screen h-[50px] backdrop-blur-sm flex flex-row items-center justify-between fixed top-0 left-0 z-40 p-5'>
        <Link to={"/"} className='font-semibold'>
            MyHospital
        </Link>
        <div className='flex flex-row space-x-5 pl-10'>
          <Link to={"/appointment"} className='hover:underline hover:text-slate-900'>
            Запись
          </Link>
        </div>
        {
          (sessionStorage.getItem('user')) 
          ? 
          <div className='flex flex-row space-x-5 pr-5'>
            <Link to={"/myProfile"} className='hover:underline hover:text-slate-900'>
              Профиль
            </Link>
            <button onClick={handleLogout} className='hover:underline hover:text-slate-900'>
              Выход
            </button>
          </div> 
          : 
          <div className='flex flex-row space-x-5 pr-5'>
            <Link to={"/register"} className='hover:underline hover:text-slate-900'>
              Регистрация
            </Link>
            <Link to={'/login'} className='hover:underline hover:text-slate-900'>
              Вход
            </Link>
          </div>
        }
    </div>
  )
}

export default Header