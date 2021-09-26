const Bicicleta = require('../models/lf.models');

//Retrieve and return all bicicletas
exports.findAll = (req, res) => {
    Bicicleta.find()
    .then(bici => {
        res.send(bici);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al consultar"
        });
    });
};