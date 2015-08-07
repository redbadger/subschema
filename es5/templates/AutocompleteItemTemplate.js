'use strict';

var React = require('../react');
var AutocompleteItemTemplate = React.createClass({
    displayName: 'AutocompleteItemTemplate',

    getDefaultProps: function getDefaultProps() {
        return {
            data: null,
            value: null,
            focus: false,
            onSelect: function onSelect() {}
        };
    },
    /*shouldComponentUpdate() {
     // Events never change, so return false always.
     return false;
     },*/
    handleClick: function handleClick(e) {
        e && e.preventDefault();
        this.props.onSelect(this.props.data);
    },
    render: function render() {
        var _props = this.props;
        var data = _props.data;
        var focus = _props.focus;
        var value = _props.value;
        var processor = _props.processor;

        var cls = 'addr_itm list-group-item ' + (focus ? 'focused' : '');
        var html = processor.format(data, value, true);
        return html == null ? null : React.createElement('li', { ref: 'item', className: cls, onClick: this.handleClick, dangerouslySetInnerHTML: { __html: html } });
    }
});
module.exports = AutocompleteItemTemplate;