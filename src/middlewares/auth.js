
import tokenService from '../services/token';

export default {
    verifyUsuario: async (req, res, next)=>{
       
        if(!req.headers.token){
            return res.status(404).send({
                message: 'no Token'
            });
        }

        ////// MODIFICAR POR MAYUCULA : EJMP --> Aminsitrador, Vendedor y en el modelo Usuario
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Administrador' ||  response.rol == 'Vendedor' || response.rol == 'Almacenero' ){
            next();
        }else{
             
            return res.status(404).send({
                message: 'no autorizado'
            });
        }

        
    },
    verifyAdministrador: async(req, res, next) => {
       
        if(!req.headers.token){
            return res.status(404).send({
                message: 'no Token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Administrador'){
            next();
        }else{
             
            return res.status(404).send({
                message: 'no autorizado'
            });
        }
        
    },
    verifyAlmacenero: async(req, res, next) => {
        
        if(!req.headers.token){
            return res.status(404).send({
                message: 'no Token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Administrador' || response.rol == 'Almacenero' ){
            next();
        }else{
             
            return res.status(404).send({
                message: 'no autorizado'
            });
        }
      
    },
    verifyVendedor: async(req, res, next) => {
         
        if(!req.headers.token){
            return res.status(404).send({
                message: 'no Token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Administrador' ||  response.rol == 'Vendedor'){
            next();
        }else{
           
            return res.status(404).send({
                message: 'no autorizado'
            });
        }
       
    }
}

