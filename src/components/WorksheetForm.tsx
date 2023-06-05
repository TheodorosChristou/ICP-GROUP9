import {useMutation} from "react-query"
import axios from "axios"
import {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import { DevTool } from "@hookform/devtools"
import Customer from '../../models/Customer';
import { GetServerSideProps } from "next";
import dbConnect from "../../lib/dbConnect";
import CustomerBox from "./CustomerBox";
import Validation from "./Validation";
import { ErrorMessage } from '@hookform/error-message';


export interface WorksheetFormProps {
  onSubmit: SubmitHandler<FormValues>;
  isLoading?: boolean;
  triggerReset?: boolean;
  values?: FormValues;
  label?: string;
}

export interface FormValues {
    _id?: string;
    customer: string;
    user: string;
    date: Date;
    time: string;
    comment: string;
    customerName:string;
    done: boolean;
  }

export interface CustomerFormValues{
    customerName: string;
}
  

export default function WorksheetForm(props){

    const list = props.customerlist

    const sortlist = [0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",]

    var sortedlist: any = []

    sortlist.forEach(function(start){
        list.forEach(function(name){
            if(name.startsWith(start)){
                sortedlist.push(name)
            }
        })
    })
    




    var addition = props.addition

    var edit = props.edit

    const {onSubmit, isLoading, triggerReset, values, label} = props;
    const {register, control,  handleSubmit, formState:{errors, dirtyFields, touchedFields, isDirty}, reset} = useForm<FormValues>({
        defaultValues: {...values},
      });

      useEffect(() => {
        triggerReset && reset();
      }, [triggerReset, reset]);

    const isTouched = false

    var valid = true
    if(dirtyFields.customerName){
        valid = false
        Validation(valid)
    }

      
      
    return(
    <div  className="flex justify-center">
    <div className="flex flex-col space-y-3 bg-blue p-7 rounded-lg">
        {edit &&(<h3 className="text-lg text-center mb-2 font-bold underline underline-offset-4"> Update Worksheet</h3>)}
        {!edit &&(<h3 className="text-lg text-center mb-2 font-bold underline underline-offset-4"> New Worksheet</h3>)}
        <div>
        </div>
        <form
        onSubmit={handleSubmit((data)=>{
            onSubmit({...data})
        })}>
            {addition &&(<div className="mb-2">
                <input {...register("customerName")} className="mr-5 rounded-md" type="string" placeholder="  add new customer"/>
                <button className="bg-black text-white bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Add new</button>
            </div>)}

            <div className="mb-2">
            <label className="font-semibold mr-5"> Customer</label>
            <select  className="mr-5"{...register("customer", Validation(valid)) }>
                <option value="" disabled selected>Select Customer</option>
                {sortedlist.map((r, i) => (
                    <option value={sortedlist[i]} key={i+1}>{sortedlist[i]}</option>
            ))}
            </select>
            <p>{errors.customer?.message}</p>
            </div>
            <div className="mb-2">
            <label className="font-semibold mr-5"> Date</label>
            <input
            className="border-2 rounded-md p-2 mr-5"
            {...register("date", Validation(valid))}
            type="date"
            placeholder="YYYY/MM/DD"
            />
            <p>{errors.date?.message}</p>


            
            
            </div>
            <div className="mb-2">
            <label className="font-semibold mr-5"> Time </label>
            <input
            {...register("time", Validation(valid))}
            className="border-2 rounded-md p-2 mr-5"
            type="time"
            placeholder="00:00-24:00"
            />
            </div>
            <p>{errors.time?.message}</p>
            <div>
            <label className="font-semibold"> Comment </label>
            <input
            {...register("comment", Validation(valid))}
            className="border-2 rounded-md p-2"
            type="string"
            placeholder="Comment"
            />
            <p>{errors.comment?.message}</p>
            </div>
            <div className=" flex justify-center">
                <div className="flex justify-center mt-5 bg-black text-white rounded-full max-w-[50%]">
                <button className="bg-black text-white bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Submit</button>
                </div>
            </div>
        </form>
        </div>
</div>
    );
}





