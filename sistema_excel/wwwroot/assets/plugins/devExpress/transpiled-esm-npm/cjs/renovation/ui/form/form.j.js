"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _component = _interopRequireDefault(require("../../component_wrapper/common/component"));

var _form = require("./form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Form = /*#__PURE__*/function (_BaseComponent) {
  _inheritsLoose(Form, _BaseComponent);

  function Form() {
    return _BaseComponent.apply(this, arguments) || this;
  }

  _createClass(Form, [{
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [],
        allowNull: [],
        elements: [],
        templates: [],
        props: ["scrollingEnabled", "useNativeScrolling", "screenByWidth"]
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _form.Form;
    }
  }]);

  return Form;
}(_component.default);

exports.default = Form;
(0, _component_registrator.default)("dxForm", Form);
module.exports = exports.default;
module.exports.default = exports.default;