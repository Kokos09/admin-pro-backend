const { Schema, model, mongoose } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required:true
    }
});

MedicoSchema.method('toJSON', function () {
    const { _v,...object } = this.toObject();
    return object;
})


module.exports = mongoose.model('Medico', MedicoSchema);
//Hospital