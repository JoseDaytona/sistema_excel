"use strict";

exports.viewFunction = exports.OUT_BOUNDS_ACCELERATION = exports.MIN_VELOCITY_LIMIT = exports.BOUNCE_MIN_VELOCITY_LIMIT = exports.BOUNCE_ACCELERATION_SUM = exports.AnimatedScrollbar = exports.ACCELERATION = void 0;

var _inferno = require("inferno");

var _inferno2 = require("@devextreme/runtime/inferno");

var _base_props = require("../../common/base_props");

var _scrollbar = require("./scrollbar");

var _frame = require("../../../../animation/frame");

var _simulated_strategy_props = require("../common/simulated_strategy_props");

var _math = require("../../../../core/utils/math");

var _clamp_into_range = require("../utils/clamp_into_range");

var _animated_scrollbar_props = require("../common/animated_scrollbar_props");

var _index = require("../../../../events/utils/index");

var _excluded = ["bottomPocketSize", "bounceEnabled", "containerHasSizes", "containerSize", "contentPaddingBottom", "contentSize", "direction", "forceGeneratePockets", "inertiaEnabled", "maxOffset", "minOffset", "onBounce", "onEnd", "onLock", "onPullDown", "onReachBottom", "onUnlock", "pullDownEnabled", "pulledDown", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "showScrollbar", "visible"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OUT_BOUNDS_ACCELERATION = 0.5;
exports.OUT_BOUNDS_ACCELERATION = OUT_BOUNDS_ACCELERATION;
var ACCELERATION = 0.92;
exports.ACCELERATION = ACCELERATION;
var MIN_VELOCITY_LIMIT = 1;
exports.MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT;
var BOUNCE_MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT / 5;
exports.BOUNCE_MIN_VELOCITY_LIMIT = BOUNCE_MIN_VELOCITY_LIMIT;
var FRAME_DURATION = 17;
var BOUNCE_DURATION = 400;
var BOUNCE_FRAMES = BOUNCE_DURATION / FRAME_DURATION;
var BOUNCE_ACCELERATION_SUM = (1 - Math.pow(ACCELERATION, BOUNCE_FRAMES)) / (1 - ACCELERATION);
exports.BOUNCE_ACCELERATION_SUM = BOUNCE_ACCELERATION_SUM;

var viewFunction = function viewFunction(viewModel) {
  var _viewModel$props = viewModel.props,
      bounceEnabled = _viewModel$props.bounceEnabled,
      containerHasSizes = _viewModel$props.containerHasSizes,
      containerSize = _viewModel$props.containerSize,
      contentSize = _viewModel$props.contentSize,
      direction = _viewModel$props.direction,
      maxOffset = _viewModel$props.maxOffset,
      minOffset = _viewModel$props.minOffset,
      rtlEnabled = _viewModel$props.rtlEnabled,
      scrollByThumb = _viewModel$props.scrollByThumb,
      scrollLocation = _viewModel$props.scrollLocation,
      scrollLocationChange = _viewModel$props.scrollLocationChange,
      showScrollbar = _viewModel$props.showScrollbar,
      visible = _viewModel$props.visible,
      scrollbarRef = viewModel.scrollbarRef;
  return (0, _inferno.createComponentVNode)(2, _scrollbar.Scrollbar, {
    "direction": direction,
    "contentSize": contentSize,
    "containerSize": containerSize,
    "containerHasSizes": containerHasSizes,
    "visible": visible,
    "minOffset": minOffset,
    "maxOffset": maxOffset,
    "scrollLocation": scrollLocation,
    "scrollLocationChange": scrollLocationChange,
    "scrollByThumb": scrollByThumb,
    "bounceEnabled": bounceEnabled,
    "showScrollbar": showScrollbar,
    "rtlEnabled": rtlEnabled
  }, null, scrollbarRef);
};

exports.viewFunction = viewFunction;
var AnimatedScrollbarPropsType = Object.defineProperties({}, {
  pulledDown: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.pulledDown;
    },
    configurable: true,
    enumerable: true
  },
  bottomPocketSize: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.bottomPocketSize;
    },
    configurable: true,
    enumerable: true
  },
  contentPaddingBottom: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.contentPaddingBottom;
    },
    configurable: true,
    enumerable: true
  },
  direction: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.direction;
    },
    configurable: true,
    enumerable: true
  },
  containerHasSizes: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.containerHasSizes;
    },
    configurable: true,
    enumerable: true
  },
  containerSize: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.containerSize;
    },
    configurable: true,
    enumerable: true
  },
  contentSize: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.contentSize;
    },
    configurable: true,
    enumerable: true
  },
  visible: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.visible;
    },
    configurable: true,
    enumerable: true
  },
  scrollLocation: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.scrollLocation;
    },
    configurable: true,
    enumerable: true
  },
  minOffset: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.minOffset;
    },
    configurable: true,
    enumerable: true
  },
  maxOffset: {
    get: function get() {
      return _animated_scrollbar_props.AnimatedScrollbarProps.maxOffset;
    },
    configurable: true,
    enumerable: true
  },
  rtlEnabled: {
    get: function get() {
      return _base_props.BaseWidgetProps.rtlEnabled;
    },
    configurable: true,
    enumerable: true
  },
  inertiaEnabled: {
    get: function get() {
      return _simulated_strategy_props.ScrollableSimulatedProps.inertiaEnabled;
    },
    configurable: true,
    enumerable: true
  },
  showScrollbar: {
    get: function get() {
      return _simulated_strategy_props.ScrollableSimulatedProps.showScrollbar;
    },
    configurable: true,
    enumerable: true
  },
  scrollByThumb: {
    get: function get() {
      return _simulated_strategy_props.ScrollableSimulatedProps.scrollByThumb;
    },
    configurable: true,
    enumerable: true
  },
  bounceEnabled: {
    get: function get() {
      return _simulated_strategy_props.ScrollableSimulatedProps.bounceEnabled;
    },
    configurable: true,
    enumerable: true
  },
  pullDownEnabled: {
    get: function get() {
      return _simulated_strategy_props.ScrollableSimulatedProps.pullDownEnabled;
    },
    configurable: true,
    enumerable: true
  },
  reachBottomEnabled: {
    get: function get() {
      return _simulated_strategy_props.ScrollableSimulatedProps.reachBottomEnabled;
    },
    configurable: true,
    enumerable: true
  },
  forceGeneratePockets: {
    get: function get() {
      return _simulated_strategy_props.ScrollableSimulatedProps.forceGeneratePockets;
    },
    configurable: true,
    enumerable: true
  }
});

var AnimatedScrollbar = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(AnimatedScrollbar, _InfernoComponent);

  function AnimatedScrollbar(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.scrollbarRef = (0, _inferno.createRef)();
    _this.thumbScrolling = false;
    _this.crossThumbScrolling = false;
    _this.stepAnimationFrame = 0;
    _this.finished = true;
    _this.stopped = false;
    _this.velocity = 0;
    _this.animator = "inertia";
    _this.refreshing = false;
    _this.loading = false;
    _this.state = {
      forceAnimationToBottomBound: false,
      pendingRefreshing: false,
      pendingLoading: false,
      pendingBounceAnimator: false,
      pendingInertiaAnimator: false,
      needRiseEnd: false,
      wasRelease: false
    };
    _this.isThumb = _this.isThumb.bind(_assertThisInitialized(_this));
    _this.isScrollbar = _this.isScrollbar.bind(_assertThisInitialized(_this));
    _this.reachedMin = _this.reachedMin.bind(_assertThisInitialized(_this));
    _this.reachedMax = _this.reachedMax.bind(_assertThisInitialized(_this));
    _this.initHandler = _this.initHandler.bind(_assertThisInitialized(_this));
    _this.moveHandler = _this.moveHandler.bind(_assertThisInitialized(_this));
    _this.endHandler = _this.endHandler.bind(_assertThisInitialized(_this));
    _this.stopHandler = _this.stopHandler.bind(_assertThisInitialized(_this));
    _this.scrollTo = _this.scrollTo.bind(_assertThisInitialized(_this));
    _this.releaseHandler = _this.releaseHandler.bind(_assertThisInitialized(_this));
    _this.disposeAnimationFrame = _this.disposeAnimationFrame.bind(_assertThisInitialized(_this));
    _this.risePullDown = _this.risePullDown.bind(_assertThisInitialized(_this));
    _this.riseEnd = _this.riseEnd.bind(_assertThisInitialized(_this));
    _this.riseReachBottom = _this.riseReachBottom.bind(_assertThisInitialized(_this));
    _this.bounceAnimatorStart = _this.bounceAnimatorStart.bind(_assertThisInitialized(_this));
    _this.updateLockedState = _this.updateLockedState.bind(_assertThisInitialized(_this));
    _this.resetThumbScrolling = _this.resetThumbScrolling.bind(_assertThisInitialized(_this));
    _this.start = _this.start.bind(_assertThisInitialized(_this));
    _this.cancel = _this.cancel.bind(_assertThisInitialized(_this));
    _this.stepCore = _this.stepCore.bind(_assertThisInitialized(_this));
    _this.getStepAnimationFrame = _this.getStepAnimationFrame.bind(_assertThisInitialized(_this));
    _this.step = _this.step.bind(_assertThisInitialized(_this));
    _this.setupBounce = _this.setupBounce.bind(_assertThisInitialized(_this));
    _this.complete = _this.complete.bind(_assertThisInitialized(_this));
    _this.suppressInertia = _this.suppressInertia.bind(_assertThisInitialized(_this));
    _this.crossBoundOnNextStep = _this.crossBoundOnNextStep.bind(_assertThisInitialized(_this));
    _this.scrollStep = _this.scrollStep.bind(_assertThisInitialized(_this));
    _this.moveTo = _this.moveTo.bind(_assertThisInitialized(_this));
    _this.stopAnimator = _this.stopAnimator.bind(_assertThisInitialized(_this));
    _this.calcThumbScrolling = _this.calcThumbScrolling.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = AnimatedScrollbar.prototype;

  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.disposeAnimationFrame, []), new _inferno2.InfernoEffect(this.risePullDown, [this.props.forceGeneratePockets, this.state.needRiseEnd, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.props.pulledDown, this.state.pendingRefreshing, this.props.onPullDown]), new _inferno2.InfernoEffect(this.riseEnd, [this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.props.pulledDown, this.props.pullDownEnabled, this.state.wasRelease, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onUnlock, this.props.onEnd, this.props.direction]), new _inferno2.InfernoEffect(this.riseReachBottom, [this.props.forceGeneratePockets, this.state.needRiseEnd, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingLoading, this.props.onReachBottom]), new _inferno2.InfernoEffect(this.bounceAnimatorStart, [this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onBounce, this.props.inertiaEnabled, this.props.bounceEnabled]), new _inferno2.InfernoEffect(this.updateLockedState, [this.state.pendingBounceAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onLock])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5;

    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.forceGeneratePockets, this.state.needRiseEnd, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.props.pulledDown, this.state.pendingRefreshing, this.props.onPullDown]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.props.pulledDown, this.props.pullDownEnabled, this.state.wasRelease, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onUnlock, this.props.onEnd, this.props.direction]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.forceGeneratePockets, this.state.needRiseEnd, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingLoading, this.props.onReachBottom]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onBounce, this.props.inertiaEnabled, this.props.bounceEnabled]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.state.pendingBounceAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onLock]);
  };

  _proto.disposeAnimationFrame = function disposeAnimationFrame() {
    var _this2 = this;

    return function () {
      _this2.cancel();
    };
  };

  _proto.risePullDown = function risePullDown() {
    if (this.props.forceGeneratePockets && this.state.needRiseEnd && this.inRange && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && this.props.pulledDown && !this.state.pendingRefreshing && !this.refreshing && -this.props.maxOffset > 0) {
      var _this$props$onPullDow, _this$props;

      this.refreshing = true;
      this.setState(function (__state_argument) {
        return {
          pendingRefreshing: true
        };
      });
      (_this$props$onPullDow = (_this$props = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props);
    }
  };

  _proto.riseEnd = function riseEnd() {
    if (this.inBounds && this.state.needRiseEnd && this.finished && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && !this.pendingRelease && !(this.state.pendingRefreshing || this.state.pendingLoading)) {
      var _this$props$onUnlock, _this$props2, _this$props$onEnd, _this$props3;

      this.setState(function (__state_argument) {
        return {
          needRiseEnd: false
        };
      });
      this.setState(function (__state_argument) {
        return {
          wasRelease: false
        };
      });
      (_this$props$onUnlock = (_this$props2 = this.props).onUnlock) === null || _this$props$onUnlock === void 0 ? void 0 : _this$props$onUnlock.call(_this$props2);
      this.setState(function (__state_argument) {
        return {
          forceAnimationToBottomBound: false
        };
      });
      (_this$props$onEnd = (_this$props3 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props3, this.props.direction);
    }
  };

  _proto.riseReachBottom = function riseReachBottom() {
    if (this.props.forceGeneratePockets && this.state.needRiseEnd && this.inRange && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && this.isReachBottom && !this.state.pendingLoading && !this.loading && -this.props.maxOffset > 0) {
      var _this$props$onReachBo, _this$props4;

      this.loading = true;
      this.setState(function (__state_argument) {
        return {
          pendingLoading: true
        };
      });
      (_this$props$onReachBo = (_this$props4 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props4);
    }
  };

  _proto.bounceAnimatorStart = function bounceAnimatorStart() {
    if (!this.inRange && this.state.needRiseEnd && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && !(this.state.pendingRefreshing || this.state.pendingLoading) && -this.props.maxOffset > 0) {
      this.start("bounce");
    }
  };

  _proto.updateLockedState = function updateLockedState() {
    if (this.state.pendingBounceAnimator || this.state.pendingRefreshing || this.state.pendingLoading) {
      var _this$props$onLock, _this$props5;

      (_this$props$onLock = (_this$props5 = this.props).onLock) === null || _this$props$onLock === void 0 ? void 0 : _this$props$onLock.call(_this$props5);
    }
  };

  _proto.resetThumbScrolling = function resetThumbScrolling() {
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
  };

  _proto.start = function start(animatorName, receivedVelocity, thumbScrolling, crossThumbScrolling) {
    this.animator = animatorName;

    if (this.isBounceAnimator) {
      var _this$props$onBounce, _this$props6;

      this.setState(function (__state_argument) {
        return {
          pendingBounceAnimator: true
        };
      });
      (_this$props$onBounce = (_this$props6 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props6);
      this.setupBounce();
    } else {
      this.setState(function (__state_argument) {
        return {
          pendingInertiaAnimator: true
        };
      });

      if (!thumbScrolling && crossThumbScrolling) {
        this.velocity = 0;
      } else {
        this.velocity = receivedVelocity !== null && receivedVelocity !== void 0 ? receivedVelocity : 0;
      }

      this.suppressInertia(thumbScrolling);
    }

    this.stopped = false;
    this.finished = false;
    this.stepCore();
  };

  _proto.cancel = function cancel() {
    this.setState(function (__state_argument) {
      return {
        pendingBounceAnimator: false
      };
    });
    this.setState(function (__state_argument) {
      return {
        pendingInertiaAnimator: false
      };
    });
    this.stopped = true;
    (0, _frame.cancelAnimationFrame)(this.stepAnimationFrame);
  };

  _proto.stepCore = function stepCore() {
    if (this.stopped) {
      return;
    }

    if (this.isFinished) {
      this.finished = true;
      this.complete();
      return;
    }

    this.step();
    this.stepAnimationFrame = this.getStepAnimationFrame();
  };

  _proto.getStepAnimationFrame = function getStepAnimationFrame() {
    return (0, _frame.requestAnimationFrame)(this.stepCore.bind(this));
  };

  _proto.step = function step() {
    if (!this.props.bounceEnabled && (this.reachedMin() || this.reachedMax())) {
      this.velocity = 0;
    }

    this.scrollStep(this.velocity, this.props.minOffset, this.maxOffset);
    this.velocity *= this.acceleration;
  };

  _proto.setupBounce = function setupBounce() {
    var scrollLocation = this.props.scrollLocation;
    var bounceDistance = (0, _clamp_into_range.clampIntoRange)(scrollLocation, this.props.minOffset, this.maxOffset) - scrollLocation;
    this.velocity = bounceDistance / BOUNCE_ACCELERATION_SUM;
  };

  _proto.complete = function complete() {
    if (this.isBounceAnimator) {
      var boundaryLocation = (0, _clamp_into_range.clampIntoRange)(this.props.scrollLocation, this.props.minOffset, this.maxOffset);
      this.moveTo(boundaryLocation);
    }

    this.stopAnimator();
  };

  _proto.suppressInertia = function suppressInertia(thumbScrolling) {
    if (!this.props.inertiaEnabled || thumbScrolling) {
      this.velocity = 0;
    }
  };

  _proto.crossBoundOnNextStep = function crossBoundOnNextStep() {
    var location = this.props.scrollLocation;
    var nextLocation = location + this.velocity;
    return location <= this.maxOffset && nextLocation >= this.maxOffset || location >= this.props.minOffset && nextLocation <= this.props.minOffset;
  };

  _proto.scrollStep = function scrollStep(delta, minOffset, maxOffset) {
    this.scrollbarRef.current.scrollStep(delta, minOffset, maxOffset);
  };

  _proto.moveTo = function moveTo(location) {
    this.scrollbarRef.current.moveTo(location);
  };

  _proto.stopAnimator = function stopAnimator() {
    this.setState(function (__state_argument) {
      return {
        pendingBounceAnimator: false
      };
    });
    this.setState(function (__state_argument) {
      return {
        pendingInertiaAnimator: false
      };
    });
  };

  _proto.calcThumbScrolling = function calcThumbScrolling(event, currentCrossThumbScrolling) {
    var target = event.originalEvent.target;
    var scrollbarClicked = this.props.scrollByThumb && this.isScrollbar(target);
    this.thumbScrolling = scrollbarClicked || this.props.scrollByThumb && this.isThumb(target);
    this.crossThumbScrolling = !this.thumbScrolling && currentCrossThumbScrolling;
  };

  _proto.isThumb = function isThumb(element) {
    return this.scrollbarRef.current.isThumb(element);
  };

  _proto.isScrollbar = function isScrollbar(element) {
    return this.scrollbarRef.current.isScrollbar(element);
  };

  _proto.reachedMin = function reachedMin() {
    return this.props.scrollLocation <= this.maxOffset;
  };

  _proto.reachedMax = function reachedMax() {
    return this.props.scrollLocation >= this.props.minOffset;
  };

  _proto.initHandler = function initHandler(event, crossThumbScrolling, offset) {
    this.cancel();
    this.refreshing = false;
    this.loading = false;

    if (!(0, _index.isDxMouseWheelEvent)(event.originalEvent)) {
      this.calcThumbScrolling(event, crossThumbScrolling);
      this.scrollbarRef.current.initHandler(event, this.thumbScrolling, offset);
    }
  };

  _proto.moveHandler = function moveHandler(delta) {
    if (this.crossThumbScrolling) {
      return;
    }

    this.scrollbarRef.current.moveHandler(delta, this.props.minOffset, this.maxOffset, this.thumbScrolling);
  };

  _proto.endHandler = function endHandler(velocity, needRiseEnd) {
    this.start("inertia", velocity, this.thumbScrolling, this.crossThumbScrolling);
    this.setState(function (__state_argument) {
      return {
        needRiseEnd: needRiseEnd
      };
    });
    this.resetThumbScrolling();
  };

  _proto.stopHandler = function stopHandler() {
    if (this.thumbScrolling) {
      this.setState(function (__state_argument) {
        return {
          needRiseEnd: true
        };
      });
    }

    this.resetThumbScrolling();
  };

  _proto.scrollTo = function scrollTo(value) {
    this.loading = false;
    this.refreshing = false;
    this.scrollbarRef.current.moveTo(-(0, _clamp_into_range.clampIntoRange)(value, -this.maxOffset, 0));
    this.setState(function (__state_argument) {
      return {
        needRiseEnd: true
      };
    });
  };

  _proto.releaseHandler = function releaseHandler() {
    if (this.props.forceGeneratePockets && this.props.reachBottomEnabled && (0, _math.inRange)(this.props.scrollLocation, this.maxOffset, this.props.maxOffset)) {
      this.setState(function (__state_argument) {
        return {
          forceAnimationToBottomBound: true
        };
      });
    }

    this.setState(function (__state_argument) {
      return {
        wasRelease: true
      };
    });
    this.setState(function (__state_argument) {
      return {
        needRiseEnd: true
      };
    });
    this.resetThumbScrolling();
    this.setState(function (__state_argument) {
      return {
        pendingRefreshing: false
      };
    });
    this.setState(function (__state_argument) {
      return {
        pendingLoading: false
      };
    });
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      forceAnimationToBottomBound: this.state.forceAnimationToBottomBound,
      pendingRefreshing: this.state.pendingRefreshing,
      pendingLoading: this.state.pendingLoading,
      pendingBounceAnimator: this.state.pendingBounceAnimator,
      pendingInertiaAnimator: this.state.pendingInertiaAnimator,
      needRiseEnd: this.state.needRiseEnd,
      wasRelease: this.state.wasRelease,
      scrollbarRef: this.scrollbarRef,
      pendingRelease: this.pendingRelease,
      resetThumbScrolling: this.resetThumbScrolling,
      inRange: this.inRange,
      inBounds: this.inBounds,
      isReachBottom: this.isReachBottom,
      start: this.start,
      cancel: this.cancel,
      stepCore: this.stepCore,
      getStepAnimationFrame: this.getStepAnimationFrame,
      step: this.step,
      setupBounce: this.setupBounce,
      complete: this.complete,
      isBounceAnimator: this.isBounceAnimator,
      isFinished: this.isFinished,
      inProgress: this.inProgress,
      acceleration: this.acceleration,
      maxOffset: this.maxOffset,
      suppressInertia: this.suppressInertia,
      crossBoundOnNextStep: this.crossBoundOnNextStep,
      scrollStep: this.scrollStep,
      moveTo: this.moveTo,
      stopAnimator: this.stopAnimator,
      calcThumbScrolling: this.calcThumbScrolling,
      restAttributes: this.restAttributes
    });
  };

  _createClass(AnimatedScrollbar, [{
    key: "pendingRelease",
    get: function get() {
      return (this.props.pulledDown && this.props.pullDownEnabled || this.isReachBottom && this.props.reachBottomEnabled) && !this.state.wasRelease;
    }
  }, {
    key: "inRange",
    get: function get() {
      return (0, _math.inRange)(this.props.scrollLocation, this.maxOffset, this.props.minOffset);
    }
  }, {
    key: "inBounds",
    get: function get() {
      return (0, _math.inRange)(this.props.scrollLocation, this.props.maxOffset, 0);
    }
  }, {
    key: "isReachBottom",
    get: function get() {
      return this.props.reachBottomEnabled && Math.round(this.props.scrollLocation - this.props.maxOffset) <= 1;
    }
  }, {
    key: "isBounceAnimator",
    get: function get() {
      return this.animator === "bounce";
    }
  }, {
    key: "isFinished",
    get: function get() {
      if (this.isBounceAnimator) {
        return this.crossBoundOnNextStep() || Math.abs(this.velocity) <= BOUNCE_MIN_VELOCITY_LIMIT;
      }

      return Math.abs(this.velocity) <= MIN_VELOCITY_LIMIT;
    }
  }, {
    key: "inProgress",
    get: function get() {
      return !(this.stopped || this.finished);
    }
  }, {
    key: "acceleration",
    get: function get() {
      return this.isBounceAnimator || this.inRange ? ACCELERATION : OUT_BOUNDS_ACCELERATION;
    }
  }, {
    key: "maxOffset",
    get: function get() {
      if (this.props.forceGeneratePockets && this.props.reachBottomEnabled && !this.state.forceAnimationToBottomBound) {
        return this.props.maxOffset - this.props.bottomPocketSize - this.props.contentPaddingBottom;
      }

      return this.props.maxOffset;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props7 = this.props,
          bottomPocketSize = _this$props7.bottomPocketSize,
          bounceEnabled = _this$props7.bounceEnabled,
          containerHasSizes = _this$props7.containerHasSizes,
          containerSize = _this$props7.containerSize,
          contentPaddingBottom = _this$props7.contentPaddingBottom,
          contentSize = _this$props7.contentSize,
          direction = _this$props7.direction,
          forceGeneratePockets = _this$props7.forceGeneratePockets,
          inertiaEnabled = _this$props7.inertiaEnabled,
          maxOffset = _this$props7.maxOffset,
          minOffset = _this$props7.minOffset,
          onBounce = _this$props7.onBounce,
          onEnd = _this$props7.onEnd,
          onLock = _this$props7.onLock,
          onPullDown = _this$props7.onPullDown,
          onReachBottom = _this$props7.onReachBottom,
          onUnlock = _this$props7.onUnlock,
          pullDownEnabled = _this$props7.pullDownEnabled,
          pulledDown = _this$props7.pulledDown,
          reachBottomEnabled = _this$props7.reachBottomEnabled,
          rtlEnabled = _this$props7.rtlEnabled,
          scrollByThumb = _this$props7.scrollByThumb,
          scrollLocation = _this$props7.scrollLocation,
          scrollLocationChange = _this$props7.scrollLocationChange,
          showScrollbar = _this$props7.showScrollbar,
          visible = _this$props7.visible,
          restProps = _objectWithoutProperties(_this$props7, _excluded);

      return restProps;
    }
  }]);

  return AnimatedScrollbar;
}(_inferno2.InfernoComponent);

exports.AnimatedScrollbar = AnimatedScrollbar;
AnimatedScrollbar.defaultProps = AnimatedScrollbarPropsType;