/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * @providesModule EventCSSTransitionGroupChild
 */

"use strict";

var React = require("react");

var CSSCore = require("react/lib/CSSCore");
var ReactTransitionEvents = require("react/lib/ReactTransitionEvents");

var onlyChild = require("react/lib/onlyChild");
var warning = require("react/lib/warning");

// We don't remove the element from the DOM until we receive an animationend or
// transitionend event. If the user screws up and forgets to add an animation
// their node will be stuck in the DOM forever, so we detect if an animation
// does not start and if it doesn't, we just call the end listener immediately.
var TICK = 17;
var NO_EVENT_TIMEOUT = 5000;

var noEventListener = null;

if ("production" !== process.env.NODE_ENV) {
    noEventListener = function () {
        "production" !== process.env.NODE_ENV ? warning(false, "transition(): tried to perform an animation without " + "an animationend or transitionend event after timeout (" + "%sms). You should either disable this " + "transition in JS or add a CSS animation/transition.", NO_EVENT_TIMEOUT) : null;
    };
}

var EventCSSTransitionGroupChild = React.createClass({
    displayName: "EventCSSTransitionGroupChild",

    transition: function transition(animationType, finishCallback) {
        var node = this.getDOMNode();
        var className = this.props.name + "-" + animationType;
        var activeClassName = className + "-active";
        var noEventTimeout = null;

        var endListener = function endListener(e) {
            if (e && e.target !== node) {
                return;
            }
            if ("production" !== process.env.NODE_ENV) {
                clearTimeout(noEventTimeout);
            }

            CSSCore.removeClass(node, className);
            CSSCore.removeClass(node, activeClassName);

            ReactTransitionEvents.removeEndEventListener(node, endListener);

            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            if (finishCallback) {
                finishCallback();
            }
        };

        ReactTransitionEvents.addEndEventListener(node, endListener);

        CSSCore.addClass(node, className);

        // Need to do this to actually trigger a transition.
        this.queueClass(activeClassName);

        if ("production" !== process.env.NODE_ENV) {
            noEventTimeout = setTimeout(noEventListener, NO_EVENT_TIMEOUT);
        }
    },

    queueClass: function queueClass(className) {
        this.classNameQueue.push(className);

        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
    },

    flushClassNameQueue: function flushClassNameQueue() {
        if (this.isMounted()) {
            this.classNameQueue.forEach(CSSCore.addClass.bind(CSSCore, this.getDOMNode()));
        }
        this.classNameQueue.length = 0;
        this.timeout = null;
    },

    componentWillMount: function componentWillMount() {
        this.classNameQueue = [];
    },

    componentWillUnmount: function componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    },

    componentWillAppear: function componentWillAppear(done) {
        var _this = this;

        if (this.props.appear || this.props.onAppear || this.props.onDidAppear) {
            this.props.onAppear && this.props.onAppear();
            this.transition("appear", this.props.onDidAppear ? function () {
                return _this.props.onDidAppear(done);
            } : done);
        } else {
            done();
        }
    },

    componentWillEnter: function componentWillEnter(done) {
        var _this2 = this;

        if (this.props.enter || this.props.onEnter || this.props.onDidEnter) {
            this.props.onEnter && this.props.onEnter();
            this.transition("enter", this.props.onDidEnter ? function () {
                return _this2.props.onDidEnter(done);
            } : done);
        } else {
            done();
        }
    },

    componentWillLeave: function componentWillLeave(done) {
        var _this3 = this;

        if (this.props.leave || this.props.onLeave || this.props.onDidLeave) {
            this.props.onLeave && this.props.onLeave();
            this.transition("leave", this.props.onDidLeave ? function () {
                return _this3.props.onDidLeave(done);
            } : done);
        } else {
            done();
        }
    },

    render: function render() {
        return onlyChild(this.props.children);
    }
});

module.exports = EventCSSTransitionGroupChild;