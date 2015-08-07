'use strict';

var FieldValueDefaultPropsMixin = {
    getDefaultProps: function getDefaultProps() {
        return {
            title: '',
            name: '',
            placeholder: '',
            dataType: this.dataType,
            editorClass: '',
            field: {},
            onValidate: function onValidate() {},
            onFocus: function onFocus() {},
            onBlur: function onBlur() {},
            onValid: function onValid() {},
            onChange: function onChange() {}
        };
    }
};
module.exports = FieldValueDefaultPropsMixin;