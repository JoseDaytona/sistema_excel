"use strict";

exports.default = void 0;

var _size = require("../../../../core/utils/size");

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _guid = _interopRequireDefault(require("../../core/guid"));

var _uiForm = _interopRequireDefault(require("./ui.form.items_runtime_info"));

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _type = require("../../core/utils/type");

var _element = require("../../core/element");

var _variable_wrapper = _interopRequireDefault(require("../../core/utils/variable_wrapper"));

var _window = require("../../core/utils/window");

var _string = require("../../core/utils/string");

var _iterator = require("../../core/utils/iterator");

var _extend = require("../../core/utils/extend");

var _array = require("../../core/utils/array");

var _data = require("../../core/utils/data");

var _remove_event = require("../../core/remove_event");

var _click = require("../../events/click");

var _ui = _interopRequireDefault(require("../widget/ui.errors"));

var _message = _interopRequireDefault(require("../../localization/message"));

var _style = require("../../core/utils/style");

var _inflector = require("../../core/utils/inflector");

var _ui2 = _interopRequireDefault(require("../widget/ui.widget"));

var _validator = _interopRequireDefault(require("../validator"));

var _responsive_box = _interopRequireDefault(require("../responsive_box"));

var _themes = require("../themes");

var _constants = require("./constants");

require("../text_box");

require("../number_box");

require("../check_box");

require("../date_box");

require("../button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FORM_EDITOR_BY_DEFAULT = 'dxTextBox';
var LAYOUT_MANAGER_FIRST_ROW_CLASS = 'dx-first-row';
var LAYOUT_MANAGER_LAST_ROW_CLASS = 'dx-last-row';
var LAYOUT_MANAGER_FIRST_COL_CLASS = 'dx-first-col';
var LAYOUT_MANAGER_LAST_COL_CLASS = 'dx-last-col';
var INVALID_CLASS = 'dx-invalid';
var LAYOUT_STRATEGY_FLEX = 'flex';
var LAYOUT_STRATEGY_FALLBACK = 'fallback';
var SIMPLE_ITEM_TYPE = 'simple';
var TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
var DATA_OPTIONS = ['dataSource', 'items'];
var EDITORS_WITH_ARRAY_VALUE = ['dxTagBox', 'dxRangeSlider'];

var LayoutManager = _ui2.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      layoutData: {},
      readOnly: false,
      colCount: 1,
      colCountByScreen: undefined,
      labelLocation: 'left',
      onFieldDataChanged: null,
      onEditorEnterKey: null,
      customizeItem: null,
      alignItemLabels: true,
      minColWidth: 200,
      showRequiredMark: true,
      showOptionalMark: false,
      requiredMark: '*',
      optionalMark: _message.default.format('dxForm-optionalMark'),
      requiredMessage: _message.default.getFormatter('dxForm-requiredMessage')
    });
  },
  _setOptionsByReference: function _setOptionsByReference() {
    this.callBase();
    (0, _extend.extend)(this._optionsByReference, {
      layoutData: true,
      validationGroup: true
    });
  },
  _init: function _init() {
    var layoutData = this.option('layoutData');
    this.callBase();
    this._itemWatchers = [];
    this._itemsRunTimeInfo = new _uiForm.default();

    this._updateReferencedOptions(layoutData);

    this._initDataAndItems(layoutData);
  },
  _dispose: function _dispose() {
    this.callBase();

    this._cleanItemWatchers();
  },
  _initDataAndItems: function _initDataAndItems(initialData) {
    this._syncDataWithItems();

    this._updateItems(initialData);
  },
  _syncDataWithItems: function _syncDataWithItems() {
    var _this = this;

    var layoutData = this.option('layoutData');
    var userItems = this.option('items');

    if ((0, _type.isDefined)(userItems)) {
      userItems.forEach(function (item) {
        if (item.dataField && _this._getDataByField(item.dataField) === undefined) {
          var value;

          if (item.editorOptions) {
            value = item.editorOptions.value;
          }

          if ((0, _type.isDefined)(value) || item.dataField in layoutData) {
            _this._updateFieldValue(item.dataField, value);
          }
        }
      });
    }
  },
  _getDataByField: function _getDataByField(dataField) {
    return dataField ? this.option('layoutData.' + dataField) : null;
  },
  _isCheckboxUndefinedStateEnabled: function _isCheckboxUndefinedStateEnabled(editorOption) {
    if (editorOption.allowIndeterminateState === true && editorOption.editorType === 'dxCheckBox') {
      var nameParts = ['layoutData'].concat(_toConsumableArray(editorOption.dataField.split('.')));
      var propertyName = nameParts.pop();
      var layoutData = this.option(nameParts.join('.'));
      return layoutData && propertyName in layoutData;
    }

    return false;
  },
  _updateFieldValue: function _updateFieldValue(dataField, value) {
    var layoutData = this.option('layoutData');
    var newValue = value;

    if (!_variable_wrapper.default.isWrapped(layoutData[dataField]) && (0, _type.isDefined)(dataField)) {
      this.option('layoutData.' + dataField, newValue);
    } else if (_variable_wrapper.default.isWritableWrapped(layoutData[dataField])) {
      newValue = (0, _type.isFunction)(newValue) ? newValue() : newValue;
      layoutData[dataField](newValue);
    }

    this._triggerOnFieldDataChanged({
      dataField: dataField,
      value: newValue
    });
  },
  _triggerOnFieldDataChanged: function _triggerOnFieldDataChanged(args) {
    this._createActionByOption('onFieldDataChanged')(args);
  },
  _updateItems: function _updateItems(layoutData) {
    var that = this;
    var userItems = this.option('items');
    var isUserItemsExist = (0, _type.isDefined)(userItems);
    var customizeItem = that.option('customizeItem');
    var items = isUserItemsExist ? userItems : this._generateItemsByData(layoutData);

    if ((0, _type.isDefined)(items)) {
      var processedItems = [];
      (0, _iterator.each)(items, function (index, item) {
        if (that._isAcceptableItem(item)) {
          item = that._processItem(item);
          customizeItem && customizeItem(item);

          if ((0, _type.isObject)(item) && _variable_wrapper.default.unwrap(item.visible) !== false) {
            processedItems.push(item);
          }
        }
      });

      if (!that._itemWatchers.length || !isUserItemsExist) {
        that._updateItemWatchers(items);
      }

      this._setItems(processedItems);

      this._sortItems();
    }
  },
  _cleanItemWatchers: function _cleanItemWatchers() {
    this._itemWatchers.forEach(function (dispose) {
      dispose();
    });

    this._itemWatchers = [];
  },
  _updateItemWatchers: function _updateItemWatchers(items) {
    var that = this;

    var watch = that._getWatch();

    items.forEach(function (item) {
      if ((0, _type.isObject)(item) && (0, _type.isDefined)(item.visible) && (0, _type.isFunction)(watch)) {
        that._itemWatchers.push(watch(function () {
          return _variable_wrapper.default.unwrap(item.visible);
        }, function () {
          that._updateItems(that.option('layoutData'));

          that.repaint();
        }, {
          skipImmediate: true
        }));
      }
    });
  },
  _generateItemsByData: function _generateItemsByData(layoutData) {
    var result = [];

    if ((0, _type.isDefined)(layoutData)) {
      (0, _iterator.each)(layoutData, function (dataField) {
        result.push({
          dataField: dataField
        });
      });
    }

    return result;
  },
  _isAcceptableItem: function _isAcceptableItem(item) {
    var itemField = item.dataField || item;

    var itemData = this._getDataByField(itemField);

    return !((0, _type.isFunction)(itemData) && !_variable_wrapper.default.isWrapped(itemData));
  },
  _processItem: function _processItem(item) {
    if (typeof item === 'string') {
      item = {
        dataField: item
      };
    }

    if (_typeof(item) === 'object' && !item.itemType) {
      item.itemType = SIMPLE_ITEM_TYPE;
    }

    if (!(0, _type.isDefined)(item.editorType) && (0, _type.isDefined)(item.dataField)) {
      var value = this._getDataByField(item.dataField);

      item.editorType = (0, _type.isDefined)(value) ? this._getEditorTypeByDataType((0, _type.type)(value)) : FORM_EDITOR_BY_DEFAULT;
    }

    if (item.editorType === 'dxCheckBox') {
      var _item$allowIndetermin;

      item.allowIndeterminateState = (_item$allowIndetermin = item.allowIndeterminateState) !== null && _item$allowIndetermin !== void 0 ? _item$allowIndetermin : true;
    }

    return item;
  },
  _getEditorTypeByDataType: function _getEditorTypeByDataType(dataType) {
    switch (dataType) {
      case 'number':
        return 'dxNumberBox';

      case 'date':
        return 'dxDateBox';

      case 'boolean':
        return 'dxCheckBox';

      default:
        return 'dxTextBox';
    }
  },
  _sortItems: function _sortItems() {
    (0, _array.normalizeIndexes)(this._items, 'visibleIndex');

    this._sortIndexes();
  },
  _sortIndexes: function _sortIndexes() {
    this._items.sort(function (itemA, itemB) {
      var indexA = itemA.visibleIndex;
      var indexB = itemB.visibleIndex;
      var result;

      if (indexA > indexB) {
        result = 1;
      } else if (indexA < indexB) {
        result = -1;
      } else {
        result = 0;
      }

      return result;
    });
  },
  _initMarkup: function _initMarkup() {
    this._itemsRunTimeInfo.clear();

    this.callBase();

    this._renderResponsiveBox();
  },
  _hasBrowserFlex: function _hasBrowserFlex() {
    return (0, _style.styleProp)(LAYOUT_STRATEGY_FLEX) === LAYOUT_STRATEGY_FLEX;
  },
  _renderResponsiveBox: function _renderResponsiveBox() {
    var that = this;
    var templatesInfo = [];

    if (that._items && that._items.length) {
      var colCount = that._getColCount();

      that._prepareItemsWithMerging(colCount);

      var layoutItems = that._generateLayoutItems();

      that._extendItemsWithDefaultTemplateOptions(layoutItems, that._items);

      that._responsiveBox = that._createComponent(
      /* $container, */
      _responsive_box.default, that._getResponsiveBoxConfig(layoutItems, colCount, templatesInfo));

      if (!(0, _window.hasWindow)()) {
        that._renderTemplates(templatesInfo);
      }
    }
  },
  _extendItemsWithDefaultTemplateOptions: function _extendItemsWithDefaultTemplateOptions(targetItems, sourceItems) {
    sourceItems.forEach(function (item) {
      if (!item.merged) {
        if ((0, _type.isDefined)(item.disabled)) {
          targetItems[item.visibleIndex].disabled = item.disabled;
        }

        if ((0, _type.isDefined)(item.visible)) {
          targetItems[item.visibleIndex].visible = item.visible;
        }
      }
    });
  },
  _itemStateChangedHandler: function _itemStateChangedHandler(e) {
    this._refresh();
  },
  _renderTemplate: function _renderTemplate($container, item) {
    switch (item.itemType) {
      case 'empty':
        this._renderEmptyItem($container);

        break;

      case 'button':
        this._renderButtonItem(item, $container);

        break;

      default:
        this._renderFieldItem(item, $container);

    }
  },
  _renderTemplates: function _renderTemplates(templatesInfo) {
    var that = this;
    (0, _iterator.each)(templatesInfo, function (index, info) {
      that._renderTemplate(info.container, info.formItem);
    });
  },
  _getResponsiveBoxConfig: function _getResponsiveBoxConfig(layoutItems, colCount, templatesInfo) {
    var that = this;
    var colCountByScreen = that.option('colCountByScreen');
    var xsColCount = colCountByScreen && colCountByScreen.xs;
    return {
      onItemStateChanged: this._itemStateChangedHandler.bind(this),
      _layoutStrategy: that._hasBrowserFlex() ? LAYOUT_STRATEGY_FLEX : LAYOUT_STRATEGY_FALLBACK,
      onLayoutChanged: function onLayoutChanged() {
        var onLayoutChanged = that.option('onLayoutChanged');
        var isSingleColumnMode = that.isSingleColumnMode();

        if (onLayoutChanged) {
          that.$element().toggleClass(_constants.LAYOUT_MANAGER_ONE_COLUMN, isSingleColumnMode);
          onLayoutChanged(isSingleColumnMode);
        }
      },
      onContentReady: function onContentReady(e) {
        if ((0, _window.hasWindow)()) {
          that._renderTemplates(templatesInfo);
        }

        if (that.option('onLayoutChanged')) {
          that.$element().toggleClass(_constants.LAYOUT_MANAGER_ONE_COLUMN, that.isSingleColumnMode(e.component));
        }
      },
      itemTemplate: function itemTemplate(e, itemData, itemElement) {
        if (!e.location) {
          return;
        }

        var $itemElement = (0, _renderer.default)(itemElement);
        var itemRenderedCountInPreviousRows = e.location.row * colCount;
        var item = that._items[e.location.col + itemRenderedCountInPreviousRows];
        var $fieldItem = (0, _renderer.default)('<div>').addClass(item.cssClass).appendTo($itemElement);
        templatesInfo.push({
          container: $fieldItem,
          formItem: item
        });
        $itemElement.toggleClass(_constants.SINGLE_COLUMN_ITEM_CONTENT, that.isSingleColumnMode(this));

        if (e.location.row === 0) {
          $fieldItem.addClass(LAYOUT_MANAGER_FIRST_ROW_CLASS);
        }

        if (e.location.col === 0) {
          $fieldItem.addClass(LAYOUT_MANAGER_FIRST_COL_CLASS);
        }

        if (item.itemType === SIMPLE_ITEM_TYPE && that.option('isRoot')) {
          $itemElement.addClass(_constants.ROOT_SIMPLE_ITEM_CLASS);
        }

        var isLastColumn = e.location.col === colCount - 1 || e.location.col + e.location.colspan === colCount;

        var rowsCount = that._getRowsCount();

        var isLastRow = e.location.row === rowsCount - 1;

        if (isLastColumn) {
          $fieldItem.addClass(LAYOUT_MANAGER_LAST_COL_CLASS);
        }

        if (isLastRow) {
          $fieldItem.addClass(LAYOUT_MANAGER_LAST_ROW_CLASS);
        }
      },
      cols: that._generateRatio(colCount),
      rows: that._generateRatio(that._getRowsCount(), true),
      dataSource: layoutItems,
      singleColumnScreen: xsColCount ? false : 'xs'
    };
  },
  _getColCount: function _getColCount() {
    var colCount = this.option('colCount');
    var colCountByScreen = this.option('colCountByScreen');

    if (colCountByScreen) {
      var screenFactor = this.option('form').getTargetScreenFactor();

      if (!screenFactor) {
        screenFactor = (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)(this.option('screenByWidth')) : 'lg';
      }

      colCount = colCountByScreen[screenFactor] || colCount;
    }

    if (colCount === 'auto') {
      if (this._cashedColCount) {
        return this._cashedColCount;
      }

      this._cashedColCount = colCount = this._getMaxColCount();
    }

    return colCount < 1 ? 1 : colCount;
  },
  _getMaxColCount: function _getMaxColCount() {
    if (!(0, _window.hasWindow)()) {
      return 1;
    }

    var minColWidth = this.option('minColWidth');
    var width = (0, _size.getWidth)(this.$element());
    var itemsCount = this._items.length;
    var maxColCount = Math.floor(width / minColWidth) || 1;
    return itemsCount < maxColCount ? itemsCount : maxColCount;
  },
  isCachedColCountObsolete: function isCachedColCountObsolete() {
    return this._cashedColCount && this._getMaxColCount() !== this._cashedColCount;
  },
  _prepareItemsWithMerging: function _prepareItemsWithMerging(colCount) {
    var items = this._items.slice(0);

    var item;
    var itemsMergedByCol;
    var result = [];
    var j;
    var i;

    for (i = 0; i < items.length; i++) {
      item = items[i];
      result.push(item);

      if (this.option('alignItemLabels') || item.alignItemLabels || item.colSpan) {
        item.col = this._getColByIndex(result.length - 1, colCount);
      }

      if (item.colSpan > 1 && item.col + item.colSpan <= colCount) {
        itemsMergedByCol = [];

        for (j = 0; j < item.colSpan - 1; j++) {
          itemsMergedByCol.push({
            merged: true
          });
        }

        result = result.concat(itemsMergedByCol);
      } else {
        delete item.colSpan;
      }
    }

    this._setItems(result);
  },
  _getColByIndex: function _getColByIndex(index, colCount) {
    return index % colCount;
  },
  _setItems: function _setItems(items) {
    this._items = items;
    this._cashedColCount = null; // T923489
  },
  _generateLayoutItems: function _generateLayoutItems() {
    var items = this._items;

    var colCount = this._getColCount();

    var result = [];
    var item;
    var i;

    for (i = 0; i < items.length; i++) {
      item = items[i];

      if (!item.merged) {
        var generatedItem = {
          location: {
            row: parseInt(i / colCount),
            col: this._getColByIndex(i, colCount)
          }
        };

        if ((0, _type.isDefined)(item.colSpan)) {
          generatedItem.location.colspan = item.colSpan;
        }

        if ((0, _type.isDefined)(item.rowSpan)) {
          generatedItem.location.rowspan = item.rowSpan;
        }

        result.push(generatedItem);
      }
    }

    return result;
  },
  _renderEmptyItem: function _renderEmptyItem($container) {
    return $container.addClass(_constants.FIELD_EMPTY_ITEM_CLASS).html('&nbsp;');
  },
  _getButtonHorizontalAlignment: function _getButtonHorizontalAlignment(item) {
    if ((0, _type.isDefined)(item.horizontalAlignment)) {
      return item.horizontalAlignment;
    }

    return 'right';
  },
  _getButtonVerticalAlignment: function _getButtonVerticalAlignment(item) {
    switch (item.verticalAlignment) {
      case 'center':
        return 'center';

      case 'bottom':
        return 'flex-end';

      default:
        return 'flex-start';
    }
  },
  _renderButtonItem: function _renderButtonItem(item, $container) {
    var $button = (0, _renderer.default)('<div>').appendTo($container);
    var defaultOptions = {
      validationGroup: this.option('validationGroup')
    };
    $container.addClass(_constants.FIELD_BUTTON_ITEM_CLASS).css('textAlign', this._getButtonHorizontalAlignment(item));
    $container.parent().css('justifyContent', this._getButtonVerticalAlignment(item));

    var instance = this._createComponent($button, 'dxButton', (0, _extend.extend)(defaultOptions, item.buttonOptions));

    this._itemsRunTimeInfo.add({
      item: item,
      widgetInstance: instance,
      guid: item.guid,
      $itemContainer: $container
    });

    this._addItemClasses($container, item.col);

    return $button;
  },
  _addItemClasses: function _addItemClasses($item, column) {
    $item.addClass(_constants.FIELD_ITEM_CLASS).addClass(this.option('cssItemClass')).addClass((0, _type.isDefined)(column) ? 'dx-col-' + column : '');
  },
  _renderFieldItem: function _renderFieldItem(item, $container) {
    var that = this;

    var name = that._getName(item);

    var id = that.getItemID(name);
    var isRequired = (0, _type.isDefined)(item.isRequired) ? item.isRequired : !!that._hasRequiredRuleInSet(item.validationRules);

    var labelOptions = that._getLabelOptions(item, id, isRequired);

    var $editor = (0, _renderer.default)('<div>');
    var helpID = item.helpText ? 'dx-' + new _guid.default() : null;
    var $label;

    this._addItemClasses($container, item.col);

    $container.addClass(isRequired ? _constants.FIELD_ITEM_REQUIRED_CLASS : _constants.FIELD_ITEM_OPTIONAL_CLASS);

    if (labelOptions.visible && labelOptions.text) {
      $label = that._renderLabel(labelOptions).appendTo($container);
    }

    if (item.itemType === SIMPLE_ITEM_TYPE) {
      if (that._isLabelNeedBaselineAlign(item) && labelOptions.location !== 'top') {
        $container.addClass(_constants.FIELD_ITEM_LABEL_ALIGN_CLASS);
      }

      that._hasBrowserFlex() && $container.addClass(_constants.FLEX_LAYOUT_CLASS);
    }

    $editor.data('dx-form-item', item);

    that._appendEditorToField({
      $fieldItem: $container,
      $label: $label,
      $editor: $editor,
      labelOptions: labelOptions
    });

    var instance = that._renderEditor({
      $container: $editor,
      dataField: item.dataField,
      name: item.name,
      editorType: item.editorType,
      editorOptions: item.editorOptions,
      template: that._getTemplateByFieldItem(item),
      isRequired: isRequired,
      helpID: helpID,
      labelID: labelOptions.labelID,
      id: id,
      validationBoundary: that.option('validationBoundary'),
      allowIndeterminateState: item.allowIndeterminateState
    });

    this._itemsRunTimeInfo.add({
      item: item,
      widgetInstance: instance,
      guid: item.guid,
      $itemContainer: $container
    });

    var editorElem = $editor.children().first();
    var $validationTarget = editorElem.hasClass(TEMPLATE_WRAPPER_CLASS) ? editorElem.children().first() : editorElem;
    var validationTargetInstance = $validationTarget && $validationTarget.data('dx-validation-target');

    if (validationTargetInstance) {
      that._renderValidator($validationTarget, item);

      if ((0, _themes.isMaterial)()) {
        that._addWrapperInvalidClass(validationTargetInstance);
      }
    }

    that._renderHelpText(item, $editor, helpID);

    that._attachClickHandler($label, $editor, item.editorType);
  },
  _hasRequiredRuleInSet: function _hasRequiredRuleInSet(rules) {
    var hasRequiredRule;

    if (rules && rules.length) {
      (0, _iterator.each)(rules, function (index, rule) {
        if (rule.type === 'required') {
          hasRequiredRule = true;
          return false;
        }
      });
    }

    return hasRequiredRule;
  },
  _getName: function _getName(item) {
    return item.dataField || item.name;
  },
  _isLabelNeedBaselineAlign: function _isLabelNeedBaselineAlign(item) {
    var largeEditors = ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor'];
    return !!item.helpText && !this._hasBrowserFlex() || (0, _array.inArray)(item.editorType, largeEditors) !== -1;
  },
  _isLabelNeedId: function _isLabelNeedId(item) {
    var editorsRequiringIdForLabel = ['dxRadioGroup', 'dxCheckBox', 'dxLookup', 'dxSlider', 'dxRangeSlider', 'dxSwitch', 'dxHtmlEditor']; // TODO: support "dxCalendar"

    return (0, _array.inArray)(item.editorType, editorsRequiringIdForLabel) !== -1;
  },
  _getLabelOptions: function _getLabelOptions(item, id, isRequired) {
    var labelOptions = (0, _extend.extend)({
      showColon: this.option('showColonAfterLabel'),
      location: this.option('labelLocation'),
      id: id,
      visible: true,
      isRequired: isRequired
    }, item ? item.label : {});

    if (this._isLabelNeedId(item)) {
      labelOptions.labelID = "dx-label-".concat(new _guid.default());
    }

    if (!labelOptions.text && item.dataField) {
      labelOptions.text = (0, _inflector.captionize)(item.dataField);
    }

    if (labelOptions.text) {
      labelOptions.text += labelOptions.showColon ? ':' : '';
    }

    return labelOptions;
  },
  _renderLabel: function _renderLabel(options) {
    var text = options.text,
        id = options.id,
        location = options.location,
        alignment = options.alignment,
        isRequired = options.isRequired,
        _options$labelID = options.labelID,
        labelID = _options$labelID === void 0 ? null : _options$labelID;

    if ((0, _type.isDefined)(text) && text.length > 0) {
      var labelClasses = _constants.FIELD_ITEM_LABEL_CLASS + ' ' + _constants.FIELD_ITEM_LABEL_LOCATION_CLASS + location;
      var $label = (0, _renderer.default)('<label>').addClass(labelClasses).attr('for', id).attr('id', labelID);
      var $labelContent = (0, _renderer.default)('<span>').addClass(_constants.FIELD_ITEM_LABEL_CONTENT_CLASS).appendTo($label);
      (0, _renderer.default)('<span>').addClass(_constants.FIELD_ITEM_LABEL_TEXT_CLASS).text(text).appendTo($labelContent);

      if (alignment) {
        $label.css('textAlign', alignment);
      }

      $labelContent.append(this._renderLabelMark(isRequired));
      return $label;
    }
  },
  _renderLabelMark: function _renderLabelMark(isRequired) {
    var $mark;

    var requiredMarksConfig = this._getRequiredMarksConfig();

    var isRequiredMark = requiredMarksConfig.showRequiredMark && isRequired;
    var isOptionalMark = requiredMarksConfig.showOptionalMark && !isRequired;

    if (isRequiredMark || isOptionalMark) {
      var markClass = isRequiredMark ? _constants.FIELD_ITEM_REQUIRED_MARK_CLASS : _constants.FIELD_ITEM_OPTIONAL_MARK_CLASS;
      var markText = isRequiredMark ? requiredMarksConfig.requiredMark : requiredMarksConfig.optionalMark;
      $mark = (0, _renderer.default)('<span>').addClass(markClass).html('&nbsp' + markText);
    }

    return $mark;
  },
  _getRequiredMarksConfig: function _getRequiredMarksConfig() {
    if (!this._cashedRequiredConfig) {
      this._cashedRequiredConfig = {
        showRequiredMark: this.option('showRequiredMark'),
        showOptionalMark: this.option('showOptionalMark'),
        requiredMark: this.option('requiredMark'),
        optionalMark: this.option('optionalMark')
      };
    }

    return this._cashedRequiredConfig;
  },
  _renderEditor: function _renderEditor(options) {
    var dataValue = this._getDataByField(options.dataField);

    var defaultEditorOptions = dataValue !== undefined || this._isCheckboxUndefinedStateEnabled(options) ? {
      value: dataValue
    } : {};
    var isDeepExtend = true;

    if (EDITORS_WITH_ARRAY_VALUE.indexOf(options.editorType) !== -1) {
      defaultEditorOptions.value = defaultEditorOptions.value || [];
    }

    var formInstance = this.option('form');
    var editorOptions = (0, _extend.extend)(isDeepExtend, defaultEditorOptions, options.editorOptions, {
      inputAttr: {
        id: options.id
      },
      validationBoundary: options.validationBoundary,
      stylingMode: formInstance && formInstance.option('stylingMode')
    });

    this._replaceDataOptions(options.editorOptions, editorOptions);

    var renderOptions = {
      editorType: options.editorType,
      dataField: options.dataField,
      template: options.template,
      name: options.name,
      helpID: options.helpID,
      labelID: options.labelID,
      isRequired: options.isRequired
    };
    return this._createEditor(options.$container, renderOptions, editorOptions);
  },
  _replaceDataOptions: function _replaceDataOptions(originalOptions, resultOptions) {
    if (originalOptions) {
      DATA_OPTIONS.forEach(function (item) {
        if (resultOptions[item]) {
          resultOptions[item] = originalOptions[item];
        }
      });
    }
  },
  _renderValidator: function _renderValidator($editor, item) {
    var fieldName = this._getFieldLabelName(item);

    var validationRules = this._prepareValidationRules(item.validationRules, item.isRequired, item.itemType, fieldName);

    if (Array.isArray(validationRules) && validationRules.length) {
      this._createComponent($editor, _validator.default, {
        validationRules: validationRules,
        validationGroup: this.option('validationGroup'),
        dataGetter: function dataGetter() {
          return {
            formItem: item
          };
        }
      });
    }
  },
  _getFieldLabelName: function _getFieldLabelName(item) {
    var isItemHaveCustomLabel = item.label && item.label.text;
    var itemName = isItemHaveCustomLabel ? null : this._getName(item);
    return isItemHaveCustomLabel ? item.label.text : itemName && (0, _inflector.captionize)(itemName);
  },
  _prepareValidationRules: function _prepareValidationRules(userValidationRules, isItemRequired, itemType, itemName) {
    var isSimpleItem = itemType === SIMPLE_ITEM_TYPE;
    var validationRules;

    if (isSimpleItem) {
      if (userValidationRules) {
        validationRules = userValidationRules;
      } else {
        var requiredMessage = (0, _string.format)(this.option('requiredMessage'), itemName || '');
        validationRules = isItemRequired ? [{
          type: 'required',
          message: requiredMessage
        }] : null;
      }
    }

    return validationRules;
  },
  _addWrapperInvalidClass: function _addWrapperInvalidClass(editorInstance) {
    var wrapperClass = '.' + _constants.FIELD_ITEM_CONTENT_WRAPPER_CLASS;

    var toggleInvalidClass = function toggleInvalidClass(e) {
      (0, _renderer.default)(e.element).parents(wrapperClass).toggleClass(INVALID_CLASS, e.component._isFocused() && e.component.option('isValid') === false);
    };

    editorInstance.on('focusIn', toggleInvalidClass).on('focusOut', toggleInvalidClass).on('enterKey', toggleInvalidClass);
  },
  _createEditor: function _createEditor($container, renderOptions, editorOptions) {
    var that = this;
    var template = renderOptions.template;
    var editorInstance;

    if (renderOptions.dataField && !editorOptions.name) {
      editorOptions.name = renderOptions.dataField;
    }

    that._addItemContentClasses($container);

    if (template) {
      var data = {
        dataField: renderOptions.dataField,
        editorType: renderOptions.editorType,
        editorOptions: editorOptions,
        component: that._getComponentOwner(),
        name: renderOptions.name
      };
      template.render({
        model: data,
        container: (0, _element.getPublicElement)($container)
      });
    } else {
      var $editor = (0, _renderer.default)('<div>').appendTo($container);

      try {
        editorInstance = that._createComponent($editor, renderOptions.editorType, editorOptions);
        editorInstance.setAria('describedby', renderOptions.helpID);
        editorInstance.setAria('labelledby', renderOptions.labelID);
        editorInstance.setAria('required', renderOptions.isRequired);

        if (renderOptions.dataField) {
          that._bindDataField(editorInstance, renderOptions, $container);
        }
      } catch (e) {
        _ui.default.log('E1035', e.message);
      }
    }

    return editorInstance;
  },
  _getComponentOwner: function _getComponentOwner() {
    return this.option('form') || this;
  },
  _bindDataField: function _bindDataField(editorInstance, renderOptions, $container) {
    var componentOwner = this._getComponentOwner();

    editorInstance.on('enterKey', function (args) {
      componentOwner._createActionByOption('onEditorEnterKey')((0, _extend.extend)(args, {
        dataField: renderOptions.dataField
      }));
    });

    this._createWatcher(editorInstance, $container, renderOptions);

    this.linkEditorToDataField(editorInstance, renderOptions.dataField, renderOptions.editorType);
  },
  _createWatcher: function _createWatcher(editorInstance, $container, renderOptions) {
    var that = this;

    var watch = that._getWatch();

    if (!(0, _type.isFunction)(watch)) {
      return;
    }

    var dispose = watch(function () {
      return that._getDataByField(renderOptions.dataField);
    }, function () {
      editorInstance.option('value', that._getDataByField(renderOptions.dataField));
    }, {
      deep: true,
      skipImmediate: true
    });

    _events_engine.default.on($container, _remove_event.removeEvent, dispose);
  },
  _getWatch: function _getWatch() {
    if (!(0, _type.isDefined)(this._watch)) {
      var formInstance = this.option('form');
      this._watch = formInstance && formInstance.option('integrationOptions.watchMethod');
    }

    return this._watch;
  },
  _addItemContentClasses: function _addItemContentClasses($itemContent) {
    var locationSpecificClass = this._getItemContentLocationSpecificClass();

    $itemContent.addClass([_constants.FIELD_ITEM_CONTENT_CLASS, locationSpecificClass].join(' '));
  },
  _getItemContentLocationSpecificClass: function _getItemContentLocationSpecificClass() {
    var labelLocation = this.option('labelLocation');
    var oppositeClasses = {
      right: 'left',
      left: 'right',
      top: 'bottom'
    };
    return _constants.FIELD_ITEM_CONTENT_LOCATION_CLASS + oppositeClasses[labelLocation];
  },
  _createComponent: function _createComponent($editor, type, editorOptions) {
    var that = this;
    var readOnlyState = this.option('readOnly');
    var instance = that.callBase($editor, type, editorOptions);
    readOnlyState && instance.option('readOnly', readOnlyState);
    that.on('optionChanged', function (args) {
      if (args.name === 'readOnly' && !(0, _type.isDefined)(editorOptions.readOnly)) {
        instance.option(args.name, args.value);
      }
    });
    return instance;
  },
  _getTemplateByFieldItem: function _getTemplateByFieldItem(fieldItem) {
    return fieldItem.template ? this._getTemplate(fieldItem.template) : null;
  },
  _appendEditorToField: function _appendEditorToField(params) {
    if (params.$label) {
      var location = params.labelOptions.location;

      if (location === 'top' || location === 'left') {
        params.$fieldItem.append(params.$editor);
      }

      if (location === 'right') {
        params.$fieldItem.prepend(params.$editor);
      }

      this._addInnerItemAlignmentClass(params.$fieldItem, location);
    } else {
      params.$fieldItem.append(params.$editor);
    }
  },
  _addInnerItemAlignmentClass: function _addInnerItemAlignmentClass($fieldItem, location) {
    if (location === 'top') {
      $fieldItem.addClass(_constants.LABEL_VERTICAL_ALIGNMENT_CLASS);
    } else {
      $fieldItem.addClass(_constants.LABEL_HORIZONTAL_ALIGNMENT_CLASS);
    }
  },
  _renderHelpText: function _renderHelpText(fieldItem, $editor, helpID) {
    var helpText = fieldItem.helpText;
    var isSimpleItem = fieldItem.itemType === SIMPLE_ITEM_TYPE;

    if (helpText && isSimpleItem) {
      var $editorWrapper = (0, _renderer.default)('<div>').addClass(_constants.FIELD_ITEM_CONTENT_WRAPPER_CLASS);
      $editor.wrap($editorWrapper);
      (0, _renderer.default)('<div>').addClass(_constants.FIELD_ITEM_HELP_TEXT_CLASS).attr('id', helpID).text(helpText).appendTo($editor.parent());
    }
  },
  _attachClickHandler: function _attachClickHandler($label, $editor, editorType) {
    var isBooleanEditors = editorType === 'dxCheckBox' || editorType === 'dxSwitch';

    if ($label && isBooleanEditors) {
      _events_engine.default.on($label, _click.name, function () {
        _events_engine.default.trigger($editor.children(), _click.name);
      });
    }
  },
  _generateRatio: function _generateRatio(count, isAutoSize) {
    var result = [];
    var ratio;
    var i;

    for (i = 0; i < count; i++) {
      ratio = {
        ratio: 1
      };

      if (isAutoSize) {
        ratio.baseSize = 'auto';
      }

      result.push(ratio);
    }

    return result;
  },
  _getRowsCount: function _getRowsCount() {
    return Math.ceil(this._items.length / this._getColCount());
  },
  _updateReferencedOptions: function _updateReferencedOptions(newLayoutData) {
    var _this2 = this;

    var layoutData = this.option('layoutData');

    if ((0, _type.isObject)(layoutData)) {
      Object.getOwnPropertyNames(layoutData).forEach(function (property) {
        return delete _this2._optionsByReference['layoutData.' + property];
      });
    }

    if ((0, _type.isObject)(newLayoutData)) {
      Object.getOwnPropertyNames(newLayoutData).forEach(function (property) {
        return _this2._optionsByReference['layoutData.' + property] = true;
      });
    }
  },
  _resetWidget: function _resetWidget(instance) {
    this._disableEditorValueChangedHandler = true;
    instance.reset();
    this._disableEditorValueChangedHandler = false;
    instance.option('isValid', true);
  },
  _optionChanged: function _optionChanged(args) {
    var _this3 = this;

    if (args.fullName.search('layoutData.') === 0) {
      return;
    }

    switch (args.name) {
      case 'showRequiredMark':
      case 'showOptionalMark':
      case 'requiredMark':
      case 'optionalMark':
        this._cashedRequiredConfig = null;

        this._invalidate();

        break;

      case 'layoutData':
        this._updateReferencedOptions(args.value);

        if (this.option('items')) {
          if (!(0, _type.isEmptyObject)(args.value)) {
            this._itemsRunTimeInfo.each(function (_, itemRunTimeInfo) {
              if ((0, _type.isDefined)(itemRunTimeInfo.item)) {
                var dataField = itemRunTimeInfo.item.dataField;

                if (dataField && (0, _type.isDefined)(itemRunTimeInfo.widgetInstance)) {
                  var valueGetter = (0, _data.compileGetter)(dataField);
                  var dataValue = valueGetter(args.value);

                  if (dataValue !== undefined || _this3._isCheckboxUndefinedStateEnabled(itemRunTimeInfo.item)) {
                    itemRunTimeInfo.widgetInstance.option('value', dataValue);
                  } else {
                    _this3._resetWidget(itemRunTimeInfo.widgetInstance);
                  }
                }
              }
            });
          }
        } else {
          this._initDataAndItems(args.value);

          this._invalidate();
        }

        break;

      case 'items':
        this._cleanItemWatchers();

        this._initDataAndItems(args.value);

        this._invalidate();

        break;

      case 'alignItemLabels':
      case 'labelLocation':
      case 'requiredMessage':
        this._invalidate();

        break;

      case 'customizeItem':
        this._updateItems(this.option('layoutData'));

        this._invalidate();

        break;

      case 'colCount':
        this._resetColCount();

        break;

      case 'minColWidth':
        if (this.option('colCount') === 'auto') {
          this._resetColCount();
        }

        break;

      case 'readOnly':
        break;

      case 'width':
        this.callBase(args);

        if (this.option('colCount') === 'auto') {
          this._resetColCount();
        }

        break;

      case 'onFieldDataChanged':
        break;

      default:
        this.callBase(args);
    }
  },
  _resetColCount: function _resetColCount() {
    this._cashedColCount = null;

    this._invalidate();
  },
  linkEditorToDataField: function linkEditorToDataField(editorInstance, dataField) {
    var _this4 = this;

    this.on('optionChanged', function (args) {
      if (args.fullName === "layoutData.".concat(dataField)) {
        editorInstance._setOptionWithoutOptionChange('value', args.value);
      }
    });
    editorInstance.on('valueChanged', function (args) {
      // TODO: This need only for the KO integration
      var isValueReferenceType = (0, _type.isObject)(args.value) || Array.isArray(args.value);

      if (!_this4._disableEditorValueChangedHandler && !(isValueReferenceType && args.value === args.previousValue)) {
        _this4._updateFieldValue(dataField, args.value);
      }
    });
  },
  _dimensionChanged: function _dimensionChanged() {
    if (this.option('colCount') === 'auto' && this.isCachedColCountObsolete()) {
      this._eventsStrategy.fireEvent('autoColCountChanged');
    }
  },
  getItemID: function getItemID(name) {
    var formInstance = this.option('form');
    return formInstance && formInstance.getItemID(name);
  },
  updateData: function updateData(data, value) {
    var that = this;

    if ((0, _type.isObject)(data)) {
      (0, _iterator.each)(data, function (dataField, fieldValue) {
        that._updateFieldValue(dataField, fieldValue);
      });
    } else if (typeof data === 'string') {
      that._updateFieldValue(data, value);
    }
  },
  getEditor: function getEditor(field) {
    return this._itemsRunTimeInfo.findWidgetInstanceByDataField(field) || this._itemsRunTimeInfo.findWidgetInstanceByName(field);
  },
  isSingleColumnMode: function isSingleColumnMode(component) {
    var responsiveBox = this._responsiveBox || component;

    if (responsiveBox) {
      return responsiveBox.option('currentScreenFactor') === responsiveBox.option('singleColumnScreen');
    }
  },
  getItemsRunTimeInfo: function getItemsRunTimeInfo() {
    return this._itemsRunTimeInfo;
  }
});

(0, _component_registrator.default)('dxLayoutManager', LayoutManager);
var _default = LayoutManager;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;