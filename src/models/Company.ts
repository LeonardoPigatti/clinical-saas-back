import { Schema, model, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  adminId: string; // quem é o admin da company
}

const companySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    adminId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Company = model<ICompany>("Company", companySchema);
