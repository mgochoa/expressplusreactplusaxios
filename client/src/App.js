import { useEffect, useState } from 'react';
import './App.css';

import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

import UserService from './api/UserSerivce';
import WeatherService from './api/WeatherService';

import initialUsers from './utlis/initalUsers';

const userService = new UserService()
const ws = new WeatherService()

function App() {

  const [users, setUsers] = useState([])
  const [cityWeatherInformation, setCityWeatherInformation] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(res => setTimeout(async () => {
        let response = await userService.RetrieveAll()
        setUsers(response.data)
        let weatherResponse = await ws.city("Medellin")
        setCityWeatherInformation(weatherResponse.data)
      }, 1500))
    }
    fetchData()
  }, [setUsers, setCityWeatherInformation])

  return (
    <div className="h-screen mx-0 bg-green-100 grid place-items-center">
      <div className="h-auto rounded-sm">
        {cityWeatherInformation !== null &&
          <div className="p-3 text-2xl text-center my-4 rounded-md border-2 border-green-900 text-green-900"> <b className="font-bold">Ciudad:</b> {cityWeatherInformation.name} <b className="font-bold">Clima:</b>{cityWeatherInformation.weather[0].main} <b className="font-bold">Temperatura:</b>{cityWeatherInformation.main.temp}</div>
        }
        {users.length !== 0 &&
          <>
            <h1 className="text-left text-4xl font-serif my-4">Users</h1>
            <table className="table-auto rounded-sm bg-green-200 shadow-xl text-2xl">
              <thead>
                <tr className="text-white font-serif  bg-green-600">
                  <th className="border border-white">ID</th>
                  <th className="border border-white">Nombre</th>
                  <th className="border border-white">Email</th>
                  <th className="border border-white px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr className="border-2 border-white text-center font-sans text-green-700" key={user.id}>
                      <td className="border-2 rounded-sm border-white p-2">{user.id}</td>
                      <td className="border-2 rounded-sm border-white p-2">{user.name}</td>
                      <td className="border-2 rounded-sm border-white p-2">{user.email.toLowerCase()}</td>
                      <td className="grid grid-flow-col place-content-evenly p-2">
                        <PencilIcon className="h-8 w-8 text-green-900 cursor-pointer hover:text-white" />
                        <TrashIcon className="h-8 w-8 text-green-900 cursor-pointer hover:text-white" />
                      </td>
                    </tr>
                  )

                })}
              </tbody>
            </table>
            <div className="container grid place-items-end my-10 px-1">
              <button className="text-white  border-2 font-serif font-medium hover:bg-gray-50 hover:text-green-900 border-green-800 w-36 h-12 rounded-xl text-2xl bg-green-600 shadow-xl">AGREGAR</button>
            </div>
          </>
        }
        {users.length === 0 &&
          <div className="text-center text-2xl text-green-900">Cargando...</div>
        }

      </div>
    </div>
  );
}

export default App;
