import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-900 text-slate-400 flex flex-row items-center justify-center border-t-8 border-slate-400'>
        <div className='max-w-[270px] text-center p-5'>
            Это приложение было сделано Лебедевым Степаном и Монаховым Артемом как Курсовая работа за 2 курс по дисциплине Базы Данных
        </div>
        <div className='max-w-[200px] text-center'>
            Московский Политехнический Университет, 2023.
        </div>
        <div className='max-w-[220px] text-center'>
           Технологический стек: React, React-router, tailwind, webpack + babel, express + node, prisma, postgre.
        </div>
    </div>
  )
}

export default Footer