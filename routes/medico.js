/*
Ruta: /api/usuarios

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedico, actualizarMedico, borrrarMedico } = require('../controllers/medicos');

const router = Router();

// Rutas
router.get('/',getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del medico es necesario').not().isEmpty(),
        check('nombre','El id del hospital debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put('/:id',
    [],
    actualizarMedico);

router.delete('/:id',
borrrarMedico);

module.exports = router;