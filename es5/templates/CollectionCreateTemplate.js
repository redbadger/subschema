'use strict';

var React = require('../react');
var Editor = require('../Editor');
var CreateItemMixin = require('../types/CreateItemMixin');
var CollectionCreateTemplate = React.createClass({
    displayName: 'CollectionCreateTemplate',

    mixins: [CreateItemMixin],
    render: function render() {
        return React.createElement(
            'div',
            { className: 'panel panel-default' },
            React.createElement(
                'div',
                { className: 'panel-heading' },
                React.createElement(
                    'h3',
                    { className: 'panel-title clearfix ' },
                    this.props.title
                )
            ),
            React.createElement(
                'div',
                { className: 'panel-body' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(Editor, { ref: 'itemEditor', field: this.props.field, value: this.props.value,
                        valueManager: this.valueManager,
                        name: this.props.name,
                        pid: this.props.editPid,
                        form: null })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'button',
                        { className: 'btn btn-default pull-left', ref: 'cancelBtn', type: 'reset', onClick: this.props.onCancel },
                        'Cancel'
                    ),
                    React.createElement(
                        'button',
                        { className: 'btn btn-primary pull-right', type: 'submit', ref: 'submitBtn',
                            onClick: this.handleSubmit },
                        this.props.submitButton
                    )
                )
            )
        );
    }
});
module.exports = CollectionCreateTemplate;