import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/user.model';

// Tipos para Request con parámetro `id`
type IdRequest = Request<{ id: string }>;

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

//GET por ID  
export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}

//GET por email
export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await User.findOne ({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user by email' });
  }
}


export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
};

export const updateUser: RequestHandler<{ id: string}> = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user' });
  }
};

export const deleteUser: RequestHandler<{ id: string}> = async (req: IdRequest, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
    return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting user' });
  }
};
