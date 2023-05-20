import React, { useEffect, useState } from 'react'
import { BiChevronDown } from "react-icons/bi";
import axios from 'axios'

const tempApp = {"Appointments":[{"date":"2023-05-10T10:00:00.000Z","diagnosis":"астигматизм","Hospital":{"name":"Первая городская больница"},"Doctor":{"User":{"name":"Ермолова Милана Антоновна"}},"Prescriptions":[{"id":1,"name":"очки","dosage":"постоянно","instructions":"","doctorId":2,"patientId":4,"appointmentId":4},{"id":2,"name":"ацидофилин","dosage":"3 раза в день 7 дней в неделю","instructions":"","doctorId":2,"patientId":4,"appointmentId":4}]}]}

const tempHospApp = {"Hospitals":[{"name":"Первая городская больница"}],"Appointments":[{"date":"2023-05-18T10:00:00.000Z", "id":"1","diagnosis":"","Hospital":{"name":"Первая городская больница"},"Patient":{"User":{"name":"Соколов Денис Константинович"}},"Prescriptions":[]},{"date":"2023-05-10T10:00:00.000Z" , "id":"2", "diagnosis":"астигматизм","Hospital":{"name":"Первая городская больница"},"Patient":{"User":{"name":"Соболева Кира Никитична"}},"Prescriptions":[{"id":1,"name":"очки","dosage":"постоянно","instructions":"","doctorId":2,"patientId":4,"appointmentId":4},{"id":2,"name":"ацидофилин","dosage":"3 раза в день 7 дней в неделю","instructions":"","doctorId":2,"patientId":4,"appointmentId":4}]}]}




const ProfilePage = () => {
    const user = sessionStorage.getItem('user')
    const [isDoctor, setIsDoctor] = useState("")
    const [info, setInfo] = useState(null)
    const [sortedAppointments, setSortedAppointments] = useState([])
    const [oldAppointments, setOldAppointments] = useState([])
    const [clickedId, setClickedId] = useState("")

    const handleClick = e => setClickedId(e.target.id);

    const handleSubmit = (e) => {
      // e.preventDefault();
      // console.log(e.target.id)
      // console.log(clickedId,e.target.name.value,e.target.dosage.value)
      e.preventDefault();
       axios.post("http://localhost:3000/data/newPrescription", {
        id: e.target.id,
        name: e.target.name.value,
        dosage: e.target.name.value,
        instructions: ""
      })
      .then((response) => {
        console.log(response)
        }).catch(function (response) {
        console.log(response)
      });
  };

    useEffect(() => {
      if (JSON.parse(user)?.Patient) {
        setIsDoctor("patient")
        axios.post("http://localhost:3000/data/patient/appointments", {
          id: JSON.parse(user)?.Patient?.id,
        })
        .then((response) => {
          setInfo(response.data);
        })
      } else if (JSON.parse(user)?.Doctor) {
        setIsDoctor("doctor")
        axios.post("http://localhost:3000/data/doctor/hospitalsAndAppointments", {
          id: JSON.parse(user)?.Doctor?.id,
        })
        .then((response) => {
          setInfo(response.data);
        })
      }
      // setInfo(tempHospApp)
      // setIsDoctor("doctor")
    }, [])

    useEffect(() => {
      const sorted = info?.Appointments?.sort(SortArrayH).sort(SortArrayD).filter(item => +item.date.substring(8,10) >= 20)
      const old = info?.Appointments?.sort(SortArrayH).sort(SortArrayD).filter(item => +item.date.substring(8,10) < 20)
      setOldAppointments(old)
      setSortedAppointments(sorted);
    }, [info])
    
    function SortArrayD(x, y){
      if (x?.date?.substring(8,10) < y?.date?.substring(8,10)) {return -1;}
      if (x?.date?.substring(8,10) > y?.date?.substring(8,10)) {return 1;}
      return 0;
    }

    function SortArrayH(x, y){
      if (x?.date?.substring(11,13) < y?.date?.substring(11,13)) {return -1;}
      if (x?.date?.substring(11,13) > y?.date?.substring(11,13)) {return 1;}
      return 0;
    }
    

  return (
    <div>
        <div className='flex flex-col justify-center items-start space-y-4 pt-16'>
            <div className='font-bold text-2xl pb-3'>
                {JSON.parse(user)?.name}
            </div>
            <div className='text-lg'>
                Электронная почта: {JSON.parse(user)?.email}
            </div>
            <div className='text-lg'>
                Дата рождения: {JSON.parse(user)?.birthDate.substring(0, 10)}
            </div>
            <div className='text-lg'>
                Пол: {JSON.parse(user)?.gender}
            </div>
        </div>
        {isDoctor === "doctor" ?
            <div>
              <div className='text-lg font-medium pt-8 pb-2'>Больницы, в которых вы работаете:</div>
              <div className='flex flex-col justify-start'>
                {info?.Hospitals?.map(hospital => (
                  <div className='font-light'>
                    {hospital?.name}
                  </div>
                ))}
              </div>
              <div className='flex flex-row '>
                <div className='flex flex-col'>
                  <div className='text-lg font-medium pt-8 pb-2'>Список ближайших записей:</div>
                  <div className='flex flex-col justify-start space-y-2 max-h-60 overflow-scroll overflow-x-hidden w-80 relative'>
                        {sortedAppointments?.map(appointment => (
                          <div className='py-3 px-5 border-slate-800 border-2 rounded-md'>
                            <div className='font-medium pb-2'>{appointment?.Patient?.User?.name}</div>
                            <div className='font-light'>{appointment?.date?.substring(0,10)} в {appointment?.date.substring(11,16)}</div>
                            <div className='font-light text-sm pb-2'>{appointment?.Hospital?.name}</div>
                            <div className={`bg-slate-800 h-0.5 w-80 left-0 absolute
                              ${
                                appointment?.Prescriptions?.length == 0 ? "hidden" : ""
                              }
                              `}></div>
                            <div>
                              <div className={`text-md font-semibold pt-3
                              ${
                                appointment?.Prescriptions?.length == 0 ? "hidden" : ""
                              }
                              `}> Предписания </div>
                              <div>{appointment.Prescriptions.map(prescription => (
                                <div className='flex flex-col p-2'>
                                  <div className='text-sm font-semibold'>{prescription.name}</div>
                                  <div className='text-sm'>{prescription.instructions}</div>
                                  <div className='text-sm'>{prescription.dosage}</div>
                                </div>
                              ))}</div>
                            </div>
                          </div>
                        ))
                      }
                  </div>
                </div>

                <div className='flex flex-col pl-5'>
                  <div className='text-lg font-medium pt-8 pb-2'>Список прошедших записей:</div>
                  <div className='flex flex-col justify-start space-y-2 max-h-60 overflow-scroll overflow-x-hidden w-80 relative'>
                        {oldAppointments?.map(appointment => (
                          <div className='py-3 px-5 border-slate-800 border-2 rounded-md'>
                            <div className='font-medium pb-2'>{appointment?.Patient?.User?.name}</div>
                            <div className='font-light'>{appointment?.date?.substring(0,10)} в {appointment?.date.substring(11,16)}</div>
                            <div className='font-light text-sm pb-2'>{appointment?.Hospital?.name}</div>
                            <div className={`bg-slate-800 h-0.5 w-80 left-0 absolute
                              ${
                                appointment?.Prescriptions?.length == 0 ? "hidden" : ""
                              }
                              `}></div>
                            <div>
                              <div className={`text-md font-semibold pt-3
                              ${
                                appointment?.Prescriptions?.length == 0 ? "hidden" : ""
                              }
                              `}> Предписания </div>
                              <div>{appointment.Prescriptions.map(prescription => (
                                <div className='flex flex-col p-2'>
                                  <div className='text-sm font-semibold'>{prescription.name}</div>
                                  <div className='text-sm'>{prescription.instructions}</div>
                                  <div className='text-sm'>{prescription.dosage}</div>
                                </div>
                              ))}</div>
                              <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-5 ' id={appointment?.id}>
                                <input type='text' name='name' placeholder='Название лекарства' 
                                  className='bg-slate-200 text-slate-700 border-b-2 border-slate-700 p-2 w-full'
                                />
                                <input type='text' name='dosage' placeholder='Дозировка' 
                                  className='bg-slate-200 text-slate-700 border-b-2 border-slate-700 p-2 w-full'
                                />
                                <button
                                  className='px-4 py-2 border-solid border-2 border-slate-700 bg-slate-300 rounded-md hover:bg-slate-500'
                                  onClick={handleClick}
                                  id={appointment?.id}
                                >
                                  Добавить предписание
                                </button>
                              </form>
                            </div>
                          </div>
                        ))
                      }
                  </div>
                </div>
              </div>
            </div> : <></>
        }
        {isDoctor === "patient" ?
            <div className='flex flex-row '>
              <div className='flex flex-col'>
                <div className='text-lg font-medium pt-8 pb-2'>Список ваших записей:</div>
                <div className='flex flex-col justify-start space-y-2 max-h-60 overflow-scroll overflow-x-hidden w-80 relative'>
                      {sortedAppointments?.map(appointment => (
                        <div className='py-3 px-5 border-slate-800 border-2 rounded-md'>
                          <div className='font-light pb-1'>{appointment?.Doctor?.specialty}</div>
                          <div className='font-medium pb-2'>{appointment?.Doctor?.User?.name}</div>
                          <div className='font-light'>{appointment?.date?.substring(0,10)} в {appointment?.date.substring(11,16)}</div>
                          <div className='font-light text-sm pb-2'>{appointment?.Hospital?.name}</div>
                          <div className={`bg-slate-800 h-0.5 w-80 left-0 absolute
                              ${
                                appointment?.Prescriptions?.length == 0 ? "hidden" : ""
                              }
                              `}></div>
                            <div>
                              <div className={`text-md font-semibold pt-3
                              ${
                                appointment?.Prescriptions?.length == 0 ? "hidden" : ""
                              }
                              `}> Предписания </div>
                              <div>{appointment.Prescriptions.map(prescription => (
                                <div className='flex flex-col p-2'>
                                  <div className='text-sm font-semibold'>{prescription.name}</div>
                                  <div className='text-sm'>{prescription.instructions}</div>
                                  <div className='text-sm'>{prescription.dosage}</div>
                                </div>
                              ))}</div>
                            </div>
                        </div>
                      ))
                    }
                </div>
              </div>
              <div className='flex flex-col pl-5'>
                <div className='text-lg font-medium pt-8 pb-2'>Список прошедших записей:</div>
                <div className='flex flex-col justify-start space-y-2 max-h-60 overflow-scroll overflow-x-hidden w-80 relative'>
                      {oldAppointments?.map(appointment => (
                        <div className='py-3 px-5 border-slate-800 border-2 rounded-md'>
                          <div className='font-light pb-1'>{appointment?.Doctor?.specialty}</div>
                          <div className='font-medium pb-2'>{appointment?.Doctor?.User?.name}</div>
                          <div className='font-light'>{appointment?.date?.substring(0,10)} в {appointment?.date.substring(11,16)}</div>
                          <div className='font-light text-sm pb-2'>{appointment?.Hospital?.name}</div>
                          <div className={`bg-slate-800 h-0.5 w-80 left-0 absolute
                              ${
                                appointment?.Prescriptions?.length == 0 ? "hidden" : ""
                              }
                              `}></div>
                            <div>
                              <div className={`text-md font-semibold pt-3
                              ${
                                appointment?.Prescriptions?.length == 0 ? "hidden" : ""
                              }
                              `}> Предписания </div>
                              <div>{appointment.Prescriptions.map(prescription => (
                                <div className='flex flex-col p-2'>
                                  <div className='text-sm font-semibold'>{prescription.name}</div>
                                  <div className='text-sm'>{prescription.instructions}</div>
                                  <div className='text-sm'>{prescription.dosage}</div>
                                </div>
                              ))}</div>
                            </div>
                        </div>
                      ))
                    }
                </div>
              </div>
            </div> : <></>
        }
    </div>
  )
}

export default ProfilePage