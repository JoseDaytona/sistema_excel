import { getGroupCount } from './resources/utils';
import { isObject } from '../../core/utils/type';
import { getCurrentView } from '../../renovation/ui/scheduler/model/views';
var VIEW_RENDERING_CONFIG = {
  day: {
    renderingStrategy: 'vertical'
  },
  week: {
    renderingStrategy: 'vertical'
  },
  workWeek: {
    renderingStrategy: 'vertical'
  },
  month: {
    renderingStrategy: 'horizontalMonth'
  },
  timelineDay: {
    renderingStrategy: 'horizontal'
  },
  timelineWeek: {
    renderingStrategy: 'horizontal'
  },
  timelineWorkWeek: {
    renderingStrategy: 'horizontal'
  },
  timelineMonth: {
    renderingStrategy: 'horizontalMonthLine'
  },
  agenda: {
    renderingStrategy: 'agenda'
  }
};
export class ModelProvider {
  constructor(model) {
    this.model = model;
    this.currentView = null;
  }

  get key() {
    return this.model.key;
  }

  get loadedResources() {
    return this.model.loadedResources;
  }

  get startDayHour() {
    return this.model['startDayHour'];
  }

  get endDayHour() {
    return this.model['endDayHour'];
  }

  get adaptivityEnabled() {
    return this.model['adaptivityEnabled'];
  }

  get rtlEnabled() {
    return this.model['rtlEnabled'];
  }

  get maxAppointmentsPerCell() {
    return this.getCurrentViewOption('maxAppointmentsPerCell');
  }

  get currentViewOptions() {
    return this.currentView;
  }

  get currentViewType() {
    return isObject(this.currentView) ? this.currentView.type : this.currentView;
  }

  get agendaDuration() {
    return this.model['agendaDuration'];
  }

  get currentDate() {
    return this.model['currentDate'];
  }

  get timeZone() {
    return this.model['timeZone'];
  }

  get isRenovatedAppointments() {
    return this.model['isRenovatedAppointments'];
  }

  supportAllDayResizing() {
    return this.currentViewType !== 'day' || this.currentView.intervalCount > 1;
  }

  updateCurrentView() {
    var views = this.model['views'];
    var currentView = this.model['currentView'];
    this.currentView = getCurrentView(currentView, views);
  }

  isGroupedByDate() {
    return this.model['groupByDate'] && this._isHorizontalGroupedWorkSpace() && getGroupCount(this.loadedResources) > 0;
  }

  _isHorizontalGroupedWorkSpace() {
    return !!this.loadedResources.length && this.model['groupOrientation'] === 'horizontal';
  }

  getCurrentViewOption(optionName) {
    if (this.currentView && this.currentView[optionName] !== undefined) {
      return this.currentView[optionName];
    }

    return this.model[optionName];
  }

  getAppointmentRenderingStrategyName() {
    var {
      renderingStrategy
    } = VIEW_RENDERING_CONFIG[this.currentViewType];
    return renderingStrategy;
  }

}