'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('../react');
var BasicFieldMixin = require('../BasicFieldMixin');
var LoaderMixin = require('../LoaderMixin');
var tu = require('../tutils');
var Constants = require('../Constants');
var css = require('../css');

var Checkboxes = React.createClass({
    displayName: 'Checkboxes',

    statics: {
        inputClassName: Constants.inputCheckboxesClassName,
        subSchema: {
            options: 'OptionSchema'
        }
    },
    mixins: [BasicFieldMixin, LoaderMixin],
    getDefaultProps: function getDefaultProps() {
        return {
            title: '',
            name: '',
            placeholder: '',
            dataType: this.dataType,
            itemTemplate: 'CheckboxesTemplate',
            groupTemplate: 'CheckboxesGroupTemplate',
            onValidate: function onValidate() {}
        };
    },

    setValue: function setValue(value) {
        this.setState({ value: value });
    },

    handleCheckChange: function handleCheckChange(e) {
        var newValues = this.state.value || [];
        if (e.target.checked) {
            newValues.push(e.target.value);
        } else {
            newValues.splice(newValues.indexOf(e.target.value), 1);
        }
        this.props.handleChange(newValues);
    },

    _createCheckbox: function _createCheckbox(option, index, group, CheckboxTemplate) {

        var id = tu.path(this.props.path, index, group);
        var val = option.val;
        var labelHTML = option.labelHTML;

        var value = this.state.value;
        var labelContent = labelHTML ? React.createElement('span', { dangerouslySetInnerHTML: { __html: labelHTML } }) : val;
        var opts = {
            onChange: this.handleCheckChange,
            name: this.props.name,
            checked: value ? !! ~value.indexOf(val) : false,
            ref: id.replace(/\./g, '_'),
            id: id,
            value: val
        };
        return React.createElement(
            CheckboxTemplate,
            _extends({ label: labelContent }, opts),
            React.createElement('input', _extends({ type: 'checkbox' }, opts))
        );
    },
    _createGroup: function _createGroup(option, index, group, Template, CheckboxTemplate) {
        return React.createElement(
            Template,
            { group: option.group },
            this.makeOptions(option.options, group == null ? 0 : group, CheckboxTemplate)
        );
    },

    /**
     * Create the checkbox list HTML
     * @param {Array}   Options as a simple array e.g. ['option1', 'option2']
     *                      or as an array of objects e.g. [{val: 543, label: 'Title for object 543'}]
     * @return {String} HTML
     */
    makeOptions: function makeOptions(array, group) {
        var _this = this;

        array = array || [];
        var name = this.props.name;
        var CheckboxTemplate = this.template('itemTemplate');
        var CheckboxesGroupTemplate = this.template('groupTemplate');
        return array.map(function (option, index) {
            option = tu.isString(option) ? { val: option } : option;
            return React.createElement(
                'div',
                {
                    key: name + '-' + option.val + '-' + group },
                option.group ? _this._createGroup(option, index, group ? group++ : 0, CheckboxesGroupTemplate, CheckboxTemplate) : _this._createCheckbox(option, index, group, CheckboxTemplate)
            );
        });
    },

    render: function render() {

        return React.createElement(
            'div',
            {
                className: css.forField(this) },
            this.makeOptions(this.props.options, 1)
        );
    }
});

module.exports = Checkboxes;