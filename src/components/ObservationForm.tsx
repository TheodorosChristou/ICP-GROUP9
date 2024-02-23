import {useEffect} from "react";
import {Control, SubmitHandler, useForm, useWatch } from "react-hook-form";
import FieldValidation from "./FieldValidation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";

export interface ObservationFormProps {
  onSubmit: SubmitHandler<ObservationValues>;
  isLoading?: boolean;
  triggerReset?: boolean;
  values?: ObservationValues;
  label?: string;
}

export interface ObservationValues {
    _id?: string;
    Observation: string;
    Lat: number;
    Lon: number;
    Weather: string;
    Open: boolean;
    Response: string;
    Response2: string;
  }

  function FirstResponseWatched({ control }: { control: Control<ObservationValues> }) {
    const firstResponse = useWatch({
      control,
      name: "Response",
      defaultValue: "", // default value before the render
    })

    var valid_field = false

    console.log(firstResponse)

    if (firstResponse != ""){
      valid_field = true
    }

    return valid_field
  }



export default function ObservationForm(props){

    var valid = true

    const{data: session} = useSession();

    let user, role;

    if (session?.user?.name?.toString()) {
        user = session.user.name;
        role = session.user.role;
      }

    const ResponseList = ['','Staff', 'Vessels', 'Emergency Services', 'Public Vessels'];


 
  
    const {onSubmit, isLoading, triggerReset, values, label, watch} = props;
    const {register, control ,  handleSubmit, formState:{errors, dirtyFields, touchedFields, isDirty}, reset} = useForm<ObservationValues>({
        defaultValues: {...values},
      });

      useEffect(() => {
        if (triggerReset) {
          reset();
        }
      }, [triggerReset, reset]);


      var Answered1 = props.Answered1

      
      
    return(
    <div  className="flex justify-center">
    <div className="flex flex-col space-y-3 bg-gray-600	 p-7 rounded-lg max-w-[80%] mx-auto">
        <h3 className="text-lg text-center mb-2 font-bold underline underline-offset-4"> {"Upload Incident"}</h3>
        <div>
        </div>
        <form
        onSubmit={handleSubmit((data)=>{
            onSubmit({...data})
        })}>

<div>
            <label className="font-semibold"> {"Latitude"} </label>
            <input
            {...register("Lat", FieldValidation(valid))}
            className="border-2 rounded-md p-2 ml-2 text-black w-full"
            type="float"
            placeholder={"Latitude"}
            />
            <p>{errors.Lat?.message}</p>
            </div>

            <div>
            <label className="font-semibold"> {"Longitute"} </label>
            <input
            {...register("Lon", FieldValidation(valid))}
            className="border-2 rounded-md p-2 ml-2 text-black w-full"
            type="float"
            placeholder={"Longitute"}
            />
            <p>{errors.Lon?.message}</p>
            </div>

            <div>
            <label className="font-semibold"> {"Observation"} </label>
            <input
            {...register("Observation", FieldValidation(valid))}
            className="border-2 rounded-md p-2 ml-2 text-black w-full"
            type="string"
            placeholder= {"Observation"}
            />
            <p>{errors.Observation?.message}</p>
            </div>

            <div>
            <label className="font-semibold"> {"Weather"} </label>
            <input
            {...register("Weather", FieldValidation(valid))}
            className="border-2 rounded-md p-2 ml-2 text-black w-full"
            type="string"
            maxLength={50}
            placeholder={"Weather"}
            />
            <p>{errors.Weather?.message}</p>
            </div>

            { role == "admin" &&(
            <div>
            <label className="font-semibold">Response:</label>
            <select
              className="border-2 rounded-md p-2 ml-2 text-black w-full"
              {...register('Response')}>
              <option value="" disabled selected>Select Response</option>
              {ResponseList.map((r,i) => (
                <option className= "text-black"key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <p>{errors.Response?.message}</p>
            </div>)}

            {(role == "admin" && (FirstResponseWatched({control}) || Answered1)) && (
            <div>
            <label className="font-semibold">Response 2:</label>
            <select
              className="border-2 rounded-md p-2 ml-2 text-black w-full"
              {...register('Response2')}>
              <option value="" disabled selected>Select Response</option>
              {ResponseList.map((r,i) => (
                <option className= "text-black"key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <p>{errors.Response2?.message}</p>
            </div>)}

            <div className=" flex justify-center">
                <div className="flex justify-center mt-5 bg-black text-white rounded-full w-full">
                <button data-testid="submitButton"className="bg-black text-white bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">{"Submit"}</button>
                </div>
            </div>
        </form>

        </div>
</div>
    );
}
