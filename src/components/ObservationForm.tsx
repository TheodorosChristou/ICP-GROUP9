import { useEffect } from "react";
import { Control, SubmitHandler, useForm, useWatch, Controller } from "react-hook-form";
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



export default function ObservationForm(props) {

  var valid = true

  const { data: session } = useSession();

  let user, role;

  if (session?.user?.name?.toString()) {
    user = session.user.name;
    role = session.user.role;
  }

  const ResponseList = ['Staff', 'Vessels', 'Emergency Services', 'Public Vessels'];



  const { onSubmit, isLoading, triggerReset, values, label, watch } = props;
  const { register, control, handleSubmit, formState: { errors, dirtyFields, touchedFields, isDirty }, reset } = useForm<ObservationValues>({
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




  return (
    <div className="flex justify-center">
      <div className="pt-10 w-full sm:w-2/3 md:w-1/2 lg:w-1/3"> {/* Responsive width */}
        <div className="space-y-3 bg-gradient-to-r from-sky-500 via-40% to-emerald-500 to-90% text-black border-2 border-slate-900 p-7 rounded-lg">
          <form
            onSubmit={handleSubmit((data) => {

              var selectedOptions = ResponseList.filter((option) => data.Response?.[option]);
              if (selectedOptions.length == 0) {
                selectedOptions = []
              } else {
                selectedOptions = selectedOptions
              }
              console.log(selectedOptions.length)
              onSubmit({ ...data, Response: selectedOptions });
            })}
          >
             <div className="flex flex-col sm:flex-row justify-between mb-5"> {/* Responsive flex layout */}
              <div className="mb-3 sm:w-1/2 sm:mr-2"> {/* Responsive width and margin */}
                <input
                {...register("Lat", FieldValidation(valid))}
                className="border-2 rounded-md p-3 ml-2 text-black w-full"
                type="float"
                placeholder={"Latitude"}
                data-test="lat-input"
              />
              <p data-test="lat-invalid">{errors.Lat?.message}</p>
            </div>

            <div className="mb-3 sm:w-1/2 sm:ml-2"> {/* Responsive width and margin */}
              <input
                {...register("Lon", FieldValidation(valid))}
                className="border-2 rounded-md p-3 ml-2 text-black w-full"
                type="float"
                placeholder={"Longitute"}
                data-test="lon-input"
              />
              <p data-test="lon-invalid">{errors.Lon?.message}</p>
            </div>
        
            </div>
            <div className="ml">
            <label className="font-semibold ml-2"> {"Observation"} </label>
            <div>
            <textarea data-test="observation-text" className="border-2 rounded-md p-2 ml-2 text-black w-full resize-none" id="Observation"{...register("Observation")} />
          <p>{errors.Observation?.message}</p>
          </div>
          
          {role == 'admin' && (
              <div className="mb-3">
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
              <div className="ml">
            <label className="font-semibold"> {"Response Description"} </label>
            <div>
            <textarea data-test="observation-text" className="border-2 rounded-md p-2 text-black w-full resize-none" id="ResponseDescription"{...register("ResponseDescription")} />
          <p>{errors.ResponseDescription?.message}</p>
          </div>
              </div>
            ))}
          </div>

            <div className="flex justify-center">
              <div className="flex justify-center">
              <button
              data-testid="submitButton"
              data-test="submitButton"
              className="bg-blue text-white text-sm sm:text-base rounded-full py-2 sm:py-3 px-3 sm:px-4 font-semibold"
                  >
                 Submit Incident
                </button>
                </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}