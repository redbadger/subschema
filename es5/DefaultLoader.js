'use strict';

var types = require('./types');
var templates = require('./templates');

module.exports = {
    loadTemplate: function loadTemplate(template) {
        return templates[template];
    },
    listTemplates: function listTemplates() {
        return Object.keys(templates);
    },
    loadType: function loadType(type) {
        return types[type];
    },
    listTypes: function listTypes() {
        return Object.keys(types);
    }
};