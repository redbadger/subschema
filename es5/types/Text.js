'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react'),
    FieldMixin = require('../FieldMixin'),
    Constants = require('../Constants'),
    css = require('../css');

var TextInput = React.createClass({
    displayName: 'TextInput',

    mixins: [FieldMixin],
    statics: {
        inputClassName: Constants.inputClassName
    },
    render: function render() {
        var _props = this.props;
        var onChange = _props.onChange;
        var onValueChange = _props.onValueChange;
        var onBlur = _props.onBlur;
        var className = _props.className;
        var field = _props.field;
        var value = _props.value;
        var dataType = _props.dataType;
        var value = _props.value;
        var fieldAttrs = _props.fieldAttrs;
        var type = _props.type;

        var props = _objectWithoutProperties(_props, ['onChange', 'onValueChange', 'onBlur', 'className', 'field', 'value', 'dataType', 'value', 'fieldAttrs', 'type']);

        return React.createElement('input', _extends({ ref: 'input', onBlur: this.handleValidate, onChange: this.handleChange, id: this.props.name,
            className: css.forField(this),

            value: this.state.value
        }, props, fieldAttrs, {
            type: dataType || 'text'
        }));
    }
});

module.exports = TextInput;