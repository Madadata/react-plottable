import plots from '../plots';
import _ from 'lodash';

const createLinearPlot = (generic2DPlotConfig, onInteraction) => {
  const { data, type, config } = generic2DPlotConfig;
  switch (type) {
    case 'line':
      return plots.line.createLinePlot(data, config);
    case 'area':
      return plots.area.createAreaPlot(data, config);
    case 'bar':
      return plots.bar.createBarPlot(data, config, onInteraction);
    case 'pie':
      return plots.pie.createPiePlot(data, config, onInteraction);
    case 'scatter':
      return plots.scatter.createScatterPlot(data, config, onInteraction);
    // case 'clusteredbar':
    //   return createClusteredBarPlot(data, config, onInteraction);
    default:
      throw new Error(`2D plot type ${type} is not supported with linear-linear scales`);
  }
};

const createCategoryPlot = (generic2DPlotConfig, onInteraction) => {
  const { data, type, config, defaultSelected } = generic2DPlotConfig;
  switch (type) {
    case 'line':
      return plots.line.createCategoryLinePlot(data, config, onInteraction);
    case 'area':
      return plots.area.createCategoryAreaPlot(data, config);
    case 'pie':
      return plots.pie.createPiePlot(data, config, onInteraction, defaultSelected);
    case 'scatter':
      return plots.scatter.createCategoryScatterPlot(data, config, onInteraction, defaultSelected);
    case 'bar':
      return plots.bar.createCategoryBarPlot(data, config, onInteraction, defaultSelected);
    case 'rectangle':
      return plots.rectangle.createRectanglePlot(data, config, onInteraction, defaultSelected);
    case 'clusteredbar':
      return plots.clusteredbar.createClusteredBarPlot(
        data, config, onInteraction, defaultSelected
      );
    default:
      throw new Error(`2D plot type ${type} is not supported with category-linear scales`);
  }
};

const createTimeSeriesPlot = (generic2DPlotConfig, onInteraction) => {
  const { data, type, config, defaultSelected } = generic2DPlotConfig;
  switch (type) {
    case 'line':
      return plots.line.createTimeLinePlot(data, config, onInteraction, defaultSelected);
    case 'area':
      return plots.area.createTimeAreaPlot(data, config);
    case 'bar':
      return plots.bar.createTimeBarPlot(data, config, onInteraction, defaultSelected);
    case 'scatter':
      return plots.scatter.createTimeScatterPlot(data, config, onInteraction, defaultSelected);
    case 'clusteredbar':
      return plots.clusteredbar.createTimeClusteredBarPlot(
        data, config, onInteraction, defaultSelected
      );
    default:
      throw new Error(`2D plot type ${type} is not supported`);
  }
};

export const createSingle2DPlot = (generic2DPlotConfig, xType, onInteraction) => {
  let plot;
  let xAxis;
  let yAxis;

  switch (xType) {
    case 'number':
      ({ plot, xAxis, yAxis } = createLinearPlot(generic2DPlotConfig, onInteraction));
      break;
    case 'string':
      ({ plot, xAxis, yAxis } = createCategoryPlot(generic2DPlotConfig, onInteraction));
      break;
    case 'datetime':
      ({ plot, xAxis, yAxis } = createTimeSeriesPlot(generic2DPlotConfig, onInteraction));
      break;
    default:
      throw new Error(`The xAxis Type ${xType} is not supported`);
  }
  return { plot, xAxis, yAxis };
};

export const createDouble2DPlot = (generic2DPlotConfigArray, xAxisType) => {
  const { xAxis,
          plot: plot1,
          yAxis: y1Axis } = createSingle2DPlot(generic2DPlotConfigArray[0], xAxisType);
  const { plot: plot2,
          yAxis: y2Axis } = createSingle2DPlot(generic2DPlotConfigArray[1], xAxisType);
  const group = new Plottable.Components.Group([plot1, plot2]);
  return { group, xAxis, y1Axis, y2Axis };
};

export const createMultiple2DPlot = (generic2DPlotConfigArray, xAxisType) => {
  const plotArr = [];
  _.forEach(generic2DPlotConfigArray, generic2DPlotConfig => {
    const { plot } = createSingle2DPlot(generic2DPlotConfig, xAxisType);
    plotArr.push(plot);
  });
  // this line of code is ad hoc for the readability, should be modified later
  const { xAxis } = createSingle2DPlot(generic2DPlotConfigArray[0], xAxisType);
  const group = new Plottable.Components.Group(plotArr);
  return { group, xAxis };
};

export const createPlotGroup = (generic2DPlotConfigArray, xAxisType, onInteraction) => {
  if (generic2DPlotConfigArray.length < 2) {
    throw new Error('You don\'t have to use plotGroup with only one plot');
  } else if (generic2DPlotConfigArray.length === 2) {
    const { config: config1 } = generic2DPlotConfigArray[0];
    const { config: config2 } = generic2DPlotConfigArray[1];
    const newConfig1 = _.omit(config1, 'clickable', 'dragBoxType', 'panZoomType');
    const newConfig2 = _.omit(config2, 'clickable', 'dragBoxType', 'panZoomType');
    const { xAxis, plot: plot1, yAxis: y1Axis } = createSingle2DPlot(
      _.assign({}, generic2DPlotConfigArray[0], { config: newConfig1 }), xAxisType
    );
    const { plot: plot2, yAxis: y2Axis } = createSingle2DPlot(
      _.assign({}, generic2DPlotConfigArray[1], { config: newConfig2 }), xAxisType
    );
    const plotGroup = new Plottable.Components.PlotGroup();
    plotGroup.append(plot1);
    plotGroup.append(plot2);
    if (_.has(config1, 'clickable') || _.has(config2, 'clickable')) {
      plots.utils.bindInteractionToPlotGroup(plotGroup, onInteraction, { clickable: true });
    }
    return { group: plotGroup, xAxis, y1Axis, y2Axis };
  } else {
    const plotGroup = new Plottable.Components.PlotGroup();
    let hasClickable = false;
    _.forEach(generic2DPlotConfigArray, generic2DPlotConfig => {
      const { config } = generic2DPlotConfig;
      const newConfig = _.omit(config, 'clickable', 'dragBoxType', 'panZoomType');
      const { plot } = createSingle2DPlot(
        _.assign({}, generic2DPlotConfig, { config: newConfig }), xAxisType
      );
      plotGroup.append(plot);

      if (_.has(config, 'clickable')) {
        hasClickable = true;
      }
    });
    if (hasClickable) {
      plots.utils.bindInteractionToPlotGroup(plotGroup, onInteraction, { clickable: true });
    }
    const { xAxis } = createSingle2DPlot(generic2DPlotConfigArray[0], xAxisType);
    return { group: plotGroup, xAxis };
  }
};
