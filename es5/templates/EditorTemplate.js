'use strict';

var React = require('../react');
var css = require('../css');
var EditorTemplate = React.createClass({
    displayName: 'EditorTemplate',
    componentWillMount: function componentWillMount() {
        this.props.valueManager.addErrorListener(this.props.path, this.setError, this, true);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.props.valueManager.removeErrorListener(this.props.path, this.setError);
    },
    setError: function setError(errors) {
        this.setState({
            error: errors && errors[0].message
        });
    },
    render: function render() {
        var _props = this.props;
        var name = _props.name;
        var title = _props.title;
        var help = _props.help;
        var errorClassName = _props.errorClassName;
        var message = _props.message;
        var fieldClass = _props.fieldClass;
        var children = _props.children;

        var error = this.state.error;
        return React.createElement(
            'div',
            {
                className: 'form-group field-name ' + (error != null ? errorClassName || '' : '') + ' ' + css.forEditor(this) },
            title ? React.createElement(
                'label',
                { className: 'col-sm-2 control-label', htmlFor: name },
                React.createElement('span', { dangerouslySetInnerHTML: { __html: title } })
            ) : null,
            React.createElement(
                'div',
                { className: 'col-sm-10' },
                children,
                React.createElement(
                    'p',
                    { className: 'help-block', ref: 'help' },
                    error || help
                )
            )
        );
    }
});
module.exports = EditorTemplate;