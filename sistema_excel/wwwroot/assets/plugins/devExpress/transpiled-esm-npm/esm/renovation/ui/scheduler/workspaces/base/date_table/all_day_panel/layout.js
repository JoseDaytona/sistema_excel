import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "allDayAppointments", "bottomVirtualRowHeight", "className", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "tableRef", "topVirtualRowHeight", "viewData"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/runtime/inferno";
import { Table } from "../../table";
import { AllDayPanelTableBody } from "./table_body";
import { LayoutProps } from "../../layout_props";
import { DefaultSizes } from "../../../const";
export var viewFunction = _ref => {
  var {
    allDayPanelData,
    emptyTableHeight,
    props: {
      allDayAppointments,
      dataCellTemplate,
      tableRef,
      viewData
    }
  } = _ref;
  return createVNode(1, "div", "dx-scheduler-all-day-panel", [allDayAppointments, createComponentVNode(2, Table, {
    "className": "dx-scheduler-all-day-table",
    "height": emptyTableHeight,
    "tableRef": tableRef,
    children: createComponentVNode(2, AllDayPanelTableBody, {
      "viewData": allDayPanelData,
      "leftVirtualCellWidth": viewData.leftVirtualCellWidth,
      "rightVirtualCellWidth": viewData.rightVirtualCellWidth,
      "leftVirtualCellCount": viewData.leftVirtualCellCount,
      "rightVirtualCellCount": viewData.rightVirtualCellCount,
      "dataCellTemplate": dataCellTemplate
    })
  })], 0);
};
export var AllDayPanelLayoutProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(LayoutProps), Object.getOwnPropertyDescriptors({
  className: ""
})));
import { createReRenderEffect } from "@devextreme/runtime/inferno";

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class AllDayPanelLayout extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.__getterCache = {};
  }

  createEffects() {
    return [createReRenderEffect()];
  }

  get allDayPanelData() {
    if (this.__getterCache["allDayPanelData"] !== undefined) {
      return this.__getterCache["allDayPanelData"];
    }

    return this.__getterCache["allDayPanelData"] = (() => {
      return this.props.viewData.groupedData[0].allDayPanel;
    })();
  }

  get emptyTableHeight() {
    return this.allDayPanelData ? undefined : DefaultSizes.allDayPanelHeight;
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();

    if (this.props["viewData"] !== nextProps["viewData"]) {
      this.__getterCache["allDayPanelData"] = undefined;
    }
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      allDayPanelData: this.allDayPanelData,
      emptyTableHeight: this.emptyTableHeight,
      restAttributes: this.restAttributes
    });
  }

}
AllDayPanelLayout.defaultProps = AllDayPanelLayoutProps;