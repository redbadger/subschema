var types = require('./types');
var templates = require('./templates');

module.exports = {
    loadTemplate (template) {
        return templates[template];
    },
    listTemplates(){
        return Object.keys(templates);
    },
    loadType (type) {
        return types[type];
    },
    listTypes(){
        return Object.keys(types);
    }
}
