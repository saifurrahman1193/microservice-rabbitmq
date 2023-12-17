import { Router } from 'express';

import { getAllUsers, deleteUser, updateUser, updateProfile } from '../controller/authentication/user.controller';
import isAuthenticated from '../middleware/isauthenticated.middlware';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.delete('/:id', isAuthenticated, deleteUser);
router.put('/:id', isAuthenticated, updateUser);
router.put('/update-profile', isAuthenticated, updateProfile);

export default router;