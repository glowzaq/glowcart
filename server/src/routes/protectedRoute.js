import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProtected } from '../controllers/protectedController.js';

const router = express.Router();

router.get(
    '/protected',
    authMiddleware,
    getProtected
);

export default router;
