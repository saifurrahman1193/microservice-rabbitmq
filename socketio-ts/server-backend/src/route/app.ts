import { Router } from "express";
import isAuthenticated from '../middleware/IsAuthenticatedMiddlware';
import { create } from '../controller/app/AppController';
import { CreateAppValidation } from '../validation/app/CreateAppValidation';

const router = Router();

// router.get('/', isAuthenticated, getAll)
// router.get('/:id', isAuthenticated, getSingle)
router.post('/', isAuthenticated, CreateAppValidation, create)
// router.put('/:id', isAuthenticated, UpdateAppValidation, update);

export default router;
