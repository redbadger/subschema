'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('../react');
var tu = require('../tutils');
// var autocompleteLess = require('../styles/autocomplete.less');
var BasicFieldMixin = require('../BasicFieldMixin');
var LoaderMixin = require('../LoaderMixin');
var css = require('../css');
var Dom = require('../Dom');
var Autocomplete = React.createClass({
    displayName: 'Autocomplete',

    mixins: [BasicFieldMixin, LoaderMixin],
    propTypes: {
        name: React.PropTypes.string.isRequired,
        /* processor: React.PropTypes.shape({
         fetch: React.PropTypes.func.isRequired
         }).isRequired,*/
        //optional
        onChange: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        minLength: React.PropTypes.number,
        foundCls: React.PropTypes.string,
        notFoundCls: React.PropTypes.string

    },
    statics: {
        inputClassName: 'form-control'
    },
    getDefaultProps: function getDefaultProps() {
        var self = this;
        return {
            country: 'US',
            locale: 'en_US',
            foundCls: 'found',
            notFoundCls: 'notfound',
            useshowing: true,
            minLength: 1,
            maxInputLength: 200,
            itemTemplate: 'AutocompleteItemTemplate',
            processor: {
                fetch: function fetch(url, value, component, cb) {

                    value = value && value.toLowerCase();
                    var data = (component.props.options || []).map(function (v) {
                        return {
                            label: v.label || v.val || v,
                            data: v,
                            val: v.val || v.label || v
                        };
                    }).filter(function (v) {
                        var l = ('' + v.val).toLowerCase();

                        if (l.indexOf(value) === 0) {
                            return true;
                        }

                        //                        return v.indexOf(value) === 0;
                    });

                    cb(null, data);
                },
                value: function value(obj) {
                    return obj == null ? null : obj.val || obj;
                },
                format: function format(v) {
                    return v == null ? null : v.label || v;
                }
            },
            onChange: function onChange(e) {},
            onSelect: function onSelect(e) {},
            onBlur: function onBlur() {},
            onFocus: function onFocus() {},
            onValid: function onValid() {},
            onValidate: function onValidate() {},
            showing: 'Searching...'
        };
    },
    getInitialState: function getInitialState() {
        var value = this.props.value;
        var input = this.props.input;
        return {
            suggestions: [],
            showing: false,
            focus: -1,
            input: input,
            value: value
        };
    },
    _processProps: function _processProps(props) {
        if (props.value && !props.input) {
            props.processor.fetch(props.url, props.value, this, (function (e, o) {
                if (o && o.length === 1) {
                    this.setValue(o[0]);
                } else {
                    this.setState({
                        suggestions: o,
                        showing: true
                    });
                }
            }).bind(this));
        } else if (!props.value && props.input) {
            props.processor.fetch(props.url, props.input, this, (function (e, o) {
                this.setState({
                    suggestions: o,
                    showing: true,
                    input: props.input
                });
            }).bind(this));
        }
    },
    /*  componentWillMount(){
     //        this._processProps(this.props);
     },*/
    getValue: function getValue() {
        return this.state.value;
    },
    setValue: function setValue(v) {
        var p = this.processor();
        var value = p.value(v);
        var input = p.format(v);
        var length = input && input.length || 0;
        var refs = this.refs;
        this.setState({
            value: value,
            selected: v,
            input: input,
            showing: false,
            suggestions: []
        }, function () {});
    },
    /**
     * Hide could be called when a user has not selected a value.
     *
     * If their is a selected value and input equals its label select it.
     * So if there is only 1 selection select it.
     * If
     */
    hide: function hide(selectValue) {
        var _state = this.state;
        var selected = _state.selected;
        var input = _state.input;
        var suggestions = _state.suggestions;
        var focus = _state.focus;var i = 0;var l;var options;var found = false;
        if (selectValue) {

            var p = this.getProcessor();
            if (selectValue && focus > -1) {

                selected = suggestions[focus];
            } else if (input == null || input.trim() === '') {
                selected = null;
                input = null;
            } else if (!selected || input !== selected.label) {
                if (suggestions.length === 1) {
                    selected = suggestions[0];
                    input = selected.label;
                } else {
                    selected = null;
                    options = suggestions;
                    l = options.length;
                    for (; i < l; i++) {
                        var opt = options[i];
                        if (opt.label === input) {
                            selected = opt;
                            input = opt.label;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        input = null;
                    }
                }
            }
            if (selected !== this.state.selected) {
                this.onSelect(selected);
            } else {
                this.props.onValidate(selected && selected.val, this.props.value, this.props.name, this.props.path);
                this.setState({ suggestions: [], selected: selected, input: input, showing: false, focus: -1 });
            }
        } else {
            this.setState({ showing: false, focus: -1, suggestions: [] });
        }
        //        this.props.onBlur();
    },
    componentWillUnmount: function componentWillUnmount() {
        this.unbindDocument();
    },
    componentWillMount: function componentWillMount() {
        this._processProps(this.props);
    },
    componentDidMount: function componentDidMount() {
        this.bindDocument();
    },
    bindDocument: function bindDocument() {
        this.unbindDocument();
        this._onDocumentClickListener = Dom.listen(this, 'click', this.handleDocumentClick);

        this._onDocumentKeyupListener = Dom.listen(this, 'keyup', this.handleDocumentKeyUp);

        this._onDocumentKeydownListener = Dom.listen(this, 'keypress', this.handleDocumentEnter);
    },

    unbindDocument: function unbindDocument() {
        if (this._onDocumentClickListener) {
            this._onDocumentClickListener.remove();
        }

        if (this._onDocumentKeyupListener) {
            this._onDocumentKeyupListener.remove();
        }
        if (this._onDocumentKeydownListener) {
            this._onDocumentKeydownListener.remove();
        }
    },
    handleDocumentEnter: function handleDocumentEnter(e) {
        //        console.log('keyUp', e.key);
        if (e.keyCode === 13 && this.state.suggestions.length) {
            e.preventDefault();
            e.stopPropagation();
            this.hide(true);
        }
    },
    handleDocumentKeyUp: function handleDocumentKeyUp(e) {

        if (e.keyCode === 27) {
            this.hide(false);
        }
    },

    handleDocumentClick: function handleDocumentClick(e) {
        // If the click originated from within this component
        // don't do anything.
        if (Dom.isNodeInRoot(e.target, React.findDOMNode(this))) {
            return;
        }

        this.hide(false);
    },

    getProcessor: function getProcessor() {
        return this.processor();
    },

    handleSuggestionClick: function handleSuggestionClick(o) {
        this.onSelect(o);
    },
    onSelect: function onSelect(o) {
        if (this.props.onSelect(o) === false) {
            return;
        }
        var p = this.getProcessor();
        var value = p.value(o);
        if (this.props.handleChange.call(this.props, value) !== false) {
            this.setState({
                suggestions: [],
                showing: false,
                focus: -1,
                selected: o,
                value: value,
                input: p.format(o)
            });
        }
    },
    _handleDispatch: function _handleDispatch(value) {
        var _this = this;

        this.setState({
            input: value,
            selected: null
        });

        if (this._fetch && this._fetch.cancel) {
            this._fetch.cancel();
        }
        this._fetch = this.getProcessor().fetch(this.props.url, value, this, function (err, suggestions) {
            if (err) {
                return;
            }
            _this.setState({
                suggestions: suggestions,
                showing: true,
                input: value
            });
        });
    },

    handleKeyUp: function handleKeyUp(e) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp.call(this, e);
        }
        var focus = this.state.focus,
            s = this.state.suggestions;
        if (s.length) {
            var update = false;
            switch (e.key || e.keyCode) {
                case 'Up':
                case 38:
                case 'ArrowUp':
                    {
                        focus = Math.max(-1, focus - 1);
                        update = true;
                        break;
                    }
                case 40:
                case 'Down':
                case 'ArrowDown':
                    {
                        focus = Math.min(s.length, focus + 1);
                        update = true;
                        break;
                    }
                case 'Enter':
                    {
                        if (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        if (this.state.suggestions.length) {
                            this.handleSuggestionClick(this.state.suggestions[Math.max(this.state.focus, 0)]);
                            this.setState({ suggestions: [], showing: false, focus: -1 });

                            return;
                        }
                        this.hide();
                        break;
                    }
            }
            if (update) {
                //e.preventDefault();
                this.setState({ focus: focus });
            }
        }
    },

    renderSuggestions: function renderSuggestions() {
        var suggestions = this.state.suggestions;
        if (this.state.showing === false || suggestions.length === 0) {

            return null;
        }
        this.bindDocument();
        var _state2 = this.state;
        var focus = _state2.focus;
        var input = _state2.input;

        var processor = this.processor();
        var handleSuggestionClick = this.handleSuggestionClick;
        var CompleteItem = this.template('itemTemplate');
        return React.createElement(
            'ul',
            { className: 'list-group' },
            suggestions.map(function (item, i) {
                return React.createElement(CompleteItem, {
                    key: item.val,
                    focus: focus === i,
                    value: input,
                    ref: 'item_' + i,
                    processor: processor,
                    onSelect: handleSuggestionClick,
                    data: item });
            })
        );
    },

    handleChange: function handleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        this._handleDispatch(e.target.value);
    },

    handlePaste: function handlePaste(event) {
        var items = event.clipboardData && event.clipboardData.items;
        items && items[0] && items[0].getAsString(this._handleKey.bind(this));
    },
    handleBlur: function handleBlur(event) {
        if (this.state.suggestions.length === 1 && !this.state.showing && !this.state.selected) {
            this.handleSuggestionClick(this.state.suggestions[Math.max(0, this.state.focus)]);
        } else {
            this.handleInvalid();
        }
        this.props.onBlur.call(this, event);
    },
    handleInvalid: function handleInvalid() {},

    createInput: function createInput(props) {
        if (this.props.children && this.props.children.length) {
            var handleDispatch = this._handleDispatch;
            return React.Children.map(this.props.children, function (child, idx) {
                if (child.props.onValueChange) {
                    var onChange = props.onChange;

                    var nprops = _objectWithoutProperties(props, ['onChange']);

                    var onChildChange = child.props.onChange;
                    nprops.onValueChange = function (val) {
                        handleDispatch(val);
                    };
                    /*nprops.onChange = function (e) {
                     this.handleChange(e.target.value);
                     onChildChange && onChildChange.call(this, e);
                     }*/
                    return React.cloneElement(child, nprops);
                } else {
                    return React.cloneElement(child, props);
                }
            });
        }
        var valueManager = props.valueManager;
        var inputType = props.inputType;
        var type = props.type;

        var cprops = _objectWithoutProperties(props, ['valueManager', 'inputType', 'type']);

        if (inputType) {
            var Input = this.props.loader.loadType(inputType);
            return React.createElement(Input, _extends({}, cprops, { ref: 'input', value: this.state.input }));
        }

        return React.createElement('input', _extends({
            id: cprops.name,
            type: 'text'
        }, cprops, {
            ref: 'input',
            value: this.state.input,
            className: css.forField(this)

        }));
    },
    render: function render() {
        var suggestions = this.state.suggestions;
        var _props = this.props;
        var onChange = _props.onChange;
        var onPaste = _props.onPaste;
        var children = _props.children;
        var fieldAttrs = _props.fieldAttrs;
        var field = _props.field;
        var value = _props.value;
        var onBlur = _props.onBlur;
        var notFoundCls = _props.notFoundCls;
        var foundCls = _props.foundCls;
        var minLength = _props.minLength;
        var maxInputLength = _props.maxInputLength;
        var onSelect = _props.onSelect;
        var processor = _props.processor;
        var onValid = _props.onValid;
        var onValidate = _props.onValidate;
        var country = _props.country;
        var locale = _props.locale;
        var useshowing = _props.useshowing;
        var itemTemplate = _props.itemTemplate;
        var onKeyUp = _props.onKeyUp;

        var props = _objectWithoutProperties(_props, ['onChange', 'onPaste', 'children', 'fieldAttrs', 'field', 'value', 'onBlur', 'notFoundCls', 'foundCls', 'minLength', 'maxInputLength', 'onSelect', 'processor', 'onValid', 'onValidate', 'country', 'locale', 'useshowing', 'itemTemplate', 'onKeyUp']);

        props.onChange = this.handleChange;
        props.onPaste = this.handlePaste;
        props.onKeyDown = this.handleKeyUp;
        props.onBlur = this.handleBlur;
        return React.createElement(
            'div',
            _extends({
                className: 'autocomplete ' + (suggestions.length > 0 ? foundCls : notFoundCls) }, fieldAttrs),
            this.createInput(props),
            this.renderSuggestions()
        );
    }

});

module.exports = Autocomplete;

//            refs && refs.input && refs.input.getDOMNode().setSelectionRange(length, length);