import { Router } from 'express';
import AlunoController from '../controllers/Aluno';

const router = new Router();

router.get('/', AlunoController.index);
router.post('/store/', AlunoController.store);
router.get('/show/:id', AlunoController.show);
router.put('/update/:id', AlunoController.update);
router.delete('/delete/:id', AlunoController.delete);

export default router;
