import registerComponent from "../../../../../../../core/component_registrator";
import BaseComponent from "../../../../../../component_wrapper/common/component";
import { AllDayPanelLayout as AllDayPanelLayoutComponent } from "./layout";
export default class AllDayPanelLayout extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ["dataCellTemplate"],
      props: ["className", "viewData", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "bottomVirtualRowHeight", "addDateTableClass", "addVerticalSizesClassToRows", "dataCellTemplate"]
    };
  }

  get _viewComponent() {
    return AllDayPanelLayoutComponent;
  }

}
registerComponent("dxAllDayPanelLayout", AllDayPanelLayout);