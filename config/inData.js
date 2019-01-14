const methodOverride  = require('method-override');
const bodyParser = require('body-parser');

module.exports = app => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride('_method')); // override with POST having ?_method=DELETE
}
