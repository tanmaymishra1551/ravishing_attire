
import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"
// const DB_NAME = "nodejs_starter_template";

const connectDB = async ()=>{
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`MongoDB connected`);
    }
    catch(error){
        console.log("ERROR: ", error);
        throw err
    }
}

export default connectDB;