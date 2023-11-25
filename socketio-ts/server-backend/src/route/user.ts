import {Router} from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/user';
import isOwner from '../middlewares';

export default (router: Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};