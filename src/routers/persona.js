import express from 'express';
import PersonaController from '../controllers/PersonaController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/add', auth.verifyUsuario , PersonaController.add);
router.get('/query', auth.verifyUsuario , PersonaController.query);
router.get('/list', auth.verifyUsuario , PersonaController.list);
router.get('/listclientes', auth.verifyUsuario , PersonaController.listClientes);
router.get('/listproveedores', auth.verifyUsuario , PersonaController.listProveedores);
router.put('/update', auth.verifyUsuario  , PersonaController.update);
router.delete('/remove', auth.verifyUsuario , PersonaController.remove);
router.put('/activate', auth.verifyUsuario , PersonaController.activate);
router.put('/deactivate', auth.verifyUsuario  , PersonaController.deactivate);

export default router;