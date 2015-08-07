'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react');
var NestedMixin = require('../NestedMixin');
var BasicFieldMixin = require('../BasicFieldMixin');
var ObjectInput = React.createClass({
    mixins: [NestedMixin, BasicFieldMixin],
    displayName: 'ObjectInput',
    statics: {
        subSchema: 'SubschemaBuilder'
    },
    getDefaultProps: function getDefaultProps() {
        return {
            template: 'ObjectTemplate'
        };
    },
    vm: function vm() {
        return this.props.valueManager;
    },
    render: function render() {
        var _props = this.props;
        var field = _props.field;
        var value = _props.value;
        var template = _props.template;
        var subSchema = _props.subSchema;
        var schema = _props.schema;
        var fields = _props.fields;

        var props = _objectWithoutProperties(_props, ['field', 'value', 'template', 'subSchema', 'schema', 'fields']);

        schema = subSchema || schema;
        schema = this.normalizeSchema(schema);

        this.schema = schema.schema ? schema : { schema: schema, fields: fields };

        var obj = {};
        obj.value = this.getValue();
        var Template = this.template();
        return React.createElement(
            Template,
            _extends({}, obj, props),
            this.schema && this.schema.schema ? this.renderSchema(this.props.form) : null
        );
    }

});
module.exports = ObjectInput;