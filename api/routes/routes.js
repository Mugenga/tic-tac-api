// routes.js
module.exports = (app) => {
    const TicTac = require('../controllers/controllers.js');
  
    app.route('/game')
      .get(TicTac.game);

};