import {connect, model, Schema} from "mongoose";
import {config} from "dotenv";
import type User, userModel from "../models/User.js";

config({
    path: "../../.env"
});


// Connect to MongoDB Server
const connectDB: () => Promise<void> = async () => { 
    try{
        const MONGO_URI: string | undefined= process.env.MONGO_URI
        // Put a check here to ensure that the MONGO_URI is not undefined type, else we must log it and safely terminate
        await connect(process.env.MONGO_URI as string|| "");

        // Make a new User object to be saved in the Database
        const user = new userModel({
          name: "Bill",
          email: "bill@example.com",
          avatar: "https://imgur.com",
        });

        await user.save();
        console.log(`Saved user: ${user.name}`);
    }
    catch(error: any){
        console.log("Something went wrong. MongoDB couldn't be connected");
        process.exit(1);
    }
};

export default {
    connectDB
}