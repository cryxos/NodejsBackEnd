import express from 'express';
import VentaController from '../controllers/VentaController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/add', auth.verifyVendedor, VentaController.add);
router.get('/query', auth.verifyVendedor, VentaController.query);
router.get('/list', auth.verifyVendedor, VentaController.list);
router.get('/grafico12meses', auth.verifyUsuario, VentaController.grafico12Meses);
/*
router.put('/update', auth.verifyVendedor, VentaController.update);
router.delete('/remove', auth.verifyVendedor, VentaController.remove);
*/
router.put('/activate', auth.verifyVendedor, VentaController.activate);
router.put('/deactivate', auth.verifyVendedor, VentaController.deactivate);

export default router;