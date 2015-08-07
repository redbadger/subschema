'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('../react');
var tu = require('../tutils');
var BasicFieldMixin = require('../BasicFieldMixin');
var LoaderMixin = require('../LoaderMixin');
var css = require('../css');
var RadioInput = React.createClass({
    displayName: 'Radio',
    propTypes: {
        title: React.PropTypes.string
    },
    mixins: [BasicFieldMixin, LoaderMixin],
    statics: {
        subSchema: {
            options: 'OptionSchema'
        }
    },
    getDefaultProps: function getDefaultProps() {
        return {
            title: '',
            name: '',
            placeholder: '',
            template: 'RadioItemTemplate'
        };
    },

    setValue: function setValue(value) {
        this.setState({ value: value });
    },

    getValue: function getValue() {
        return this.state.value;
    },
    _compare: function _compare(val, val2) {
        if (val == null && val2 == null) {
            return true;
        }
        if (val == null || val2 == null) return false;
        return '' + val === '' + val2;
    },
    handleCheckChange: function handleCheckChange(e) {
        //Make a radio behave like a checkbox when there is only 1.
        if (this.props.forceSelection === false || this.props.options && this.props.options.length === 1) {
            this.props.handleChange(this._compare(e.target.value, this.state.value) ? null : e.target.value);
        } else {
            this.props.handleChange(e.target.value);
        }
    },
    makeOptions: function makeOptions(options) {
        var _this = this;

        options = options || [];
        var onChange = this.handleCheckChange;
        var value = this.getValue();
        var path = this.props.path;
        return options.map(function (option, index) {
            var _ref = tu.isString(option) ? { val: option, label: option } : option;

            var val = _ref.val;
            var label = _ref.label;
            var labelHTML = _ref.labelHTML;

            if (val == null) {
                val = label;
            }
            if (label == null) {
                label = val;
            }
            var path = tu.path(path, index);

            return {
                val: val,
                path: path,
                label: label,
                labelHTML: labelHTML,
                onChange: onChange,
                checked: _this._compare(value, val)
            };
        });
    },
    render: function render() {
        var _props = this.props;
        var name = _props.name;
        var template = _props.template;
        var path = _props.path;
        var value = _props.value;
        var dataType = _props.dataType;
        var options = _props.options;
        var field = _props.field;

        var RadioItemTemplate = this.template(template);
        var options = this.makeOptions(options);
        return React.createElement(
            'div',
            { className: css.forField(this) },
            options.map(function (option, index) {
                return React.createElement(
                    RadioItemTemplate,
                    _extends({}, option, { key: option.path }),
                    React.createElement('input', _extends({ id: options.path, type: 'radio',
                        name: name }, option, { value: option.val }))
                );
            }, this)
        );
    }
});

module.exports = RadioInput;