import { Router } from "express";
import { login, me, register, logout } from '../controller/authentication/authentication.controller';
import { LoginValidation } from '../validation/authentication/login.validation';
import { RegisterValidation } from '../validation/authentication/register.validation';
import isauthenticatedMiddlware from "../middleware/isauthenticated.middlware";

const router = Router();

router.post('/register', RegisterValidation, register)
router.post('/login', LoginValidation, login)
router.post('/logout', isauthenticatedMiddlware, logout)
router.get('/me', isauthenticatedMiddlware, me)

export default router;
