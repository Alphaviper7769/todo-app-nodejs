import mongoose from "mongoose";

const connectDB=() => {
    mongoose.connect(process.env.MONGO_URI,{
    dbName:"backend_ToDo",
})
.then(()=>{console.log("DataBase Connected")})
.catch((e)=>console.log(e))
}

export default connectDB;