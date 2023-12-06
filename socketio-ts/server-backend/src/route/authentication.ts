import { Router } from "express";
import { login, register } from '../controller/AuthenticationController';
import { validateLogin } from '../validation/LoginValidation';
import { validateRegister } from '../validation/RegisterValidation';

const router = Router();

router.post('/login', validateLogin, login)
router.post('/register', validateRegister, register)

export default router;
