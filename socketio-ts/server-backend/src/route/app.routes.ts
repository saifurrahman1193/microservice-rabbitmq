import { Router } from "express";
import isAuthenticated from '../middleware/isauthenticated.middlware';
import { create, update, getAllPaginated, getSingle } from '../controller/app/app.controller';
import { CreateAppValidation } from '../validation/app/createapp.validation';
import { UpdateAppValidation } from '../validation/app/updateapp.validation';

const router = Router();

router.get('/', isAuthenticated, getAllPaginated)
router.get('/:id', isAuthenticated, getSingle)
router.post('/', isAuthenticated, CreateAppValidation, create)
router.put('/:id', isAuthenticated, UpdateAppValidation, update);

export default router;
