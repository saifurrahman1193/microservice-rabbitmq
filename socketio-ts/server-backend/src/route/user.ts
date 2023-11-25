import { Router } from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controller/UserController';
import isAuthenticated from '../middleware/IsAuthenticatedMiddlware';
import isOwner from '../middleware/IsOwnerMiddleware';

export default (path: string, router: Router) => {
    router.get(path+'/', isAuthenticated, getAllUsers);
    router.delete(path+'/:id', isAuthenticated, isOwner, deleteUser);
    router.put(path+'/:id', isAuthenticated, isOwner, updateUser);
};