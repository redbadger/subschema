var types = require('./types');

module.exports = {
    loadTemplate (template) {
        return require.context("./templates", true, /^\.\/.*\.js(x)?/)('./' + template + '.jsx');
    },
    listTemplates(){

        return require.context("./templates", true, /^\.\/.*Template\.js(x)?/).keys().map(function (k) {
            return {
                name: k.replace(/.*\/(.*)\.js(x?)/, '$1'),
                path: k
            }
        });
    },
    loadType (type) {
        return types[type];
    },
    listTypes(){
        return Object.keys(types);
    }
}
