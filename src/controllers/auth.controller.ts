import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'Credenciales inválidas' });
    return;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.status(401).json({ message: 'Credenciales inválidas' });
    return;
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
}
