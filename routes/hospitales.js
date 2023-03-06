/*
Ruta: /api/usuarios

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const { getHospitales,
    crearHospital,
    actualizarHospital,
    borrrarHospital } = require('../controllers/hospitales');

const router = Router();

// Rutas
router.get('/',getHospitales);

router.post('/',
    [   
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital);

router.put('/:id',
    [],
    actualizarHospital);

router.delete('/:id',
validarJWT,
borrrarHospital);

module.exports = router;