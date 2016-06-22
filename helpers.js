import _ from 'lodash';

function isBijection(data, types) {
  const typesNum = types.length;
  return _.every(data, (datum) => (_.keys(datum).length === typesNum));
}

function isTypeValid(datum, type) {
  switch (type) {
    case 'number':
      return _.isNumber(datum);
    case 'string':
      return _.isString(datum);
    case 'datetime':
      return _.isDate(datum);
    case undefined:
      return true;
    default:
      throw new Error(`The type ${type} is not supported in isTypeValid Function`);
  }
}

function areTypesValid(data, types) {
  return _.every(data, (datum) => (
    _.every(_.zip(_.values(datum), types), (d) => (isTypeValid(d[0], d[1])))
  ));
}

function areDataTypesValid(dataArr, types) {
  const isValid = _.reduce(dataArr, (result, data) => (
    result && isBijection(data, types) && areTypesValid(data, types)
  ), true);
  return isValid;
}

export default function arePropsValid(props) {
  const { content, config } = props;
  if (_.has(config, 'types')) {
    const { types } = config;
    const dataArr = _.map(content, 'data');
    const hasData = _.every(dataArr, (data) => (!!data));
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
