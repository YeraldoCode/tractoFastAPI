import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Transportista } from '../models/transportista.model'; 
import { Cedis } from '../models/cedis.model';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function register(req: Request, res: Response) {
  const { name, rfc, contactname, email, phone, address, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409).json({ message: 'El correo ya está registrado' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, rfc, contactname, email, phone, address, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'Usuario registrado correctamente' });
}


// Función para registrar un transportista
export async function registerTransportista(req: Request, res: Response) { 
  const { name, lastname, birthdate, email, phone, password, tipotransportista, amountunits, experience } = req.body;
  
  const transportistaExists = await Transportista.findOne({ email});
  if (transportistaExists) {
    res.status(409).json({ message: 'El correo ya está registrado' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const transportista = new Transportista({
    name,
    lastname,
    birthdate,
    email,
    phone,
    password: hashedPassword,
    tipotransportista,
    amountunits,
    experience
  });
  await transportista.save();
  res.status(201).json({ message: 'Transportista registrado correctamente' });
}



//Funcion para registrar cedis
export async function registerCedis(req: Request, res: Response) {
  const { name, rfc, contactname, email, phone, address, password } = req.body;
  const cedisExists = await Cedis.findOne({ email});
  if (cedisExists) {
    res.status(409).json({ message: 'El correo ya está registrado' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const cedis = new Cedis({ name, rfc, contactname, email, phone, address, password: hashedPassword });
  await cedis.save();
  res.status(201).json({ message: 'CEDIS registrado correctamente' });
}
  


export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  // Buscar primero en User, si no existe busca en Transportista
  let account = await User.findOne({ email });
  let accountType: 'user' | 'transportista' | "cedis" = 'user';

  if (!account) {
    account = await Transportista.findOne({ email });
    accountType = 'transportista';
  }

  if (!account) {
    account = await Cedis.findOne({ email });
    accountType = 'cedis';
  }

  if (!account) {
    res.status(401).json({ message: 'Credenciales inválidas' });
    return;
  }
  
  // Verificar la contraseña
  const isValid = await bcrypt.compare(password, account.password);
  if (!isValid) {
    res.status(401).json({ message: 'Credenciales inválidas' });
    return;
  }

  const token = jwt.sign(
    { userId: account._id, email: account.email, type: accountType },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
}
