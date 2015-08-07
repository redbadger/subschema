'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('../react');
var tu = require('../tutils');

var ButtonsTemplate = React.createClass({
    displayName: 'ButtonsTemplate',

    mixins: [require('../LoaderMixin')],
    getDefaultProps: function getDefaultProps() {
        return {
            buttonsClass: 'btn-group',
            buttonClass: 'btn',
            buttonTemplate: 'ButtonTemplate',
            buttons: [{
                action: 'Submit',
                label: 'Submit',
                template: 'Button'
            }],
            onClick: function onClick(event, action, btn) {}
        };
    },

    makeButtons: function makeButtons() {
        var _this = this;

        var onClick = this.props.onClick;
        return this.props.buttons.map(function (b) {
            onClick = b.onClick || onClick;
            var btn = tu.isString(b) ? {
                action: b,
                label: b,
                onClick: onClick
            } : tu.extend({}, b, { onClick: onClick });
            if (_this.props.buttonClass) {
                btn.buttonClass = (btn.buttonClass || '') + ' ' + _this.props.buttonClass;
            }
            btn.template = _this.props.loader.loadTemplate(b.template || _this.props.buttonTemplate);
            return btn;
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
                'div',
                { className: this.props.buttonsClass },
                this.makeButtons().map(function (b, i) {
                    var Template = b.template;
                    return React.createElement(Template, _extends({ key: 'btn-' + i }, b));
                })
            )
        );
    }

});

module.exports = ButtonsTemplate;