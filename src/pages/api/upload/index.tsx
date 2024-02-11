import Observation from "../../../../models/Observation";
import dbConnect from "../../../../lib/dbConnect";

export default async function handler(req,res){
    const {method} = req;

        await dbConnect();

        switch(method){
            case "POST":
                try{
                        const map = await Observation.create(req.body);
                        return res.status(201).json({success: true, data: map})
                }catch(error) {
    
                    return res.status(400).json({success: false, data: error})
                }
                break;
    
                default:
                    return res.status(400).json({ success: false});
            }

};