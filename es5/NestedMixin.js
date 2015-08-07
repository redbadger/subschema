'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('./react');
var tu = require('./tutils');
var Editor = require('./Editor');
var ValueManager = require('./ValueManager');
var LoaderMixin = require('./LoaderMixin');
var NestedMixin = {
    mixins: [LoaderMixin],
    getDefaultProps: function getDefaultProps() {
        return {
            path: null,

            schema: {},
            valueManager: ValueManager()
        };
    },
    componentWillMount: function componentWillMount() {
        if (this.props.value) {
            this.props.valueManager.setValue(this.props.value);
        }
        if (this.props.errors) {
            this.props.valueManager.setErrors(this.props.errors);
        }
    },
    makeFieldset: function makeFieldset(f, i) {
        var Template = this.template(f.template || 'FieldSetTemplate');
        return React.createElement(
            Template,
            { key: 'f' + i, field: f },
            this.makeFields(f.fields)
        );
    },

    getValue: function getValue() {
        return this.props.valueManager.path(this.props.path);
    },
    addEditor: function addEditor(field, f) {
        var _props = this.props;
        var path = _props.path;
        var loader = _props.loader;

        var props = _objectWithoutProperties(_props, ['path', 'loader']);

        var tmpl = {},
            path = tu.path(path, f);
        if (field.template) {
            tmpl['template'] = field.template;
        }
        return React.createElement(Editor, _extends({ ref: f, key: 'key-' + f, path: path,
            field: field,
            loader: loader,
            name: f
        }, tmpl, {
            valueManager: this.props.valueManager }));
    },
    makeFields: function makeFields(fields) {
        var _this = this;

        var fieldMap = {},
            schema = this.schema.schema;

        fields = tu.toArray(fields).map(function (v) {
            return v.split('.', 2);
        }).map(function (v) {
            var f = v[0];
            if (v.length > 1) {
                (fieldMap[f] || (fieldMap[f] = [])).push(v[1]);
            }
            return f;
        });

        return tu.unique(fields).map(function (f, i) {
            f = tu.isString(f) ? f : f && f.name || 'field-' + i;
            var ref = tu.isString(f) ? tu.clone(schema[f]) : f;
            if (tu.isString(ref)) {
                ref = {
                    type: ref
                };
            } else {
                if (!ref.type) {
                    ref.type = 'Text';
                }
            }
            if (!ref.fields && fieldMap[f]) {
                ref.fields = fieldMap[f];
            }
            return _this.addEditor(ref, f);
        });
    },
    normalizeSchema: function normalizeSchema(schema) {
        if (schema == null) {
            return {};
        }
        if (tu.isString(schema)) {
            var loaded = this.props.loader.loadSchema(schema);
            if (loaded.schema) {
                schema = loaded;
            } else {
                schema = { schema: loaded };
            }
        } else if (tu.isString(schema.schema)) {
            var loaded = this.props.loader.loadSchema(schema.schema);
            if (loaded.schema) {
                schema = loaded;
            } else {
                schema = { schema: loaded };
            }
        }
        return schema;
    },

    renderSchema: function renderSchema() {

        var schema = this.schema,
            fieldsets = schema.fieldsets,
            fields = schema.fields || Object.keys(schema.schema);
        return (fieldsets && Array.isArray(fieldsets) ? fieldsets : fieldsets && (fieldsets.legend || fieldsets.fields) ? [fieldsets] : [{ fields: tu.toArray(fields) }]).map(this.makeFieldset, this);
    }
};
module.exports = NestedMixin;