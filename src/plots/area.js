import { createPlotGen } from './plots';
import { bindInteraction } from './utils';
import { FILL, STROKE } from '../config';

function initAreaPlot ({ data, xScale, yScale, xAxis, yAxis, onInteraction, config }) {
  const area = new Plottable.Plots.Area()
    .addDataset(new Plottable.Dataset(data))
    .x(d => (d.x), xScale)
    .y(d => (d.y), yScale)
    .attr('fill', FILL)
    .attr('stroke', STROKE)
    .animated(true);

  return bindInteraction(
    area,
    'area',
    xScale,
    yScale,
    xAxis,
    yAxis,
    onInteraction,
    config
  );
};

export const createAreaPlot = createPlotGen(
  initAreaPlot,
  {
    xScaleType: 'linear',
    yScaleType: 'linear',
  }
);

export const createTimeAreaPlot = createPlotGen(
  initAreaPlot,
  {
    xScaleType: 'time',
    yScaleType: 'linear',
  }
);

export const createCategoryAreaPlot = createPlotGen(
  initAreaPlot,
  {
    xScaleType: 'category',
    yScaleType: 'linear',
  }
);
