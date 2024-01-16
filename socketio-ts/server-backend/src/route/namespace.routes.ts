import { Router } from "express";
import isAuthenticated from '../middleware/isauthenticated.middlware';
import { create, getAllPaginated } from '../controller/app/namespace.controller';
// import { CreateNamespaceValidation } from '../validation/namespace/createnamespace.validation';

const router = Router();

router.get('/', isAuthenticated, getAllPaginated)
// router.get('/:id', isAuthenticated, getSingle)
router.post('/', isAuthenticated,  create)
// router.put('/:id', isAuthenticated, UpdateAppValidation, update);

export default router;
