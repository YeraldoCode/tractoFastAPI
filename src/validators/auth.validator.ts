import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    rfc: z.string().min(1, 'El RFC es requerido'),
    contactname: z.string().min(1, 'El nombre de contacto es requerido'),
    phone: z.number().min(1, 'El número de teléfono es requerido'),
    email: z.string().email('Correo inválido'),
    address: z.string().min(1, 'La dirección es requerida'),
    password: z.string().min(6, 'Mínimo 6 caracteres')
});

export const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(1, 'La contraseña es requerida')
});

