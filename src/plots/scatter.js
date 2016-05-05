import { createPlotGen } from './plots';
import { bindInteraction } from './utils';
import { FILL, STROKE } from '../config';

function initScatterPlot(
  { data, xScale, yScale, xAxis, yAxis, onInteraction, config, defaultSelected }
) {
  const scatter = new Plottable.Plots.Scatter()
    .addDataset(new Plottable.Dataset(data))
    .x(d => (d.x), xScale)
    .y(d => (d.y), yScale)
    .attr('fill', FILL)
    .attr('stroke', STROKE)
    .animated(true);

  return bindInteraction(
    scatter,
    'scatter',
    xScale,
    yScale,
    xAxis,
    yAxis,
    onInteraction,
    config,
    defaultSelected
  );
}

export const createScatterPlot = createPlotGen(
  initScatterPlot,
  {
    xScaleType: 'linear',
    yScaleType: 'linear',
  }
);

export const createTimeScatterPlot = createPlotGen(
  initScatterPlot,
  {
    xScaleType: 'time',
    yScaleType: 'linear',
  }
);

export const createCategoryScatterPlot = createPlotGen(
  initScatterPlot,
  {
    xScaleType: 'category',
    yScaleType: 'linear',
  }
);
