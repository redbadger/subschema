'use strict';

var React = require('../react');
var CollectionMixin = require('./CollectionMixin.js');
var tu = require('../tutils');
var Constants = require('../Constants');
var css = require('../css');
var MixedInput = React.createClass({
    displayName: 'MixedInput',

    mixins: [CollectionMixin],
    statics: {},
    getDefaultProps: function getDefaultProps() {
        return {
            placeholder: '',
            itemType: 'Text',
            keyType: 'Text',
            valueType: 'Text',
            itemTemplate: 'ListItemTemplate',

            onValidate: function onValidate() {}
        };
    },
    cloneVal: function cloneVal(value) {
        return value;
    },
    unwrap: function unwrap(value) {
        var ret = {};
        if (value == null) {
            return ret;
        }
        value.forEach(function (v) {
            v = v.value;
            ret[v.key] = v.value;
        });
        return ret;
    },

    wrap: function wrap(prop) {
        var value = prop && prop.value || {};
        var wrapped = Object.keys(value).map(function (k) {
            return {
                id: k,
                value: {
                    key: k,
                    value: value[k]
                }
            };
        });
        return {
            wrapped: wrapped
        };
    },
    itemToString: function itemToString() {
        if (this.props.itemToString) return this.props.itemToString;
        var labelKey = this.props.field.labelKey;
        return function (v) {
            if (!(v && v.key)) {
                return null;
            }

            return React.createElement(
                'span',
                null,
                React.createElement(
                    'h4',
                    { className: 'brf-key list-group-item-heading' },
                    v.key
                ),
                labelKey ? React.createElement(
                    'span',
                    {
                        className: 'brf-value list-group-item-text' },
                    v.value[labelKey]
                ) : null
            );
        };
    },

    uniqueCheck: function uniqueCheck(value) {
        var values = this.getValue();
        if (this.state.editPid == value) {
            return null;
        }
        if (value in values) {

            return {
                message: 'Keys must be unique'
            };
        }
        return null;
    },
    getTemplateItem: function getTemplateItem() {
        var kt = this.props.field.keyType,
            keyType = tu.isString(kt) ? {
            type: kt
        } : kt || {},
            validators = keyType.validators || (keyType.validators = []),
            item = {
            type: 'Object',
            name: this.props.field.name,
            subSchema: {
                key: keyType,
                value: this.props.field.valueType || this.props.valueType
            },
            fields: ['key', 'value']
        };

        if (!keyType.type) {
            keyType.type = this.props.keyType;
        }

        validators.unshift('required', this.uniqueCheck);

        return item;
    },
    render: function render() {
        var _this = this;

        var _props = this.props;
        var name = _props.name;
        var itemType = _props.itemType;
        var errors = _props.errors;
        var canReorder = _props.canReorder;
        var canDelete = _props.canDelete;
        var canEdit = _props.canEdit;
        var canAdd = _props.canAdd;
        var path = _props.path;
        var field = _props.field;var item = !itemType || tu.isString(itemType) ? {
            type: itemType || 'Text',
            name: name
        } : itemType;var ListItemTemplate = this.template('itemTemplate');var values = this.state.wrapped || [];var length = values.length;
        item.canReorder = canReorder;
        item.canDelete = canDelete;
        item.canEdit = canEdit;
        var itemToString = this.itemToString();
        return React.createElement(
            'div',
            { className: css.forField(this, 'list-editor') },
            this.renderAdd(),
            React.createElement(
                'ul',
                null,
                values.map(function (v, i) {
                    var path = tu.path(path, v.id);
                    return React.createElement(ListItemTemplate, { key: path, pos: i, path: path,
                        onMoveUp: _this.handleMoveUp,
                        onMoveDown: _this.handleMoveDown, onDelete: _this.handleDelete,
                        onEdit: _this.handleEdit,

                        field: item,
                        pid: v.id,
                        itemToString: itemToString,
                        value: v.value, errors: errors, last: i + 1 === length });
                })
            )
        );
    }

});

module.exports = MixedInput;