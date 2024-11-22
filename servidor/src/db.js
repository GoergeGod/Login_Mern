import mongoose from "mongoose";

export const connectDB = async () =>{
  try {
    await mongoose.connect("mongodb+srv://root:1234@projectsiahco.kknzszr.mongodb.net/Auth",{
      useNewUrlParser: true,
      useUnifiedTopology:true
    })

    console.log("DB conectado")
    
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
