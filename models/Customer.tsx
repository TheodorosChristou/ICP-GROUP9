import {model, Model, models, Schema} from "mongoose";

export interface CustomerInterface{
    _id?: string;
    customerName: string;
}

const customerSchema = new Schema<CustomerInterface, Model<CustomerInterface>>({
    customerName: {type: String}
})

export default (models.Customer as Model<CustomerInterface>) || model<CustomerInterface>("Customer", customerSchema);