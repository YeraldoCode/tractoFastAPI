import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rfc: { type: String, required: true, unique: true },
  contactname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true } 
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
