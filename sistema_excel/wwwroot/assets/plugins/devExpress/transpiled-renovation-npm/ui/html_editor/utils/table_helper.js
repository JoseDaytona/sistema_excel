"use strict";

exports.TABLE_OPERATIONS = void 0;
exports.getAutoSizedElements = getAutoSizedElements;
exports.getColumnElements = getColumnElements;
exports.getLineElements = getLineElements;
exports.getRowElements = getRowElements;
exports.getTableFormats = getTableFormats;
exports.getTableOperationHandler = getTableOperationHandler;
exports.hasEmbedContent = hasEmbedContent;
exports.setLineElementsFormat = setLineElementsFormat;
exports.unfixTableWidth = unfixTableWidth;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _iterator = require("../../../core/utils/iterator");

var _inflector = require("../../../core/utils/inflector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TABLE_FORMATS = ['table', 'tableHeaderCell'];
var TABLE_OPERATIONS = ['insertTable', 'insertHeaderRow', 'insertRowAbove', 'insertRowBelow', 'insertColumnLeft', 'insertColumnRight', 'deleteColumn', 'deleteRow', 'deleteTable', 'cellProperties', 'tableProperties'];
exports.TABLE_OPERATIONS = TABLE_OPERATIONS;

function getTableFormats(quill) {
  var tableModule = quill.getModule('table'); // backward compatibility with an old devextreme-quill packages

  return tableModule !== null && tableModule !== void 0 && tableModule.tableFormats ? tableModule.tableFormats() : TABLE_FORMATS;
}

function hasEmbedContent(module, selection) {
  return !!selection && module.quill.getText(selection).trim().length < selection.length;
}

function unfixTableWidth($table, tableBlot) {
  var unfixValue = 'initial';

  if (tableBlot) {
    tableBlot.format('tableWidth', unfixValue);
  } else {
    $table.css('width', unfixValue);
  }
}

function getColumnElements($table) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return $table.find('tr').eq(index).find('th, td');
}

function getAutoSizedElements($table) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'horizontal';
  var result = [];
  var isHorizontal = direction === 'horizontal';
  var $lineElements = isHorizontal ? getColumnElements($table) : getRowElements($table);
  $lineElements.each(function (index, element) {
    var $element = (0, _renderer.default)(element);

    if ($element.get(0).style[isHorizontal ? 'width' : 'height'] === '') {
      result.push($element);
    }
  });
  return result;
}

function setLineElementsFormat(module, _ref) {
  var elements = _ref.elements,
      property = _ref.property,
      value = _ref.value;
  (0, _iterator.each)(elements, function (i, element) {
    var cellBlot = module.quill.scroll.find(element);
    var fullPropertyName = "cell".concat((0, _inflector.camelize)(property, true));
    cellBlot === null || cellBlot === void 0 ? void 0 : cellBlot.format(fullPropertyName, value + 'px');
  });
}

function getLineElements($table, index) {
  var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'horizontal';
  return direction === 'horizontal' ? getRowElements($table, index) : getColumnElements($table, index);
}

function getRowElements($table) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return $table.find("th:nth-child(".concat(1 + index, "), td:nth-child(").concat(1 + index, ")"));
}

function getTableOperationHandler(quill, operationName) {
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  return function () {
    var table = quill.getModule('table');

    if (!table) {
      return;
    }

    quill.focus();
    return table[operationName].apply(table, rest);
  };
}