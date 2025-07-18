import { Router } from 'express';
import { cotizarEnvio } from '../controllers/cotizador.controller';

const router = Router();

router.post('/cotizar', cotizarEnvio);

export default router;