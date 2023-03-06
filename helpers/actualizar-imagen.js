const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //borrar la iamgen anterior
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo;

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findByID(id);
            if (!medico) {
                console.log('No es un medico por id');
                return false;
            }

             pathViejo = `./uploads/medicos/${medico.img}`;

            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            medico.save();
            return true;
        case 'hospitales':
            const hospital = await Medico.findByID(id);
            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }

             pathViejo = `./uploads/hospital/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            hospital.save();
            return true;
        case 'usuarios':
            const usuario = await Medico.findByID(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }

            const pathViejo = `./uploads/usuario/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            usuario.save();
            return true;
        default:

            break;
    }

}

module.exports = {
    actualizarImagen
}