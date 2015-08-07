"use strict";

var React = require("../react");
var RadioItemTemplate = React.createClass({
    displayName: "RadioItemTemplate",

    render: function render() {
        var _props = this.props;
        var label = _props.label;
        var labelHTML = _props.labelHTML;
        var id = _props.id;

        label = labelHTML ? React.createElement("span", { dangerouslySetInnerHTML: { __html: labelHTML } }) : label;

        return React.createElement(
            "div",
            { className: "radio" },
            React.createElement(
                "label",
                null,
                this.props.children,
                label
            )
        );
    }
});
module.exports = RadioItemTemplate;