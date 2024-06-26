"use strict";

exports.viewFunction = exports.ScrollableSimulated = void 0;

var _inferno = require("inferno");

var _inferno2 = require("@devextreme/runtime/inferno");

require("../../../../events/gesture/emitter.gesture.scroll");

var _subscribe_to_event = require("../../../utils/subscribe_to_event");

var _load_panel = require("../internal/load_panel");

var _animated_scrollbar = require("../scrollbar/animated_scrollbar");

var _widget = require("../../common/widget");

var _combine_classes = require("../../../utils/combine_classes");

var _get_offset_distance = require("../utils/get_offset_distance");

var _get_boundary_props = require("../utils/get_boundary_props");

var _get_permissible_wheel_direction = require("../utils/get_permissible_wheel_direction");

var _index = require("../../../../events/utils/index");

var _type = require("../../../../core/utils/type");

var _simulated_strategy_props = require("../common/simulated_strategy_props");

var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));

var _scroll_direction = require("../utils/scroll_direction");

var _consts = require("../common/consts");

var _get_element_offset = require("../../../utils/get_element_offset");

var _get_element_style = require("../utils/get_element_style");

var _top = require("../internal/pocket/top");

var _bottom = require("../internal/pocket/bottom");

var _get_device_pixel_ratio = require("../utils/get_device_pixel_ratio");

var _is_element_visible = require("../utils/is_element_visible");

var _get_translate_values = require("../utils/get_translate_values");

var _clamp_into_range = require("../utils/clamp_into_range");

var _get_allowed_direction = require("../utils/get_allowed_direction");

var _subscribe_to_resize = require("../utils/subscribe_to_resize");

var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));

var _excluded = ["addWidgetClass", "aria", "bounceEnabled", "children", "classes", "direction", "disabled", "forceGeneratePockets", "height", "inertiaEnabled", "needRenderScrollbars", "needScrollViewContentWrapper", "needScrollViewLoadPanel", "onBounce", "onEnd", "onPullDown", "onReachBottom", "onScroll", "onStart", "onUpdated", "onVisibilityChange", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshStrategy", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "scrollLocationChange", "showScrollbar", "useKeyboard", "visible", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  var bottomPocketHeight = viewModel.bottomPocketHeight,
      bottomPocketRef = viewModel.bottomPocketRef,
      containerClientHeight = viewModel.containerClientHeight,
      containerClientWidth = viewModel.containerClientWidth,
      containerHasSizes = viewModel.containerHasSizes,
      containerRef = viewModel.containerRef,
      containerStyles = viewModel.containerStyles,
      contentHeight = viewModel.contentHeight,
      contentPaddingBottom = viewModel.contentPaddingBottom,
      contentRef = viewModel.contentRef,
      contentStyles = viewModel.contentStyles,
      contentWidth = viewModel.contentWidth,
      cssClasses = viewModel.cssClasses,
      direction = viewModel.direction,
      hScrollLocation = viewModel.hScrollLocation,
      hScrollOffsetMax = viewModel.hScrollOffsetMax,
      hScrollbarRef = viewModel.hScrollbarRef,
      handleKeyDown = viewModel.handleKeyDown,
      hovered = viewModel.hovered,
      isLoadPanelVisible = viewModel.isLoadPanelVisible,
      lock = viewModel.lock,
      onBounce = viewModel.onBounce,
      onEnd = viewModel.onEnd,
      onPullDown = viewModel.onPullDown,
      onReachBottom = viewModel.onReachBottom,
      pendingPointerUp = viewModel.pendingPointerUp,
      _viewModel$props = viewModel.props,
      aria = _viewModel$props.aria,
      bounceEnabled = _viewModel$props.bounceEnabled,
      children = _viewModel$props.children,
      disabled = _viewModel$props.disabled,
      forceGeneratePockets = _viewModel$props.forceGeneratePockets,
      height = _viewModel$props.height,
      inertiaEnabled = _viewModel$props.inertiaEnabled,
      needRenderScrollbars = _viewModel$props.needRenderScrollbars,
      needScrollViewContentWrapper = _viewModel$props.needScrollViewContentWrapper,
      needScrollViewLoadPanel = _viewModel$props.needScrollViewLoadPanel,
      onVisibilityChange = _viewModel$props.onVisibilityChange,
      pullDownEnabled = _viewModel$props.pullDownEnabled,
      pulledDownText = _viewModel$props.pulledDownText,
      pullingDownText = _viewModel$props.pullingDownText,
      reachBottomEnabled = _viewModel$props.reachBottomEnabled,
      reachBottomText = _viewModel$props.reachBottomText,
      refreshStrategy = _viewModel$props.refreshStrategy,
      refreshingText = _viewModel$props.refreshingText,
      rtlEnabled = _viewModel$props.rtlEnabled,
      scrollByThumb = _viewModel$props.scrollByThumb,
      showScrollbar = _viewModel$props.showScrollbar,
      useKeyboard = _viewModel$props.useKeyboard,
      visible = _viewModel$props.visible,
      width = _viewModel$props.width,
      pulledDown = viewModel.pulledDown,
      restAttributes = viewModel.restAttributes,
      scrollLocationChange = viewModel.scrollLocationChange,
      scrollViewContentRef = viewModel.scrollViewContentRef,
      scrollableRef = viewModel.scrollableRef,
      scrolling = viewModel.scrolling,
      topPocketRef = viewModel.topPocketRef,
      topPocketState = viewModel.topPocketState,
      unlock = viewModel.unlock,
      vScrollLocation = viewModel.vScrollLocation,
      vScrollOffsetMax = viewModel.vScrollOffsetMax,
      vScrollOffsetMin = viewModel.vScrollOffsetMin,
      vScrollbarRef = viewModel.vScrollbarRef,
      wrapperRef = viewModel.wrapperRef;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
    "rootElementRef": scrollableRef,
    "focusStateEnabled": useKeyboard,
    "aria": aria,
    "addWidgetClass": false,
    "classes": cssClasses,
    "disabled": disabled,
    "rtlEnabled": rtlEnabled,
    "height": height,
    "width": width,
    "visible": visible,
    "onVisibilityChange": onVisibilityChange
  }, restAttributes, {
    "onKeyDown": useKeyboard ? handleKeyDown : undefined,
    children: [(0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_WRAPPER_CLASS, (0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_CONTAINER_CLASS, [(0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_CONTENT_CLASS, [forceGeneratePockets && (0, _inferno.createComponentVNode)(2, _top.TopPocket, {
      "topPocketRef": topPocketRef,
      "pullingDownText": pullingDownText,
      "pulledDownText": pulledDownText,
      "refreshingText": refreshingText,
      "refreshStrategy": refreshStrategy,
      "pocketState": topPocketState,
      "visible": !!pullDownEnabled
    }), needScrollViewContentWrapper ? (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_CONTENT_CLASS, children, 0, null, null, scrollViewContentRef) : children, forceGeneratePockets && (0, _inferno.createComponentVNode)(2, _bottom.BottomPocket, {
      "bottomPocketRef": bottomPocketRef,
      "reachBottomText": reachBottomText,
      "visible": !!reachBottomEnabled
    })], 0, {
      "style": (0, _inferno2.normalizeStyles)(contentStyles)
    }, null, contentRef), needRenderScrollbars && direction.isHorizontal && (0, _inferno.createComponentVNode)(2, _animated_scrollbar.AnimatedScrollbar, {
      "direction": "horizontal",
      "contentSize": contentWidth,
      "containerSize": containerClientWidth,
      "visible": hovered || scrolling || pendingPointerUp,
      "minOffset": 0,
      "maxOffset": hScrollOffsetMax,
      "scrollLocation": hScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "onEnd": onEnd,
      "containerHasSizes": containerHasSizes,
      "rtlEnabled": rtlEnabled
    }, null, hScrollbarRef), needRenderScrollbars && direction.isVertical && (0, _inferno.createComponentVNode)(2, _animated_scrollbar.AnimatedScrollbar, {
      "direction": "vertical",
      "contentSize": contentHeight,
      "containerSize": containerClientHeight,
      "visible": hovered || scrolling || pendingPointerUp,
      "minOffset": vScrollOffsetMin,
      "maxOffset": vScrollOffsetMax,
      "scrollLocation": vScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "onEnd": onEnd,
      "containerHasSizes": containerHasSizes,
      "forceGeneratePockets": forceGeneratePockets,
      "bottomPocketSize": bottomPocketHeight,
      "contentPaddingBottom": contentPaddingBottom,
      "pulledDown": pulledDown,
      "onPullDown": onPullDown,
      "onReachBottom": onReachBottom,
      "pullDownEnabled": pullDownEnabled,
      "reachBottomEnabled": reachBottomEnabled,
      "onLock": lock,
      "onUnlock": unlock
    }, null, vScrollbarRef)], 0, {
      "style": (0, _inferno2.normalizeStyles)(containerStyles)
    }, null, containerRef), 2, null, null, wrapperRef), needScrollViewLoadPanel && (0, _inferno.createComponentVNode)(2, _load_panel.ScrollViewLoadPanel, {
      "targetElement": scrollableRef,
      "refreshingText": refreshingText,
      "visible": isLoadPanelVisible
    })]
  })));
};

exports.viewFunction = viewFunction;

var ScrollableSimulated = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(ScrollableSimulated, _InfernoComponent);

  function ScrollableSimulated(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.scrollableRef = (0, _inferno.createRef)();
    _this.topPocketRef = (0, _inferno.createRef)();
    _this.bottomPocketRef = (0, _inferno.createRef)();
    _this.wrapperRef = (0, _inferno.createRef)();
    _this.contentRef = (0, _inferno.createRef)();
    _this.scrollViewContentRef = (0, _inferno.createRef)();
    _this.containerRef = (0, _inferno.createRef)();
    _this.vScrollbarRef = (0, _inferno.createRef)();
    _this.hScrollbarRef = (0, _inferno.createRef)();
    _this.locked = false;
    _this.loadingIndicatorEnabled = true;
    _this.validDirections = {};
    _this.endActionDirections = {
      horizontal: false,
      vertical: false
    };
    _this.savedScrollOffset = {
      scrollTop: 0,
      scrollLeft: 0
    };
    _this.__getterCache = {};
    _this.state = {
      hovered: false,
      scrolling: false,
      containerClientWidth: 0,
      containerClientHeight: 0,
      contentScrollWidth: 0,
      contentScrollHeight: 0,
      contentClientWidth: 0,
      contentClientHeight: 0,
      contentPaddingBottom: 0,
      topPocketHeight: 0,
      bottomPocketHeight: 0,
      topPocketState: _consts.TopPocketState.STATE_RELEASED,
      isLoadPanelVisible: false,
      pendingPointerUp: false,
      vScrollLocation: 0,
      hScrollLocation: 0
    };
    _this.content = _this.content.bind(_assertThisInitialized(_this));
    _this.container = _this.container.bind(_assertThisInitialized(_this));
    _this.refresh = _this.refresh.bind(_assertThisInitialized(_this));
    _this.release = _this.release.bind(_assertThisInitialized(_this));
    _this.updateHandler = _this.updateHandler.bind(_assertThisInitialized(_this));
    _this.scrollHeight = _this.scrollHeight.bind(_assertThisInitialized(_this));
    _this.scrollWidth = _this.scrollWidth.bind(_assertThisInitialized(_this));
    _this.scrollOffset = _this.scrollOffset.bind(_assertThisInitialized(_this));
    _this.scrollTop = _this.scrollTop.bind(_assertThisInitialized(_this));
    _this.scrollLeft = _this.scrollLeft.bind(_assertThisInitialized(_this));
    _this.clientHeight = _this.clientHeight.bind(_assertThisInitialized(_this));
    _this.clientWidth = _this.clientWidth.bind(_assertThisInitialized(_this));
    _this.disposeWheelTimer = _this.disposeWheelTimer.bind(_assertThisInitialized(_this));
    _this.scrollEffect = _this.scrollEffect.bind(_assertThisInitialized(_this));
    _this.startEffect = _this.startEffect.bind(_assertThisInitialized(_this));
    _this.initEffect = _this.initEffect.bind(_assertThisInitialized(_this));
    _this.moveEffect = _this.moveEffect.bind(_assertThisInitialized(_this));
    _this.endEffect = _this.endEffect.bind(_assertThisInitialized(_this));
    _this.stopEffect = _this.stopEffect.bind(_assertThisInitialized(_this));
    _this.cancelEffect = _this.cancelEffect.bind(_assertThisInitialized(_this));
    _this.pointerDownEffect = _this.pointerDownEffect.bind(_assertThisInitialized(_this));
    _this.pointerUpEffect = _this.pointerUpEffect.bind(_assertThisInitialized(_this));
    _this.mouseEnterEffect = _this.mouseEnterEffect.bind(_assertThisInitialized(_this));
    _this.mouseLeaveEffect = _this.mouseLeaveEffect.bind(_assertThisInitialized(_this));
    _this.validate = _this.validate.bind(_assertThisInitialized(_this));
    _this.moveIsAllowed = _this.moveIsAllowed.bind(_assertThisInitialized(_this));
    _this.effectDisabledState = _this.effectDisabledState.bind(_assertThisInitialized(_this));
    _this.effectResetInactiveState = _this.effectResetInactiveState.bind(_assertThisInitialized(_this));
    _this.updatePocketState = _this.updatePocketState.bind(_assertThisInitialized(_this));
    _this.subscribeTopPocketToResize = _this.subscribeTopPocketToResize.bind(_assertThisInitialized(_this));
    _this.subscribeBottomPocketToResize = _this.subscribeBottomPocketToResize.bind(_assertThisInitialized(_this));
    _this.subscribeContainerToResize = _this.subscribeContainerToResize.bind(_assertThisInitialized(_this));
    _this.subscribeContentToResize = _this.subscribeContentToResize.bind(_assertThisInitialized(_this));
    _this.updateDimensions = _this.updateDimensions.bind(_assertThisInitialized(_this));
    _this.scrollByLocation = _this.scrollByLocation.bind(_assertThisInitialized(_this));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.startLoading = _this.startLoading.bind(_assertThisInitialized(_this));
    _this.finishLoading = _this.finishLoading.bind(_assertThisInitialized(_this));
    _this.getEventArgs = _this.getEventArgs.bind(_assertThisInitialized(_this));
    _this.getInitEventData = _this.getInitEventData.bind(_assertThisInitialized(_this));
    _this.onStart = _this.onStart.bind(_assertThisInitialized(_this));
    _this.onEnd = _this.onEnd.bind(_assertThisInitialized(_this));
    _this.onUpdated = _this.onUpdated.bind(_assertThisInitialized(_this));
    _this.onBounce = _this.onBounce.bind(_assertThisInitialized(_this));
    _this.onPullDown = _this.onPullDown.bind(_assertThisInitialized(_this));
    _this.onRelease = _this.onRelease.bind(_assertThisInitialized(_this));
    _this.onReachBottom = _this.onReachBottom.bind(_assertThisInitialized(_this));
    _this.scrollLocationChange = _this.scrollLocationChange.bind(_assertThisInitialized(_this));
    _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_this));
    _this.handleInit = _this.handleInit.bind(_assertThisInitialized(_this));
    _this.handleStart = _this.handleStart.bind(_assertThisInitialized(_this));
    _this.handleMove = _this.handleMove.bind(_assertThisInitialized(_this));
    _this.handleEnd = _this.handleEnd.bind(_assertThisInitialized(_this));
    _this.handleStop = _this.handleStop.bind(_assertThisInitialized(_this));
    _this.handleCancel = _this.handleCancel.bind(_assertThisInitialized(_this));
    _this.isCrossThumbScrolling = _this.isCrossThumbScrolling.bind(_assertThisInitialized(_this));
    _this.adjustDistance = _this.adjustDistance.bind(_assertThisInitialized(_this));
    _this.suppressDirections = _this.suppressDirections.bind(_assertThisInitialized(_this));
    _this.validateEvent = _this.validateEvent.bind(_assertThisInitialized(_this));
    _this.prepareDirections = _this.prepareDirections.bind(_assertThisInitialized(_this));
    _this.isContent = _this.isContent.bind(_assertThisInitialized(_this));
    _this.tryGetAllowedDirection = _this.tryGetAllowedDirection.bind(_assertThisInitialized(_this));
    _this.isLocked = _this.isLocked.bind(_assertThisInitialized(_this));
    _this.validateWheel = _this.validateWheel.bind(_assertThisInitialized(_this));
    _this.clearWheelValidationTimer = _this.clearWheelValidationTimer.bind(_assertThisInitialized(_this));
    _this.validateMove = _this.validateMove.bind(_assertThisInitialized(_this));
    _this.syncScrollbarsWithContent = _this.syncScrollbarsWithContent.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.scrollByLine = _this.scrollByLine.bind(_assertThisInitialized(_this));
    _this.scrollByPage = _this.scrollByPage.bind(_assertThisInitialized(_this));
    _this.scrollByKey = _this.scrollByKey.bind(_assertThisInitialized(_this));
    _this.lock = _this.lock.bind(_assertThisInitialized(_this));
    _this.unlock = _this.unlock.bind(_assertThisInitialized(_this));
    _this.updateElementDimensions = _this.updateElementDimensions.bind(_assertThisInitialized(_this));
    _this.setTopPocketDimensions = _this.setTopPocketDimensions.bind(_assertThisInitialized(_this));
    _this.setBottomPocketDimensions = _this.setBottomPocketDimensions.bind(_assertThisInitialized(_this));
    _this.setContentDimensions = _this.setContentDimensions.bind(_assertThisInitialized(_this));
    _this.setContainerDimensions = _this.setContainerDimensions.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ScrollableSimulated.prototype;

  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.disposeWheelTimer, []), new _inferno2.InfernoEffect(this.scrollEffect, [this.state.scrolling, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.props.direction]), new _inferno2.InfernoEffect(this.startEffect, [this.props.onStart, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketHeight, this.props.direction]), new _inferno2.InfernoEffect(this.initEffect, [this.props.direction, this.props.scrollByThumb, this.props.scrollByContent, this.props.bounceEnabled, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.props.needScrollViewContentWrapper, this.props.onUpdated, this.state.topPocketHeight, this.props.disabled]), new _inferno2.InfernoEffect(this.moveEffect, []), new _inferno2.InfernoEffect(this.endEffect, []), new _inferno2.InfernoEffect(this.stopEffect, []), new _inferno2.InfernoEffect(this.cancelEffect, []), new _inferno2.InfernoEffect(this.pointerDownEffect, []), new _inferno2.InfernoEffect(this.pointerUpEffect, []), new _inferno2.InfernoEffect(this.mouseEnterEffect, [this.props.disabled, this.props.showScrollbar]), new _inferno2.InfernoEffect(this.mouseLeaveEffect, [this.props.disabled, this.props.showScrollbar]), new _inferno2.InfernoEffect(this.effectDisabledState, [this.props.disabled]), new _inferno2.InfernoEffect(this.effectResetInactiveState, [this.props.direction]), new _inferno2.InfernoEffect(this.updatePocketState, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.state.topPocketHeight, this.state.vScrollLocation]), new _inferno2.InfernoEffect(this.subscribeTopPocketToResize, []), new _inferno2.InfernoEffect(this.subscribeBottomPocketToResize, []), new _inferno2.InfernoEffect(this.subscribeContainerToResize, []), new _inferno2.InfernoEffect(this.subscribeContentToResize, []), new _inferno2.InfernoEffect(this.updateDimensions, [])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10, _this$_effects$11, _this$_effects$12;

    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.scrolling, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.props.direction]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.onStart, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketHeight, this.props.direction]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.direction, this.props.scrollByThumb, this.props.scrollByContent, this.props.bounceEnabled, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.props.needScrollViewContentWrapper, this.props.onUpdated, this.state.topPocketHeight, this.props.disabled]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([]);
    (_this$_effects$8 = this._effects[10]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.disabled, this.props.showScrollbar]);
    (_this$_effects$9 = this._effects[11]) === null || _this$_effects$9 === void 0 ? void 0 : _this$_effects$9.update([this.props.disabled, this.props.showScrollbar]);
    (_this$_effects$10 = this._effects[12]) === null || _this$_effects$10 === void 0 ? void 0 : _this$_effects$10.update([this.props.disabled]);
    (_this$_effects$11 = this._effects[13]) === null || _this$_effects$11 === void 0 ? void 0 : _this$_effects$11.update([this.props.direction]);
    (_this$_effects$12 = this._effects[14]) === null || _this$_effects$12 === void 0 ? void 0 : _this$_effects$12.update([this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.state.topPocketHeight, this.state.vScrollLocation]);
  };

  _proto.disposeWheelTimer = function disposeWheelTimer() {
    var _this2 = this;

    return function () {
      return _this2.clearWheelValidationTimer();
    };
  };

  _proto.scrollEffect = function scrollEffect() {
    var _this3 = this;

    return (0, _subscribe_to_event.subscribeToScrollEvent)(this.containerRef.current, function () {
      _this3.handleScroll();
    });
  };

  _proto.startEffect = function startEffect() {
    var _this4 = this;

    return (0, _subscribe_to_event.subscribeToDXScrollStartEvent)(this.wrapperRef.current, function (event) {
      _this4.handleStart(event);
    });
  };

  _proto.initEffect = function initEffect() {
    var _this5 = this;

    return (0, _subscribe_to_event.subscribeToScrollInitEvent)(this.wrapperRef.current, function (event) {
      _this5.handleInit(event);
    }, this.getInitEventData());
  };

  _proto.moveEffect = function moveEffect() {
    var _this6 = this;

    return (0, _subscribe_to_event.subscribeToDXScrollMoveEvent)(this.wrapperRef.current, function (event) {
      _this6.handleMove(event);
    });
  };

  _proto.endEffect = function endEffect() {
    var _this7 = this;

    return (0, _subscribe_to_event.subscribeToDXScrollEndEvent)(this.wrapperRef.current, function (event) {
      _this7.handleEnd(event);
    });
  };

  _proto.stopEffect = function stopEffect() {
    var _this8 = this;

    return (0, _subscribe_to_event.subscribeToDXScrollStopEvent)(this.wrapperRef.current, function () {
      _this8.handleStop();
    });
  };

  _proto.cancelEffect = function cancelEffect() {
    var _this9 = this;

    return (0, _subscribe_to_event.subscribeToDXScrollCancelEvent)(this.wrapperRef.current, function (event) {
      _this9.handleCancel(event);
    });
  };

  _proto.pointerDownEffect = function pointerDownEffect() {
    var _this10 = this;

    return (0, _subscribe_to_event.subscribeToDXPointerDownEvent)(this.wrapperRef.current, function () {
      _this10.setState(function (__state_argument) {
        return {
          pendingPointerUp: true
        };
      });
    });
  };

  _proto.pointerUpEffect = function pointerUpEffect() {
    var _this11 = this;

    return (0, _subscribe_to_event.subscribeToDXPointerUpEvent)(_dom_adapter.default.getDocument(), function () {
      _this11.setState(function (__state_argument) {
        return {
          pendingPointerUp: false
        };
      });
    });
  };

  _proto.mouseEnterEffect = function mouseEnterEffect() {
    var _this12 = this;

    if (this.isHoverable) {
      return (0, _subscribe_to_event.subscribeToMouseEnterEvent)(this.scrollableRef.current, function () {
        _this12.setState(function (__state_argument) {
          return {
            hovered: true
          };
        });
      });
    }

    return undefined;
  };

  _proto.mouseLeaveEffect = function mouseLeaveEffect() {
    var _this13 = this;

    if (this.isHoverable) {
      return (0, _subscribe_to_event.subscribeToMouseLeaveEvent)(this.scrollableRef.current, function () {
        _this13.setState(function (__state_argument) {
          return {
            hovered: false
          };
        });
      });
    }

    return undefined;
  };

  _proto.effectDisabledState = function effectDisabledState() {
    if (this.props.disabled) {
      this.lock();
    } else {
      this.unlock();
    }
  };

  _proto.effectResetInactiveState = function effectResetInactiveState() {
    if (this.direction.isBoth) {
      return;
    }

    var inactiveScrollProp = !this.direction.isVertical ? "scrollTop" : "scrollLeft";
    this.containerRef.current[inactiveScrollProp] = 0;
  };

  _proto.updatePocketState = function updatePocketState() {
    var _this14 = this;

    if (this.props.forceGeneratePockets) {
      this.setState(function (__state_argument) {
        return {
          topPocketState: _this14.pulledDown ? _consts.TopPocketState.STATE_READY : _consts.TopPocketState.STATE_RELEASED
        };
      });
    }
  };

  _proto.subscribeTopPocketToResize = function subscribeTopPocketToResize() {
    var _this$topPocketRef,
        _this15 = this;

    return (0, _subscribe_to_resize.subscribeToResize)((_this$topPocketRef = this.topPocketRef) === null || _this$topPocketRef === void 0 ? void 0 : _this$topPocketRef.current, function (element) {
      _this15.setTopPocketDimensions(element);
    });
  };

  _proto.subscribeBottomPocketToResize = function subscribeBottomPocketToResize() {
    var _this$bottomPocketRef,
        _this16 = this;

    return (0, _subscribe_to_resize.subscribeToResize)((_this$bottomPocketRef = this.bottomPocketRef) === null || _this$bottomPocketRef === void 0 ? void 0 : _this$bottomPocketRef.current, function (element) {
      _this16.setBottomPocketDimensions(element);
    });
  };

  _proto.subscribeContainerToResize = function subscribeContainerToResize() {
    var _this17 = this;

    return (0, _subscribe_to_resize.subscribeToResize)(this.containerRef.current, function (element) {
      _this17.setContainerDimensions(element);
    });
  };

  _proto.subscribeContentToResize = function subscribeContentToResize() {
    var _this18 = this;

    return (0, _subscribe_to_resize.subscribeToResize)(this.content(), function (element) {
      _this18.setContentDimensions(element);
    });
  };

  _proto.updateDimensions = function updateDimensions() {
    this.updateElementDimensions();
  };

  _proto.handleScroll = function handleScroll() {
    var _this$props$onScroll, _this$props;

    if (!this.state.scrolling) {
      this.syncScrollbarsWithContent();
    }

    (_this$props$onScroll = (_this$props = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props, this.getEventArgs());
  };

  _proto.startLoading = function startLoading() {
    if (this.loadingIndicatorEnabled && (0, _is_element_visible.isElementVisible)(this.scrollableRef.current)) {
      this.setState(function (__state_argument) {
        return {
          isLoadPanelVisible: true
        };
      });
    }

    this.lock();
  };

  _proto.finishLoading = function finishLoading() {
    this.setState(function (__state_argument) {
      return {
        isLoadPanelVisible: false
      };
    });
    this.unlock();
  };

  _proto.getEventArgs = function getEventArgs() {
    var scrollOffset = this.scrollOffset();
    return _extends({
      event: this.eventForUserAction,
      scrollOffset: scrollOffset
    }, (0, _get_boundary_props.getBoundaryProps)(this.props.direction, scrollOffset, this.containerRef.current, this.state.topPocketHeight));
  };

  _proto.getInitEventData = function getInitEventData() {
    var _this19 = this;

    return {
      getDirection: function getDirection(event) {
        return _this19.tryGetAllowedDirection(event);
      },
      validate: function validate(event) {
        return _this19.validate(event);
      },
      isNative: false,
      scrollTarget: this.containerRef.current
    };
  };

  _proto.onStart = function onStart() {
    var _this$props$onStart, _this$props2;

    (_this$props$onStart = (_this$props2 = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props2, this.getEventArgs());
  };

  _proto.onEnd = function onEnd(direction) {
    if (this.direction.isBoth) {
      this.endActionDirections[direction] = true;
      var _this$endActionDirect = this.endActionDirections,
          horizontal = _this$endActionDirect.horizontal,
          vertical = _this$endActionDirect.vertical;

      if (horizontal && vertical) {
        var _this$props$onEnd, _this$props3;

        this.endActionDirections.vertical = false;
        this.endActionDirections.horizontal = false;
        this.setState(function (__state_argument) {
          return {
            scrolling: false
          };
        });
        (_this$props$onEnd = (_this$props3 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props3, this.getEventArgs());
      }
    } else {
      var _this$props$onEnd2, _this$props4;

      this.setState(function (__state_argument) {
        return {
          scrolling: false
        };
      });
      (_this$props$onEnd2 = (_this$props4 = this.props).onEnd) === null || _this$props$onEnd2 === void 0 ? void 0 : _this$props$onEnd2.call(_this$props4, this.getEventArgs());
    }
  };

  _proto.onUpdated = function onUpdated() {
    var _this$props$onUpdated, _this$props5;

    (_this$props$onUpdated = (_this$props5 = this.props).onUpdated) === null || _this$props$onUpdated === void 0 ? void 0 : _this$props$onUpdated.call(_this$props5, this.getEventArgs());
  };

  _proto.onBounce = function onBounce() {
    var _this$props$onBounce, _this$props6;

    (_this$props$onBounce = (_this$props6 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props6, this.getEventArgs());
  };

  _proto.onPullDown = function onPullDown() {
    var _this$props$onPullDow, _this$props7;

    this.setState(function (__state_argument) {
      return {
        topPocketState: _consts.TopPocketState.STATE_REFRESHING
      };
    });
    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onPullDow = (_this$props7 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props7, {});
  };

  _proto.onRelease = function onRelease() {
    this.setState(function (__state_argument) {
      return {
        topPocketState: _consts.TopPocketState.STATE_RELEASED
      };
    });
    this.loadingIndicatorEnabled = true;
    this.finishLoading();
    this.updateHandler();
  };

  _proto.onReachBottom = function onReachBottom() {
    var _this$props$onReachBo, _this$props8;

    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onReachBo = (_this$props8 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props8, {});
  };

  _proto.scrollLocationChange = function scrollLocationChange(eventData) {
    var _this20 = this;

    if (!(0, _is_element_visible.isElementVisible)(this.scrollableRef.current)) {
      return;
    }

    var fullScrollProp = eventData.fullScrollProp,
        location = eventData.location,
        needFireScroll = eventData.needFireScroll;
    this.containerRef.current[fullScrollProp] = location;

    if (fullScrollProp === "scrollLeft") {
      this.setState(function (__state_argument) {
        return {
          hScrollLocation: _this20.state.scrolling ? -location : (0, _clamp_into_range.clampIntoRange)(-location, 0, _this20.hScrollOffsetMax)
        };
      });
    } else {
      this.setState(function (__state_argument) {
        return {
          vScrollLocation: _this20.state.scrolling ? -location : (0, _clamp_into_range.clampIntoRange)(-location, 0, _this20.vScrollOffsetMax)
        };
      });
    }

    var scrollDelta = Math.abs(this.savedScrollOffset[fullScrollProp] - location);

    if (needFireScroll && scrollDelta >= 1) {
      this.onScroll();
    }

    this.savedScrollOffset[fullScrollProp] = location;
  };

  _proto.onScroll = function onScroll() {
    _events_engine.default.triggerHandler(this.containerRef.current, {
      type: "scroll"
    });
  };

  _proto.handleInit = function handleInit(event) {
    var _this$hScrollbarRef$c, _this$vScrollbarRef$c;

    this.suppressDirections(event);
    this.eventForUserAction = event;
    this.setState(function (__state_argument) {
      return {
        scrolling: true
      };
    });
    var crossThumbScrolling = this.isCrossThumbScrolling(event);

    var _getElementOffset = (0, _get_element_offset.getElementOffset)(this.scrollableRef.current),
        left = _getElementOffset.left,
        top = _getElementOffset.top;

    (_this$hScrollbarRef$c = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c === void 0 ? void 0 : _this$hScrollbarRef$c.initHandler(event, crossThumbScrolling, left);
    (_this$vScrollbarRef$c = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c === void 0 ? void 0 : _this$vScrollbarRef$c.initHandler(event, crossThumbScrolling, top);
  };

  _proto.handleStart = function handleStart(event) {
    this.eventForUserAction = event;
    this.onStart();
  };

  _proto.handleMove = function handleMove(e) {
    var _e$preventDefault, _this$hScrollbarRef$c2, _this$vScrollbarRef$c2;

    if (this.isLocked()) {
      e.cancel = true;
      return;
    }

    (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 ? void 0 : _e$preventDefault.call(e);
    this.adjustDistance(e, "delta");
    this.eventForUserAction = e;
    (_this$hScrollbarRef$c2 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c2 === void 0 ? void 0 : _this$hScrollbarRef$c2.moveHandler(e.delta.x);
    (_this$vScrollbarRef$c2 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c2 === void 0 ? void 0 : _this$vScrollbarRef$c2.moveHandler(e.delta.y);
  };

  _proto.handleEnd = function handleEnd(event) {
    var _this$hScrollbarRef$c3, _this$vScrollbarRef$c3;

    this.adjustDistance(event, "velocity");
    this.eventForUserAction = event;
    (_this$hScrollbarRef$c3 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c3 === void 0 ? void 0 : _this$hScrollbarRef$c3.endHandler(event.velocity.x, true);
    (_this$vScrollbarRef$c3 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c3 === void 0 ? void 0 : _this$vScrollbarRef$c3.endHandler(event.velocity.y, true);
  };

  _proto.handleStop = function handleStop() {
    var _this$hScrollbarRef$c4, _this$vScrollbarRef$c4;

    (_this$hScrollbarRef$c4 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c4 === void 0 ? void 0 : _this$hScrollbarRef$c4.stopHandler();
    (_this$vScrollbarRef$c4 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c4 === void 0 ? void 0 : _this$vScrollbarRef$c4.stopHandler();
    this.setState(function (__state_argument) {
      return {
        scrolling: false
      };
    });
  };

  _proto.handleCancel = function handleCancel(event) {
    var _this$hScrollbarRef$c5, _this$vScrollbarRef$c5;

    this.eventForUserAction = event;
    (_this$hScrollbarRef$c5 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c5 === void 0 ? void 0 : _this$hScrollbarRef$c5.endHandler(0, false);
    (_this$vScrollbarRef$c5 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c5 === void 0 ? void 0 : _this$vScrollbarRef$c5.endHandler(0, false);
    this.setState(function (__state_argument) {
      return {
        scrolling: false
      };
    });
  };

  _proto.isCrossThumbScrolling = function isCrossThumbScrolling(event) {
    var target = event.originalEvent.target;
    var verticalScrolling = false;
    var horizontalScrolling = false;

    if (this.direction.isVertical) {
      verticalScrolling = this.props.scrollByThumb && this.vScrollbarRef.current.isThumb(target);
    }

    if (this.direction.isHorizontal) {
      horizontalScrolling = this.props.scrollByThumb && this.hScrollbarRef.current.isThumb(target);
    }

    return verticalScrolling || horizontalScrolling;
  };

  _proto.adjustDistance = function adjustDistance(event, property) {
    var distance = event[property];
    distance.x *= this.validDirections[_consts.DIRECTION_HORIZONTAL] ? 1 : 0;
    distance.y *= this.validDirections[_consts.DIRECTION_VERTICAL] ? 1 : 0;

    if ((0, _index.isDxMouseWheelEvent)(event.originalEvent)) {
      var devicePixelRatio = (0, _get_device_pixel_ratio.getDevicePixelRatio)();
      distance.x = Math.round(distance.x / devicePixelRatio * 100) / 100;
      distance.y = Math.round(distance.y / devicePixelRatio * 100) / 100;
    }
  };

  _proto.suppressDirections = function suppressDirections(event) {
    if ((0, _index.isDxMouseWheelEvent)(event.originalEvent)) {
      this.prepareDirections(true);
      return;
    }

    this.prepareDirections(false);
    var target = event.originalEvent.target;

    if (this.direction.isVertical) {
      var scrollbar = this.vScrollbarRef.current;
      this.validDirections[_consts.DIRECTION_VERTICAL] = this.validateEvent(this.isContent(target), scrollbar.isScrollbar(target), scrollbar.isThumb(target));
    }

    if (this.direction.isHorizontal) {
      var _scrollbar = this.hScrollbarRef.current;
      this.validDirections[_consts.DIRECTION_HORIZONTAL] = this.validateEvent(this.isContent(target), _scrollbar.isScrollbar(target), _scrollbar.isThumb(target));
    }
  };

  _proto.validateEvent = function validateEvent(isContent, isScrollbar, isThumb) {
    return this.props.scrollByThumb && (isScrollbar || isThumb) || this.props.scrollByContent && isContent;
  };

  _proto.prepareDirections = function prepareDirections(value) {
    this.validDirections[_consts.DIRECTION_HORIZONTAL] = value;
    this.validDirections[_consts.DIRECTION_VERTICAL] = value;
  };

  _proto.isContent = function isContent(element) {
    var closest = element.closest(".".concat(_consts.SCROLLABLE_SIMULATED_CLASS));

    if ((0, _type.isDefined)(closest)) {
      return closest === this.scrollableRef.current;
    }

    return false;
  };

  _proto.tryGetAllowedDirection = function tryGetAllowedDirection(event) {
    return (0, _index.isDxMouseWheelEvent)(event) ? (0, _get_permissible_wheel_direction.permissibleWheelDirection)(this.props.direction, event.shiftKey) : this.permissibleDirection;
  };

  _proto.isLocked = function isLocked() {
    return this.locked;
  };

  _proto.validateWheel = function validateWheel(event) {
    var scrollbar = (0, _get_permissible_wheel_direction.permissibleWheelDirection)(this.props.direction, event.shiftKey) === _consts.DIRECTION_HORIZONTAL ? this.hScrollbarRef.current : this.vScrollbarRef.current;
    var reachedMin = scrollbar.reachedMin();
    var reachedMax = scrollbar.reachedMax();
    var contentGreaterThanContainer = !reachedMin || !reachedMax;
    var locatedNotAtBound = !reachedMin && !reachedMax;
    var scrollFromMin = reachedMin && event.delta > 0;
    var scrollFromMax = reachedMax && event.delta < 0;
    var validated = contentGreaterThanContainer && (locatedNotAtBound || scrollFromMin || scrollFromMax);
    validated = validated || this.validateWheelTimer !== undefined;

    if (validated) {
      this.clearWheelValidationTimer();
      this.validateWheelTimer = setTimeout(this.clearWheelValidationTimer, _consts.VALIDATE_WHEEL_TIMEOUT);
    }

    return validated;
  };

  _proto.clearWheelValidationTimer = function clearWheelValidationTimer() {
    clearTimeout(this.validateWheelTimer);
    this.validateWheelTimer = undefined;
  };

  _proto.validateMove = function validateMove(event) {
    if (!this.props.scrollByContent && !(0, _type.isDefined)(event.target.closest(".".concat(_consts.SCROLLABLE_SCROLLBAR_CLASS)))) {
      return false;
    }

    return (0, _type.isDefined)(this.permissibleDirection);
  };

  _proto.syncScrollbarsWithContent = function syncScrollbarsWithContent() {
    var _this$containerRef$cu = this.containerRef.current,
        scrollLeft = _this$containerRef$cu.scrollLeft,
        scrollTop = _this$containerRef$cu.scrollTop;
    this.scrollLocationChange({
      fullScrollProp: "scrollTop",
      location: scrollTop,
      needFireScroll: false
    });
    this.scrollLocationChange({
      fullScrollProp: "scrollLeft",
      location: scrollLeft,
      needFireScroll: false
    });
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    if (this.state.scrolling) {
      event.originalEvent.stopPropagation();
      event.originalEvent.preventDefault();
      return;
    }

    var isKeySupported = Object.values(_consts.KEY_CODES).includes((0, _index.normalizeKeyName)(event));

    if (isKeySupported) {
      event.originalEvent.stopPropagation();
      event.originalEvent.preventDefault();
    }

    switch ((0, _index.normalizeKeyName)(event)) {
      case _consts.KEY_CODES.DOWN:
        this.scrollByLine({
          top: 1,
          left: 0
        });
        break;

      case _consts.KEY_CODES.UP:
        this.scrollByLine({
          top: -1,
          left: 0
        });
        break;

      case _consts.KEY_CODES.RIGHT:
        this.scrollByLine({
          top: 0,
          left: 1
        });
        break;

      case _consts.KEY_CODES.LEFT:
        this.scrollByLine({
          top: 0,
          left: -1
        });
        break;

      case _consts.KEY_CODES.PAGE_DOWN:
        this.scrollByPage(1);
        break;

      case _consts.KEY_CODES.PAGE_UP:
        this.scrollByPage(-1);
        break;

      case _consts.KEY_CODES.HOME:
        this.scrollByKey(_consts.KEY_CODES.HOME);
        break;

      case _consts.KEY_CODES.END:
        this.scrollByKey(_consts.KEY_CODES.END);
        break;

      default:
        break;
    }
  };

  _proto.scrollByLine = function scrollByLine(lines) {
    var scrollOffset = Math.abs(_consts.SCROLL_LINE_HEIGHT / (0, _get_device_pixel_ratio.getDevicePixelRatio)() * 100) / 100;
    this.scrollByLocation({
      top: lines.top * scrollOffset,
      left: lines.left * scrollOffset
    });
  };

  _proto.scrollByPage = function scrollByPage(page) {
    var _ScrollDirection = new _scroll_direction.ScrollDirection((0, _get_permissible_wheel_direction.permissibleWheelDirection)(this.props.direction, false)),
        isVertical = _ScrollDirection.isVertical;

    var distance = {
      left: 0,
      top: 0
    };
    var _this$containerRef$cu2 = this.containerRef.current,
        clientHeight = _this$containerRef$cu2.clientHeight,
        clientWidth = _this$containerRef$cu2.clientWidth;

    if (isVertical) {
      distance.top = page * clientHeight;
    } else {
      distance.left = page * clientWidth;
    }

    this.scrollByLocation(distance);
  };

  _proto.scrollByKey = function scrollByKey(key) {
    var containerEl = this.containerRef.current;
    var vOffsetMin = 0;
    var vOffsetMax = -this.vScrollOffsetMax + this.state.bottomPocketHeight + this.state.contentPaddingBottom;
    var hOffsetMin = 0;
    var hOffsetMax = -this.hScrollOffsetMax;
    var offset = (0, _get_offset_distance.getOffsetDistance)(key === _consts.KEY_CODES.HOME ? {
      top: vOffsetMin,
      left: this.props.rtlEnabled ? hOffsetMax : hOffsetMin
    } : {
      top: vOffsetMax,
      left: this.props.rtlEnabled ? hOffsetMin : hOffsetMax
    }, {
      top: containerEl.scrollTop,
      left: containerEl.scrollLeft
    });
    this.scrollByLocation({
      top: offset.top,
      left: offset.left
    });
  };

  _proto.lock = function lock() {
    this.locked = true;
  };

  _proto.unlock = function unlock() {
    if (!this.props.disabled) {
      this.locked = false;
    }
  };

  _proto.updateElementDimensions = function updateElementDimensions() {
    if (this.props.forceGeneratePockets) {
      this.setTopPocketDimensions(this.topPocketRef.current);
      this.setBottomPocketDimensions(this.bottomPocketRef.current);
    }

    this.setContentDimensions(this.content());
    this.setContainerDimensions(this.containerRef.current);
  };

  _proto.setTopPocketDimensions = function setTopPocketDimensions(topPocketEl) {
    var _this21 = this;

    this.setState(function (__state_argument) {
      return {
        topPocketHeight: _this21.props.forceGeneratePockets && _this21.props.pullDownEnabled ? topPocketEl.clientHeight : 0
      };
    });
  };

  _proto.setBottomPocketDimensions = function setBottomPocketDimensions(bottomPocketEl) {
    var _this22 = this;

    this.setState(function (__state_argument) {
      return {
        bottomPocketHeight: _this22.props.forceGeneratePockets && _this22.props.reachBottomEnabled ? bottomPocketEl.clientHeight : 0
      };
    });
  };

  _proto.setContentDimensions = function setContentDimensions(contentEl) {
    var _this23 = this;

    this.setState(function (__state_argument) {
      return {
        contentClientHeight: contentEl.clientHeight
      };
    });
    this.setState(function (__state_argument) {
      return {
        contentScrollHeight: contentEl.scrollHeight
      };
    });
    this.setState(function (__state_argument) {
      return {
        contentClientWidth: contentEl.clientWidth
      };
    });
    this.setState(function (__state_argument) {
      return {
        contentScrollWidth: contentEl.scrollWidth
      };
    });
    this.setState(function (__state_argument) {
      return {
        contentPaddingBottom: (0, _get_element_style.getElementPadding)(_this23.contentRef.current, "bottom")
      };
    });
  };

  _proto.setContainerDimensions = function setContainerDimensions(containerEl) {
    this.setState(function (__state_argument) {
      return {
        containerClientHeight: containerEl.clientHeight
      };
    });
    this.setState(function (__state_argument) {
      return {
        containerClientWidth: containerEl.clientWidth
      };
    });
  };

  _proto.content = function content() {
    if (this.props.needScrollViewContentWrapper) {
      return this.scrollViewContentRef.current;
    }

    return this.contentRef.current;
  };

  _proto.container = function container() {
    return this.containerRef.current;
  };

  _proto.refresh = function refresh() {
    var _this$props$onPullDow2, _this$props9;

    this.setState(function (__state_argument) {
      return {
        topPocketState: _consts.TopPocketState.STATE_READY
      };
    });
    this.startLoading();
    (_this$props$onPullDow2 = (_this$props9 = this.props).onPullDown) === null || _this$props$onPullDow2 === void 0 ? void 0 : _this$props$onPullDow2.call(_this$props9, {});
  };

  _proto.release = function release() {
    var _this$hScrollbarRef$c6, _this$vScrollbarRef$c6;

    this.onRelease();
    (_this$hScrollbarRef$c6 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c6 === void 0 ? void 0 : _this$hScrollbarRef$c6.releaseHandler();
    (_this$vScrollbarRef$c6 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c6 === void 0 ? void 0 : _this$vScrollbarRef$c6.releaseHandler();
  };

  _proto.updateHandler = function updateHandler() {
    this.updateElementDimensions();
    this.onUpdated();
  };

  _proto.scrollHeight = function scrollHeight() {
    return this.content().offsetHeight;
  };

  _proto.scrollWidth = function scrollWidth() {
    return this.content().offsetWidth;
  };

  _proto.scrollOffset = function scrollOffset() {
    var _getTranslateValues = (0, _get_translate_values.getTranslateValues)(this.contentRef.current),
        left = _getTranslateValues.left,
        top = _getTranslateValues.top;

    var _this$containerRef$cu3 = this.containerRef.current,
        scrollLeft = _this$containerRef$cu3.scrollLeft,
        scrollTop = _this$containerRef$cu3.scrollTop;
    return {
      top: scrollTop - top - (this.props.pullDownEnabled && this.props.forceGeneratePockets ? this.state.topPocketHeight : 0),
      left: scrollLeft - left
    };
  };

  _proto.scrollTop = function scrollTop() {
    return this.scrollOffset().top;
  };

  _proto.scrollLeft = function scrollLeft() {
    return this.scrollOffset().left;
  };

  _proto.clientHeight = function clientHeight() {
    return this.containerRef.current.clientHeight;
  };

  _proto.clientWidth = function clientWidth() {
    return this.containerRef.current.clientWidth;
  };

  _proto.validate = function validate(event) {
    if (this.isLocked()) {
      return false;
    }

    this.updateHandler();
    return this.moveIsAllowed(event);
  };

  _proto.moveIsAllowed = function moveIsAllowed(event) {
    if (this.props.disabled || (0, _index.isDxMouseWheelEvent)(event) && (0, _index.isCommandKeyPressed)({
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey
    })) {
      return false;
    }

    if (this.props.bounceEnabled) {
      return true;
    }

    return (0, _index.isDxMouseWheelEvent)(event) ? this.validateWheel(event) : this.validateMove(event);
  };

  _proto.scrollByLocation = function scrollByLocation(location) {
    var _this$hScrollbarRef$c7, _this$vScrollbarRef$c7;

    this.updateHandler();
    this.setState(function (__state_argument) {
      return {
        scrolling: true
      };
    });
    this.prepareDirections(true);
    this.onStart();
    var _this$containerRef$cu4 = this.containerRef.current,
        scrollLeft = _this$containerRef$cu4.scrollLeft,
        scrollTop = _this$containerRef$cu4.scrollTop;
    (_this$hScrollbarRef$c7 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c7 === void 0 ? void 0 : _this$hScrollbarRef$c7.scrollTo(scrollLeft + location.left);
    (_this$vScrollbarRef$c7 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c7 === void 0 ? void 0 : _this$vScrollbarRef$c7.scrollTo(scrollTop + location.top);
    this.setState(function (__state_argument) {
      return {
        scrolling: false
      };
    });
  };

  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    _InfernoComponent.prototype.componentWillUpdate.call(this);

    if (this.state["hScrollLocation"] !== nextState["hScrollLocation"] || this.state["contentClientWidth"] !== nextState["contentClientWidth"] || this.state["contentScrollWidth"] !== nextState["contentScrollWidth"] || this.state["containerClientWidth"] !== nextState["containerClientWidth"] || this.state["vScrollLocation"] !== nextState["vScrollLocation"] || this.state["contentClientHeight"] !== nextState["contentClientHeight"] || this.state["contentScrollHeight"] !== nextState["contentScrollHeight"] || this.state["containerClientHeight"] !== nextState["containerClientHeight"] || this.state["bottomPocketHeight"] !== nextState["bottomPocketHeight"] || this.state["contentPaddingBottom"] !== nextState["contentPaddingBottom"] || this.state["topPocketHeight"] !== nextState["topPocketHeight"]) {
      this.__getterCache["contentStyles"] = undefined;
    }

    if (this.props["bounceEnabled"] !== nextProps["bounceEnabled"] || this.props["direction"] !== nextProps["direction"] || this.state["contentClientHeight"] !== nextState["contentClientHeight"] || this.state["contentScrollHeight"] !== nextState["contentScrollHeight"] || this.state["containerClientHeight"] !== nextState["containerClientHeight"] || this.state["contentClientWidth"] !== nextState["contentClientWidth"] || this.state["contentScrollWidth"] !== nextState["contentScrollWidth"] || this.state["containerClientWidth"] !== nextState["containerClientWidth"]) {
      this.__getterCache["containerStyles"] = undefined;
    }

    if (this.props["direction"] !== nextProps["direction"]) {
      this.__getterCache["direction"] = undefined;
    }
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      hovered: this.state.hovered,
      scrolling: this.state.scrolling,
      containerClientWidth: this.state.containerClientWidth,
      containerClientHeight: this.state.containerClientHeight,
      contentScrollWidth: this.state.contentScrollWidth,
      contentScrollHeight: this.state.contentScrollHeight,
      contentClientWidth: this.state.contentClientWidth,
      contentClientHeight: this.state.contentClientHeight,
      contentPaddingBottom: this.state.contentPaddingBottom,
      topPocketHeight: this.state.topPocketHeight,
      bottomPocketHeight: this.state.bottomPocketHeight,
      topPocketState: this.state.topPocketState,
      isLoadPanelVisible: this.state.isLoadPanelVisible,
      pendingPointerUp: this.state.pendingPointerUp,
      vScrollLocation: this.state.vScrollLocation,
      hScrollLocation: this.state.hScrollLocation,
      wrapperRef: this.wrapperRef,
      contentRef: this.contentRef,
      scrollViewContentRef: this.scrollViewContentRef,
      containerRef: this.containerRef,
      scrollableRef: this.scrollableRef,
      topPocketRef: this.topPocketRef,
      bottomPocketRef: this.bottomPocketRef,
      vScrollbarRef: this.vScrollbarRef,
      hScrollbarRef: this.hScrollbarRef,
      pulledDown: this.pulledDown,
      handleScroll: this.handleScroll,
      startLoading: this.startLoading,
      finishLoading: this.finishLoading,
      getEventArgs: this.getEventArgs,
      getInitEventData: this.getInitEventData,
      onStart: this.onStart,
      onEnd: this.onEnd,
      onUpdated: this.onUpdated,
      onBounce: this.onBounce,
      onPullDown: this.onPullDown,
      onRelease: this.onRelease,
      onReachBottom: this.onReachBottom,
      scrollLocationChange: this.scrollLocationChange,
      hScrollOffsetMax: this.hScrollOffsetMax,
      vScrollOffsetMax: this.vScrollOffsetMax,
      vScrollOffsetMin: this.vScrollOffsetMin,
      onScroll: this.onScroll,
      handleInit: this.handleInit,
      handleStart: this.handleStart,
      handleMove: this.handleMove,
      handleEnd: this.handleEnd,
      handleStop: this.handleStop,
      handleCancel: this.handleCancel,
      isCrossThumbScrolling: this.isCrossThumbScrolling,
      adjustDistance: this.adjustDistance,
      suppressDirections: this.suppressDirections,
      validateEvent: this.validateEvent,
      prepareDirections: this.prepareDirections,
      isContent: this.isContent,
      tryGetAllowedDirection: this.tryGetAllowedDirection,
      isLocked: this.isLocked,
      validateWheel: this.validateWheel,
      clearWheelValidationTimer: this.clearWheelValidationTimer,
      validateMove: this.validateMove,
      syncScrollbarsWithContent: this.syncScrollbarsWithContent,
      handleKeyDown: this.handleKeyDown,
      scrollByLine: this.scrollByLine,
      scrollByPage: this.scrollByPage,
      scrollByKey: this.scrollByKey,
      lock: this.lock,
      unlock: this.unlock,
      updateElementDimensions: this.updateElementDimensions,
      setTopPocketDimensions: this.setTopPocketDimensions,
      setBottomPocketDimensions: this.setBottomPocketDimensions,
      setContentDimensions: this.setContentDimensions,
      setContainerDimensions: this.setContainerDimensions,
      contentHeight: this.contentHeight,
      contentWidth: this.contentWidth,
      containerHasSizes: this.containerHasSizes,
      contentStyles: this.contentStyles,
      contentTranslateY: this.contentTranslateY,
      contentTranslateX: this.contentTranslateX,
      containerStyles: this.containerStyles,
      cssClasses: this.cssClasses,
      direction: this.direction,
      permissibleDirection: this.permissibleDirection,
      isHoverable: this.isHoverable,
      restAttributes: this.restAttributes
    });
  };

  _createClass(ScrollableSimulated, [{
    key: "pulledDown",
    get: function get() {
      return this.props.pullDownEnabled && this.props.bounceEnabled && this.state.topPocketHeight > 0 && this.state.vScrollLocation - this.state.topPocketHeight >= 0;
    }
  }, {
    key: "hScrollOffsetMax",
    get: function get() {
      return -Math.max(this.contentWidth - this.state.containerClientWidth, 0);
    }
  }, {
    key: "vScrollOffsetMax",
    get: function get() {
      return -Math.max(this.contentHeight - this.state.containerClientHeight, 0);
    }
  }, {
    key: "vScrollOffsetMin",
    get: function get() {
      return this.pulledDown && this.state.topPocketState !== _consts.TopPocketState.STATE_RELEASED ? this.state.topPocketHeight : 0;
    }
  }, {
    key: "contentHeight",
    get: function get() {
      var _this$contentRef;

      return (0, _get_element_style.getElementOverflowY)((_this$contentRef = this.contentRef) === null || _this$contentRef === void 0 ? void 0 : _this$contentRef.current) === "hidden" ? this.state.contentClientHeight : Math.max(this.state.contentScrollHeight, this.state.contentClientHeight);
    }
  }, {
    key: "contentWidth",
    get: function get() {
      var _this$contentRef2;

      return (0, _get_element_style.getElementOverflowX)((_this$contentRef2 = this.contentRef) === null || _this$contentRef2 === void 0 ? void 0 : _this$contentRef2.current) === "hidden" ? this.state.contentClientWidth : Math.max(this.state.contentScrollWidth, this.state.contentClientWidth);
    }
  }, {
    key: "containerHasSizes",
    get: function get() {
      return this.state.containerClientHeight > 0 && this.state.containerClientWidth > 0;
    }
  }, {
    key: "contentStyles",
    get: function get() {
      var _this24 = this;

      if (this.__getterCache["contentStyles"] !== undefined) {
        return this.__getterCache["contentStyles"];
      }

      return this.__getterCache["contentStyles"] = function () {
        return {
          transform: "translate(".concat(_this24.contentTranslateX, "px, ").concat(_this24.contentTranslateY, "px)")
        };
      }();
    }
  }, {
    key: "contentTranslateY",
    get: function get() {
      var location = this.state.vScrollLocation;
      var transformValue = location % 1;
      var maxOffset = this.vScrollOffsetMax - this.state.bottomPocketHeight - this.state.contentPaddingBottom;

      if (location > 0) {
        transformValue = location;
      } else if (location <= maxOffset) {
        transformValue = location - maxOffset;
      }

      return transformValue - this.state.topPocketHeight;
    }
  }, {
    key: "contentTranslateX",
    get: function get() {
      var location = this.state.hScrollLocation;
      var transformValue = location % 1;

      if (location > 0) {
        transformValue = location;
      } else if (location <= this.hScrollOffsetMax) {
        transformValue = location - this.hScrollOffsetMax;
      }

      return transformValue;
    }
  }, {
    key: "containerStyles",
    get: function get() {
      var _this25 = this;

      if (this.__getterCache["containerStyles"] !== undefined) {
        return this.__getterCache["containerStyles"];
      }

      return this.__getterCache["containerStyles"] = function () {
        var direction = _this25.permissibleDirection;
        var vDirectionAllowed = direction === _consts.DIRECTION_VERTICAL || direction === _consts.DIRECTION_BOTH;
        var hDirectionAllowed = direction === _consts.DIRECTION_HORIZONTAL || direction === _consts.DIRECTION_BOTH;
        var touchDirection = vDirectionAllowed ? "pan-x" : "";
        touchDirection = hDirectionAllowed ? "pan-y" : touchDirection;
        touchDirection = vDirectionAllowed && hDirectionAllowed ? "none" : touchDirection;
        return {
          touchAction: touchDirection
        };
      }();
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var _classesMap;

      var _this$props10 = this.props,
          classes = _this$props10.classes,
          direction = _this$props10.direction,
          disabled = _this$props10.disabled,
          showScrollbar = _this$props10.showScrollbar;
      var classesMap = (_classesMap = {
        "dx-scrollable": true
      }, _defineProperty(_classesMap, _consts.SCROLLABLE_SIMULATED_CLASS, true), _defineProperty(_classesMap, "dx-scrollable-".concat(direction), true), _defineProperty(_classesMap, _consts.SCROLLABLE_DISABLED_CLASS, !!disabled), _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, showScrollbar === "always"), _defineProperty(_classesMap, String(classes), !!classes), _classesMap);
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "direction",
    get: function get() {
      var _this26 = this;

      if (this.__getterCache["direction"] !== undefined) {
        return this.__getterCache["direction"];
      }

      return this.__getterCache["direction"] = function () {
        return new _scroll_direction.ScrollDirection(_this26.props.direction);
      }();
    }
  }, {
    key: "permissibleDirection",
    get: function get() {
      var bounceEnabled = this.props.bounceEnabled;
      return (0, _get_allowed_direction.allowedDirection)(this.props.direction, -this.vScrollOffsetMax, -this.hScrollOffsetMax, bounceEnabled);
    }
  }, {
    key: "isHoverable",
    get: function get() {
      return !this.props.disabled && this.props.showScrollbar === "onHover";
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props11 = this.props,
          addWidgetClass = _this$props11.addWidgetClass,
          aria = _this$props11.aria,
          bounceEnabled = _this$props11.bounceEnabled,
          children = _this$props11.children,
          classes = _this$props11.classes,
          direction = _this$props11.direction,
          disabled = _this$props11.disabled,
          forceGeneratePockets = _this$props11.forceGeneratePockets,
          height = _this$props11.height,
          inertiaEnabled = _this$props11.inertiaEnabled,
          needRenderScrollbars = _this$props11.needRenderScrollbars,
          needScrollViewContentWrapper = _this$props11.needScrollViewContentWrapper,
          needScrollViewLoadPanel = _this$props11.needScrollViewLoadPanel,
          onBounce = _this$props11.onBounce,
          onEnd = _this$props11.onEnd,
          onPullDown = _this$props11.onPullDown,
          onReachBottom = _this$props11.onReachBottom,
          onScroll = _this$props11.onScroll,
          onStart = _this$props11.onStart,
          onUpdated = _this$props11.onUpdated,
          onVisibilityChange = _this$props11.onVisibilityChange,
          pullDownEnabled = _this$props11.pullDownEnabled,
          pulledDownText = _this$props11.pulledDownText,
          pullingDownText = _this$props11.pullingDownText,
          reachBottomEnabled = _this$props11.reachBottomEnabled,
          reachBottomText = _this$props11.reachBottomText,
          refreshStrategy = _this$props11.refreshStrategy,
          refreshingText = _this$props11.refreshingText,
          rtlEnabled = _this$props11.rtlEnabled,
          scrollByContent = _this$props11.scrollByContent,
          scrollByThumb = _this$props11.scrollByThumb,
          scrollLocationChange = _this$props11.scrollLocationChange,
          showScrollbar = _this$props11.showScrollbar,
          useKeyboard = _this$props11.useKeyboard,
          visible = _this$props11.visible,
          width = _this$props11.width,
          restProps = _objectWithoutProperties(_this$props11, _excluded);

      return restProps;
    }
  }]);

  return ScrollableSimulated;
}(_inferno2.InfernoComponent);

exports.ScrollableSimulated = ScrollableSimulated;
ScrollableSimulated.defaultProps = _simulated_strategy_props.ScrollableSimulatedProps;