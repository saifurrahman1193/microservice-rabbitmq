import { Router } from "express";
import isAuthenticated from '../middleware/isauthenticated.middlware';
import { create, getAllPaginated, getSingle } from '../controller/app/app.controller';
import { CreateAppValidation } from '../validation/app/createapp.validation';

const router = Router();

router.get('/', isAuthenticated, getAllPaginated)
router.get('/:id', isAuthenticated, getSingle)
// router.post('/', isAuthenticated, CreateAppValidation, create)
router.post('/', isAuthenticated, CreateAppValidation)
// router.put('/:id', isAuthenticated, UpdateAppValidation, update);

export default router;
