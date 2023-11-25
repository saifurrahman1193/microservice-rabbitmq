import { Router } from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controller/UserController';
import isAuthenticated from '../middleware/IsAuthenticatedMiddlware';
import isOwner from '../middleware/IsOwnerMiddleware';

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};