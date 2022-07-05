import { Router } from 'express';
import userController from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, userController.index);
router.get('/show/:id', loginRequired, userController.show);

router.post('/store/', userController.store);
router.put('/update/', loginRequired, userController.update);
router.delete('/delete/', loginRequired, userController.delete);

export default router;
