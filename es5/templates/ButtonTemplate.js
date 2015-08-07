'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react');
var Button = React.createClass({
    displayName: 'Button',

    getDefaultProps: function getDefaultProps() {
        return {
            action: 'Submit',
            label: 'Submit',
            buttonClass: 'btn',
            iconClass: null
        };
    },
    getInitialState: function getInitialState() {
        return {
            disabled: this.props.disabled || false
        };
    },
    setDisabled: function setDisabled(disabled) {
        this.setState({ disabled: disabled });
    },
    handleClick: function handleClick(e) {
        this.props.onClick(e, this.props.action, this);
    },
    render: function render() {
        var _props = this.props;
        var buttonClass = _props.buttonClass;
        var title = _props.title;
        var iconClass = _props.iconClass;
        var onClick = _props.onClick;
        var label = _props.label;

        var props = _objectWithoutProperties(_props, ['buttonClass', 'title', 'iconClass', 'onClick', 'label']);

        return React.createElement(
            'button',
            _extends({ className: buttonClass, title: title, disabled: this.state.disabled,
                onClick: this.handleClick }, props),
            iconClass ? React.createElement('i', { className: iconClass }) : null,
            label
        );
    }
});
module.exports = Button;