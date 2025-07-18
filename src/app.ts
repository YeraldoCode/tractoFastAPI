import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import cotizadorRouter from './routes/cotizador.routes';

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

app.use('/auth', authRouter);

app.use('/cotizador', cotizadorRouter);

app.get('/', (req, res) => {
  res.send('API running...');
});
