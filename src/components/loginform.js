import React, { useState } from 'react'
import axios from "axios";



const Login = () => {

  const [responce, setResponce] = useState('')
  const [error, setError] = useState('')


  const handleSubmit = (e) => {
      e.preventDefault();

       axios.post("http://localhost:3000/api/login", {
        email: e.target.username.value,
        password: e.target.password.value
      })
      .then((response) => {
        setResponce(response.data.message);
      }).catch(function (response) {
        setError(responce);
        console.log(responce)
      });;

    // axios({
    //   method: "post",
    //   url: "http://localhost:3000/",
    //   data: bodyFormData,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    //   .then(function (response) {
    //     //handle success
    //     console.log(response);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     console.log(response);
    //   });

    // axios.post("http://localhost:3000/api", {
    //   "Content-type": "application/json"
    // })
    // .then((response) => console.log(response));
    // fetch('http://localhost:3000/api/test', {
    //   mode: 'no-cors'
    // })
    // .then(response => response.json())
    // .then(data => console.log(data));
  };

  return (
    <div className='flex flex-col justify-center items-center'>
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
        <div className='text-green-950 p-5'>{responce}</div>
        {error ? 
          <div className='text-green-950 p-5'>
            Произошла ошибка на стороне сервера. Пожалуйста, попробуйте еще раз.
          </div> 
          : <div></div>}
    </div>
  )
}

export default Login