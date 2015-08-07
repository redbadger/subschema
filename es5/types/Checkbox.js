'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react'),
    FieldMixin = require('../FieldMixin'),
    Constants = require('../Constants'),
    css = require('../css');

var Checkbox = React.createClass({
    displayName: 'Checkbox',

    mixins: [FieldMixin],
    statics: {
        inputClassName: '' //Constants.inputClassName,
    },
    doChange: function doChange(e) {
        var hasProp = ('value' in this.props);
        this.props.handleChange(e.target.checked ? hasProp ? this.props.value : true : hasProp ? null : false);
    },
    render: function render() {
        var _props = this.props;
        var onValueChange = _props.onValueChange;
        var onChange = _props.onChange;
        var value = _props.value;
        var fieldAttrs = _props.fieldAttrs;
        var className = _props.className;
        var onBlur = _props.onBlur;

        var props = _objectWithoutProperties(_props, ['onValueChange', 'onChange', 'value', 'fieldAttrs', 'className', 'onBlur']);

        return React.createElement('input', _extends({ onBlur: this.handleValidate, onChange: this.doChange, id: this.props.name,
            className: css.forField(this), type: 'checkbox',
            checked: this.state.value
        }, props, fieldAttrs));
    }
});

module.exports = Checkbox;