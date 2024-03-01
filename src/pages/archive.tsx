import React, { useState } from 'react';
import ObservationForm, {ObservationValues} from "../components/ObservationForm"
import Observation from '../../models/Observation';
import axios from "axios";
import {useMutation} from "react-query";
import FadeInDiv from '../components/FadeInDiv';
import {useSession} from "next-auth/react"
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';


export default function Uploading(Observations){
    
    const{data: session} = useSession();

    let user, role;

    if (session?.user?.name?.toString()) {
        user = session.user.name;
        role = session.user.role;
      }

    var valid = false
    const observation = Observations

    const [observations, setobservationsState] = useState(observation.Observations);



    if(role == "admin")(
        valid = true
    )

    const handleDelete = async (id) => {

      await axios.delete(`/api/changes/${id}`);
      setobservationsState(observations.filter((r,_i) => r._id !== id))

  }

  const handleClose = async (r) => {

    const id = r._id

    const Update: ObservationValues = {Lat: r.Lat, Lon: r.Lon, Observation: r.Observation, Open: false,
       Response: r.Response, ResponseDescription: r.ResponseDescription, WeatherTemperature: r.Temperature,    
       WeatherDescription: r.WeatherDescription,
       WindSpeed: r.WindSpeed,
       WindDirection: r.WindDirection,
       AtmosphericPressure: r.AtmosphericPressure,
       Humidity: r.Humidity,
       Visibility: r.Visibility}
    await axios.put(`/api/changes/${id}`, Update);


}

const handleOpen = async (r) => {

    const id = r._id

    const Update: ObservationValues = {Lat: r.Lat, Lon: r.Lon, Observation: r.Observation, Open: true, 
      Response: r.Response, ResponseDescription: r.ResponseDescription, WeatherTemperature: r.Temperature,    
      WeatherDescription: r.WeatherDescription,
      WindSpeed: r.WindSpeed,
      WindDirection: r.WindDirection,
      AtmosphericPressure: r.AtmosphericPressure,
      Humidity: r.Humidity,
      Visibility: r.Visibility}
    await axios.put(`/api/changes/${id}`, Update);


}

    const redirect = (url, asLink = true) =>
    asLink ? (window.location.href = url) : window.location.replace(url);

    const [validation, setValidation] = useState(true);

    var validate: Boolean

  
    const {isLoading, isSuccess, isError, mutate} = useMutation( async(observationform: ObservationValues) =>{

        if((observationform.Lat*0 == 0) && (observationform.Lon*0 == 0)){
            validate = true
        }else{
         setValidation(false)
         validate = false
        }
        if(validate == true){
            observationform.Open = true
            console.log("creating new observation")
            await axios.post("/api/upload/", observationform);
            redirect("/");
        }

      });

      if(valid){
        return(
        <div className="">

            <h1 className="sm:p-3 bg-gray-400 rounded-lg w-[90%] md:max-w-sm mx-auto mt-7 font-bold text-xl flex justify-center">Archive</h1>

            {observations?.map((r,i) => (
              <div className="sm:p-10 bg-gray-400 rounded-lg w-[90%] md:max-w-sm mx-auto mt-7" key={i + 1}>
              <table className="w-full "key={i + 2}>
                <thead key={i + 3}>
                  <tr key={i + 4}>
                    <th key={i + 5} className=""></th>
                    <th key={i + 6} className=""></th>
                    <th key={i + 7} className=""></th>
                    <th key={i + 8} className=""></th>
                    <th key={i + 9} className=""></th>
                    <th key={i + 26} className=""></th>
                  </tr>
                </thead>
                <tbody key={i + 10}>
                  <tr className="font-semibold flex flex-col items-center" key={i + 11}>
                    <td key={i + 11} className="justify-center mb-2">
                    <span className="block sm:inline">Latitude: {r.Lat}</span>
                    </td>
                    <td key={i + 12} className="flex justify-center mb-2">
                    <span className="block sm:inline">Longitude: {r.Lon}</span>
                    </td>
                    <td key={i + 13} className="flex justify-center mb-2" >
                    <span className="block sm:inline">Observation: {r.Observation}</span>
                    </td>
                    <td key={i + 14} className="flex justify-center mb-2">
                    <span className="block sm:inline">Weather Temperature: {r.WeatherTemperature}</span>
                    </td>
                    <td key={i + 15} className="flex justify-center mb-2">
                    <span className="block sm:inline">Weather Description: {r.WeatherDescription}</span>
                    </td>
                    <td key={i + 16} className="flex justify-center mb-2">
                    <span className="block sm:inline">Wind Speed: {r.WindSpeed}</span>
                    </td>
                    <td key={i + 17} className="flex justify-center mb-2">
                    <span className="block sm:inline">Wind Direction: {r.WindDirection}</span>
                    </td>
                    <td key={i + 18} className="flex justify-center mb-2">
                    <span className="block sm:inline">Atmospheric Pressure: {r.AtmosphericPressure}</span>
                    </td>
                    <td key={i + 19} className="flex justify-center mb-2">
                    <span className="block sm:inline">Humidity: {r.Humidity}</span>
                    </td>
                    <td key={i + 20} className="flex justify-center mb-2">
                    <span className="block sm:inline">Visibility: {r.Visibility}</span>
                    </td>
                    {r.Response.length != 0 &&(
                    <td key={i + 21} className="flex justify-center mb-2">
                    <span className="block sm:inline "><div  className="text-center">Response: {r.Response?.map((r,i) => (<p key={i + 27}>{r}</p>))}</div>
                    </span>
                    </td>)}
                    {r.ResponseDescription != "" &&(<td key={i + 22} className="flex justify-center mb-2">
                    <span className="block sm:inline">Response Description: {r.ResponseDescription}</span>
                    </td>)}
                    <td key={i+23}className="flex justify-center"><button onClick={() => redirect(`/route/${r._id}/update/`)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Update</button></td>
                    {role == "admin" && (<td key={i+24} className="flex justify-center"><button onClick={() => handleDelete(r._id)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Delete</button></td>)}
                    {role == "admin" && (<td key={i+25} className="flex justify-center"><button onClick={() => handleClose(r)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Close</button></td>)}
                  </tr>
                </tbody>
              </table>
            </div>
            ))}
       </div>)
     }else{
        return <div className="flex items-center justify-center"><FadeInDiv><div className="container mx-auto my-8 p-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Unauthorized!</h1>
        <p>This page cannot be accessed without logging in!.</p>
      </div></FadeInDiv></div>

      }

}


export const getServerSideProps : GetServerSideProps = async () => {
    
  await dbConnect();
  const results = await Observation.find({}).lean();
  const observations = results.map(doc => ({...doc, ...{_id:doc._id.toString()}}))
  return {props: {Observations: observations}}
};
