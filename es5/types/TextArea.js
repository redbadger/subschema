'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react'),
    FieldMixin = require('../FieldMixin'),
    Constants = require('../Constants'),
    css = require('../css');

var TextArea = React.createClass({
    displayName: 'TextArea',

    mixins: [FieldMixin],
    statics: {
        inputClassName: Constants.inputClassName
    },
    render: function render() {
        var _props = this.props;
        var fieldAttrs = _props.fieldAttrs;
        var value = _props.value;
        var onBlur = _props.onBlur;
        var onChange = _props.onChange;
        var onValueChange = _props.onValueChange;

        var props = _objectWithoutProperties(_props, ['fieldAttrs', 'value', 'onBlur', 'onChange', 'onValueChange']);

        return React.createElement('textarea', _extends({ onBlur: this.handleValidate,
            onChange: this.handleChange,
            id: this.props.name,
            className: css.forField(this),
            value: this.state.value

        }, props, fieldAttrs));
    }
});

module.exports = TextArea;