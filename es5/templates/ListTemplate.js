'use strict';

var React = require('../react');
var ListInput = require('../types/List.js');
var css = require('../css');
var ListTemplate = React.createClass({
    displayName: 'ListTemplate',

    render: function render() {
        return React.createElement(
            'div',
            { className: this.props.className },
            this.props.renderAdd,
            React.createElement(
                'ul',
                { className: css.forField(this, 'input-list') },
                this.props.children
            )
        );
    }
});

module.exports = ListTemplate;