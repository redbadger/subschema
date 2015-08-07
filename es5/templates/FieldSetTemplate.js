'use strict';

var React = require('../react');

var FieldSetTemplate = React.createClass({
    displayName: 'FieldSetTemplate',

    render: function render() {
        var f = this.props.field;
        return f.legend ? React.createElement(
            'fieldset',
            null,
            React.createElement(
                'legend',
                null,
                f.legend
            ),
            this.props.children
        ) : React.createElement(
            'div',
            null,
            this.props.children
        );
    }

});

module.exports = FieldSetTemplate;