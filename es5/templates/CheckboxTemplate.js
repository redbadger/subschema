"use strict";

var React = require("../react");

var CheckboxTemplate = React.createClass({
    displayName: "CheckboxTemplate",

    render: function render() {
        return React.createElement(
            "div",
            { className: "checkbox" },
            React.createElement(
                "label",
                null,
                this.props.children,
                this.props.label
            )
        );
    }
});

module.exports = CheckboxTemplate;