//mongoose.Promise = global.Promise;

import mongoose, { mongo } from 'mongoose';
const URI = 'mongodb://localhost/sistema';

mongoose.connect(URI, {useCreateIndex: true, useNewUrlParser: true})
    .then(db => console.log("conectado a la BD"))
    .catch(err => console.err(err))

module.exports = mongoose;