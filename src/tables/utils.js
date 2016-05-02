import _ from 'lodash';
export const getXAxisType = (generic2DPlotConfig) => {
  // We assume that all data points ([{x: any, y: any}, {x: any, y: any},...])
  // have the same type of x. A consistent check should be implemented for production.
  // return typeof generic2DPlotConfig.data[0].x;
  if (_.isArray(generic2DPlotConfig.data[0])) {
    if (_.isArray(generic2DPlotConfig.data[0][0].x)) {
      return 'timeseries';
    }
    return 'linear';
  } else if (_.isNumber(generic2DPlotConfig.data[0].x)) {
    return 'linear';
  } else if (_.isString(generic2DPlotConfig.data[0].x)) {
    return 'category';
  } else if (_.isDate(generic2DPlotConfig.data[0].x)) {
    return 'timeseries';
  }
  throw new Error('The x axis type is not supported');
};

export const isXAxisConsistent = (plotCollections) => {
  const xAxisType = getXAxisType(plotCollections[0]);
  const isConsistent = _.every(plotCollections, plotCollection =>
    (getXAxisType(plotCollection) === xAxisType));
  return isConsistent;
};

const addNameToData = (data, name) => {
  const newData = [];
  _.forEach(data, datum => {
    newData.push(_.assign({}, datum, { name }));
  });
  return newData;
};

export const regroup = (plotCollections) => {
  const newPlotCollections = [];
  const clusteredBarCollection = {};
  _.forEach(plotCollections, plotCollection => {
    const { type } = plotCollection;
    if (type !== 'clusteredbar') {
      newPlotCollections.push(plotCollection);
    } else {
      if (!clusteredBarCollection.data) {
        clusteredBarCollection.data = [];
      }
      // ad hoc design that puts the name into clusteredbar data
      // this is convienient shortcut for labeling which bar belongs
      // to which dimension. But can be optimized when needed.
      const { name } = plotCollection.config;
      const newData = addNameToData(plotCollection.data, name);

      clusteredBarCollection.data.push(newData);
      clusteredBarCollection.type = 'clusteredbar';
      clusteredBarCollection.config = _.extend(
        clusteredBarCollection.config,
        plotCollection.config
      );
      clusteredBarCollection.defaultSelected = _.extend(
        clusteredBarCollection.defaultSelected,
        plotCollection.defaultSelected
      );
    }
  });
  if (!!clusteredBarCollection.data) {
    newPlotCollections.push(clusteredBarCollection);
  }
  return newPlotCollections;
};
