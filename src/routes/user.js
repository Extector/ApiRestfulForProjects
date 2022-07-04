import { Router } from 'express';
import userController from '../controllers/User';

const router = new Router();

router.get('/', userController.index);
router.post('/store/', userController.store);
router.get('/show/:id', userController.show);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.delete);

export default router;
