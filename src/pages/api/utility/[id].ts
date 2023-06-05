import dbConnect from "../../../../lib/dbConnect";
import Worksheet from "../../../../models/Worksheet";
export default async function handler(req, res){
    const {query: {id}, method} = req;

    await dbConnect();

    switch(method) {
        case "PUT":
        try{
            const worksheet = await Worksheet.findById(id. req.body);
            if(!worksheet){
                return res.status(400).json({success:false})
            }else{
                return res.status(201).json({success: true, data: worksheet})
            }
        }catch {Error}{
            return res.status(400).json({success: false})
        }
        break;
        case"DELETE":
        try{
            const worksheet = await Worksheet.findByIdAndDelete(id);
            if(!worksheet){
                return res.status(400).json({success:false})
            }else{
                return res.status(201).json({success: true, data: worksheet})
            }
        }catch {Error}{
            return res.status(400).json({success: false})
        }
        break;
    }
}