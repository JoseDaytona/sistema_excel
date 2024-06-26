"use strict";

exports.default = void 0;

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

var _utils = require("../../../../renovation/ui/scheduler/view_model/group_panel/utils");

var _utils2 = require("../../../../renovation/ui/scheduler/workspaces/utils");

var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");

var _date_header_data_generator = require("./date_header_data_generator");

var _grouped_data_map_provider = require("./grouped_data_map_provider");

var _time_panel_data_generator = require("./time_panel_data_generator");

var _utils3 = require("./utils");

var _utils4 = _interopRequireDefault(require("../../utils.timeZone"));

var _excluded = ["groups", "groupOrientation", "groupByDate", "isAllDayPanelVisible"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewDataProvider = /*#__PURE__*/function () {
  function ViewDataProvider(viewType) {
    this.viewDataGenerator = (0, _utils3.getViewDataGeneratorByViewType)(viewType);
    this.viewData = {};
    this.completeViewDataMap = [];
    this.completeDateHeaderMap = [];
    this.viewDataMap = {};
    this._groupedDataMapProvider = null;
  }

  var _proto = ViewDataProvider.prototype;

  _proto.isSkippedDate = function isSkippedDate(date) {
    return this.viewDataGenerator.isSkippedDate(date);
  };

  _proto.update = function update(options, isGenerateNewViewData) {
    this.viewDataGenerator = (0, _utils3.getViewDataGeneratorByViewType)(options.viewType);
    var viewDataGenerator = this.viewDataGenerator;
    var dateHeaderDataGenerator = new _date_header_data_generator.DateHeaderDataGenerator(viewDataGenerator);
    var timePanelDataGenerator = new _time_panel_data_generator.TimePanelDataGenerator(viewDataGenerator);

    var renderOptions = this._transformRenderOptions(options);

    renderOptions.interval = this.viewDataGenerator.getInterval(renderOptions.hoursInterval);
    this._options = renderOptions;

    if (isGenerateNewViewData) {
      this.completeViewDataMap = viewDataGenerator.getCompleteViewDataMap(renderOptions);
      this.completeDateHeaderMap = dateHeaderDataGenerator.getCompleteDateHeaderMap(renderOptions, this.completeViewDataMap);

      if (renderOptions.isGenerateTimePanelData) {
        this.completeTimePanelMap = timePanelDataGenerator.getCompleteTimePanelMap(renderOptions, this.completeViewDataMap);
      }
    }

    this.viewDataMap = viewDataGenerator.generateViewDataMap(this.completeViewDataMap, renderOptions);
    this.updateViewData(renderOptions);
    this._groupedDataMapProvider = new _grouped_data_map_provider.GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, {
      isVerticalGrouping: renderOptions.isVerticalGrouping,
      viewType: renderOptions.viewType
    });
    this.dateHeaderData = dateHeaderDataGenerator.generateDateHeaderData(this.completeDateHeaderMap, this.completeViewDataMap, renderOptions);

    if (renderOptions.isGenerateTimePanelData) {
      this.timePanelData = timePanelDataGenerator.generateTimePanelData(this.completeTimePanelMap, renderOptions);
    }
  };

  _proto.updateViewData = function updateViewData(options) {
    var renderOptions = this._transformRenderOptions(options);

    this.viewDataMapWithSelection = this.viewDataGenerator.markSelectedAndFocusedCells(this.viewDataMap, renderOptions);
    this.viewData = this.viewDataGenerator.getViewDataFromMap(this.completeViewDataMap, this.viewDataMapWithSelection, renderOptions);
  };

  _proto._transformRenderOptions = function _transformRenderOptions(renderOptions) {
    var groups = renderOptions.groups,
        groupOrientation = renderOptions.groupOrientation,
        groupByDate = renderOptions.groupByDate,
        isAllDayPanelVisible = renderOptions.isAllDayPanelVisible,
        restOptions = _objectWithoutProperties(renderOptions, _excluded);

    return _extends({}, restOptions, {
      startViewDate: this.viewDataGenerator._calculateStartViewDate(renderOptions),
      isVerticalGrouping: (0, _utils2.isVerticalGroupingApplied)(groups, groupOrientation),
      isHorizontalGrouping: (0, _utils2.isHorizontalGroupingApplied)(groups, groupOrientation),
      isGroupedByDate: (0, _utils2.isGroupingByDate)(groups, groupOrientation, groupByDate),
      isGroupedAllDayPanel: (0, _base.calculateIsGroupedAllDayPanel)(groups, groupOrientation, isAllDayPanelVisible),
      groups: groups,
      groupOrientation: groupOrientation,
      isAllDayPanelVisible: isAllDayPanelVisible
    });
  };

  _proto.getGroupPanelData = function getGroupPanelData(options) {
    var renderOptions = this._transformRenderOptions(options);

    if (renderOptions.groups.length > 0) {
      var cellCount = this.getCellCount(renderOptions);
      return (0, _utils.getGroupPanelData)(renderOptions.groups, cellCount, renderOptions.isGroupedByDate, renderOptions.isGroupedByDate ? 1 : cellCount);
    }

    return undefined;
  };

  _proto.getGroupStartDate = function getGroupStartDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupStartDate(groupIndex);
  };

  _proto.getGroupEndDate = function getGroupEndDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupEndDate(groupIndex);
  };

  _proto.findGroupCellStartDate = function findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay) {
    return this._groupedDataMapProvider.findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay);
  };

  _proto.findAllDayGroupCellStartDate = function findAllDayGroupCellStartDate(groupIndex, startDate) {
    return this._groupedDataMapProvider.findAllDayGroupCellStartDate(groupIndex, startDate);
  };

  _proto.findCellPositionInMap = function findCellPositionInMap(cellInfo) {
    return this._groupedDataMapProvider.findCellPositionInMap(cellInfo);
  };

  _proto.getCellsGroup = function getCellsGroup(groupIndex) {
    return this._groupedDataMapProvider.getCellsGroup(groupIndex);
  };

  _proto.getCompletedGroupsInfo = function getCompletedGroupsInfo() {
    return this._groupedDataMapProvider.getCompletedGroupsInfo();
  };

  _proto.getGroupIndices = function getGroupIndices() {
    return this._groupedDataMapProvider.getGroupIndices();
  };

  _proto.getLastGroupCellPosition = function getLastGroupCellPosition(groupIndex) {
    return this._groupedDataMapProvider.getLastGroupCellPosition(groupIndex);
  };

  _proto.getRowCountInGroup = function getRowCountInGroup(groupIndex) {
    return this._groupedDataMapProvider.getRowCountInGroup(groupIndex);
  };

  _proto.getCellData = function getCellData(rowIndex, columnIndex, isAllDay) {
    if (isAllDay && !this._options.isVerticalGrouping) {
      return this.viewDataMap.allDayPanelMap[columnIndex].cellData;
    }

    var dateTableMap = this.viewDataMap.dateTableMap;
    var cellData = dateTableMap[rowIndex][columnIndex].cellData;
    return cellData;
  };

  _proto.getCellsByGroupIndexAndAllDay = function getCellsByGroupIndexAndAllDay(groupIndex, allDay) {
    var rowsPerGroup = this._getRowCountWithAllDayRows();

    var isShowAllDayPanel = this._options.isAllDayPanelVisible;
    var firstRowInGroup = this._options.isVerticalGrouping ? groupIndex * rowsPerGroup : 0;
    var lastRowInGroup = this._options.isVerticalGrouping ? (groupIndex + 1) * rowsPerGroup - 1 : rowsPerGroup;
    var correctedFirstRow = isShowAllDayPanel && !allDay ? firstRowInGroup + 1 : firstRowInGroup;
    var correctedLastRow = allDay ? correctedFirstRow : lastRowInGroup;
    return this.completeViewDataMap.slice(correctedFirstRow, correctedLastRow + 1).map(function (row) {
      return row.filter(function (_ref) {
        var currentGroupIndex = _ref.groupIndex;
        return groupIndex === currentGroupIndex;
      });
    });
  };

  _proto.getGroupData = function getGroupData(groupIndex) {
    var groupedData = this.viewData.groupedData;

    if (this._options.isVerticalGrouping) {
      return groupedData.filter(function (item) {
        return item.groupIndex === groupIndex;
      })[0];
    }

    var filterCells = function filterCells(row) {
      return row === null || row === void 0 ? void 0 : row.filter(function (cell) {
        return cell.groupIndex === groupIndex;
      });
    };

    var _groupedData$ = groupedData[0],
        allDayPanel = _groupedData$.allDayPanel,
        dateTable = _groupedData$.dateTable;
    var filteredDateTable = [];
    dateTable.forEach(function (row) {
      filteredDateTable.push(filterCells(row));
    });
    return {
      allDayPanel: filterCells(allDayPanel),
      dateTable: filteredDateTable
    };
  };

  _proto.getCellCountWithGroup = function getCellCountWithGroup(groupIndex) {
    var rowIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
    return dateTableGroupedMap.filter(function (_, index) {
      return index <= groupIndex;
    }).reduce(function (previous, row) {
      return previous + row[rowIndex].length;
    }, 0);
  };

  _proto.getAllDayPanel = function getAllDayPanel(groupIndex) {
    var groupData = this.getGroupData(groupIndex);
    return groupData === null || groupData === void 0 ? void 0 : groupData.allDayPanel;
  };

  _proto.isGroupIntersectDateInterval = function isGroupIntersectDateInterval(groupIndex, startDate, endDate) {
    var groupStartDate = this.getGroupStartDate(groupIndex);
    var groupEndDate = this.getGroupEndDate(groupIndex);
    return startDate < groupEndDate && endDate > groupStartDate;
  };

  _proto.findGlobalCellPosition = function findGlobalCellPosition(date) {
    var groupIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var completeViewDataMap = this.completeViewDataMap;
    var showAllDayPanel = this._options.isAllDayPanelVisible;

    for (var rowIndex = 0; rowIndex < completeViewDataMap.length; rowIndex += 1) {
      var currentRow = completeViewDataMap[rowIndex];

      for (var columnIndex = 0; columnIndex < currentRow.length; columnIndex += 1) {
        var cellData = currentRow[columnIndex];
        var currentStartDate = cellData.startDate,
            currentEndDate = cellData.endDate,
            currentGroupIndex = cellData.groupIndex,
            currentAllDay = cellData.allDay;

        if (groupIndex === currentGroupIndex && allDay === !!currentAllDay && this._compareDatesAndAllDay(date, currentStartDate, currentEndDate, allDay)) {
          return {
            position: {
              columnIndex: columnIndex,
              rowIndex: showAllDayPanel && !this._options.isVerticalGrouping ? rowIndex - 1 : rowIndex
            },
            cellData: cellData
          };
        }
      }
    }
  };

  _proto._compareDatesAndAllDay = function _compareDatesAndAllDay(date, cellStartDate, cellEndDate, allDay) {
    var time = date.getTime();

    var trimmedTime = _date.default.trimTime(date).getTime();

    var cellStartTime = cellStartDate.getTime();
    var cellEndTime = cellEndDate.getTime();
    return !allDay && time >= cellStartTime && time < cellEndTime || allDay && trimmedTime === cellStartTime;
  };

  _proto.getSkippedDaysCount = function getSkippedDaysCount(groupIndex, startDate, endDate, daysCount) {
    var dateTableGroupedMap = this._groupedDataMapProvider.groupedDataMap.dateTableGroupedMap;
    var groupedData = dateTableGroupedMap[groupIndex];
    var includedDays = 0;

    for (var rowIndex = 0; rowIndex < groupedData.length; rowIndex += 1) {
      for (var columnIndex = 0; columnIndex < groupedData[rowIndex].length; columnIndex += 1) {
        var cell = groupedData[rowIndex][columnIndex].cellData;

        if (startDate.getTime() < cell.endDate.getTime() && endDate.getTime() > cell.startDate.getTime()) {
          includedDays += 1;
        }
      }
    }

    var lastCell = groupedData[groupedData.length - 1][groupedData[0].length - 1].cellData;

    var lastCellStart = _date.default.trimTime(lastCell.startDate);

    var daysAfterView = Math.floor((endDate.getTime() - lastCellStart.getTime()) / _date.default.dateToMilliseconds('day'));
    var deltaDays = daysAfterView > 0 ? daysAfterView : 0;
    return daysCount - includedDays - deltaDays;
  };

  _proto.getColumnsCount = function getColumnsCount() {
    var dateTableMap = this.viewDataMap.dateTableMap;
    return dateTableMap ? dateTableMap[0].length : 0;
  };

  _proto.getViewEdgeIndices = function getViewEdgeIndices(isAllDayPanel) {
    if (isAllDayPanel) {
      return {
        firstColumnIndex: 0,
        lastColumnIndex: this.viewDataMap.allDayPanelMap.length - 1,
        firstRowIndex: 0,
        lastRowIndex: 0
      };
    }

    return {
      firstColumnIndex: 0,
      lastColumnIndex: this.viewDataMap.dateTableMap[0].length - 1,
      firstRowIndex: 0,
      lastRowIndex: this.viewDataMap.dateTableMap.length - 1
    };
  };

  _proto.getGroupEdgeIndices = function getGroupEdgeIndices(groupIndex, isAllDay) {
    var groupedDataMap = this.groupedDataMap.dateTableGroupedMap[groupIndex];
    var cellsCount = groupedDataMap[0].length;
    var rowsCount = groupedDataMap.length;
    var firstColumnIndex = groupedDataMap[0][0].position.columnIndex;
    var lastColumnIndex = groupedDataMap[0][cellsCount - 1].position.columnIndex;

    if (isAllDay) {
      return {
        firstColumnIndex: firstColumnIndex,
        lastColumnIndex: lastColumnIndex,
        firstRowIndex: 0,
        lastRowIndex: 0
      };
    }

    return {
      firstColumnIndex: firstColumnIndex,
      lastColumnIndex: lastColumnIndex,
      firstRowIndex: groupedDataMap[0][0].position.rowIndex,
      lastRowIndex: groupedDataMap[rowsCount - 1][0].position.rowIndex
    };
  };

  _proto.isSameCell = function isSameCell(firstCellData, secondCellData) {
    var firstStartDate = firstCellData.startDate,
        firstGroupIndex = firstCellData.groupIndex,
        firstAllDay = firstCellData.allDay,
        firstIndex = firstCellData.index;
    var secondStartDate = secondCellData.startDate,
        secondGroupIndex = secondCellData.groupIndex,
        secondAllDay = secondCellData.allDay,
        secondIndex = secondCellData.index;
    return firstStartDate.getTime() === secondStartDate.getTime() && firstGroupIndex === secondGroupIndex && firstAllDay === secondAllDay && firstIndex === secondIndex;
  };

  _proto.getLastViewDate = function getLastViewDate() {
    var completeViewDataMap = this.completeViewDataMap;
    var rowsCount = completeViewDataMap.length - 1;
    return completeViewDataMap[rowsCount][completeViewDataMap[rowsCount].length - 1].endDate;
  };

  _proto.getStartViewDate = function getStartViewDate() {
    return this._options.startViewDate;
  };

  _proto.getIntervalDuration = function getIntervalDuration(intervalCount) {
    return this.viewDataGenerator._getIntervalDuration(intervalCount);
  };

  _proto.getLastCellEndDate = function getLastCellEndDate() {
    return new Date(this.getLastViewDate().getTime() - _date.default.dateToMilliseconds('minute'));
  };

  _proto.getLastViewDateByEndDayHour = function getLastViewDateByEndDayHour(endDayHour) {
    var lastCellEndDate = this.getLastCellEndDate();

    var endTime = _date.default.dateTimeFromDecimal(endDayHour);

    var endDateOfLastViewCell = new Date(lastCellEndDate.setHours(endTime.hours, endTime.minutes));
    return this._adjustEndDateByDaylightDiff(lastCellEndDate, endDateOfLastViewCell);
  };

  _proto._adjustEndDateByDaylightDiff = function _adjustEndDateByDaylightDiff(startDate, endDate) {
    var daylightDiff = _utils4.default.getDaylightOffsetInMs(startDate, endDate);

    var endDateOfLastViewCell = new Date(endDate.getTime() - daylightDiff);
    return new Date(endDateOfLastViewCell.getTime() - _date.default.dateToMilliseconds('minute'));
  };

  _proto.getCellCountInDay = function getCellCountInDay(startDayHour, endDayHour, hoursInterval) {
    return this.viewDataGenerator.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
  };

  _proto.getCellCount = function getCellCount(options) {
    return this.viewDataGenerator.getCellCount(options);
  };

  _proto.getRowCount = function getRowCount(options) {
    return this.viewDataGenerator.getRowCount(options);
  };

  _proto.getVisibleDayDuration = function getVisibleDayDuration(startDayHour, endDayHour, hoursInterval) {
    return this.viewDataGenerator.getVisibleDayDuration(startDayHour, endDayHour, hoursInterval);
  };

  _proto._getRowCountWithAllDayRows = function _getRowCountWithAllDayRows() {
    var allDayRowCount = this._options.isAllDayPanelVisible ? 1 : 0;
    return this.getRowCount(this._options) + allDayRowCount;
  };

  _proto.getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeekOption) {
    return this.viewDataGenerator.getFirstDayOfWeek(firstDayOfWeekOption);
  };

  _createClass(ViewDataProvider, [{
    key: "groupedDataMap",
    get: function get() {
      return this._groupedDataMapProvider.groupedDataMap;
    }
  }, {
    key: "hiddenInterval",
    get: function get() {
      return this.viewDataGenerator.hiddenInterval;
    }
  }]);

  return ViewDataProvider;
}();

exports.default = ViewDataProvider;
module.exports = exports.default;
module.exports.default = exports.default;