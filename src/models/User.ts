import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "doctor" | "staff";
  companyId: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "doctor", "staff"], default: "staff" },
    companyId: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
