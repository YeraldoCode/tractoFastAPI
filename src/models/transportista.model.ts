import mongoose from "mongoose";

const transportistaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  tipotransportista: { type: String, required: true }, 
  amountunits: { type: Number, required: true },
  experience: { type: Number, required: true },
}, { timestamps: true });
export const Transportista = mongoose.model('Transportista', transportistaSchema);
    