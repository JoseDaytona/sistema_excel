import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "bottomVirtualRowHeight", "cellTemplate", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "tableRef", "topVirtualRowHeight", "viewData"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/runtime/inferno";
import { DateTableLayoutBase, DateTableLayoutProps } from "../../base/date_table/layout";
import { MonthDateTableCell } from "./cell";
export var viewFunction = _ref => {
  var {
    props: {
      addDateTableClass,
      addVerticalSizesClassToRows,
      dataCellTemplate,
      groupOrientation,
      tableRef,
      viewData
    },
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DateTableLayoutBase, _extends({
    "viewData": viewData,
    "groupOrientation": groupOrientation,
    "addDateTableClass": addDateTableClass,
    "dataCellTemplate": dataCellTemplate,
    "cellTemplate": MonthDateTableCell,
    "tableRef": tableRef,
    "addVerticalSizesClassToRows": addVerticalSizesClassToRows
  }, restAttributes)));
};
import { createReRenderEffect } from "@devextreme/runtime/inferno";

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class MonthDateTableLayout extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createEffects() {
    return [createReRenderEffect()];
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
        cellTemplate: getTemplate(props.cellTemplate),
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      restAttributes: this.restAttributes
    });
  }

}
MonthDateTableLayout.defaultProps = DateTableLayoutProps;