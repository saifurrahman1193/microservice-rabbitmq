import { Router } from "express";
import { login, me, register } from '../controller/authentication/authentication.controller';
import { LoginValidation } from '../validation/authentication/login.validation';
import { RegisterValidation } from '../validation/authentication/register.validation';
import isauthenticatedMiddlware from "../middleware/isauthenticated.middlware";

const router = Router();

router.post('/login', LoginValidation, login)
router.get('/me', isauthenticatedMiddlware, me)
router.post('/register', RegisterValidation, register)

export default router;
