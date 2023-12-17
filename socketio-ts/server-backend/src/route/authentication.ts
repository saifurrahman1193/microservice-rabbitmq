import { Router } from "express";
import { login, register } from '../controller/authentication/authentication.controller';
import { LoginValidation } from '../validation/authentication/login.validation';
import { RegisterValidation } from '../validation/authentication/register.validation';

const router = Router();

router.post('/login', LoginValidation, login)
router.post('/register', RegisterValidation, register)

export default router;
