import { Router } from 'express';

import { getAllUsers, deleteUser, updateUser, updateProfile } from '../controller/UserController';
import isAuthenticated from '../middleware/IsAuthenticatedMiddlware';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.delete('/:id', isAuthenticated, deleteUser);
router.put('/:id', isAuthenticated, updateUser);
router.put('/update-profile', isAuthenticated, updateProfile);

export default router;