import { createPlotGen } from './plots';
import scales from '../scales';
import { bindInteraction } from './utils';
import { COLOR_RANGE, STROKE } from '../config';

function initRectanglePlot(
  { data, xScale, yScale, xAxis, yAxis, onInteraction, config, defaultSelected }
) {
  // assume data to be [{x: dimensionA, y: dimensionB, z: count},...]
  const cScale = scales.createScale('interpolatedcolor', COLOR_RANGE);
  const rectangle = new Plottable.Plots.Rectangle()
    .addDataset(new Plottable.Dataset(data))
    .x(d => (d.x), xScale)
    .y(d => (d.y), yScale)
    .attr('fill', d => (d.z), cScale)
    .attr('stroke', STROKE)
    .animated(true);

  return bindInteraction(
    rectangle,
    'rectangle',
    xScale,
    yScale,
    xAxis,
    yAxis,
    onInteraction,
    config,
    defaultSelected
  );
}

export const createRectanglePlot = createPlotGen(
  initRectanglePlot,
  {
    xScaleType: 'category',
    yScaleType: 'category',
  }
);
