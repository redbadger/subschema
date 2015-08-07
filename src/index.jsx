var index = require('./index');
index.loader.addLoader(require('./DefaultLoader.js'));
index.form = require('./form.js');
module.exports = index;
