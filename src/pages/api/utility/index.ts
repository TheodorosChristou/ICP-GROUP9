import { NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import fs from "node:fs/promises";
import path from "node:path";
import Customer from "../../../../models/Customer";

export default async function handler(_, res: NextApiResponse){
    try {
        
        await dbConnect();
        const Customerfound = Customer.find({}).count();


        if(await Customerfound){
            await Customer.deleteMany({});
            console.log("Customer found")
        }

        const data = await fs.readFile(path.join(__dirname, "../../../../customer.json"), "utf8");
        console.log(data)
        const result = await Customer.insertMany(JSON.parse(data));
        res.status(201).json({success: true, result: result})
        
    } catch (e) {
        res.status(400).json({success: false, error:e})
        
    }
}