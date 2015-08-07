'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var LazyType = React.createClass({
    displayName: 'LazyType',

    mixins: [require('../LoaderMixin')],
    getInitialState: function getInitialState() {
        return {
            loaded: false
        };
    },
    componentWillMount: function componentWillMount() {

        var promise = this.props.promise;
        promise && promise.then(this.onResolve);
    },
    onResolve: function onResolve(resolved) {
        this.setState({ resolved: resolved, loaded: true });
    },
    render: function render() {
        if (this.state.loaded) {
            var Type = this.state.resolved;
            var _props = this.props;
            var promise = _props.promise;

            var props = _objectWithoutProperties(_props, ['promise']);

            return React.createElement(Type, _extends({ key: 'resolved' }, props));
        }
        return React.createElement('span', { className: 'lazy-loading-type', key: 'unresolved' });
    }
});
module.exports = LazyType;