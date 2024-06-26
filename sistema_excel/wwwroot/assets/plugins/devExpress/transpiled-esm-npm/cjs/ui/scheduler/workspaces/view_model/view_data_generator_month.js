"use strict";

exports.ViewDataGeneratorMonth = void 0;

var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");

var _view_data_generator = require("./view_data_generator");

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

var _month = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/month");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DAY_IN_MILLISECONDS = _date.default.dateToMilliseconds('day');

var DAYS_IN_WEEK = 7;
var WEEKS_IN_MONTH = 4;

var ViewDataGeneratorMonth = /*#__PURE__*/function (_ViewDataGenerator) {
  _inheritsLoose(ViewDataGeneratorMonth, _ViewDataGenerator);

  function ViewDataGeneratorMonth() {
    return _ViewDataGenerator.apply(this, arguments) || this;
  }

  var _proto = ViewDataGeneratorMonth.prototype;

  _proto.getCellData = function getCellData(rowIndex, columnIndex, options, allDay) {
    var data = _ViewDataGenerator.prototype.getCellData.call(this, rowIndex, columnIndex, options, false);

    var startDate = data.startDate;
    var indicatorTime = options.indicatorTime,
        timeZoneCalculator = options.timeZoneCalculator,
        intervalCount = options.intervalCount;
    data.today = this.isCurrentDate(startDate, indicatorTime, timeZoneCalculator);
    data.otherMonth = this.isOtherMonth(startDate, this._minVisibleDate, this._maxVisibleDate);
    data.firstDayOfMonth = (0, _month.isFirstCellInMonthWithIntervalCount)(startDate, intervalCount);
    data.text = (0, _month.getCellText)(startDate, intervalCount);
    return data;
  };

  _proto.isCurrentDate = function isCurrentDate(date, indicatorTime, timeZoneCalculator) {
    return _date.default.sameDate(date, (0, _base.getToday)(indicatorTime, timeZoneCalculator));
  };

  _proto.isOtherMonth = function isOtherMonth(cellDate, minDate, maxDate) {
    return !_date.default.dateInRange(cellDate, minDate, maxDate, 'date');
  };

  _proto._calculateCellIndex = function _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
    return (0, _month.calculateCellIndex)(rowIndex, columnIndex, rowCount, columnCount);
  };

  _proto.calculateEndDate = function calculateEndDate(startDate, interval, endDayHour) {
    return (0, _base.setOptionHour)(startDate, endDayHour);
  };

  _proto.getInterval = function getInterval() {
    return DAY_IN_MILLISECONDS;
  };

  _proto._calculateStartViewDate = function _calculateStartViewDate(options) {
    return (0, _month.calculateStartViewDate)(options.currentDate, options.startDayHour, options.startDate, options.intervalCount, this.getFirstDayOfWeek(options.firstDayOfWeek));
  };

  _proto._setVisibilityDates = function _setVisibilityDates(options) {
    var intervalCount = options.intervalCount,
        startDate = options.startDate,
        currentDate = options.currentDate;

    var firstMonthDate = _date.default.getFirstMonthDate(startDate);

    var viewStart = (0, _month.getViewStartByOptions)(startDate, currentDate, intervalCount, firstMonthDate);
    this._minVisibleDate = new Date(viewStart.setDate(1));
    var nextMonthDate = new Date(viewStart.setMonth(viewStart.getMonth() + intervalCount));
    this._maxVisibleDate = new Date(nextMonthDate.setDate(0));
  };

  _proto.getCellCount = function getCellCount() {
    return DAYS_IN_WEEK;
  };

  _proto.getRowCount = function getRowCount(options) {
    var edgeRowsCount = 2;
    return WEEKS_IN_MONTH * options.intervalCount + edgeRowsCount;
  };

  _proto.getCellCountInDay = function getCellCountInDay() {
    return 1;
  };

  _proto.setHiddenInterval = function setHiddenInterval() {
    this.hiddenInterval = 0;
  };

  _createClass(ViewDataGeneratorMonth, [{
    key: "tableAllDay",
    get: function get() {
      return undefined;
    }
  }]);

  return ViewDataGeneratorMonth;
}(_view_data_generator.ViewDataGenerator);

exports.ViewDataGeneratorMonth = ViewDataGeneratorMonth;