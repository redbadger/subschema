'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react'),
    util = require('../tutils'),
    FieldMixin = require('../FieldMixin'),
    Constants = require('../Constants'),
    css = require('../css');
function toLabelVal(v) {
    if (util.isString(v)) {
        return {
            label: v,
            val: v
        };
    }
    if (v == null) {
        return {
            label: 'No Value',
            val: null
        };
    }

    return v;
}

var Select = React.createClass({
    displayName: 'Select',

    mixins: [FieldMixin],
    statics: {
        inputClassName: Constants.inputClassName

    },
    handleSelect: function handleSelect(e) {
        if (this.props.multiple) {
            var placeholder = this.props.placeholder;
            //normalize multiple field selection
            var values = [],
                options = e.target.options,
                i = 0,
                l = options.length,
                option;
            for (; i < l; i++) {
                var option = options[i];
                if (option.selected) {
                    if (option.label != placeholder) values.push(option.value);
                }
            }
            this.props.handleChange(values);
            return;
        } else if (this.props.placeholder) {
            if (e.target.value === this.props.placeholder) {
                this.props.handleChange(null);
                return;
            }
        }

        this.props.handleChange(e.target.value);
    },
    renderOptions: function renderOptions(value) {
        var props = this.props,
            multiple = props.multiple,
            opts = props.options || [],
            hasValue = false,
            ret = opts.map(toLabelVal).map(function (o, i) {
            if (!hasValue && o.val + '' == '' + value) hasValue = true;
            return React.createElement(
                'option',
                { key: 's' + i, value: o.val },
                o.label
            );
        });
        var placeholder = this.props.placeholder;
        if (placeholder || !multiple && !!hasValue) {
            //fixes a bug in react where selecting null, does not select null.
            var selected = {};
            if (!hasValue) {
                selected.selected = true;
                selected.value = null;
            }
            ret.unshift(React.createElement(
                'option',
                _extends({ key: 'null-' + opts.length }, selected),
                placeholder
            ));
        }
        return ret;
    },
    render: function render() {
        var _props = this.props;
        var field = _props.field;
        var onChange = _props.onChange;
        var fieldAttrs = _props.fieldAttrs;
        var onBlur = _props.onBlur;
        var value = _props.value;
        var multiple = _props.multiple;
        var placeholder = _props.placeholder;
        var name = _props.name;

        var props = _objectWithoutProperties(_props, ['field', 'onChange', 'fieldAttrs', 'onBlur', 'value', 'multiple', 'placeholder', 'name']);

        var value = this.state.value;
        if (multiple && !Array.isArray(value)) {
            value = value ? [value] : value;
        }
        return React.createElement(
            'select',
            _extends({ className: css.forField(this),
                multiple: multiple,
                ref: 'input',
                value: value,
                onBlur: this.handleValidate, onChange: this.handleSelect
            }, props, fieldAttrs),
            this.renderOptions(value)
        );
    }

});
module.exports = Select;