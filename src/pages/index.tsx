import React, { useEffect, useState } from 'react';
import ObservationForm, { ObservationValues } from "../components/ObservationForm"
import Observation from '../../models/Observation';
import axios from "axios";
import { useMutation } from "react-query";
import FadeInDiv from '../components/FadeInDiv';
import { useSession } from "next-auth/react"
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';
import WeatherComponent, { WeatherResponse } from '../components/WeatherComponent';
import { Card, Typography } from "@material-tailwind/react";


export default function Uploading(Observations) {

  const { data: session } = useSession();

  var valid = session
  const observation = Observations

  let user, role;

  const [observations, setobservationsState] = useState(observation.Observations);

  if (session?.user?.name?.toString()) {
    user = session.user.name;
    role = session.user.role;
  }


  const handleDelete = async (id) => {

    await axios.delete(`/api/changes/${id}`);
    setobservationsState(observations.filter((r, _i) => r._id !== id))

  }

  const handleClose = async (r) => {

    const id = r._id

    const Update: ObservationValues = {
      Lat: r.Lat, Lon: r.Lon, Observation: r.Observation, Open: false,
      Date: r.Date, Time: r.Time,
      Response: r.Response, ResponseDescription: r.ResponseDescription, WeatherTemperature: r.Temperature,
      WeatherDescription: r.WeatherDescription,
      WindSpeed: r.WindSpeed,
      WindDirection: r.WindDirection,
      AtmosphericPressure: r.AtmosphericPressure,
      Humidity: r.Humidity,
      Visibility: r.Visibility
    }

    await axios.put(`/api/changes/${id}`, Update);
    setobservationsState(observations.filter((r, _i) => r._id !== id))

  }



  const redirect = (url, asLink = true) =>
    asLink ? (window.location.href = url) : window.location.replace(url);

  const [validation, setValidation] = useState(true);


  const [confirmation, setConfirmation] = useState(false);

  var validate: Boolean

  const [weatherHoverIndex, setWeatherHoverIndex] = useState(null);
  const [windHoverIndex, setWindHoverIndex] = useState(null);
  const [pressureHoverIndex, setPressureHoverIndex] = useState(null);
  const [humitidyHoverIndex, setHumitidyHoverIndex] = useState(null);


  const { isLoading, isSuccess, isError, mutate } = useMutation(async (observationform: ObservationValues) => {

    if ((observationform.Lat * 0 == 0) && (observationform.Lon * 0 == 0)) {
      validate = true
    } else {
      setValidation(false)
      setConfirmation(false)
      validate = false
    }
    if (validate == true) {

      const { WeatherTemperature, WeatherDescription, WindSpeed, WindDirection, AtmosphericPressure, Humidity, Visibility }: WeatherResponse = await WeatherComponent(observationform.Lat, observationform.Lon);


      observationform.Open = true
      observationform.WeatherTemperature = WeatherTemperature
      observationform.WeatherDescription = WeatherDescription
      observationform.WindSpeed = WindSpeed
      observationform.WindDirection = WindDirection
      observationform.AtmosphericPressure = AtmosphericPressure
      observationform.Humidity = Humidity
      observationform.Visibility = Visibility

      const today: Date = new Date();
      const year: number = today.getFullYear();
      const month: number = today.getMonth() + 1;
      const day: number = today.getDate();

      const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


      const currentDateAndTime: Date = new Date();

      const currentHour: number = currentDateAndTime.getHours();
      const currentMinute: number = currentDateAndTime.getMinutes();
      const currentSecond: number = currentDateAndTime.getSeconds();

      const formattedTime: string = `${currentHour}:${currentMinute}:${currentSecond}`;

      observationform.Date = formattedDate
      observationform.Time = formattedTime

      console.log("creating new observation")
      console.log(observationform)
      const response = await axios.post("/api/upload/", observationform)
      const data = response.data;
      const newTicket = data.data
      console.log("TICKET DATA",newTicket)
      console.log("Response from server:", response.data);
      setobservationsState(prevState => {
        const newState = [...prevState, newTicket];
        console.log("Updated state:", newState);
        return newState;
      });      setConfirmation(true)
      setValidation(true)
        ;
    }

  });
  if (!role) {
    return (
      <div className='container mx-auto px-4 md:px-8'>
        <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="ml-6 mt-20 text-gray-900 text-4xl md:text-6xl lg:text-8xl font-bold font-serif drop-shadow-lg w-full md:w-1/2">
        <h3>Maritime Emergency Response</h3>
      </div>
      <div className="mr-10 mt-10 ml-10 md:mt-24 md:ml-20 mb-20 p-4 text-gray-900 text-base md:text-xl font-bold font-serif drop-shadow-lg w-[80%] md:w-1/2 flex justify-center bg-lightblue rounded-lg">
      <h3>
        Maritime Emergency Response is a private coast guard service in the UK. We work with councils and local government to supply emergency services, search and rescue, and other services to those at sea in UK waters. You can help us save lives by submitting an incident as soon as you see it.
      </h3>
    </div>
  </div>
        <div className="text-white mx-auto mb-10 mt-15 ml-10 mr-10"><ObservationForm
          isLoading={isLoading}
          onSubmit={(observationform) => mutate(observationform)}
        />  </div>
        <div className=" rounded-lg text-black font-bold text-xl flex justify-center">{!validation && (<h1>Couldnt Upload, please check the fields</h1>)}</div>
        <div className=" rounded-lg text-black mt-1 font-bold text-xl flex justify-center">{confirmation && (<h1>Submittion Sent!</h1>)}</div></div>)
  } else {

    return (

  <div className="">
  <div className="flex flex-col md:flex-row justify-between items-center">
    <div className="ml-6 mt-20 text-gray-900 text-4xl md:text-6xl lg:text-8xl font-bold font-serif drop-shadow-lg w-full md:w-1/2">
      <h3>Maritime Emergency Response</h3>
    </div>
    <div className="mr-10 mt-10 ml-10 md:mt-24 md:ml-20 mb-20 p-3 px-1 text-gray-900 text-base md:text-3xl font-bold font-serif drop-shadow-lg w-[80%] md:w-1/2 flex justify-center bg-lightblue rounded-lg">
      <h3>
        Maritime Emergency Response is a private coast guard service in the UK. We work with councils and local government to supply emergency services, search and rescue, and other services to those at sea in UK waters. You can help us save lives by submitting an incident as soon as you see it.
      </h3>
    </div>
  </div>
        <div className="text-white mt-5 ml-10 mr-10 "><ObservationForm
          isLoading={isLoading}
          onSubmit={(observationform) => mutate(observationform)}
        />  </div>
        <div className=" rounded-lg text-black font-bold text-xl flex justify-center">{!validation && (<h1>Couldnt Upload, check the fields for string characters</h1>)}</div>
        <div className=" rounded-lg text-black mt-1 font-bold text-xl flex justify-center">{confirmation && (<h1>Submittion Sent!</h1>)}</div>
        {(role == "user" || role=="admin") && (
          <div className="flex justify-center mt-5">
            <h1 className="sm:p-4 bg-lightblue mt-10 underline border-2 border-none rounded-lg mt-1 font-bold text-3xl flex justify-center mb-5">On-Going Incidents</h1>
          </div>
        )}

        <div className="overflow-y-auto w-full shadow-md sm:rounded-lg">
          <div className="pb-0 w-full dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
            </div>
          </div>
          <table className="table-justify-around w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Latitude
                </th>
                <th scope="col" className="px-6 py-3">
                  Longitutde
                </th>
                <th scope="col" className="px-6 py-3">
                  Observation
                </th>
                <th scope="col" className="px-6 py-3">
                  Weather Information
                </th>
                {role == "admin" && (<th scope="col" className="px-6 py-3">
                  Response
                </th>)}
                {role == "admin" && (<th scope="col" className="px-6 py-3">
                  Response Description
                </th>)}
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {observations?.filter((r,_i) => r.Open).map((r,i) => (
              <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white  break-words">
                {r.Lat}
              </th>
              <td className="px-6 py-4  break-words">
              {r.Lon}
              </td>
              <td className="px-6 py-4  break-words">
              {r.Observation}
              </td>
              <td className="px-6 py-4 flex items-center mt-4">
                    <div
                      className="relative inline-block cursor-pointer"
                      onMouseEnter={() => setWeatherHoverIndex(i)}
                      onMouseLeave={() => setWeatherHoverIndex(null)}
                    >
                      <img
                        src="/img/weather.ico"
                        alt="Weather icon"
                        className="h-5 w-5 text-blue-500 hover:text-blue-600 "
                      />
                      {weatherHoverIndex === i && (
                        <div className="absolute bg-white border border-gray-300 shadow-md p-2 rounded-md mt-1 top-[-8rem]">
                          <p>Temperature: {r.WeatherTemperature}°</p>
                          <p>Description: {r.WeatherDescription}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className="relative inline-block cursor-pointer ml-4"
                      onMouseEnter={() => setWindHoverIndex(i)}
                      onMouseLeave={() => setWindHoverIndex(null)}
                    >
                      <img
                        src="/img/wind.ico"
                        alt="Wind icon"
                        className="h-5 w-5 text-green-500 hover:text-green-600"
                      />
                      {windHoverIndex === i && (
                        <div className="absolute bg-white border border-gray-300 shadow-md p-2 rounded-md mt-1 top-[-7rem]">
                          <p>Speed: {r.WindSpeed}</p>
                          <p>Direction: {r.WindDirection}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className="relative inline-block cursor-pointer ml-4"
                      onMouseEnter={() => setPressureHoverIndex(i)}
                      onMouseLeave={() => setPressureHoverIndex(null)}
                    >
                      <img
                        src="/img/pressure.ico"
                        alt="Pressure icon"
                        className="h-5 w-5 text-green-500 hover:text-green-600"
                      />
                      {pressureHoverIndex === i && (
                        <div className="absolute bg-white border border-gray-300 shadow-md p-2 rounded-md mt-1 top-[-4rem]">
                          <p>Pressure: {r.AtmosphericPressure}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className="relative inline-block cursor-pointer ml-4"
                      onMouseEnter={() => setHumitidyHoverIndex(i)}
                      onMouseLeave={() => setHumitidyHoverIndex(null)}
                    >
                      <img
                        src="/img/humitidy.ico"
                        alt="Humitidy icon"
                        className="h-5 w-5 text-green-500 hover:text-green-600"
                      />
                      {humitidyHoverIndex === i && (
                        <div className="absolute bg-white border border-gray-300 shadow-md p-2 rounded-md mt-1 top-[-7rem]">
                          <p>Humidity: {r.Humidity}</p>
                          <p>Visibility: {r.Visibility}</p>
                        </div>
                      )}
                    </div>
                  </td>
              {role == "admin" && (<td className="px-6 py-4  break-words">
              {r.Response.length != 0 &&(<div  className="">{r.Response?.map((r,i) => (<p key={i + 27}>{r}</p>))}</div>)}
              </td>)}
              {role == "admin" && (<td className="px-6 py-4  break-words">
              {r.ResponseDescription}
              </td>)}
              <td className="px-6 py-4">
                <button onClick={() => redirect(`/route/${r._id}/update/`)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold mb-1 mr-1">Update</button>
                {role == "admin" && (<button onClick={() => handleDelete(r._id)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold mb-1 mr-1">Delete</button>)}
                {role == "admin" && r.Open && (<button onClick={() => handleClose(r)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold mb-1 mr-1">Close</button>)}
                {role == "admin" && (<button onClick={() => redirect(`/map/${r.Lat}/${r.Lon}/map`)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold mb-1 mr-1">Map</button>)}

              </td>
            </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    )


  }
}


export const getServerSideProps: GetServerSideProps = async () => {

  await dbConnect();
  const results = await Observation.find({}).lean();
  const observations = results.map(doc => ({ ...doc, ...{ _id: doc._id.toString() } }))
  return { props: { Observations: observations } }
};
