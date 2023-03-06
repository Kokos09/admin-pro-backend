const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { googleVerify } = require('../helpers/google-verify');



const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        //JSON WEB TOKEN
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const googleSignIn =async(req,res=response)=>{

    try {
        
        const {email,name, picture}= await googleVerify(req.body.token);
        const usuarioDB= await Usuario.findOne({email});
        let usuario;
        if(!usuarioDB){
            usuario=new Usuario({
                nombre:name,
                email:email,
                password:'@@@',
                img:picture,
                google:true
            })
        } else{
            usuario=usuarioDB;
            usuario.google;
        }
        //Guardar usuario
        await usuario.save();
        //JSON WEB TOKEN
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email,
            name, 
            picture,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token de google erroneo'
        })
    }

    

}

module.exports = {
    login,
    googleSignIn
}