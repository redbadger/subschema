'use strict';

var React = require('../react');
var tpath = require('../tutils').path;
var Buttons = require('../templates/ButtonsTemplate.js');
var ListItemTemplate = React.createClass({
    displayName: 'ListItemTemplate',

    mixins: [require('./ListItemMixin')],
    renderField: function renderField() {
        var field = this.props.field,
            content = this.props.itemToString(this.props.value);

        if (field.canEdit) {
            return React.createElement(
                'a',
                { className: 'item-value', ref: 'edit', onClick: this.handleEdit,
                    path: tpath(this.props.path, this.props.pos) },
                content
            );
        } else {
            return React.createElement(
                'span',
                { className: 'item-value' },
                content
            );
        }
    },
    buttons: function buttons(pos, last, canReorder, canDelete) {
        var buttons = [];
        var buttonClass = 'btn btn-xs btn-default';
        if (canReorder) {
            if (pos > 0) {
                buttons.push({
                    onClick: this.handleMoveUp,
                    title: 'Move Up',
                    label: '',
                    iconClass: 'glyphicon glyphicon-chevron-up',
                    buttonClass: buttonClass,
                    ref: 'upBtn'
                });
            }
            if (!last) {
                buttons.push({
                    onClick: this.handleMoveDown,
                    title: 'Move Down',
                    iconClass: 'glyphicon glyphicon-chevron-down',
                    buttonClass: buttonClass,
                    label: '',
                    ref: 'downBtn'
                });
            }
            if (canDelete) {
                buttons.push({
                    onClick: this.handleDelete,
                    title: 'Delete',
                    iconClass: 'glyphicon glyphicon-remove',
                    buttonClass: buttonClass,
                    label: '',
                    ref: 'deleteBtn'
                });
            }
        }

        return buttons;
    },
    render: function render() {
        var _props = this.props;
        var pos = _props.pos;
        var field = _props.field;
        var value = _props.value;
        var errors = _props.errors;
        var path = _props.path;
        var onValidate = _props.onValidate;
        var last = _props.last;
        var onValueChange = _props.onValueChange;
        var type = field.type;
        var name = field.name;
        var canReorder = field.canReorder;
        var canDelete = field.canDelete;

        var error = errors && errors[0] && errors[0].message;
        return React.createElement(
            'li',
            { className: 'list-group-item ' + (error ? 'has-error' : '') },
            this.renderField(),
            error ? React.createElement(
                'p',
                { ref: 'error', className: 'help-block' },
                error
            ) : null,
            React.createElement(Buttons, { buttons: this.buttons(pos, last, canReorder, canDelete), ref: 'buttons',
                buttonsClass: 'btn-group pull-right' })
        );
    }

});
module.exports = ListItemTemplate;