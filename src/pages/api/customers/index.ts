import Customer from "../../../../models/Customer";

export default async function handler(req,res){
    const {method} = req;

    switch(method){
        case "POST":
            try{
                const customer = await Customer.create(req.body);
                res.status(201).json({success: true, data: customer})
            }catch(error) {
                res.status(400).json({success: true, data: error})

            }
            break;

            default:
                res.status(400).json({ success: false});
    }
}