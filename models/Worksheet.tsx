import {model, Model, models, Schema} from "mongoose";

export interface WorksheetInterface{
    _id?: string;
    user: string;
    customer: string;
    date: string;
    time: string;
    comment: string;
    done: boolean;


}

const worksheetSchema = new Schema<WorksheetInterface, Model<WorksheetInterface>>({
    user: {type: String},
    customer: {type: String},
    date: {type: String},
    time: {type: String},
    comment: {type: String},
    done: {type: Boolean}
})

export default (models.Worksheet as Model<WorksheetInterface>) || model<WorksheetInterface>("Worksheet", worksheetSchema);