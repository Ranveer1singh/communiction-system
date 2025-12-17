import mongoose, { mongo } from "mongoose";
import { MongoDb_Uri } from "../constants";
export default async()=>{
    mongoose.connect(MongoDb_Uri).then(res => {
        console.log("delivery service is connected to DB")
    }).catch(error=>{
        console.log(error)
    })
}