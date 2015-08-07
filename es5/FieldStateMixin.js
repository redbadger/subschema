"use strict";

var FieldStateMixin = {
    getInitialState: function getInitialState() {
        return {
            value: this.props.value
        };
    },
    setValue: function setValue(value) {
        this.setState({ value: value });
    },
    getValue: function getValue() {
        return this.state.value;
    }
};
module.exports = FieldStateMixin;