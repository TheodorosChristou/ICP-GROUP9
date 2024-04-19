import React, { useEffect, useState } from 'react';
import ObservationForm, { ObservationValues } from "../components/ObservationForm"
import Observation from '../../models/Observation';
import axios from "axios";
import { useMutation } from "react-query";
import FadeInDiv from '../components/FadeInDiv';
import { useSession } from "next-auth/react"
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';
import Fuse from 'fuse.js';


export default function Uploading(Observations) {

  const { data: session } = useSession();

  let user, role;


  

  if (session?.user?.name?.toString()) {
    user = session.user.name;
    role = session.user.role;
  }

  var valid = false
  const observation = Observations

  const [observations, setobservationsState] = useState(observation.Observations);


  if (role == "admin") (
    valid = true
  )

  const handleDelete = async (id) => {

    await axios.delete(`/api/changes/${id}`);
    setobservationsState(observations.filter((r, _i) => r._id !== id))
    setFilteredObservations(observations.filter((r, _i) => r._id !== id))

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
    redirect("/archive");



  }


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredObservations, setFilteredObservations] = useState(observations.Observations);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    console.log("Search term changed:", searchTerm);
    const filtered = observations.filter(observation => {

      const observationMatch = observation.Observation.toLowerCase().includes(searchTerm.toLowerCase());

      const latMatch = observation.Lat.toString().includes(searchTerm);
      const lonMatch = observation.Lon.toString().includes(searchTerm);
      const temperatureMatch = observation.WeatherTemperature.toString().includes(searchTerm);

      return observationMatch || latMatch || lonMatch || temperatureMatch;
    });


    console.log("Filtered observations:", filtered);
    setFilteredObservations(filtered);
  }, [searchTerm, Observations]);

  const handleOpen = async (r) => {

    const id = r._id

    const Update: ObservationValues = {
      Lat: r.Lat, Lon: r.Lon, Observation: r.Observation, Open: true,
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
    redirect("/archive");


  }

  const redirect = (url, asLink = true) =>
    asLink ? (window.location.href = url) : window.location.replace(url);

  const [validation, setValidation] = useState(true);

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
      validate = false
    }
    if (validate == true) {
      observationform.Open = true
      console.log("creating new observation")
      await axios.post("/api/upload/", observationform);
      redirect("/");
    }

  });

  if (valid) {
    return (
      <div className="bg-white min-h-screen py-7">

        <h1 className="sm:p-3 bg-white rounded-lg w-[90%] md:max-w-sm mx-auto mt-1 font-bold text-2xl flex justify-center mb-5">Archives</h1>

        <div className="overflow-y-auto shadow-md sm:rounded-lg">
          <div className="bg-gray-200">
            <input className="rounded-md p-2 bg-gray-200 hover:bg-white text-gray-900"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for tickets..."
            />
          </div>
          <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
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
              {filteredObservations?.map((r, i) => (
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
                    {r.Response.length != 0 && (<div className="">{r.Response?.map((r, i) => (<p key={i + 27}>{r}</p>))}</div>)}
                  </td>)}
                  {role == "admin" && (<td className="px-6 py-4  break-words">
                    {r.ResponseDescription}
                  </td>)}
                  <td className="px-9 py-4">
                    <button onClick={() => redirect(`/route/${r._id}/update/`)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold mb-1 mr-1">Update</button>
                    {role == "admin" && (<button onClick={() => handleDelete(r._id)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold mb-1 mr-1">Delete</button>)}
                    {role == "admin" && r.Open && (<button onClick={() => handleClose(r)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold mb-1 mr-1">Close</button>)}
                    {role == "admin" && !r.Open && (<button onClick={() => handleOpen(r)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold mb-1 mr-1">Open</button>)}
                    {role == "admin" && (<button onClick={() => redirect(`/map/${r.Lat}/${r.Lon}/map`)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold mb-1 mr-1">Map</button>)}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>)
  } else {
    return <div className="flex items-center justify-center"><FadeInDiv><div className="container mx-auto my-8 p-8 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">Unauthorized!</h1>
      <p>This page cannot be accessed without logging in!.</p>
    </div></FadeInDiv></div>

  }

}


export const getServerSideProps: GetServerSideProps = async () => {

  await dbConnect();
  const results = await Observation.find({}).lean();
  const observations = results.map(doc => ({ ...doc, ...{ _id: doc._id.toString() } }))
  return { props: { Observations: observations } }
};