import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path:" ../config/.env"
})

const databaseConnection =()=>
{
    mongoose.connect(process.env.MONGO_URI).then (()=>{
        console.log("Connection Tp MongoDB");
    }).catch((error)=>{
        console.log("Mongodb connection failed",error.message);
        process.exit(1);
    })
};
export default databaseConnection;