import {useEffect} from "react";
import {Control, SubmitHandler, useForm, useWatch, Controller  } from "react-hook-form";
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
    Open: boolean;
    Date: String;
    Time: string;
    Response: string[];
    ResponseDescription: string;
    WeatherTemperature: number;
    WeatherDescription: string;
    WindSpeed: number;
    WindDirection: number;
    AtmosphericPressure: number;
    Humidity: number;
    Visibility: number;
    
  }



export default function ObservationForm(props){

    var valid = true

    const{data: session} = useSession();

    let user, role;

    if (session?.user?.name?.toString()) {
        user = session.user.name;
        role = session.user.role;
      }

    role = "admin"

    const ResponseList = ['Staff', 'Vessels', 'Emergency Services', 'Public Vessels'];

 
  
    const {onSubmit, isLoading, triggerReset, values, label, watch} = props;
    const {register, control ,  handleSubmit, formState:{errors, dirtyFields, touchedFields, isDirty}, reset} = useForm<ObservationValues>({
      defaultValues: {
        ...values,
        Response: ResponseList.reduce((acc, option) => {
          acc[option] = values?.Response?.includes(option) || false;
          return acc;
        }, {}),
      },
      });

      useEffect(() => {
        if (triggerReset) {
          reset();
        }
      }, [triggerReset, reset]);


      
      
    return(
    <div  className="flex justify-center">
    <div className="flex flex-col space-y-3 bg-gray-600	 p-7 rounded-lg max-w-[80%] mx-auto">
        <h3 className="text-lg text-center mb-2 font-bold underline underline-offset-4"> {"Upload Incident"}</h3>
        <div>
        </div>
        <form
          onSubmit={handleSubmit((data) => {

            var selectedOptions = ResponseList.filter((option) => data.Response?.[option]);
            if(selectedOptions.length == 0){
              selectedOptions = []
            }else{
              selectedOptions = selectedOptions
            }
            console.log(selectedOptions.length)
            onSubmit({ ...data, Response: selectedOptions });
          })}
        >

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

            {role === 'admin' && (
  <div>
    <label className="font-semibold">Response:</label>
    {ResponseList.map((option) => (
      <div key={option}>
        <Controller
        // @ts-ignore
          name={`Response.${option}`}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <label /* @ts-ignore */>
              <input type="checkbox" {...field} checked={field.value} />
              {option}
            </label>
          )}
        />
      </div>
    ))}
    <p>{errors.Response?.message}</p>
  </div>
)}

          {(role == "admin" && (
              <div>
              <label className="font-semibold"> {"Response Description"} </label>
              <input
              {...register("ResponseDescription")}
              className="border-2 rounded-md p-2 ml-2 text-black w-full"
              type="string"
              placeholder= {"Response Description"}
              />
              <p>{errors.ResponseDescription?.message}</p>
              </div>
          ))}

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