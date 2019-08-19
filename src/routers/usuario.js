import express from 'express';
import UsuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/add', auth.verifyAdministrador , UsuarioController.add);
router.get('/query', auth.verifyAdministrador  , UsuarioController.query);
router.get('/list', auth.verifyAdministrador , UsuarioController.list);
router.put('/update', auth.verifyAdministrador  , UsuarioController.update);
router.delete('/remove', auth.verifyAdministrador , UsuarioController.remove);
router.put('/activate', auth.verifyAdministrador , UsuarioController.activate);
router.put('/deactivate', auth.verifyAdministrador  , UsuarioController.deactivate);
router.post('/login', UsuarioController.login);

export default router;