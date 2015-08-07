'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react');
var FieldValueMixin = require('../FieldValueMixin');
var css = require('../css');
var Constants = require('../Constants');
var makeFormatter = require('../formatter');
function ret(op) {
    return op;
}
var dateRe = /^([0,1]?\d?)(?:\/?(\d{0,2}))?$/;
var zipRe = /^(\d{0,5})(?:[^\d]?(\d{0,4}))?$/;
function lastEq(input, val) {
    return input && input[input.length - 1] === val;
}

function defaultValidator(value, regex) {
    return regex.test(value);
}
function createValidator(validator, loader) {
    if (validator === void 0) {
        return defaultValidator;
    }
    if (typeof validator === 'function') {
        return validator;
    }
    if (typeof validator === 'string') {
        validator = loader.loadValidator(validator)();
        return function (value) {
            return !validator(value);
        };
    }
    if (validator instanceof RegExp) {
        return RegExp.prototype.test.bind(re);
    }
    throw 'Do not know what to do with ' + validator;
}

var Restricted = React.createClass({
    displayName: 'Restricted',

    mixins: [require('../BasicFieldMixin'), require('../FieldValueDefaultPropsMixin'), require('../FieldHandleValueMixin')],
    statics: {
        inputClassName: Constants.inputClassName
    },
    getInitialState: function getInitialState() {
        var value = this.props.value ? this.formatter(this.props.value) : {
            isValid: false,
            value: ''
        };

        return {
            value: value.value || '',
            hasValidValue: value.isValid
        };
    },
    setValue: function setValue(value) {
        this.setState({ value: value });
    },
    getValue: function getValue() {
        return this.state.value;
    },
    componentWillReceiveProps: function componentWillReceiveProps(props) {
        if (props.formatter !== this.props.formatter) {
            this._formatter = null;
        }
    },
    formatters: {
        uszip: function uszip(value, isBackspace) {
            value = (value || '').substring(0, 10);
            var parts = zipRe.exec(value) || [],
                isValid = false;

            if (parts) {
                if (parts[2]) {
                    value = parts[1] + '-' + parts[2];
                } else {
                    value = parts[1] || '';
                }
                isValid = value.length === 5 || value.length === 10;
            } else {
                value = '';
            }

            return {
                value: value,
                isValid: isValid
            };
        },
        creditcard: '#### #### #### ####',
        shortDate: function shortDate(value, isBackspace) {
            var parts = dateRe.exec(value) || [];
            if (parts.shift()) {
                var str = '';
                var last = parts.pop();
                var mm = parts.shift();
                if (mm.length === 2) {
                    str += mm + '/';
                } else if (last || last === '') {
                    str += '0' + mm + '/';
                } else {
                    str += mm;
                }
                str += last || '';
                return {
                    value: isBackspace ? str.substring(0, lastEq(value, '/') ? value.length - 1 : value.length) : str,
                    isValid: str.length === 5
                };
            }
            if (value && value.trim() === '') {
                return {
                    value: value.trim(),
                    isValid: false
                };
            }
            return {
                value: '',
                isValid: false
            };
        }
    },

    formatter: function formatter(value, isBackspace) {
        if (this._formatter) {
            return this._formatter.call(this, value, isBackspace);
        }
        var formatter = this.props.formatter;

        if (typeof formatter === 'string') {
            formatter = this.formatters[formatter] || formatter;
            if (typeof formatter === 'function') {
                return (this._formatter = formatter).call(this, value, isBackspace);
            } else {
                return (this._formatter = makeFormatter(formatter, createValidator(this.props.validator, this.props.loader))).call(this, value, isBackspace);
            }
        } else if (typeof formatter === 'function') {
            return (this._formatter = formatter).call(this, value, isBackspace);
        }
        return value;
    },
    valueFromEvt: function valueFromEvt(e) {
        return e.target.value;
    },
    handleKeyDown: function handleKeyDown(e) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown.call(this, e);
        }
        var pos = e.target.selectionStart,
            end = e.target.selectionEnd;
        if (e.key === 'Enter') {
            this.props.onValid(this.state.hasValidValue, {
                isValid: this.state.hasValidValue,
                value: this.state.value
            });
            return;
        }
        if (e.key === 'Delete') {
            e.preventDefault();
            var value = this.state.value || '';
            value = value.substring(0, pos) + value.substring(end);
            this._value(value, false, pos);
            return;
        }
        if (e.key === 'Backspace') {
            e.preventDefault();
            e.stopPropagation();
            var value = this.state.value || '';
            var back = false;
            if (pos === end) {
                value = value.trim().substring(0, value.length - 1);
                back = true;
            } else {
                value = value.substring(0, pos) + value.substring(end);
            }
            this._value(value, back, pos + value.length);
            return;
        }
    },
    _value: function _value(str, isBackspace, caret) {
        var value = this.formatter(str, isBackspace) || { isValid: false };
        this.props.onValid(value.isValid, value);
        this.props.handleChange(value.value);
        if (caret != null) {
            if (isBackspace) {
                caret += value.position - 1;
            } else {
                caret += value.position + 1;
            }
        }
        this.setState({
            value: value.value,
            hasValue: value.value.length !== 0,
            hasValidValue: value.isValid
        }, caret ? function () {
            this.getDOMNode().setSelectionRange(caret, caret);
        } : null);
    },
    handleValueChange: function handleValueChange(e) {
        this.props.onChange.call(this, e);
        this._value(e.target.value.trim(), false, e.target.selectionEnd);
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
        var type = _props.type;
        var fieldAttrs = _props.fieldAttrs;

        var props = _objectWithoutProperties(_props, ['onChange', 'onValueChange', 'onBlur', 'className', 'field', 'value', 'dataType', 'value', 'type', 'fieldAttrs']);

        return React.createElement('input', _extends({ ref: 'input', onBlur: this.handleValidate, onChange: this.handleValueChange, id: this.props.name,
            className: css.forField(this),
            value: this.state.value
        }, props, fieldAttrs, { type: dataType || 'text', onKeyDown: this.handleKeyDown }));
    }
});

module.exports = Restricted;