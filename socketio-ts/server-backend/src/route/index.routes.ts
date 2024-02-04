// routes.ts
import express from 'express';
import userRoutes from './user.routes';
import authRoutes from './authentication.routes';
import appRoutes from './app.routes';
import namespaceRoutes from './namespace.routes';
import commonRoutes from './common.routes';
import { set_response } from '../helper/apiresponser.helper';

const router = express.Router();

/** Routes */
router.use('/api/user', userRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/app', appRoutes);
router.use('/api/namespace', namespaceRoutes);
router.use('/common', commonRoutes);

/** Healthcheck */
router.get('/ping', (req, res, next) =>
    set_response(res, null, 200,  true , ['Request successful'], null)
);


/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');
    return set_response(res, null, 404,  true , ['Not Found ' + error.message], null);
});

export default router;
