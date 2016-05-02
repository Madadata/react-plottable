import { createPlotGen } from './plots';
import { STROKE } from '../config';
import { bindInteraction } from './utils';

function initLinePlot (
  { data, xScale, yScale, xAxis, yAxis, onInteraction, config }
) {
  const line = new Plottable.Plots.Line()
    .addDataset(new Plottable.Dataset(data))
    .x(d => (d.x), xScale)
    .y(d => (d.y), yScale)
    .attr('stroke', STROKE)
    .animated(true);

  return bindInteraction(
    line,
    'line',
    xScale,
    yScale,
    xAxis,
    yAxis,
    onInteraction,
    config
  );
};

export const createLinePlot = createPlotGen(
  initLinePlot,
  {
    xScaleType: 'linear',
    yScaleType: 'linear',
  }
);

export const createTimeLinePlot = createPlotGen(
  initLinePlot,
  {
    xScaleType: 'time',
    yScaleType: 'linear',
  }
);

export const createCategoryLinePlot = createPlotGen(
  initLinePlot,
  {
    xScaleType: 'category',
    yScaleType: 'linear',
  }
);
