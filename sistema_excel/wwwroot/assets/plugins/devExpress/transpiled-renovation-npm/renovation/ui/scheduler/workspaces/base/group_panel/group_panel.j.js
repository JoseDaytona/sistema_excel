"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../../../../core/component_registrator"));

var _component = _interopRequireDefault(require("../../../../../component_wrapper/common/component"));

var _group_panel = require("./group_panel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GroupPanel = /*#__PURE__*/function (_BaseComponent) {
  _inheritsLoose(GroupPanel, _BaseComponent);

  function GroupPanel() {
    return _BaseComponent.apply(this, arguments) || this;
  }

  _createClass(GroupPanel, [{
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [],
        allowNull: [],
        elements: [],
        templates: ["resourceCellTemplate"],
        props: ["groups", "groupOrientation", "groupPanelData", "groupByDate", "height", "className", "resourceCellTemplate"]
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _group_panel.GroupPanel;
    }
  }]);

  return GroupPanel;
}(_component.default);

exports.default = GroupPanel;
(0, _component_registrator.default)("dxGroupPanel", GroupPanel);
module.exports = exports.default;
module.exports.default = exports.default;