import mongoose from "mongoose"


const ConnectDB = async() => {
  try{
    const mongoURL = process.env.MONGO_DB_URL ?? ""
    const connection = await mongoose.connect(mongoURL)
    console.log(`MongoDB connected to ${connection.connection.host}`)
  }
  catch(err){
    
    console.log(`Failed to connect to MongoDB`)
  }
}

export default ConnectDB