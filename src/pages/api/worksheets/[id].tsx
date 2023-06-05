import Worksheet from "../../../../models/Worksheet";
import dbConnect from "../../../../lib/dbConnect";


export default async function handler(req, res){
    const {query: {id}, method} = req;

    await dbConnect();

    switch(method) {
        case "PUT":
        try{           
            const workheet = await Worksheet.findByIdAndUpdate(id, req.body);

            if(!workheet){
                return res.status(400).json({success:false})
            }else{
                return res.status(200).json({success: true, data: workheet})
            }
        }catch {Error}{
            return res.status(400).json({success: false})
        }
        break;
        case"DELETE":
        try{
            const workheet = await Worksheet.findByIdAndDelete(id);
            if(!workheet){
                return res.status(400).json({success:false})
            }else{
                return res.status(201).json({success: true, data: workheet})
            }
        }catch {Error}{
            return res.status(400).json({success: false})
        }
        break;
    }
}