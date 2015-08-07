'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react');
var Form = require('../form');
var tu = require('../tutils');
var NestedMixin = require('../NestedMixin');
// var css = require('../styles/wizard.less');
var ButtonsTemplate = require('./ButtonsTemplate.js');
//var TimeoutTransitionGroup = require('../transition/TimeoutTransitionGroup.js');
var EventCSSTransitionGroup = require('../transition/EventCSSTransitionGroup.js');
var CSSCore = require('react/lib/CSSCore');
var LoaderMixin = require('../LoaderMixin');

function donner(done) {
    done();
}

var WizardTemplate = React.createClass({
    mixins: [LoaderMixin],
    displayName: 'WizardTemplate',
    getDefaultProps: function getDefaultProps() {
        return {
            wizardProgressTemplate: 'WizardProgressTemplate',
            onNext: donner,
            onPrevious: donner,
            onAction: function onAction(pos, action, wizard) {},
            onNavChange: function onNavChange(current, previous, wizard) {},
            onDone: donner
        };
    },
    getInitialState: function getInitialState() {
        var _props = this.props;
        var schema = _props.schema;
        var subSchema = _props.subSchema;
        var fields = _props.fields;

        var props = _objectWithoutProperties(_props, ['schema', 'subSchema', 'fields']);

        schema = NestedMixin.normalizeSchema(schema || subSchema);
        this.schema = schema.schema ? schema : { schema: schema, fields: fields };
        return {
            compState: 0,
            prevState: 0,
            maxState: 0
        };
    },

    next: function next() {
        var _this = this;

        var compState = this.state.compState,
            current = this.schema.fieldsets[compState],
            next = compState + 1;
        this.setState({ disabled: true });
        this._validate(function (e) {
            if (e) {
                _this.setState({ disabled: false });
                return;
            }
            if (_this.props.onNext(function (resp) {
                return _this.go(next, resp);
            }, next, current) === false) {
                _this.setState({ disabled: false, maxState: Math.max(next, _this.state.maxState) });
                return;
            }
        });
    },
    previous: function previous() {
        var _this2 = this;

        var compState = this.state.compState,
            current = this.schema.fieldsets[compState],
            next = compState - 1;
        this.setState({ disabled: true });

        if (this.props.onPrevious(function (resp) {
            return _this2.go(next, resp);
        }, next, current) === false) {
            this.setState({ disabled: false });
            return;
        }
    },
    go: function go(pos, resp) {
        if (resp === false) {
            this.setState({ disabled: false });
            return;
        }
        this.setNavState(resp == null ? pos : resp);
    },
    _validate: function _validate(done) {
        this.props.valueManager.validatePaths(this.schema.fieldsets[this.state.compState].fields, done);
    },

    setNavState: function setNavState(next) {

        var len = this.schema.fieldsets.length,
            compState = this.state.compState;
        next = Math.max(Math.min(len - 1, next), 0);
        if (this.props.onNavChange(next, compState, this.schema.fieldsets[next]) !== false) {
            this.setState({
                compState: next,
                disabled: false,
                prevState: next === compState ? this.state.prevState : compState
            });
        }
    },

    handleOnClick: function handleOnClick(evt) {
        var steps = this.schema.fieldsets.length,
            value = evt.target.value;
        if (value < steps && value <= this.state.maxState) {
            this.setNavState(value, true);
        }
    },

    handleKeyDown: function handleKeyDown(e) {
        if (e.which === 13) {
            if (this.state.compState < this.schema.fieldsets.length - 1) {
                return this.handleBtn(e, 'next');
            } else {
                return this.handleBtn(e, 'submit');
            }
        }
    },
    handleValidate: function handleValidate() {},
    handleSubmit: function handleSubmit(e) {
        var _this3 = this;

        this._validate(function (errors) {
            if (!errors && _this3.props.onDone(function (submit) {
                if (submit !== false) {
                    _this3.props.onSubmit(e, errors, _this3.props.valueManager.getValue());
                }
            }, e, _this3.schema.fieldsets[_this3.state.compState]) === false) {
                return;
            }
        });
    },

    /* renderState(compState){
     var schema = tu.extend({}, this.schema.schema);
     var fields = this.schema.fieldsets[compState].fields;
      return <Form ref="form" key={"key-"+compState} schema={{
     schema,
     fields
     }} onSubmit={this.handleSubmit}
     valueManager={this.props.valueManager}>
      {this.renderBtns(compState)}
     </Form>
     },*/
    renderBtns: function renderBtns(compState) {
        var buttons = this.schema.fieldsets[compState].buttons;
        if (!buttons && buttons !== false) {
            buttons = [];
            var isFirst = compState === 0,
                isLast = compState === this.schema.fieldsets.length - 1;
            if (!isFirst) {
                buttons.push({
                    label: 'Previous',
                    action: 'previous'
                });
            }
            if (isLast) {
                buttons.push({
                    label: 'Done',
                    action: 'submit',
                    buttonClass: 'btn-primary'
                });
            } else {
                buttons.push({
                    label: 'Next',
                    action: 'next',
                    buttonClass: 'btn-primary'
                });
            }
        }
        if (buttons) {
            buttons.forEach(function (b) {
                if (b.action === 'next' || b.action === 'submit') {
                    b.disabled = this.disabled;
                }
            }, this.state);
        }
        return React.createElement(ButtonsTemplate, { key: 'btn-' + compState, buttons: buttons, onClick: this.handleBtn });
    },
    handleBtn: function handleBtn(e, action, btn) {
        e && e.preventDefault();
        switch (action) {

            case 'previous':
                {
                    this.previous();
                    break;
                }
            case 'next':
                {
                    this.next();
                    break;
                }
            case 'submit':
                {
                    this.handleSubmit(e);
                    break;
                }
            default:
                {
                    this.props.onAction(this.state.compState, action, this);
                }
        }
    },
    handleEnter: function handleEnter() {
        CSSCore.addClass(this.refs.anim.getDOMNode(), 'overflow-hidden');
    },
    handleLeave: function handleLeave(done) {
        CSSCore.removeClass(this.refs.anim.getDOMNode(), 'overflow-hidden');
        done();
    },
    renderProgress: function renderProgress(fieldsets) {
        if (this.props.wizardProgressTemplate === false) {
            return null;
        }
        var Template = this.props.loader.loadTemplate(this.props.wizardProgressTemplate);
        if (!Template) {
            return null;
        }
        return React.createElement(Template, { fieldsets: fieldsets, valueManager: this.props.valueManager, index: this.state.compState,
            onClick: this.handleOnClick });
    },
    render: function render() {

        var fieldsets = this.schema.fieldsets,
            schema = tu.extend({}, this.schema.schema),
            compState = this.state.compState,
            fields = fieldsets[compState].fields,
            transition = compState < this.state.prevState ? 'wizardSwitchBack' : 'wizardSwitch';

        return React.createElement(
            'div',
            { className: 'wizard-container', onKeyDown: this.handleKeyDown },
            this.renderProgress(fieldsets),
            React.createElement(
                EventCSSTransitionGroup,
                { ref: 'anim', transitionName: transition, transitionEnter: true,
                    transitionLeave: true,
                    className: 'slide-container', onEnter: this.handleEnter,
                    onDidLeave: this.handleLeave },
                React.createElement(
                    Form,
                    { ref: 'form',
                        className: 'compState w' + compState,
                        key: 'form-' + compState,
                        schema: { schema: schema, fields: fields },
                        onSubmit: this.handleSubmit,
                        valueManager: this.props.valueManager },
                    this.renderBtns(compState)
                )
            )
        );
    }
});

module.exports = WizardTemplate;