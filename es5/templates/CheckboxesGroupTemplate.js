"use strict";

var React = require("../react");
var CheckboxesGroupTemplate = React.createClass({
    displayName: "CheckboxesGroupTemplate",

    render: function render() {
        return React.createElement(
            "fieldset",
            { className: "group" },
            React.createElement(
                "legend",
                null,
                this.props.group
            ),
            this.props.children
        );
    }
});
module.exports = CheckboxesGroupTemplate;