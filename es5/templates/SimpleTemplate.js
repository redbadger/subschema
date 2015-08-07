"use strict";

var React = require("../react");
var SimpleTemplate = React.createClass({
    displayName: "SimpleTemplate",

    render: function render() {
        var _props = this.props;
        var name = _props.name;
        var title = _props.title;
        var help = _props.help;
        var errorClassName = _props.errorClassName;
        var message = _props.message;
        var fieldClass = _props.fieldClass;
        var children = _props.children;

        return React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
                "label",
                { "for": name },
                title
            ),
            this.props.children
        );
    }
});
module.exports = SimpleTemplate;