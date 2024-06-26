import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "allDayAppointments", "allDayPanelRef", "appointments", "bottomVirtualRowHeight", "className", "dataCellTemplate", "dateCellTemplate", "dateHeaderData", "dateTableRef", "dateTableTemplate", "groupByDate", "groupOrientation", "groupPanelClassName", "groupPanelData", "groupPanelHeight", "groupPanelRef", "groups", "headerEmptyCellWidth", "headerPanelTemplate", "intervalCount", "isAllDayPanelCollapsed", "isAllDayPanelVisible", "isRenderDateHeader", "isRenderGroupPanel", "isRenderHeaderEmptyCell", "isStandaloneAllDayPanel", "isWorkSpaceWithOddCells", "leftVirtualCellWidth", "resourceCellTemplate", "rightVirtualCellWidth", "scrollingDirection", "timeCellTemplate", "timePanelData", "timePanelRef", "timePanelTemplate", "topVirtualRowHeight", "viewData"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/runtime/inferno";
import { Widget } from "../../../common/widget";
import { Scrollable } from "../../../scroll_view/scrollable";
import { GroupPanel } from "./group_panel/group_panel";
import { AllDayPanelLayout } from "./date_table/all_day_panel/layout";
import { HeaderPanelEmptyCell } from "./header_panel_empty_cell";
import { MainLayoutProps } from "./main_layout_props";
import { Semaphore } from "../../semaphore";
export var viewFunction = _ref => {
  var {
    dateTableScrollableRef,
    headerScrollableRef,
    onDateTableScroll,
    onHeaderScroll,
    onSideBarScroll,
    props: {
      allDayAppointments,
      allDayPanelRef,
      appointments,
      className,
      dataCellTemplate,
      dateCellTemplate,
      dateHeaderData,
      dateTableRef,
      dateTableTemplate: DateTable,
      groupByDate,
      groupOrientation,
      groupPanelClassName,
      groupPanelData,
      groupPanelHeight,
      groupPanelRef,
      groups,
      headerEmptyCellWidth,
      headerPanelTemplate: HeaderPanel,
      isRenderDateHeader,
      isRenderGroupPanel,
      isRenderHeaderEmptyCell,
      isStandaloneAllDayPanel,
      resourceCellTemplate,
      timeCellTemplate,
      timePanelData,
      timePanelRef,
      timePanelTemplate: TimePanel,
      viewData
    },
    sideBarScrollableRef
  } = _ref;
  return createComponentVNode(2, Widget, {
    "className": className,
    children: [createVNode(1, "div", "dx-scheduler-fixed-appointments"), createVNode(1, "div", "dx-scheduler-header-panel-container", [isRenderHeaderEmptyCell && createComponentVNode(2, HeaderPanelEmptyCell, {
      "width": headerEmptyCellWidth,
      "isRenderAllDayTitle": isStandaloneAllDayPanel
    }), createVNode(1, "div", "dx-scheduler-header-tables-container", createComponentVNode(2, Scrollable, {
      "className": "dx-scheduler-header-scrollable",
      "useKeyboard": false,
      "showScrollbar": "never",
      "direction": "horizontal",
      "useNative": false,
      "bounceEnabled": false,
      "onScroll": onHeaderScroll,
      children: [createVNode(1, "table", "dx-scheduler-header-panel", HeaderPanel({
        dateHeaderData: dateHeaderData,
        groupPanelData: groupPanelData,
        timeCellTemplate: timeCellTemplate,
        dateCellTemplate: dateCellTemplate,
        isRenderDateHeader: isRenderDateHeader,
        groupOrientation: groupOrientation,
        groupByDate: groupByDate,
        groups: groups,
        resourceCellTemplate: resourceCellTemplate
      }), 0), isStandaloneAllDayPanel && createComponentVNode(2, AllDayPanelLayout, {
        "viewData": viewData,
        "dataCellTemplate": dataCellTemplate,
        "tableRef": allDayPanelRef,
        "allDayAppointments": allDayAppointments
      })]
    }, null, headerScrollableRef), 2)], 0), createVNode(1, "div", "dx-scheduler-work-space-flex-container", [createComponentVNode(2, Scrollable, {
      "className": "dx-scheduler-sidebar-scrollable",
      "useKeyboard": false,
      "showScrollbar": "never",
      "direction": "vertical",
      "useNative": false,
      "bounceEnabled": false,
      "onScroll": onSideBarScroll,
      children: createVNode(1, "div", "dx-scheduler-side-bar-scrollable-content", [isRenderGroupPanel && createComponentVNode(2, GroupPanel, {
        "groupPanelData": groupPanelData,
        "className": groupPanelClassName,
        "groupOrientation": groupOrientation,
        "groupByDate": groupByDate,
        "groups": groups,
        "resourceCellTemplate": resourceCellTemplate,
        "height": groupPanelHeight,
        "elementRef": groupPanelRef
      }), !!TimePanel && TimePanel({
        timePanelData: timePanelData,
        timeCellTemplate: timeCellTemplate,
        groupOrientation: groupOrientation,
        tableRef: timePanelRef
      })], 0)
    }, null, sideBarScrollableRef), createComponentVNode(2, Scrollable, {
      "useKeyboard": false,
      "bounceEnabled": false,
      "direction": "both",
      "className": "dx-scheduler-date-table-scrollable",
      "onScroll": onDateTableScroll,
      children: createVNode(1, "div", "dx-scheduler-date-table-scrollable-content", createVNode(1, "div", "dx-scheduler-date-table-container", [DateTable({
        tableRef: dateTableRef,
        viewData: viewData,
        groupOrientation: groupOrientation,
        dataCellTemplate: dataCellTemplate
      }), appointments], 0), 2)
    }, null, dateTableScrollableRef)], 4)]
  });
};
import { createRef as infernoCreateRef } from "inferno";

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class CrossScrollingLayout extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.dateTableScrollableRef = infernoCreateRef();
    this.headerScrollableRef = infernoCreateRef();
    this.sideBarScrollableRef = infernoCreateRef();
    this.__getterCache = {};
    this.onDateTableScroll = this.onDateTableScroll.bind(this);
    this.onHeaderScroll = this.onHeaderScroll.bind(this);
    this.onSideBarScroll = this.onSideBarScroll.bind(this);
  }

  get dateTableSemaphore() {
    if (this.__getterCache["dateTableSemaphore"] !== undefined) {
      return this.__getterCache["dateTableSemaphore"];
    }

    return this.__getterCache["dateTableSemaphore"] = (() => {
      return new Semaphore();
    })();
  }

  get headerSemaphore() {
    if (this.__getterCache["headerSemaphore"] !== undefined) {
      return this.__getterCache["headerSemaphore"];
    }

    return this.__getterCache["headerSemaphore"] = (() => {
      return new Semaphore();
    })();
  }

  get sideBarSemaphore() {
    if (this.__getterCache["sideBarSemaphore"] !== undefined) {
      return this.__getterCache["sideBarSemaphore"];
    }

    return this.__getterCache["sideBarSemaphore"] = (() => {
      return new Semaphore();
    })();
  }

  onDateTableScroll(e) {
    this.dateTableSemaphore.take();
    this.sideBarSemaphore.isFree() && this.sideBarScrollableRef.current.scrollTo({
      top: e.scrollOffset.top
    });
    this.headerSemaphore.isFree() && this.headerScrollableRef.current.scrollTo({
      left: e.scrollOffset.left
    });
    this.dateTableSemaphore.release();
  }

  onHeaderScroll(e) {
    this.headerSemaphore.take();
    this.dateTableSemaphore.isFree() && this.dateTableScrollableRef.current.scrollTo({
      left: e.scrollOffset.left
    });
    this.headerSemaphore.release();
  }

  onSideBarScroll(e) {
    this.sideBarSemaphore.take();
    this.dateTableSemaphore.isFree() && this.dateTableScrollableRef.current.scrollTo({
      top: e.scrollOffset.top
    });
    this.sideBarSemaphore.release();
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        headerPanelTemplate: getTemplate(props.headerPanelTemplate),
        dateTableTemplate: getTemplate(props.dateTableTemplate),
        timePanelTemplate: getTemplate(props.timePanelTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      dateTableScrollableRef: this.dateTableScrollableRef,
      headerScrollableRef: this.headerScrollableRef,
      sideBarScrollableRef: this.sideBarScrollableRef,
      dateTableSemaphore: this.dateTableSemaphore,
      headerSemaphore: this.headerSemaphore,
      sideBarSemaphore: this.sideBarSemaphore,
      onDateTableScroll: this.onDateTableScroll,
      onHeaderScroll: this.onHeaderScroll,
      onSideBarScroll: this.onSideBarScroll,
      restAttributes: this.restAttributes
    });
  }

}
CrossScrollingLayout.defaultProps = MainLayoutProps;