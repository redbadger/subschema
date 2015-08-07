'use strict';

var util = require('./tutils'),
    loader = require('./loader');
var LoaderMixin = {
    getDefaultProps: function getDefaultProps() {
        return {
            loader: loader
        };
    },
    template: function template(_template) {
        _template = arguments.length ? _template : 'template';
        _template = this.props.field && _template in this.props.field ? this.props.field[_template] : _template in this.props ? this.props[_template] : _template;
        if (util.isString(_template)) {
            return this.props.loader.loadTemplate(_template, this.props);
        }
        return _template === false ? null : _template;
    },

    processor: function processor(_processor) {
        _processor = arguments.length ? _processor : 'processor';
        _processor = this.props.field && _processor in this.props.field ? this.props.field[_processor] : _processor in this.props ? this.props[_processor] : _processor;
        if (util.isString(_processor)) {
            return this.props.loader.loadProcessor(_processor, this.props);
        }
        return _processor === false ? null : _processor;
    }

};
module.exports = LoaderMixin;