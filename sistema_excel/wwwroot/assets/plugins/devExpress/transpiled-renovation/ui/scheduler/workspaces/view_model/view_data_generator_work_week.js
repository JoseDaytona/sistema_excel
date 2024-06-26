"use strict";

exports.ViewDataGeneratorWorkWeek = void 0;

var _work_week = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/work_week");

var _view_data_generator_week = require("./view_data_generator_week");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MONDAY_INDEX = 1;

var ViewDataGeneratorWorkWeek = /*#__PURE__*/function (_ViewDataGeneratorWee) {
  _inheritsLoose(ViewDataGeneratorWorkWeek, _ViewDataGeneratorWee);

  function ViewDataGeneratorWorkWeek() {
    return _ViewDataGeneratorWee.apply(this, arguments) || this;
  }

  var _proto = ViewDataGeneratorWorkWeek.prototype;

  _proto.isSkippedDate = function isSkippedDate(date) {
    return (0, _work_week.isDataOnWeekend)(date);
  };

  _proto._calculateStartViewDate = function _calculateStartViewDate(options) {
    return (0, _work_week.calculateStartViewDate)(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek));
  };

  _proto.getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeekOption) {
    return firstDayOfWeekOption || MONDAY_INDEX;
  };

  _createClass(ViewDataGeneratorWorkWeek, [{
    key: "daysInInterval",
    get: function get() {
      return 5;
    }
  }, {
    key: "isWorkView",
    get: function get() {
      return true;
    }
  }]);

  return ViewDataGeneratorWorkWeek;
}(_view_data_generator_week.ViewDataGeneratorWeek);

exports.ViewDataGeneratorWorkWeek = ViewDataGeneratorWorkWeek;