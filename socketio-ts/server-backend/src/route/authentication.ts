import { Router } from "express";
import { login, register } from '../controller/AuthenticationController';

export default (path: string, router: Router) => {
    router.post(path+'/login', login)
    router.post(path+'/register', register)
};
