import { createPlotGen } from './plots';
import { FILL, STROKE } from '../config';
import { bindInteraction } from './utils';

function initBarPlot(
  { data, xScale, yScale, xAxis, yAxis, onInteraction, config, defaultSelected }
) {
  const bar = new Plottable.Plots.Bar('vertical')
    .addDataset(new Plottable.Dataset(data))
    .x(d => (d.x), xScale)
    .y(d => (d.y), yScale)
    .attr('fill', FILL)
    .attr('stroke', STROKE)
    .animated(true);

  return bindInteraction(
    bar,
    'bar',
    xScale,
    yScale,
    xAxis,
    yAxis,
    onInteraction,
    config,
    defaultSelected
  );
}

export const createBarPlot = createPlotGen(
  initBarPlot,
  {
    xScaleType: 'linear',
    yScaleType: 'linear',
  }
);

export const createCategoryBarPlot = createPlotGen(
  initBarPlot,
  {
    xScaleType: 'category',
    yScaleType: 'linear',
  }
);

export const createTimeBarPlot = createPlotGen(
  initBarPlot,
  {
    xScaleType: 'time',
    yScaleType: 'linear',
  }
);
