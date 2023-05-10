import React from 'react'
import Header from './header'
import Footer from './footer'

const Wrapper= ({title, children}) => {
  return (
    <div className='bg-white text-black'>
      <head>
          <title>{title ? title + " - MyHospital" : 'MyHospital DB'}</title>
          <meta name="description" content="Все данные о вашем здоровье - здесь."/>
          <link rel="icon" href="/favicon.ico"/>
        </head>
        <div className='flex min-h-screen min-w-screen flex-col justify-center items-center bg-slate-200'>
        <header>
            <Header />
          </header>
          <main>
            {children}
          </main>
        </div>
        <footer>
            <Footer />
          </footer>
    </div>
  )
}

export default Wrapper