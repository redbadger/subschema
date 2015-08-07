'use strict';

module.exports = {
    loadValidator: function loadValidator(validator) {
        var validators = require('./validators');
        return validators[validator] && validators[validator].bind(validators);
    },
    listValidators: function listValidators() {
        var validators = require('./validators');
        return Object.keys(validators).map(function (name) {
            var validator = validators[name];
            return {
                name: name, validator: validator
            };
        });
    }
};