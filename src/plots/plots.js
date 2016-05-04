import axes from '../axes';
import scales from '../scales';

export function scaleTypeToAxisType (scaleType) {
  if (!scaleType) {
    throw new Error('scaleType should be provided');
  }
  switch (scaleType) {
    case 'linear':
      return 'numeric';
    case 'time':
      return scaleType;
    case 'category':
      return scaleType;
    default:
      throw new Error(
        `scale type ${scaleType} is not supported in scaleTypeToAxisType const`
      );
  }
};

function areInteractionsValid (config) {
  const { clickable, draggable } = config;
  if (!!clickable && !!draggable) {
    return false;
  }
  return true;
};

export function createPlotGen (initPlot, genConfig) {
  const { xScaleType, yScaleType } = genConfig;
  const xAxisType = scaleTypeToAxisType(xScaleType);
  const yAxisType = scaleTypeToAxisType(yScaleType);
  return (data, config, onInteraction, defaultSelected) => {
    if (!config) throw new Error('Chart config not defined');
    if (!areInteractionsValid(config)) throw new Error('interactions are not valid');
    const xOrientation = config.xOrientation || 'bottom';
    const yOrientation = config.yOrientation || 'left';
    const { xScale, yScale } = scales.createScales(xScaleType, yScaleType);
    const { xAxis, yAxis } = axes.createAxes({
      xConfig: { xScale, xOrientation, xType: xAxisType },
      yConfig: { yScale, yOrientation, yType: yAxisType },
    });
    const plot = initPlot(
      { data, xScale, yScale, xAxis, yAxis, onInteraction, config, defaultSelected }
    );
    return { plot, xAxis, yAxis };
  };
};
