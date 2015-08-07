'use strict';

var util = require('./tutils');
function addClasses(classes, str) {
    if (str == null) {
        return;
    }
    if (util.isString(str)) {
        util.push(classes, str.split(/\s+?/));
    }
    if (util.isArray(str)) {
        str.forEach(function (v) {
            return addClasses(classes, v);
        });
    }
    if (util.isFunction(str)) {
        addClasses(classes, str.call(this));
    }
}
module.exports = {
    /**
     * Determines the classes for a field.
     * Takes a react node as the first argument.
     * @param {ReactElement} node - node to create for.
     * @param {String|Function|Array<String|Function|Array>} [clases] -classes to add.
     */
    forField: function forField(node) {
        var classes = [];
        addClasses(classes, util.slice(arguments, 1));
        var field = node.props.field;
        var className = field && field.className || node.props.className;

        if (className) {
            addClasses(classes, className);
        } else if (node.constructor.inputClassName) {
            util.push(classes, node.constructor.inputClassName.split(/\s+?/));
        }
        return classes.join(' ');
    },
    forEditor: function forEditor(node) {
        var classes = [];
        addClasses(classes, util.slice(arguments, 1));
        var field = node.props.field;
        var className = node.props.fieldClsName || node.props.fieldClassName || node.props.fieldClass;

        if (className) {
            addClasses(classes, className);
        } else if (node.constructor.fieldClassName) {
            util.push(classes, node.constructor.inputClassName.split(/\s+?/));
        }
        if (field) {
            addClasses.call(node, classes, field.fieldClass);
            addClasses.call(node, classes, field.fieldCls);
        }
        return classes.join(' ');
    }
};