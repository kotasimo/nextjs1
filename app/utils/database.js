import mongoose from "mongoose"

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://kotasimo:1804Naporeon@cluster0.4bl2ffn.mongodb.net/nextAppDataBase?appName=Cluster0")
        console.log("success: Connected to MongoDB")
    }catch{
        console.log("Failure: Unconnected to MongoDB")
        throw new Error()
    }
}

export default connectDB