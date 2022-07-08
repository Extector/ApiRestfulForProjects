import { Router } from 'express';
import UploadController from '../controllers/Upload';

const router = new Router();

router.post('/', UploadController.store);

export default router;
