module.exports = (app) => {
    const bicicletas = require('../controllers/lf.controller.js');

    //Retrieve all bicicletas
    app.get('/lfbicicletas', bicicletas.findAll);
}