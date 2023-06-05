import Worksheet from "../../../../models/Worksheet";
import dbConnect from "../../../../lib/dbConnect";


export default async function handler(req,res){
    const {method} = req;

    await dbConnect();
    

    switch(method){
        case "POST":
            try{
                const worksheet = await Worksheet.create(req.body);
                res.status(201).json({success: true, data: worksheet})
            }catch(error) {
                res.status(400).json({success: true, data: error})

            }
            break;

            default:
                res.status(400).json({ success: false});
    }
}