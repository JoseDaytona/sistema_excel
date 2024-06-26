"use strict";

exports.AppointmentDataSource = void 0;

var _deferred = require("../../../../core/utils/deferred");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AppointmentDataSource = /*#__PURE__*/function () {
  function AppointmentDataSource(dataSource) {
    this.setDataSource(dataSource);
    this._updatedAppointmentKeys = [];
  }

  var _proto = AppointmentDataSource.prototype;

  _proto._getStoreKey = function _getStoreKey(target) {
    var store = this._dataSource.store();

    return store.keyOf(target);
  };

  _proto.setDataSource = function setDataSource(dataSource) {
    this._dataSource = dataSource;
    this.cleanState();

    this._initStoreChangeHandlers();
  };

  _proto._initStoreChangeHandlers = function _initStoreChangeHandlers() {
    var _this = this;

    var dataSource = this._dataSource;
    var store = dataSource === null || dataSource === void 0 ? void 0 : dataSource.store();

    if (store) {
      store.on('updating', function (newItem) {
        _this._updatedAppointment = newItem;
      });
      store.on('push', function (pushItems) {
        var items = dataSource.items();
        var keyName = store.key();
        pushItems.forEach(function (pushItem) {
          var itemExists = items.filter(function (item) {
            return item[keyName] === pushItem.key;
          }).length !== 0;

          if (itemExists) {
            _this._updatedAppointmentKeys.push({
              key: keyName,
              value: pushItem.key
            });
          } else {
            var data = pushItem.data;
            data && items.push(data);
          }
        });
        dataSource.load();
      });
    }
  };

  _proto.getUpdatedAppointment = function getUpdatedAppointment() {
    return this._updatedAppointment;
  };

  _proto.getUpdatedAppointmentKeys = function getUpdatedAppointmentKeys() {
    return this._updatedAppointmentKeys;
  };

  _proto.cleanState = function cleanState() {
    this._updatedAppointment = null;
    this._updatedAppointmentKeys = [];
  };

  _proto.add = function add(rawAppointment) {
    var _this2 = this;

    return this._dataSource.store().insert(rawAppointment).done(function () {
      return _this2._dataSource.load();
    });
  };

  _proto.update = function update(target, data) {
    var _this3 = this;

    var key = this._getStoreKey(target);

    var d = new _deferred.Deferred();

    this._dataSource.store().update(key, data).done(function (result) {
      return _this3._dataSource.load().done(function () {
        return d.resolve(result);
      }).fail(d.reject);
    }).fail(d.reject);

    return d.promise();
  };

  _proto.remove = function remove(rawAppointment) {
    var _this4 = this;

    var key = this._getStoreKey(rawAppointment);

    return this._dataSource.store().remove(key).done(function () {
      return _this4._dataSource.load();
    });
  };

  _createClass(AppointmentDataSource, [{
    key: "keyName",
    get: function get() {
      var store = this._dataSource.store();

      return store.key();
    }
  }]);

  return AppointmentDataSource;
}();

exports.AppointmentDataSource = AppointmentDataSource;