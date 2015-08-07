'use strict';

var React = require('../react');
var util = require('../tutils');
var ItemToStringTemplate = React.createClass({
    displayName: 'ItemToStringTemplate',

    render: function render() {
        var _props = this.props;
        var value = _props.value;
        var labelKey = _props.labelKey;

        if (labelKey) {
            return React.createElement(
                'span',
                { className: 'brf-value list-group-item-text' },
                value[labelKey] || ''
            );
        }
        return React.createElement(
            'span',
            { className: 'brf-value list-group-item-text' },
            value == null ? null : value + ''
        );
    }
});

module.exports = ItemToStringTemplate;