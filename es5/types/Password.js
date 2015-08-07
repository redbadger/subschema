'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react'),
    FieldMixin = require('../FieldMixin'),
    Constants = require('../Constants'),
    css = require('../css');
;

var Password = React.createClass({
    displayName: 'Password',

    mixins: [FieldMixin],
    statics: {
        inputClassName: Constants.inputClassName
    },
    render: function render() {
        var _props = this.props;
        var onBlur = _props.onBlur;
        var onChange = _props.onChange;
        var onValueChange = _props.onValueChange;
        var value = _props.value;
        var fieldAttrs = _props.fieldAttrs;

        var props = _objectWithoutProperties(_props, ['onBlur', 'onChange', 'onValueChange', 'value', 'fieldAttrs']);

        return React.createElement('input', _extends({ id: this.props.name, onBlur: this.handleValidate, onChange: this.handleChange,
            className: css.forField(this), type: 'password',
            value: this.state.value
        }, props, fieldAttrs));
    }

});
module.exports = Password;