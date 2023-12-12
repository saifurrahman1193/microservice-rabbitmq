import { Router } from "express";
import { login, register } from '../controller/AuthenticationController';
import { LoginValidation } from '../validation/LoginValidation';
import { RegisterValidation } from '../validation/RegisterValidation';

const router = Router();

router.post('/login', LoginValidation, login)
router.post('/register', RegisterValidation, register)

export default router;
