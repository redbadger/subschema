'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react');

var ObjectTemplate = React.createClass({
    displayName: 'ObjectTemplate',

    render: function render() {
        var _props = this.props;
        var children = _props.children;

        var props = _objectWithoutProperties(_props, ['children']);

        return React.createElement(
            'div',
            props,
            children
        );
    }
});

module.exports = ObjectTemplate;