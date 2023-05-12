import React from 'react'

const Header = () => {
  return (
    <div className='bg-white/30 w-screen h-[50px] backdrop-blur-sm flex flex-row items-center justify-between fixed top-0 left-0 z-10 p-5'>
        <div className='font-semibold'>
            MyHospital
        </div>
        <div className='flex flex-row space-x-5'>
          <div className='hover:underline hover:text-slate-900'>
            Больницы
          </div>
          <div className='hover:underline hover:text-slate-900'>
            Доктора
          </div>
        </div>
        <div className='flex flex-row space-x-5'>
            <div className='hover:underline hover:text-slate-900'>
              Регистрация
            </div>
            <div className='hover:underline hover:text-slate-900'>
              Вход
            </div>
        </div>
    </div>
  )
}

export default Header