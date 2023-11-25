import { Router } from "express";
import { login, register } from '../controller/AuthenticationController';

export default (router: Router) => {
    router.post('/api/auth/login', login)
    router.post('/api/auth/register', register)
};
