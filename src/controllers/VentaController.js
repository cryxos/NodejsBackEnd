import models from '../models';
import { model } from 'mongoose';

async function aumentarStock(idarticulo, cantidad){
    let {stock} =  await models.Articulo.findOne({_id:idarticulo});
    let nStock = parseInt(stock)+parseInt(cantidad);
    const reg=await models.Articulo.findByIdAndUpdate({_id:idarticulo}, {stock:nStock} );
}

async function disminuirStock(idarticulo, cantidad){
    let{stock}=await models.Articulo.findOne({_id:idarticulo});
    let nStock= parseInt(stock)-parseInt(cantidad);
    const reg= await models.Articulo.findByIdAndUpdate({_id:idarticulo}, {stock:nStock});
}

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Venta.create(req.body);
            let detalles = req.body.detalles;

            detalles.map(function(x){
                disminuirStock(x._id,x.cantidad);
            });
            
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e);
        }
    },    
    query: async (req, res, next) => {
        try {
            const reg=await models.Venta.findOne({_id:req.query._id})
            .populate('usuario', {nombre:1})
            .populate('persona', {nombre:1});
            if(!reg){
                res.status(404).send({
                    message: 'el registro no existe'
                });
            }else{
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e);
        }

    },

    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Venta.find({$or:[   {'num_comprobante': new RegExp(valor,'i')}, {'serie_comprobante': new RegExp(valor,'i')}   ]} )
            .populate('usuario', {nombre:1})
            .populate('persona', {nombre:1})
            .sort({'createAt':-1});
            
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e);
        }

    },

    //es recomendable cambiar de estado  (desactivarlo) y  estock se este actulizando si lo volvemos a ingresar
    /*update:async (req, res, next) => {
        try {
            const reg = await models.Ingreso.findByIdAndUpdate({_id:req.body._id}, {nombre: req.body.nombre, description:req.body.description});
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e);
        }

    },

    remove: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e);
        }

    },*/
    activate:async (req, res, next) => {
        try {
            const reg= await models.Venta.findByIdAndUpdate({_id:req.body._id}, {estado:1});

            let detalles = reg.detalles;
            detalles.map(function(x){
                disminuirStock(x._id,x.cantidad);
            });

            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e);
        }

    },

    deactivate: async (req, res, next) => {
        try {
            const reg= await models.Venta.findByIdAndUpdate({_id:req.body._id}, {estado:0});
            
            let detalles = reg.detalles;
            detalles.map(function(x){
                aumentarStock(x._id,x.cantidad);
            });

            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e);
        }

    },

    grafico12Meses: async(req,res,next) => {
        try{
            const reg = await models.Venta.aggregate(
                [
                    {
                        $group:{
                            _id: {
                                mes: {$month: "$createdAt"},
                                year: {$year: "$createdAt"}
                            },
                            total: {$sum:"$total"},
                            numero: {$sum:1}
                        }
                    },
                    {
                        $sort:{
                            "_id.year":-1, "_id.mes":-1
                        }
                    }
                ]
            ).limit(12);
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'ocurrio un error'
            });
            next(e);
        }
    }
}