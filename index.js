const express = require('express');
require('dotenv').config();
var cors=require('cors');

const {dbConnection}=require('./database/config');

//Servidor 
const app = express();

//Configurar CORS
app.use(cors());

app.use(express.json());

//Base de datos
dbConnection();

app.use('/api/hospital', require('./routes/hospitales'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/medico', require('./routes/medico'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log("Servidor  corriendo en puerto "+3000);
});


// var serverIndex=require('server-index');
// app.use(express.static(__dirname+'/'));
// app.use('/uploads', serverIndex(__dirname+'/uploads'));



