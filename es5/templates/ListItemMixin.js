'use strict';

var ListItemMixin = {
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'Text',
            onMoveUp: function onMoveUp() {},
            onMoveDown: function onMoveDown() {},
            onDelete: function onDelete() {},
            onValidate: function onValidate() {},
            onValueChange: function onValueChange() {},
            onEdit: function onEdit() {},
            last: false,
            itemToString: function itemToString(v) {
                return v != null ? v.toString() : '';
            }
        };
    },
    handleMoveUp: function handleMoveUp(e) {
        e.preventDefault();
        this.props.onMoveUp(this.props.pos, this.props.value, this.props.pid);
    },
    handleMoveDown: function handleMoveDown(e) {
        e.preventDefault();
        this.props.onMoveDown(this.props.pos, this.props.value, this.props.pid);
    },
    handleDelete: function handleDelete(e) {
        e.preventDefault();
        this.props.onDelete(this.props.pos, this.props.value, this.props.pid);
    },
    handleEdit: function handleEdit(e) {
        e.preventDefault();
        var val = this.props.value;
        if (this.props.valueProp) {
            val = {};
            val[this.props.valueProp] = this.props.value;
        }

        this.props.onEdit(this.props.pos, val, this.props.pid);
    }
};
module.exports = ListItemMixin;