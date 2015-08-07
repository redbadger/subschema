'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('./react');
var NestedMixin = require('./NestedMixin');
var ValueManager = require('./ValueManager');
var Form = React.createClass({
    displayName: 'Form',
    mixins: [NestedMixin],
    getDefaultProps: function getDefaultProps() {
        return {
            template: 'FormTemplate',
            onSubmit: function onSubmit() {},
            novalidate: false
        };
    },

    handleSubmit: function handleSubmit(e) {
        e && e.preventDefault();
        var vm = this.props.valueManager;
        if (!this.props.novalidate) {
            vm.validate();
        }
        if (vm.onSubmit(e, vm.getErrors(), vm.getValue(), this.props.path) !== false) {
            this.props.onSubmit(e, vm.getErrors(), vm.getValue());
        }
    },
    setErrors: function setErrors(errors) {
        this.props.valueManager.setErrors(errors);
    },

    render: function render() {
        var _props = this.props;
        var schema = _props.schema;
        var subSchema = _props.subSchema;
        var fields = _props.fields;
        var submitButton = _props.submitButton;
        var template = _props.template;

        var props = _objectWithoutProperties(_props, ['schema', 'subSchema', 'fields', 'submitButton', 'template']);

        schema = schema || subSchema;
        schema = this.normalizeSchema(schema);
        this.schema = schema.schema ? schema : { schema: schema, fields: fields };
        var sb = submitButton || this.schema.submitButton;
        var Template = this.template(template);
        return React.createElement(
            Template,
            _extends({ ref: 'form', onValidate: this.handleValidate, onSubmit: this.handleSubmit, schema: this.schema,
                className: this.props.className
            }, props, {
                loader: this.props.loader,
                valueManager: this.props.valueManager
            }),
            this.schema && this.schema.schema ? this.renderSchema(this) : null,
            sb ? React.createElement('button', { type: 'submit', className: 'btn btn-primary', dangerouslySetInnerHTML: { __html: sb } }) : null,
            this.props.children
        );
    }

});
module.exports = Form;