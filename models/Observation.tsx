import {model, Model, models, Schema} from "mongoose";

export interface ObservationInterface{
    _id?: string;
    Observation: string;
    Lat: number;
    Lon: number;
    Weather: string;
    Response: string;
    Date: string;
    Time: string;

}

const ObservationSchema = new Schema<ObservationInterface, Model<ObservationInterface>>({
    Observation: {type: String},
    Lat: {type: Number},
    Lon: {type: Number},
    Weather: {type: String},
    Response: {type: String},
    Date: {type: String},
    Time: {type: String},


})

export default (models.Observation as Model<ObservationInterface>) || model<ObservationInterface>("Observation", ObservationSchema);