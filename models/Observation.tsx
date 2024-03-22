import {model, Model, models, Schema} from "mongoose";

export interface ObservationInterface{
    _id?: string;
    Observation: string;
    Lat: number;
    Lon: number;
    Response: string[];
    ResponseDescription: string;
    Open: Boolean;
    Date: string;
    Time: string;
    WeatherTemperature: number;
    WeatherDescription: string;
    WindSpeed: number;
    WindDirection: number;
    AtmosphericPressure: number;
    Humidity: number;
    Visibility: number;

}

const ObservationSchema = new Schema<ObservationInterface, Model<ObservationInterface>>({
    Observation: {type: String},
    Lat: {type: Number},
    Lon: {type: Number},
    Response: {type:  [String]},
    ResponseDescription: {type: String},
    Open: {type: Boolean},
    Date: {type: String},
    Time: {type: String},
    WeatherTemperature: {type: Number},
    WeatherDescription: {type: String},
    WindSpeed: {type: Number},
    WindDirection: {type: Number},
    AtmosphericPressure: {type: Number},
    Humidity: {type: Number},
    Visibility: {type: Number},



})

export default (models.Observation as Model<ObservationInterface>) || model<ObservationInterface>("Observation", ObservationSchema);