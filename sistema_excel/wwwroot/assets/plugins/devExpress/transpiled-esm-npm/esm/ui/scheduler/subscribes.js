import $ from '../../core/renderer';
import { isPlainObject } from '../../core/utils/type';
import dateUtils from '../../core/utils/date';
import { each } from '../../core/utils/iterator';
import { extend } from '../../core/utils/extend';
import { AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS } from './classes';
import { utils } from './utils';
import { getTimeZoneCalculator } from './instanceFactory';
import { createAppointmentAdapter } from './appointmentAdapter';
import { getFormatType, formatDates } from './appointments/textUtils';
var toMs = dateUtils.dateToMilliseconds;
var subscribes = {
  isCurrentViewAgenda: function isCurrentViewAgenda() {
    return this.option('currentView') === 'agenda';
  },
  currentViewUpdated: function currentViewUpdated(currentView) {
    this.option('currentView', currentView);
  },
  currentDateUpdated: function currentDateUpdated(date) {
    this.option('currentDate', date);
  },
  getOption: function getOption(name) {
    return this.option(name);
  },
  getWorkspaceOption: function getWorkspaceOption(name) {
    return this.getWorkSpace().option(name);
  },
  isVirtualScrolling: function isVirtualScrolling() {
    return this.isVirtualScrolling();
  },
  setCellDataCacheAlias: function setCellDataCacheAlias(appointment, geometry) {
    this._workSpace.setCellDataCacheAlias(appointment, geometry);
  },
  isGroupedByDate: function isGroupedByDate() {
    // TODO replace with ModelProvider
    return this.getWorkSpace().isGroupedByDate();
  },
  showAppointmentTooltip: function showAppointmentTooltip(options) {
    var targetedAppointment = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentTooltip(options.data, options.target, targetedAppointment);
  },
  hideAppointmentTooltip: function hideAppointmentTooltip() {
    this.hideAppointmentTooltip();
  },
  showEditAppointmentPopup: function showEditAppointmentPopup(options) {
    var targetedData = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentPopup(options.data, false, targetedData);
  },
  updateAppointmentAfterResize: function updateAppointmentAfterResize(options) {
    var info = utils.dataAccessors.getAppointmentInfo(options.$appointment);
    var exceptionDate = info.sourceAppointment.exceptionDate;

    this._checkRecurringAppointment(options.target, options.data, exceptionDate, function () {
      this._updateAppointment(options.target, options.data, function () {
        this._appointments.moveAppointmentBack();
      });
    }.bind(this));
  },
  getUpdatedData: function getUpdatedData(rawAppointment) {
    return this._getUpdatedData(rawAppointment);
  },
  updateAppointmentAfterDrag: function updateAppointmentAfterDrag(_ref) {
    var {
      event,
      element,
      rawAppointment,
      coordinates
    } = _ref;
    var info = utils.dataAccessors.getAppointmentInfo(element);
    var appointment = createAppointmentAdapter(rawAppointment, this._dataAccessors, getTimeZoneCalculator(this.key));
    var targetedAppointment = createAppointmentAdapter(extend({}, rawAppointment, this._getUpdatedData(rawAppointment)), this._dataAccessors, getTimeZoneCalculator(this.key));
    var targetedRawAppointment = targetedAppointment.source();

    var newCellIndex = this._workSpace.getDroppableCellIndex();

    var oldCellIndex = this._workSpace.getCellIndexByCoordinates(coordinates);

    var becomeAllDay = targetedAppointment.allDay;
    var wasAllDay = appointment.allDay;
    var movedBetweenAllDayAndSimple = this._workSpace.supportAllDayRow() && (wasAllDay && !becomeAllDay || !wasAllDay && becomeAllDay);

    if (newCellIndex !== oldCellIndex || movedBetweenAllDayAndSimple) {
      this._checkRecurringAppointment(rawAppointment, targetedRawAppointment, info.sourceAppointment.exceptionDate, function () {
        this._updateAppointment(rawAppointment, targetedRawAppointment, function () {
          this._appointments.moveAppointmentBack(event);
        }, event);
      }.bind(this), undefined, undefined, event);
    } else {
      this._appointments.moveAppointmentBack(event);
    }
  },
  onDeleteButtonPress: function onDeleteButtonPress(options) {
    var targetedData = this.getTargetedAppointment(options.data, $(options.target));
    this.checkAndDeleteAppointment(options.data, targetedData);
    this.hideAppointmentTooltip();
  },

  getTextAndFormatDate(appointmentRaw, targetedAppointmentRaw, format) {
    // TODO: rename to createFormattedDateText
    var appointmentAdapter = createAppointmentAdapter(appointmentRaw, this._dataAccessors, getTimeZoneCalculator(this.key));
    var targetedAdapter = createAppointmentAdapter(targetedAppointmentRaw || appointmentRaw, this._dataAccessors, getTimeZoneCalculator(this.key));
    var timeZoneCalculator = getTimeZoneCalculator(this.key); // TODO pull out time zone converting from appointment adapter for knockout(T947938)

    var startDate = timeZoneCalculator.createDate(targetedAdapter.startDate, {
      path: 'toGrid'
    });
    var endDate = timeZoneCalculator.createDate(targetedAdapter.endDate, {
      path: 'toGrid'
    });
    var formatType = format || getFormatType(startDate, endDate, targetedAdapter.allDay, this.option('currentView') !== 'month');
    return {
      text: targetedAdapter.text || appointmentAdapter.text,
      formatDate: formatDates(startDate, endDate, formatType)
    };
  },

  _createAppointmentTitle(data) {
    if (isPlainObject(data)) {
      return data.text;
    }

    return String(data);
  },

  getResizableAppointmentArea: function getResizableAppointmentArea(options) {
    var allDay = options.allDay;

    var groups = this._getCurrentViewOption('groups');

    if (groups && groups.length) {
      if (allDay || this.getLayoutManager().getRenderingStrategyInstance()._needHorizontalGroupBounds()) {
        var horizontalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);

        return {
          left: horizontalGroupBounds.left,
          right: horizontalGroupBounds.right,
          top: 0,
          bottom: 0
        };
      }

      if (this.getLayoutManager().getRenderingStrategyInstance()._needVerticalGroupBounds(allDay) && this._workSpace._isVerticalGroupedWorkSpace()) {
        var verticalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);

        return {
          left: 0,
          right: 0,
          top: verticalGroupBounds.top,
          bottom: verticalGroupBounds.bottom
        };
      }
    }
  },
  needRecalculateResizableArea: function needRecalculateResizableArea() {
    return this.getWorkSpace().needRecalculateResizableArea();
  },
  getAppointmentGeometry: function getAppointmentGeometry(settings) {
    return this.getLayoutManager().getRenderingStrategyInstance().getAppointmentGeometry(settings);
  },
  isAllDay: function isAllDay(appointmentData) {
    return this.getLayoutManager().getRenderingStrategyInstance().isAllDay(appointmentData);
  },
  getDeltaTime: function getDeltaTime(e, initialSize, itemData) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDeltaTime(e, initialSize, itemData);
  },
  getDropDownAppointmentWidth: function getDropDownAppointmentWidth(isAllDay) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentWidth(this._getViewCountConfig().intervalCount, isAllDay);
  },
  getDropDownAppointmentHeight: function getDropDownAppointmentHeight() {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentHeight();
  },
  getCellWidth: function getCellWidth() {
    return this.getWorkSpace().getCellWidth();
  },
  getCellHeight: function getCellHeight() {
    return this.getWorkSpace().getCellHeight();
  },
  getMaxAppointmentCountPerCellByType: function getMaxAppointmentCountPerCellByType(isAllDay) {
    return this.getRenderingStrategyInstance()._getMaxAppointmentCountPerCellByType(isAllDay);
  },
  needCorrectAppointmentDates: function needCorrectAppointmentDates() {
    return this.getRenderingStrategyInstance().needCorrectAppointmentDates();
  },
  getRenderingStrategyDirection: function getRenderingStrategyDirection() {
    return this.getRenderingStrategyInstance().getDirection();
  },
  updateAppointmentStartDate: function updateAppointmentStartDate(options) {
    var appointment = options.appointment;

    var firstViewDate = this._workSpace.getStartViewDate();

    var startDate = new Date(options.startDate);

    var startDayHour = this._getCurrentViewOption('startDayHour');

    var updatedStartDate;

    if (this.appointmentTakesAllDay(appointment)) {
      updatedStartDate = dateUtils.normalizeDate(startDate, firstViewDate);
    } else {
      if (startDate < firstViewDate) {
        startDate = firstViewDate;
      }

      updatedStartDate = dateUtils.normalizeDate(options.startDate, new Date(startDate));
    }

    return dateUtils.roundDateByStartDayHour(updatedStartDate, startDayHour);
  },
  updateAppointmentEndDate: function updateAppointmentEndDate(options) {
    var endDate = options.endDate;

    var endDayHour = this._getCurrentViewOption('endDayHour');

    var startDayHour = this._getCurrentViewOption('startDayHour');

    var updatedEndDate = endDate;

    if (endDate.getHours() >= endDayHour) {
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    } else if (!options.isSameDate && startDayHour > 0 && endDate.getHours() * 60 + endDate.getMinutes() < startDayHour * 60) {
      updatedEndDate = new Date(updatedEndDate.getTime() - toMs('day'));
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    }

    return updatedEndDate;
  },
  renderCompactAppointments: function renderCompactAppointments(options) {
    this._compactAppointmentsHelper.render(options);
  },
  clearCompactAppointments: function clearCompactAppointments() {
    this._compactAppointmentsHelper.clear();
  },
  supportCompactDropDownAppointments: function supportCompactDropDownAppointments() {
    return this._workSpace._supportCompactDropDownAppointments();
  },
  isApplyCompactAppointmentOffset: function isApplyCompactAppointmentOffset() {
    return this._workSpace._isApplyCompactAppointmentOffset();
  },
  getGroupCount: function getGroupCount() {
    return this._workSpace._getGroupCount();
  },
  mapAppointmentFields: function mapAppointmentFields(config) {
    var {
      itemData,
      itemElement,
      targetedAppointment
    } = config;
    var targetedData = targetedAppointment || this.getTargetedAppointment(itemData, itemElement);
    return {
      appointmentData: config.itemData,
      appointmentElement: config.itemElement,
      targetedAppointmentData: targetedData
    };
  },
  dayHasAppointment: function dayHasAppointment(day, appointment, trimTime) {
    return this.dayHasAppointment(day, appointment, trimTime);
  },
  getLayoutManager: function getLayoutManager() {
    return this._layoutManager;
  },
  getAgendaVerticalStepHeight: function getAgendaVerticalStepHeight() {
    return this.getWorkSpace().getAgendaVerticalStepHeight();
  },
  getAgendaDuration: function getAgendaDuration() {
    return this._getCurrentViewOption('agendaDuration');
  },
  getStartViewDate: function getStartViewDate() {
    return this.getStartViewDate();
  },
  getEndViewDate: function getEndViewDate() {
    return this.getEndViewDate();
  },
  forceMaxAppointmentPerCell: function forceMaxAppointmentPerCell() {
    return this.forceMaxAppointmentPerCell();
  },
  onAgendaReady: function onAgendaReady(rows) {
    var $appts = this.getAppointmentsInstance()._itemElements();

    var total = 0;

    var applyClass = function applyClass(_, count) {
      var index = count + total - 1;
      $appts.eq(index).addClass(AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS);
      total += count;
    };

    for (var i = 0; i < rows.length; i++) {
      each(rows[i], applyClass);
    }
  },
  getTimezone: function getTimezone() {
    return this._getTimezoneOffsetByOption();
  },
  getTargetedAppointmentData: function getTargetedAppointmentData(appointment, element) {
    return this.getTargetedAppointment(appointment, element);
  },
  getEndDayHour: function getEndDayHour() {
    return this._workSpace.option('endDayHour') || this.option('endDayHour');
  },
  getStartDayHour: function getStartDayHour() {
    return this._workSpace.option('startDayHour') || this.option('startDayHour');
  },
  isAdaptive: function isAdaptive() {
    return this.option('adaptivityEnabled');
  },
  removeDroppableCellClass: function removeDroppableCellClass() {
    this._workSpace.removeDroppableCellClass();
  }
};
export default subscribes;