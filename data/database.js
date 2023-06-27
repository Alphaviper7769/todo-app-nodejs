import mongoose from "mongoose";

const connectDB=() => {

     let connectToDB=""
    if(process.env.NODE_ENV === "Development ")
        connectToDB = process.env.MONGO_DEV
    else
        connectToDB = process.env.MONGO_URI
   
    mongoose.connect(connectToDB,{
    dbName:"backend_ToDo",
})
.then((c)=>{console.log(`DataBase Connected with ${c.connection.host}`)})
.catch((e)=>console.log(e))
}

export default connectDB;