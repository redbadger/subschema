//Pulling this out so other templates could benefit.
"use strict";

var CreateItemMixin = {
    componentWillMount: function componentWillMount() {
        /**
         * This allows valueManager listeners to see new items being created before they are added
         * to the respective objects.   It has a high potential of leaking, hence the componentWillUnmount
         */
        this.valueManager = this.props.valueManager.createValueManager(this.props.value, {}, this.props.path);
        this.props.valueManager.addSubmitListener(null, this.handleSubmit);
    },
    handleSubmit: function handleSubmit(e, value, errors, path) {
        e && e.preventDefault();
        this.props.onSubmit(e, this.valueManager.getValue(), this.valueManager.getErrors(), this.props.path);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.props.valueManager.removeSubmitListener(null, this.handleSubmit);
        this.valueManager.removeAll();
    }
};
module.exports = CreateItemMixin;