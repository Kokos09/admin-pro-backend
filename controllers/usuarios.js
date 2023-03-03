const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({});

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        //Token
        const token = await generarJWT(usuario.id);
        
        //Guardar
        await usuario.save();

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperador ... revisar logs'
        });

    }
}

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.find({ uid });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }
        // Actualizaciones
        const {nombre, password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail= await Usuario.findOne({email:email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                })
            }
        }
        if(usuarioDB.nombre !== nombre){
            const existeEmail= await Usuario.findOne({nombre:nombre});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese nombre'
                })
            }
        }

        //Actulizar
        campos.email=email;
        campos.nombre=nombre;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos,
        {
            new:true
        });


        res.json({
            ok: true,
            usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario=async(req, res = response)=>{

    const uid= req.params.id;

    try {
        
        const usuarioDB = await Usuario.find({ uid });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
                ok:true,
                msg:'Usuario borrado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}