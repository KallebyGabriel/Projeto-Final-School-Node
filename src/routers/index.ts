import { Request, Response, Router } from 'express';
import healthRouter from './health.router';
import contacts from './contacts.routers';
import usuario from './usuario.router'

const router = Router();

router.use('/health', healthRouter);
router.use('/contacts', contacts);
router.use('/usuario', usuario);

export default router;

