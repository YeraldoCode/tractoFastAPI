import { z } from 'zod';


// Esquema para validar el registro de un usuario(empresa)
export const registerSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    rfc: z.string().min(1, 'El RFC es requerido'),
    contactname: z.string().min(1, 'El nombre de contacto es requerido'),
    phone: z.number().min(1, 'El número de teléfono es requerido'),
    email: z.string().email('Correo inválido'),
    address: z.string().min(1, 'La dirección es requerida'),
    password: z.string().min(6, 'Mínimo 6 caracteres')
});

// Esquema para validar el registro de un transportista
export const registerTransportistaSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    lastname: z.string().min(1, 'El apellido es requerido'),
    birthdate: z.string().min(1, 'La fecha de nacimiento es requerida'),
    email: z.string().email('Correo inválido'),
    phone: z.number().min(1, 'El número de teléfono es requerido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    tipotransportista: z.string().min(1, 'El tipo de transportista es requerido'),
    amountunits: z.number().min(1, 'La cantidad de unidades es requerida'),
    experience: z.number().min(0, 'La experiencia debe ser un número positivo')
});

//Esquema para validar el registro de un CEDIS
export const registerCedisSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    rfc: z.string().min(1, 'El RFC es requerido'),
    contactname: z.string().min(1, 'El nombre de contacto es requerido'),
    email: z.string().email('Correo inválido'),
    phone: z.number().min(1, 'El número de teléfono es requerido'),
    address: z.string().min(1, 'La dirección es requerida'),
    password: z.string().min(6, 'Mínimo 6 caracteres')
});

export const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(1, 'La contraseña es requerida')
});

