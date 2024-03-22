import dynamic from 'next/dynamic';
import { GetServerSideProps } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Observation from '../../../../models/Observation';
import ObservationForm, {ObservationValues} from "../../../components/ObservationForm"
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {useMutation} from "react-query";
import FadeInDiv from '@/components/FadeInDiv';
import axios from "axios";

export default function Update(ObservationFormDetails){
    const values = ObservationFormDetails.ObservationFormDetails

    const{data: session} = useSession();

    var valid: boolean
    
    if(session){
        valid = true
    }else{
        valid = false
    }

    valid=true


    const ObservationValue = values

    const [validation, setValidation] = useState(true);

    var validate: Boolean

    const ResponseList = ['Staff', 'Vessels', 'Emergency Services', 'Public Vessels'];

    const observationformValues: ObservationValues = {Lat: values.Lat, Lon: values.Lon, Observation: values.Observation, Open: values.Open, 
      Date: values.Date, Time: values.Time,  
      Response: ResponseList.filter(option => values.Response?.includes(option)) || [], ResponseDescription: values.ResponseDescription, WeatherTemperature: values.Temperature,    
      WeatherDescription: values.WeatherDescription,
      WindSpeed: values.WindSpeed,
      WindDirection: values.WindDirection,
      AtmosphericPressure: values.AtmosphericPressure,
      Humidity: values.Humidity,
      Visibility: values.Visibility}

     const redirect = (url, asLink = true) =>
     asLink ? (window.location.href = url) : window.location.replace(url);

      const {isLoading, isSuccess, isError, mutate} = useMutation( async(observationform: ObservationValues) => {
        if((observationform.Lat*0 == 0) && (observationform.Lon*0 == 0)){
          validate = true
          console.log(validate)
      }else{
       setValidation(false)
       validate = false
       console.log(validate)
      }
      if(validate == true){
        console.log("updating location");
        console.log(observationform)
        await axios.put(`/api/changes/${ObservationValue._id}`, observationform);
        redirect("/")}

          }
        );

        if(valid){
          return (

         <div className="mt-10 text-white">
<ObservationForm
      isLoading={isLoading}
    onSubmit={(observationform) => mutate(observationform) }
    values={observationformValues}
         label="update location"/>
    <div className="text-white mt-5 flex justify-center">{!validation && (<h1 data-testid="sorryMsg" className="text-white">Couldnt Update</h1>)}</div></div> 
        )
}else{
  return <div className="flex items-center justify-center"><FadeInDiv><div className="container mx-auto my-8 p-8 bg-white shadow-md">
  <h1 className="text-2xl font-bold mb-4">Unauthorized!</h1>
  <p>This page cannot be accessed without logging in as an admin!.</p>
</div></FadeInDiv></div>
}
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    await dbConnect();
    const observationform = await Observation.findById(params!.id).lean();
    return {props: {ObservationFormDetails: {...observationform, _id: observationform!._id.toString()}}}
  };