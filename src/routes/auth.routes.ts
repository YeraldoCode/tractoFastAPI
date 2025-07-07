import { Router } from 'express';
import { register, login, registerTransportista, registerCedis } from '../controllers/auth.controller';
import { validateUser } from '../middlewares/validate';
import { registerSchema, loginSchema, registerTransportistaSchema, registerCedisSchema } from '../validators/auth.validator';

const router = Router();


router.post('/transportista/register', validateUser(registerTransportistaSchema), registerTransportista);
router.post('/cedis/register', validateUser(registerCedisSchema), registerCedis);
router.post('/register', validateUser(registerSchema), register);
router.post('/login', validateUser(loginSchema), login);

export default router;
