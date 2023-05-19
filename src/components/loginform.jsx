import React, { useState } from 'react'
import axios from "axios";



const Login = () => {

  const [responce, setResponce] = useState('')
  const [error, setError] = useState('')


  const handleSubmit = (e) => {
      e.preventDefault();
       axios.post("http://localhost:3000/api/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((response) => {
        setResponce(response.data.message);
        sessionStorage.setItem('user', JSON.stringify(response?.data?.User));
      }).catch(function (response) {
        setError(response);
        console.log(response)
      });;
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='font-semibold text-2xl pb-11'>Введите данные для входа</div>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-5 '>
                <input type='text' name='email' placeholder='Почта'
                  className='bg-slate-200 text-slate-700 border-b-2 border-slate-700 p-2 w-96'
                />
                <input type='password' name='password' placeholder='Пароль' 
                  className='bg-slate-200 text-slate-700 border-b-2 border-slate-700 p-2 w-96'
                />
                <div className='text-green-950 p-1'>{responce}</div>
                {error ? 
                  <div className='text-green-950 p-1'>
                    Произошла ошибка на стороне сервера. Пожалуйста, попробуйте еще раз.
                  </div> 
                  : <div></div>}
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