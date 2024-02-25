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

    const valid = session
    const observation = Observations

    let user, role;

    const [observations, setobservationsState] = useState(observation.Observations);

    if (session?.user?.name?.toString()) {
      user = session.user.name;
      role = session.user.role;
    }

    const handleDelete = async (id) => {

      await axios.delete(`/api/changes/${id}`);
      setobservationsState(observations.filter((r,_i) => r._id !== id))

  }

  const handleClose = async (r) => {

    const id = r._id

    const Update: ObservationValues = {Lat: r.Lat, Lon: r.Lon, Observation: r.Observation, Weather: r.Weather, Open: false,  Response: r.Response, Response2: r.Response2}

    await axios.put(`/api/changes/${id}`, Update);
    setobservationsState(observations.filter((r,_i) => r._id !== id))

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
            <div className="text-white mt-5"><ObservationForm
            isLoading={isLoading}
            onSubmit={(observationform) => mutate(observationform)}
            />  </div> 
            <div className="bg-gray-300 rounded-lg text-white mt-5 font-semibold text-xl flex justify-center">{!validation && (<h1 className="text-white">Couldnt Upload</h1>)}</div>
            {session && (
              <h1 className="sm:p-3 bg-gray-400 rounded-lg w-[90%] md:max-w-sm mx-auto mt-7 font-bold text-xl flex justify-center">On-Going Incidents</h1>
            )}
            {observations?.filter((r,_i) => r.Open).map((r,i) => (
              <div className="sm:p-10 bg-gray-400 rounded-lg w-[90%] md:max-w-sm mx-auto mt-7" key={i + 1}>
              <table className="w-full "key={i + 2}>
                <thead key={i + 3}>
                  <tr key={i + 4}>
                    <th key={i + 5} className=""></th>
                    <th key={i + 6} className=""></th>
                    <th key={i + 7} className=""></th>
                    <th key={i + 8} className=""></th>
                    <th key={i + 9} className=""></th>
                  </tr>
                </thead>
                <tbody key={i + 10}>
                  <tr className="font-semibold flex flex-col items-center" key={i + 11}>
                    <td key={i + 12} className="justify-center mb-2">
                    <span className="block sm:inline">Latitude: {r.Lat}</span>
                    </td>
                    <td key={i + 13} className="flex justify-center mb-2">
                    <span className="block sm:inline">Longitude: {r.Lon}</span>
                    </td>
                    <td key={i + 14} className="flex justify-center mb-2" >
                    <span className="block sm:inline">Observation: {r.Observation}</span>
                    </td>
                    <td key={i + 15} className="flex justify-center mb-2">
                    <span className="block sm:inline">Weather: {r.Weather}</span>
                    </td>
                    <td key={i + 16} className="flex justify-center mb-2">
                    <span className="block sm:inline">{(r.Response || r.Response2 )&&( "Response: " + r.Response + " " + r.Response2)}
                    </span>
                    </td>
                    <td key={i+17}className="flex justify-center"><button onClick={() => redirect(`/route/${r._id}/update/`)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Update</button></td>
                    {role == "admin" && (<td key={i+18} className="flex justify-center"><button onClick={() => handleDelete(r._id)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Delete</button></td>)}
                    {role == "admin" && (<td key={i+19} className="flex justify-center"><button onClick={() => handleClose(r)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Close</button></td>)}
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
