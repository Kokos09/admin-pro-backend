const express = require('express');
require('dotenv').config();
var cors=require('cors');

const {dbConnection}=require('./database/config');

//Servidor 
const app = express();

//Configurar CORS
app.use(cors());

//Lectura
app.use(express.json());

//Base de datos
dbConnection();

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))


app.listen(process.env.PORT,()=>{
    console.log("Servidor  corriendo en puerto "+3000);
})



