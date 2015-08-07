'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('./react');
var tu = require('./tutils');
var EMPTY_ARR = [];

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} one
 * @param {function} two
 * @returns {function|null}
 */
function applyFuncs(one, two) {
    var hasOne = typeof one === 'function';
    var hasTwo = typeof two === 'function';

    if (!hasOne && !hasTwo) {
        return null;
    }
    if (!hasOne) {
        return two;
    }
    if (!hasTwo) {
        return one;
    }

    return function chainedFunction() {
        one.apply(this, arguments);
        two.apply(this, arguments);
    };
}

function initValidators(v) {
    //If it has a type init it
    if (v.type) {
        var validator = this.loadValidator(v.type);
        return validator(v);
    }
    //If it is a RegExp than init ReExp
    if (tu.isRegExp(v)) {
        return this.loadValidator('regexp')({
            regexp: v
        });
    }
    //If its a function just return it.
    if (tu.isFunction(v)) {
        return v;
    }
    //otherwise lets try initing it.
    return this.loadValidator(v)();
}

var Editor = React.createClass({
    displayName: 'Editor',
    mixins: [require('./LoaderMixin')],
    getDefaultProps: function getDefaultProps() {
        return {
            field: {
                type: 'Text'
            },
            /*onValueChange() {
             },*/
            onValidate: function onValidate() {},
            template: 'EditorTemplate'

        };
    },
    getInitialState: function getInitialState() {
        return {
            hasChanged: false,
            isValid: false
        };
    },

    setValue: function setValue(value) {
        this.refs.field.setValue(value);
    },
    componentWillMount: function componentWillMount() {
        var validators = this.props.field.validators;
        this.validators = validators ? validators.map(initValidators, this.props.loader) : EMPTY_ARR;
        this.props.valueManager.addListener(this.props.path, this.handleChange, this, true);
        this.props.valueManager.addValidateListener(this.props.path, this._validate, this);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.props.valueManager.removeListener(this.props.path, this.handleChange);
        this.props.valueManager.removeValidateListener(this.props.path, this._validate);
    },
    handleValidate: function handleValidate(value, component, e) {
        this.state.hasValidated = true;
        this.validate();
    },

    handleChange: function handleChange(newValue, oldValue, name) {
        var hasChanged = newValue != oldValue;
        if (!hasChanged) {
            return;
        }
        this.state.hasChanged = true;
        var errors = this.getErrorMessages(newValue);
        if (!this.state.hasValidated) {
            if (!errors || errors.length === 0) {
                this.state.hasValidated = true;
            }
        } else {
            this.validate(newValue, errors);
        }
    },
    getValue: function getValue() {
        return this.props.valueManager.path(this.props.path);
    },

    /**
     * Runs validation and updates empty fields.
     *
     */
    validate: function validate(value, errors) {
        value = arguments.length === 0 ? this.getValue() : value;
        errors = errors || this.getErrorMessages(value);

        this.props.valueManager.updateErrors(this.props.path, errors);
        this.setState({
            hasValidated: true
        });
        return errors;
    },
    _validate: function _validate() {
        this.validate(this.getValue());
    },
    getErrorMessages: function getErrorMessages(value) {
        var vm = this.props.valueManager;

        value = arguments.length === 0 ? this.getValue() : value;
        var msgs = this.validators.map(function (v) {
            return v(value, vm);
        }).filter(tu.nullCheck);
        return msgs;
    },

    title: function title() {
        var field = this.props.field || {};
        if (field.title === false) {
            return null;
        }
        if (field.title != null) {
            return field.title;
        }
        //Add spaces
        return this.props.name.replace(/([A-Z])/g, ' $1').replace(/^./, function (s) {
            return s.toUpperCase();
        });
    },
    handleValid: function handleValid(valid) {
        this.setState({ valid: valid });
    },
    render: function render() {
        var _props = this.props;
        var field = _props.field;
        var onValueChange = _props.onValueChange;
        var template = _props.template;
        var onValidate = _props.onValidate;

        var props = _objectWithoutProperties(_props, ['field', 'onValueChange', 'template', 'onValidate']);

        var type = field.type;
        var fieldClass = field.fieldClass;
        var editorClass = field.editorClass;
        var errorClassName = field.errorClassName;

        var rfield = _objectWithoutProperties(field, ['type', 'fieldClass', 'editorClass', 'errorClassName']);

        //err = errors, //&& errors[path] && errors[path][0] && errors[path],
        var Component = this.props.loader.loadType(type),
            title = this.title(),
            errorClassName = errorClassName == null ? 'has-error' : errorClassName;
        var Template;
        if (template === false || field.template === false || type === 'Hidden') {
            Template = null;
        } else {
            Template = this.template();
        }
        var child;
        if (Component instanceof Promise) {
            var Lazy = this.props.loader.loadType('LazyType');
            child = React.createElement(Lazy, _extends({ ref: 'field' }, props, field, { field: rfield, editorClass: editorClass,

                onValidate: this.handleValidate, promise: Component }));
        } else {
            child = React.createElement(Component, _extends({ ref: 'field' }, props, field, { field: rfield, editorClass: editorClass,

                onValidate: this.handleValidate }));
        }
        /*if (onValid) {
         onValid = applyFuncs(this.handleValid, onValid);
         }*/
        //errMessage, errorClassName, name, fieldClass, title, help
        return Template ? React.createElement(
            Template,
            _extends({ field: rfield }, props, { fieldClass: fieldClass, title: title,
                errorClassName: errorClassName,
                help: !this.state.valid && (props.help || rfield.help),
                onValidate: this.handleValidate
            }),
            child
        ) : child;
    }
});
module.exports = Editor;