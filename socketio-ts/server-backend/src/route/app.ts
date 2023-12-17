import { Router } from "express";
import isAuthenticated from '../middleware/isauthenticated.middlware';
import { create } from '../controller/app/app.controller';
import { CreateAppValidation } from '../validation/app/createapp.validation';

const router = Router();

// router.get('/', isAuthenticated, getAll)
// router.get('/:id', isAuthenticated, getSingle)
router.post('/', isAuthenticated, CreateAppValidation, create)
// router.put('/:id', isAuthenticated, UpdateAppValidation, update);

export default router;
