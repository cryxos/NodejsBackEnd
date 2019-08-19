import express from 'express';
import CategoriaController from '../controllers/CategoriaController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/add', auth.verifyAlmacenero, CategoriaController.add);
router.get('/query', auth.verifyAlmacenero, CategoriaController.query);
router.get('/list', auth.verifyAlmacenero, CategoriaController.list);
router.put('/update', auth.verifyAlmacenero, CategoriaController.update);
router.delete('/remove', auth.verifyAlmacenero, CategoriaController.remove);
router.put('/activate', auth.verifyAlmacenero, CategoriaController.activate);
router.put('/deactivate', auth.verifyAlmacenero, CategoriaController.deactivate);

export default router;