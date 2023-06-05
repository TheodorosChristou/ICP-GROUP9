import {useForm} from 'react-hook-form'
import WorksheetForm, {CustomerFormValues, FormValues} from "../../../components/WorksheetForm"
import { GetServerSideProps } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Worksheet from "../../../../models/Worksheet";
import {useState} from "react";
import axios from "axios";
import {useMutation} from "react-query";
import Customer from '../../../../models/Customer';

export default function Edit(worksheet){

    const worksheetValues: FormValues = {customer: worksheet.worksheet.customer, user: worksheet.worksheet.user, date: worksheet.worksheet.date, time: worksheet.worksheet.time, comment: worksheet.worksheet.comment, customerName: worksheet.worksheet.customerName, done: worksheet.worksheet.done}
    
    const customer = worksheet.customer
    const list : any[] = []

    customer.map((_r,i)=>{
        list.push(customer[i].customerName)
    })


    const worksheetValue = worksheet.worksheet


    const redirect = (url, asLink = true) =>
    asLink ? (window.location.href = url) : window.location.replace(url);

     const {isLoading, isSuccess, isError, mutate} = useMutation( async(updatedWorksheet: FormValues) => {
           console.log("updating worksheet");
           await axios.put(`/api/worksheets/${worksheetValue._id}`, updatedWorksheet);
           redirect("/")
         }
       );

       return (

        <div className="mt-10">
            <WorksheetForm 
            customerlist = {list}
            addition = {false}
            edit = {true}
            isLoading={isLoading}
        triggerReset={isSuccess}
        onSubmit={(worksheetValue) => mutate(worksheetValue)}
        values = {worksheetValues}
        label="update worksheet"/>

        <div className="bg-black " key={1}>
        <div className=""key={2}>
        <h1 className="font-semibold text-xl pt-5 pb-5 flex justify-center"key={3}>Today's Work</h1>
            <div className="flex justify-center"key={4}>
                    <div className="p-10 bg-gray-300 rounded-full flex max-w-[80%]"key={5}>
                        <table key={6}>
                            <thead key={7}>
                                <tr key={8}>
                                    <th key={9} className="pr-10"></th>
                                    <th key={10} className="pr-10"></th>
                                    <th key={11} className="pr-10"></th>
                                    <th key={12} className="pr-10"></th>
                                    <th key={13} className="pr-10"></th>
                                    <th key={14} className="pr-10"></th>
                                </tr>
                            </thead>
                            <tbody key={15}>
                                <tr className="font-semibold" key={16}>
                                    <td key={17} className="pr-10">Customer: {worksheet.worksheet.customer}</td>
                                    <td key={18} className="pr-10">Date: {worksheet.worksheet.date}</td>
                                    <td key={19} className="pr-10">Time: {worksheet.worksheet.time}</td>
                                    <td key={24} className="pr-10">Comment: {worksheet.worksheet.comment}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </div>
   </div>
       )
}



export const getServerSideProps: GetServerSideProps = async ({params}) => {
    await dbConnect();
    const worksheet = await Worksheet.findById(params!.id).lean();
    const results = await Customer.find({}).lean();
    const customers = results.map(doc => ({...doc, ...{_id:doc._id.toString()}}))
    return {props: {worksheet: {...worksheet, _id: worksheet!._id.toString()}, customer:customers}};
  };