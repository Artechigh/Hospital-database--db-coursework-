import React, { useState } from 'react'
import axios from "axios";



const Login = () => {

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')


  const handleSubmit = (e) => {
      e.preventDefault();
      setUsername(e.target.username.value)
      setPass(e.target.password.value)
      axios.get("http://localhost:3000/", {
        "Content-type": "application/json"
      })
      .then((response) => console.log(response));
      // fetch('http://localhost:3000/api/test', {
      //   mode: 'no-cors'
      // })
      // .then(response => response.json())
      // .then(data => console.log(data));
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div>{username}</div>
      <div>{pass}</div>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-5 '>
                <input type='text' name='username' placeholder='Логин'
                  className='bg-slate-200 text-slate-700 border-b-2 border-slate-700 p-2'
                />
                <input type='password' name='password' placeholder='Пароль' 
                  className='bg-slate-200 text-slate-700 border-b-2 border-slate-700 p-2'
                />
                <button
                  className='px-4 py-2 border-solid border-2 border-slate-700 bg-slate-300 rounded-md hover:bg-slate-500'
                >
                  Войти
                </button>
        </form>
    </div>
  )
}

export default Login