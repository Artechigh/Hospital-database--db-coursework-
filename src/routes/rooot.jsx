import React from 'react'
import MyImage from '../../public/bghosp.jpg'

const Rooot = () => {
  return (
    <div 
      style={{'background-image': `url(${MyImage}`}}
      className={`flex flex-col justify-center items-center text-center bg-cover bg-left-top relative text-slate-100`}
    > 
        <div 
        style={{'background-image': `url(${MyImage}`}}
        className='font-bold text-7xl pb-20 z-20 pt-24 text-black text-opacity-5 bg-cover bg-clip-text bg-top'>Добро пожаловать в сеть организаций здравоохранения "MyHospital"!</div>

        <div 
        className='text-md font-semibold max-w-3xl z-20 pt-7 pb-2'>Мы являемся ведущей сетью медицинских учреждений, стремящейся предоставить высококачественную и всеобъемлющую медицинскую помощь нашим пациентам. На главной странице нашего веб-сайта вы найдете всю необходимую информацию о нашей сети поликлиник и наших услугах.</div>

        <div className='text-md font-semibold max-w-3xl z-20 pb-2'>Мы гордимся нашей широкой сетью, которая охватывает различные районы и города, обеспечивая доступность нашей медицинской помощи для всех. Наша цель - создать комфортную и безопасную среду, где пациенты могут получить высококлассное лечение и заботу.</div>

        <div className='text-md font-semibold max-w-3xl z-20 pb-20'>Наша сеть предлагает полный спектр медицинских услуг, включая общую практику, специализированные консультации, диагностические и лабораторные исследования, а также современные методы лечения. Наш медицинский персонал состоит из квалифицированных и опытных врачей, медсестер и сотрудников, которые обеспечивают высокий уровень заботы и внимания к каждому пациенту. </div>
        {/* <img src={MyImage} className='absolute aspect-video'/> */}
        <div className='h-[97vh] w-screen z-10 top-0 left-0 absolute flex flex-col'>
          <div className='bg-slate-300 w-full h-full backdrop-blur-md'></div>
          <div className='w-full h-full pt-32 backdrop-blur-md'></div>
        </div>
    </div>
  )
}

export default Rooot