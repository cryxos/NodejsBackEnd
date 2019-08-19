import jwt from 'jsonwebtoken';
import models from '../models';


//verificar si token antiguo es valido
async function checkToken(token){
    let __id = null;
    try{
        const {_id} = await jwt.decode(token);
        __id = _id;
    }catch(e){
        return false;
    }   
    const user = await models.Usuario.findOne({_id:__id, estado:1});
    if (user){
        //si el usuario exsite, le damos un nuevo token
        const token = jwt.sign({_id:__id}, 'clavesecretaparagenerartoken', {expiresIn:'1d'});
        return {token, rol:user.rol};
    }else{
        return false;
    }
}
////////////////////////////////////////////////

export default {
    encode: async (_id) => {
        const token = jwt.sign({_id:_id}, 'clavesecretaparagenerartoken', {expiresIn:'1d'});
        return token;
    },
    decode: async(token)=> {
        try{
            const {_id} = await jwt.verify(token, 'clavesecretaparagenerartoken');
            const user = await models.Usuario.findOne({_id, estado:1});
            if(user){
                return user;
            }else{
                return false;
            }
        }catch(e){
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}