import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Erro ao conectar no Mongo:", error);
  }
}

connectDB();
