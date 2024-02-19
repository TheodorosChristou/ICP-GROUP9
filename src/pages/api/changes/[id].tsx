import Observation from "../../../../models/Observation";
import dbConnect from "../../../../lib/dbConnect";


export default async function handler(req,res){

    const {query: {id}, method} = req;

    await dbConnect();
    

    switch(method){

        case "PUT":
            try{           
                const observationform = await Observation.findByIdAndUpdate(id, req.body);
    
                if(!observationform){
                    return res.status(400).json({success:false})
                }else{
                    return res.status(200).json({success: true, data: observationform})
                }
            }catch {Error}{
                return res.status(400).json({success: false})
            }

        case"DELETE":
        try{
            const observationform = await Observation.findByIdAndDelete(id);
            if(!observationform){
                return res.status(400).json({success:false})
            }else{
                return res.status(201).json({success: true, data: observationform})
            }
        }catch {Error}{
            return res.status(400).json({success: false})
        }
    }
}