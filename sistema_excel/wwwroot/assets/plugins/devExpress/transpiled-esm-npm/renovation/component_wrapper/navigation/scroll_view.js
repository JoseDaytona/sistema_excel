"use strict";

exports.ScrollViewWrapper = void 0;

var _component = _interopRequireDefault(require("../common/component"));

var _deferred = require("../../../core/utils/deferred");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ScrollViewWrapper = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ScrollViewWrapper, _Component);

  function ScrollViewWrapper() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ScrollViewWrapper.prototype;

  _proto.update = function update() {
    var _this$viewRef;

    (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.updateHandler();
    return (0, _deferred.Deferred)().resolve();
  };

  _proto.release = function release(preventScrollBottom) {
    this.viewRef.release(preventScrollBottom);
    return (0, _deferred.Deferred)().resolve();
  };

  _proto._optionChanged = function _optionChanged(option) {
    var name = option.name;

    if (name === "useNative") {
      this._isNodeReplaced = false;
    }

    _Component.prototype._optionChanged.call(this, option);
  };

  return ScrollViewWrapper;
}(_component.default);

exports.ScrollViewWrapper = ScrollViewWrapper;