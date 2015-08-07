'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react');

var FormTemplate = React.createClass({
    displayName: 'FormTemplate',

    render: function render() {
        var _props = this.props;
        var children = _props.children;

        var props = _objectWithoutProperties(_props, ['children']);

        return React.createElement(
            'form',
            props,
            children
        );
    }
});

module.exports = FormTemplate;