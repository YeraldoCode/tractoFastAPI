import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateUser } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validators/auth.validator';

const router = Router();

router.post('/register', validateUser(registerSchema), register);
router.post('/login', validateUser(loginSchema), login);

export default router;
