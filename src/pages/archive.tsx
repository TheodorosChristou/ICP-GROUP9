import {useForm} from 'react-hook-form'
import WorksheetForm, {FormValues} from "../components/WorksheetForm"
import { GetServerSideProps } from "next";
import dbConnect from "../../lib/dbConnect";
import Worksheet from "../../models/Worksheet";
import {useState} from "react";
import Filter from "../components/Filter"

import axios from "axios";
import {useMutation} from "react-query";
import Customer from '../../models/Customer';

export default function Archive(worksheet){

    const [worksheetState, setWorksheetState] = useState(worksheet.worksheet);


    const availableCustomer = worksheet.customer
    const list : any[] = []

    availableCustomer.map((_r,i)=>{
        var target = availableCustomer[i].customerName
        worksheetState.map((r,i) =>{
            if(worksheetState[i].customer == target){
                list.push(target)
            }
        })
    })

    const [user, setUser] = useState([]);
    const [date, setDate] = useState([]);
    const [customer, setCustomer] = useState([]);







    const handleuserChange = (u) => setUser(u);
    const handledateChange = (t:any) => {
        var DateInput: any = []
        var target: any = t
        DateInput.push(target)
        setDate(DateInput)
    };
    const handlecustomerChange = (c) => {
        var CustomerInput: any = []
        var target: any = c
        CustomerInput.push(target)
        setCustomer(CustomerInput);
    }

    const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

  if(date[0] == "1"){
    setDate([])
  }

  if(customer[0] == "1"){
    setCustomer([])
  }

    



    const handleDelete = async (id) => {

        await axios.delete(`/api/worksheets/${id}`);
        setWorksheetState(worksheetState.filter((r,_i) => r._id !== id))

    }

    const handleDone = async (r) => {

        const id = r._id

        const Update: FormValues = {customer: r.customer, user:r.user, date: r.date, time: r.time, comment: r.comment, customerName: "", done: true}
        await axios.put(`/api/worksheets/${id}`, Update);
        redirect("/archive")

    }

    const handleUndo = async (r) => {

        const id = r._id

        const Update: FormValues = {customer: r.customer, user:r.user, date: r.date, time: r.time, comment: r.comment, customerName: "", done: false}
        await axios.put(`/api/worksheets/${id}`, Update);
        redirect("/archive")

    }

    return(
        <div className="mt-5 mb-10">
            <Filter
            onCustomerChange={handlecustomerChange}
            onDateChange={handledateChange}
            onUserChange={handleuserChange}
            list = {list}/>
            {worksheetState
            .filter((r) => {
            if(!user.length){
                return true;
            }else{
                return user.find((u => u === r.user))}
            })
            .filter((r) => {
            if(!customer.length){
                return true;
            } else{
                return customer.find((c => c === r.customer))}
            })
            .filter((r) => {
            if(!date.length){
                return true;
            }else{
                    return date.find((t => t === r.date))}
                })
            .map((r,i) =>(
            <div className="bg-black" key={i+1}>
            <div className=""key={i+2}>
                <h1 className="font-semibold text-xl pt-5 pb-5 flex justify-center"key={i+3}>Today's Work</h1>
                <div className="flex justify-center"key={i+4}>
                        <div className="p-10 bg-gray-300 rounded-full flex max-w-[80%]"key={i+5}>
                            <table key={i+6}>
                                <thead key={i+7}>
                                    <tr key={i+8}>
                                        <th key={i+9} className="pr-10"></th>
                                        <th key={i+10} className="pr-10"></th>
                                        <th key={i+11} className="pr-10"></th>
                                        <th key={i+12} className="pr-10"></th>
                                        <th key={i+13} className="pr-10"></th>
                                        <th key={i+14} className="pr-10"></th>
                                    </tr>
                                </thead>
                                <tbody key={i+15}>
                                    <tr className="font-semibold" key={i+16}>
                                        <td key={i+17} className="pr-10">Customer: {r.customer}</td>
                                        <td key={i+18} className="pr-10">Date: {r.date}</td>
                                        <td key={i+19} className="pr-10">Time: {r.time}</td>
                                        <td key={i+24} className="pr-10">By User: {r.user}</td>
                                        <td key={i+20}className="pr-10"><button onClick={() => redirect(`/worksheets/${r._id}/edit/`)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Update</button></td>
                                        {r.done &&(<td key={i+21} className="pr-10"><button onClick={() => handleUndo(r)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Undo</button></td>)}
                                        {!r.done &&(<td key={i+21} className="pr-10"><button onClick={() => handleDone(r)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Done</button></td>)}
                                        <td key={i+23} className="pr-10"><button onClick={() => handleDelete(r._id)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Delete</button></td>
                                        <td key={i+22} className="pr-10">Comment: {r.comment}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
            ))}
    </div>
    );
}


export const getServerSideProps : GetServerSideProps = async () => {
    
    await dbConnect();
    const results = await Worksheet.find({}).lean();
    const worksheets = results.map(doc => ({...doc, ...{_id:doc._id.toString()}}))
    const results2 = await Customer.find({}).lean();
    const customers = results2.map(doc => ({...doc, ...{_id:doc._id.toString()}}))
    return {props: {worksheet: worksheets, customer:customers}}
};