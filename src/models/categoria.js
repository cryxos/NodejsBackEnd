import mongoose, { Schema } from 'mongoose';

const categoriaSchema = new Schema({
    nombre:{type:String, maxlength:50, unique:true, required:true},
    description:{type:String, maxlength:255},
    estado:{type:Number, default:1},
    createAt:{type:Date, default:Date.now}
});

const Categoria = mongoose.model('categoria', categoriaSchema);
export default Categoria;