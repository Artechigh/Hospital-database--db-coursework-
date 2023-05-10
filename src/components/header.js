import React from 'react'

const Header = () => {
  return (
    <div className='bg-white/30 w-screen h-[50px] backdrop-blur-sm flex flex-row items-center justify-between fixed top-0 left-0 z-10 p-5'>
        <div>
            MyHospital
        </div>
        <div className='flex flex-row space-x-5'>
            <div>
             Sign in
            </div>
            <div>
             Sign in
            </div>
        </div>
    </div>
  )
}

export default Header