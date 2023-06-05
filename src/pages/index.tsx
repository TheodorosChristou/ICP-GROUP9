import {useForm} from 'react-hook-form'
import WorksheetForm, {FormValues} from "../components/WorksheetForm"
import { GetServerSideProps } from "next";
import dbConnect from "../../lib/dbConnect";
import Worksheet from "../../models/Worksheet";
import {useState} from "react";
import axios from "axios";
import {useMutation} from "react-query";
import Customer from '../../models/Customer';
import {useSession} from "next-auth/react"





export default function Home(worksheet){

    const customer = worksheet.customer
    const list : any[] = []
    const{data: session} = useSession();

    if(session?.user?.name?.toString()){
        var user: string
        user = session.user.name
    }

    customer.map((_r,i)=>{
        list.push(customer[i].customerName)
    })

    function getDate() {
    
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1;
    const day: number = today.getDate();
    
    const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return formattedDate
    }

    const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);
    

    const [worksheetState, setWorksheetState] = useState(worksheet.worksheet);

        const {isLoading, isSuccess, isError, mutate} = useMutation( async(worksheetform: FormValues) =>{
            if(worksheetform.customerName){
                console.log("creating new customer")
                await axios.post("/api/customers/", worksheetform);
                redirect("/")

            }
            else{
                worksheetform.done = false
                worksheetform.user = user
                console.log("creating new worksheet")
                await axios.post("/api/worksheets/", worksheetform);
                redirect("/");
            }

          });
        
    const filterDate = getDate()

    const handleDelete = async (id) => {

        await axios.delete(`/api/worksheets/${id}`);
        setWorksheetState(worksheetState.filter((r,_i) => r._id !== id))

    }

    const handleDone = async (r) => {

        const id = r._id

        const Update: FormValues = {customer: r.customer, user:r.user, date: r.date, time: r.time, comment: r.comment, customerName: "", done: true}
        await axios.put(`/api/worksheets/${id}`, Update);
        setWorksheetState(worksheetState.filter((r,_i) => r._id !== id))

    }

    if(session){
        return(
            <div className="mt-10 mb-10">
                <WorksheetForm
                customerlist = {list}
                addition = {true}
                edit = {false}
                isLoading={isLoading}
              triggerReset={isSuccess}
              onSubmit={(worksheet) => mutate(worksheet)}/>
                <h1 className="font-semibold text-xl text-white mt-8 underline underline-offset-8 flex justify-center"key={1}>Today's Work</h1>
                {worksheetState
                .filter((r,_i) => r.date === filterDate)
                .filter((r,_i) => !r.done)
                .filter((r,_i) => r.user === user)
                .map((r,i) =>(
                <div className="bg-black " key={i+1}>
                <div className=""key={i+2}>
                    <h1 className="font-semibold text-xl text-white pt-5 pb-5 flex justify-center"key={i+3}></h1>
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
                                            <td key={i+20}className="pr-10"><button onClick={() => redirect(`/worksheets/${r._id}/edit/`)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Update</button></td>
                                            <td key={i+22} className="pr-10"><button onClick={() => handleDone(r)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Done</button></td>
                                            <td key={i+23} className="pr-10"><button onClick={() => handleDelete(r._id)} className="bg-sky-400 bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Delete</button></td>
                                            <td key={i+24} className="pr-10">Comment: {r.comment}</td>
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
    }else{
        return(
            <div className="flex justify-center mt-10">
            <h1 className="text-white">Please Log in using the Header</h1>
        </div>
        )

    }


}


export const getServerSideProps : GetServerSideProps = async () => {
    
    await dbConnect();
    const results = await Worksheet.find({}).lean();
    const worksheets = results.map(doc => ({...doc, ...{_id:doc._id.toString()}}))
    const results2 = await Customer.find({}).lean();
    const customers = results2.map(doc => ({...doc, ...{_id:doc._id.toString()}}))
    return {props: {worksheet: worksheets, customer:customers}}
};