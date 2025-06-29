import { RequestHandler, Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
} from '../controllers/user.controller';

import { validateUser } from '../middlewares/validate';
import { userSchema } from '../validators/user.validator';

const router = Router();

router.get('/', getUsers);


router.get('/email/:email', getUserByEmail as RequestHandler); // GET por email
router.get('/:id', getUser as RequestHandler);


router.post('/', validateUser(userSchema), createUser);

router.put('/:id', validateUser(userSchema), updateUser);
router.delete('/:id', deleteUser as RequestHandler);

export default router;
