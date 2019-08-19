import express from 'express';
//const express = require('express');
import morgan from 'morgan';
//const morgan = require('morgan');
import cors from 'cors';
//const cors = require('cors');
import path from 'path';

import mongoose from './database';

import router from './routers';

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//midleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('/api', router);


//port
app.listen(app.get('port'), ()=>{
   console.log(`server on port ${app.get('port')}`);
});
