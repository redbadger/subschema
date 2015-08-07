'use strict';

var React = require('../react');
var Constants = require('../Constants');
var tu = require('../tutils');
var CollectionMixin = require('./CollectionMixin.js');
var css = require('../css');
var ListInput = React.createClass({
    displayName: 'ListInput',

    mixins: [CollectionMixin],
    getDefaultProps: function getDefaultProps() {
        return {

            title: '',
            placeholder: '',
            itemType: 'Text',
            onValidate: function onValidate() {},
            itemTemplate: 'ListItemTemplate',
            collectionCreateTemplate: this.collectionCreateTemplate

        };
    },

    unwrap: function unwrap(value) {
        var ret = (value || []).map(function (v, i) {
            return v && v.value && v.value.value;
        });
        return ret;
    },

    wrap: function wrap(prop) {
        var value = prop && prop.value || [];
        var wrapped = value.map(function (v, k) {
            return {
                id: k,
                value: {
                    value: value[k]
                }
            };
        });
        return {
            wrapped: wrapped
        };
    },
    cloneVal: function cloneVal(val) {
        return {
            value: tu.clone(val)
        };
    },
    itemToString: function itemToString() {
        if (this.props.itemToString) return this.props.itemToString;else if (this.props.labelKey) {
            var labelKey = this.props.labelKey;
            return function (v) {
                if (!v) {
                    return null;
                }
                return React.createElement(
                    'span',
                    { className: 'brf-value list-group-item-text' },
                    v[labelKey] || ''
                );
            };
        }
        return function (v) {
            return v && v.toString();
        };
    },
    /* unwrap:function(value){
     if (value == null) return [];
     return value.map(this.extractValue);
     },*/
    getTemplateItem: function getTemplateItem() {
        return {
            type: 'Object',
            name: this.props.name,
            title: this.props.title,
            subSchema: {
                value: this.props.itemType
            },
            fields: ['value']
        };
    },
    render: function render() {
        var _this = this;

        var _props = this.props;
        var name = _props.name;
        var itemTemplate = _props.itemTemplate;
        var itemType = _props.itemType;
        var errors = _props.errors;
        var path = _props.path;
        var field = _props.field;
        var value = _props.value;var item = !itemType || tu.isString(itemType) ? {
            type: itemType || 'Text',
            name: name
        } : itemType;var ListItemTemplate = this.template(itemTemplate);var values = this.state.wrapped || [];var length = values.length;
        item.canReorder = this.props.canReorder;
        item.canDelete = this.props.canDelete;
        item.canEdit = this.props.canEdit;
        item.canAdd = this.props.canAdd;
        this._item = item;
        var err = this.state.errors || {};
        var itemToString = this.itemToString();
        return React.createElement(
            'div',
            { className: css.forField(this, 'list-editor') },
            this.renderAdd(),
            React.createElement(
                'ul',
                { className: css.forField(this, ListInput.inputListClassName) },
                values.map(function (v, i) {
                    var lipath = tu.path(path, v.id);
                    return React.createElement(ListItemTemplate, { ref: name + '_' + i, key: 'li-' + name + '-' + v.id, pos: i,
                        onMoveUp: _this.handleMoveUp,
                        itemToString: itemToString,
                        onMoveDown: _this.handleMoveDown, onDelete: _this.handleDelete,
                        onEdit: _this.handleEdit,
                        field: item,
                        path: lipath,
                        errors: err && err[lipath],
                        pid: v.id,
                        value: v.value.value, last: i + 1 === length });
                })
            )
        );
    }

});
module.exports = ListInput;