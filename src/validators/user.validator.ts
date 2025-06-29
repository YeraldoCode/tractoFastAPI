import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  rfc: z.string().min(1, 'RFC is required'),
  contactname: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  phone: z.number().min(1, 'Phone number is required'),
  addres: z.string().min(1, 'Address is required')
});