'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arePropsValid;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBijection(data, types) {
  var typesNum = types.length;
  return _lodash2.default.every(data, function (datum) {
    return _lodash2.default.keys(datum).length === typesNum;
  });
}

function isTypeValid(datum, type) {
  switch (type) {
    case 'number':
      return _lodash2.default.isNumber(datum);
    case 'string':
      return _lodash2.default.isString(datum);
    case 'datetime':
      return _lodash2.default.isDate(datum);
    case undefined:
      return true;
    default:
      throw new Error('The type ' + type + ' is not supported in isTypeValid Function');
  }
}

function areTypesValid(data, types) {
  return _lodash2.default.every(data, function (datum) {
    return _lodash2.default.every(_lodash2.default.zip(_lodash2.default.values(datum), types), function (d) {
      return isTypeValid(d[0], d[1]);
    });
  });
}

function areDataTypesValid(dataArr, types) {
  var isValid = _lodash2.default.reduce(dataArr, function (result, data) {
    return result && isBijection(data, types) && areTypesValid(data, types);
  }, true);
  return isValid;
}

function arePropsValid(props) {
  var content = props.content;
  var config = props.config;

  if (_lodash2.default.has(config, 'types')) {
    var types = config.types;

    var dataArr = _lodash2.default.map(content, 'data');
    var hasData = _lodash2.default.every(dataArr, function (data) {
      return !!data;
    });
    if (!hasData) {
      throw new Error('The data is not passed in or passed in a wrong way');
    }
    if (!areDataTypesValid(dataArr, types)) {
      throw new Error('The data and types are not matched');
    }
    return true;
  }
  return false;
}