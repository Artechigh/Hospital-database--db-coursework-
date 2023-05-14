import React, { useState } from 'react'
import axios from "axios";



const Login = () => {
  var bodyFormData = new FormData();

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')


  const handleSubmit = (e) => {
      e.preventDefault();
      setUsername(e.target.username.value)
      setPass(e.target.password.value)
       // bodyFormData.append('userName', 'test');

       axios.post("http://localhost:3000/api", {
        email: username,
        password: pass
      })
      .then((response) => {
        console.log(response);
      }).catch(function (response) {
        //handle error
        console.log(response);
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