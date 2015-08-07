"use strict";

var PropsStateValueMixin = {
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    }
};

module.exports = PropsStateValueMixin;