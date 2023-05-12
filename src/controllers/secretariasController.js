const sec_controller = {
    cultura_educacion: (req, res) => {
        res.render('secretarias/cultura_educacion');
    },
    urbano: (req, res) => {
        res.render('secretarias/urbano');
    },
    ambiente: (req, res) => {
        res.render('secretarias/ambiente');
    },
    economico: (req, res) => {
        res.render('secretarias/economico');
    },
    gobierno: (req, res) => {
        res.render('secretarias/gobierno');
    },
    hacienda: (req, res) => {
        res.render('secretarias/hacienda');
    },
    humano: (req, res) => {
        res.render('secretarias/humano');
    },
    infraestructura: (req, res) => {
        res.render('secretarias/infraestructura');
    },
    intendencia: (req, res) => {
        res.render('secretarias/intendencia');
    },
    movilidad: (req, res) => {
        res.render('secretarias/movilidad');
    },
    salud: (req, res) => {
        res.render('secretarias/salud');
    },
    territoriales: (req, res) => {
        res.render('secretarias/territoriales');
    },
    tribunal_faltas: (req, res) => {
        res.render('secretarias/tribunal_faltas');
    },
    turismo_deporte: (req, res) => {
        res.render('secretarias/turismo_deporte');
    }
    
}
module.exports = sec_controller;