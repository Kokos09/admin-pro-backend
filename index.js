const express = require('express');
const {dbConnection}=require('./database/config');
require('dotenv').config();

//Servidor 
const app = express();

//Base de datos
dbConnection();

// adminpoweruser
// 5CMuV1sSVY497xA96dy6t

app.get('/',(req,res)=>{

    res.json({
        ok:true,
        msg:'Hola mundo'
    })

})

app.listen(process.env.PORT,()=>{
    console.log("Servidor  corriendo en puerto "+3000);
})



