import { createScale } from '../scales/scales';
import { createPlotGen } from './plots';
import { bindInteraction } from './utils';
import { COLOR_RANGE } from '../config';
import _ from 'lodash';

const initClusteredBarPlot = ({
  data: dataCollections,
  xScale,
  yScale,
  xAxis,
  yAxis,
  onInteraction,
  config,
  defaultSelected,
}) => {
  const cScale = createScale('interpolatedcolor', COLOR_RANGE);
  const clusteredBar = new Plottable.Plots.ClusteredBar();
  const collectionNum = dataCollections.length;
  _.forEach(dataCollections, (dataCollection, idx) => {
    clusteredBar.addDataset(new Plottable.Dataset(dataCollection).
      metadata((collectionNum - idx) * 2 + 1));
  });
  clusteredBar
    .x(d => (d.x), xScale)
    .y(d => (d.y), yScale)
    .attr('fill', (d, i, dataset) => (dataset.metadata()), cScale);

  return bindInteraction(
    clusteredBar,
    'clusteredbar',
    xScale,
    yScale,
    xAxis,
    yAxis,
    onInteraction,
    config,
    defaultSelected
  );
};

export const createClusteredBarPlot = createPlotGen(
  initClusteredBarPlot,
  {
    xScaleType: 'category',
    yScaleType: 'linear',
  }
);

export const createTimeClusteredBarPlot = createPlotGen(
  initClusteredBarPlot,
  {
    xScaleType: 'time',
    yScaleType: 'linear',
  }
);
