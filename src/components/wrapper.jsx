import React from 'react'
import Header from './header.jsx'
import Footer from './footer.jsx'

const Wrapper= ({title, children}) => {
  return (
    <div className='bg-white text-black'>
      <div>
          <title>{title ? title + " - MyHospital" : 'MyHospital DB'}</title>
          <meta name="description" content="Все данные о вашем здоровье - здесь."/>
          <link rel="icon" href="/favicon.ico"/>
        </div>
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