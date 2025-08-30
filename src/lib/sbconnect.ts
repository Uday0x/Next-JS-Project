//It's important to name this lib for future purposes of shadn cn download etc
import mongoose from "mongoose";


type connectionObject = {
    isConnected?:number   //mongodb returns us number if another dtabse retiurns string we can also handel that as well
}


const connection:connectionObject={}; //creating connection object



async function dbconnect():Promise<void>{
    //this is imp to check weather db is connected or not
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string);
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}