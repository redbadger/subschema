'use strict';

var React = require('react');
// var WizardProgressLess = require('../styles/wizard-progress.less');
var WizardProgressTemplate = React.createClass({
    displayName: 'WizardProgressTemplate',

    getDefaultProps: function getDefaultProps() {
        return {
            index: 0,
            done: 'progtrckr-done',
            todo: 'progtrckr-todo',
            doing: 'progtrckr-doing',
            fieldsets: [],
            onClick: function onClick(e) {}
        };
    },
    getStyle: function getStyle(i) {
        var length = this.props.fieldsets.length,
            indx = this.props.index;
        if (i < indx || indx == length) {
            return this.props.done;
        } else if (i === indx) {
            return this.props.doing;
        }

        return this.props.todo;
    },
    render: function render() {
        var _this = this;

        return React.createElement(
            'ol',
            { className: 'progtrckr' },
            this.props.fieldsets.map(function (s, i) {
                return React.createElement(
                    'li',
                    { value: i, key: 'li' + i,
                        className: _this.getStyle(i),
                        onClick: _this.props.onClick },
                    React.createElement(
                        'em',
                        null,
                        i + 1
                    ),
                    React.createElement(
                        'span',
                        null,
                        s.legend
                    )
                );
            })
        );
    }
});

module.exports = WizardProgressTemplate;