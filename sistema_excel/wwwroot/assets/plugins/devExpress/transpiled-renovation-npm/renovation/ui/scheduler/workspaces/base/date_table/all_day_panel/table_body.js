"use strict";

exports.viewFunction = exports.AllDayPanelTableBodyProps = exports.AllDayPanelTableBody = void 0;

var _inferno = require("inferno");

var _inferno2 = require("@devextreme/runtime/inferno");

var _row = require("../../row");

var _cell = require("./cell");

var _combine_classes = require("../../../../../../utils/combine_classes");

var _excluded = ["className", "dataCellTemplate", "isVerticalGroupOrientation", "leftVirtualCellCount", "leftVirtualCellWidth", "rightVirtualCellCount", "rightVirtualCellWidth", "viewData"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  return (0, _inferno.createComponentVNode)(2, _row.Row, {
    "leftVirtualCellWidth": viewModel.props.leftVirtualCellWidth,
    "rightVirtualCellWidth": viewModel.props.rightVirtualCellWidth,
    "leftVirtualCellCount": viewModel.props.leftVirtualCellCount,
    "rightVirtualCellCount": viewModel.props.rightVirtualCellCount,
    "className": viewModel.classes,
    children: viewModel.props.viewData.map(function (_ref) {
      var endDate = _ref.endDate,
          cellGroupIndex = _ref.groupIndex,
          groups = _ref.groups,
          cellIndex = _ref.index,
          isFirstGroupCell = _ref.isFirstGroupCell,
          isFocused = _ref.isFocused,
          isLastGroupCell = _ref.isLastGroupCell,
          isSelected = _ref.isSelected,
          key = _ref.key,
          startDate = _ref.startDate;
      return (0, _inferno.createComponentVNode)(2, _cell.AllDayPanelCell, {
        "isFirstGroupCell": !viewModel.props.isVerticalGroupOrientation && isFirstGroupCell,
        "isLastGroupCell": !viewModel.props.isVerticalGroupOrientation && isLastGroupCell,
        "startDate": startDate,
        "endDate": endDate,
        "groups": groups,
        "groupIndex": cellGroupIndex,
        "index": cellIndex,
        "dataCellTemplate": viewModel.props.dataCellTemplate,
        "isSelected": isSelected,
        "isFocused": isFocused
      }, key);
    })
  });
};

exports.viewFunction = viewFunction;
var AllDayPanelTableBodyProps = Object.defineProperties({
  isVerticalGroupOrientation: false,
  className: "",
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0
}, {
  viewData: {
    get: function get() {
      return [];
    },
    configurable: true,
    enumerable: true
  }
});
exports.AllDayPanelTableBodyProps = AllDayPanelTableBodyProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var AllDayPanelTableBody = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(AllDayPanelTableBody, _BaseInfernoComponent);

  function AllDayPanelTableBody(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = AllDayPanelTableBody.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  };

  _createClass(AllDayPanelTableBody, [{
    key: "classes",
    get: function get() {
      var className = this.props.className;
      return (0, _combine_classes.combineClasses)(_defineProperty({
        "dx-scheduler-all-day-table-row": true
      }, className, !!className));
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          className = _this$props.className,
          dataCellTemplate = _this$props.dataCellTemplate,
          isVerticalGroupOrientation = _this$props.isVerticalGroupOrientation,
          leftVirtualCellCount = _this$props.leftVirtualCellCount,
          leftVirtualCellWidth = _this$props.leftVirtualCellWidth,
          rightVirtualCellCount = _this$props.rightVirtualCellCount,
          rightVirtualCellWidth = _this$props.rightVirtualCellWidth,
          viewData = _this$props.viewData,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return AllDayPanelTableBody;
}(_inferno2.BaseInfernoComponent);

exports.AllDayPanelTableBody = AllDayPanelTableBody;
AllDayPanelTableBody.defaultProps = AllDayPanelTableBodyProps;