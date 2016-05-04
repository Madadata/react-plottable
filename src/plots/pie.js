import { createScale } from '../scales';
import { COLOR_RANGE } from '../config';
import { bindInteraction } from './utils';
import _ from 'lodash';

function initPiePlot(
  { data, xScale, cScale, xAxis, yAxis, onInteraction, config, defaultSelected }
) {
  // this map function is ad hoc. It won't work well
  // when different wedge has the same area.
  // should be refined to employ hash table like thing.

  const reverseMap = _.reduce(
    data,
    (result, datum) => ({ ...result, [datum.y]: datum.x }),
    {}
  );

  const pie = new Plottable.Plots.Pie()
    .attr('fill', d => (d.y), cScale)
    .addDataset(new Plottable.Dataset(data))
    .sectorValue(d => (d.y), xScale)
    .labelsEnabled(true)
    .labelFormatter(y => (reverseMap[y]));

  return bindInteraction(
    pie,
    'pie',
    xScale,
    cScale,
    xAxis,
    yAxis,
    onInteraction,
    config,
    defaultSelected
  );
}

export function createPiePlot(data, config, onInteraction, defaultSelected) {
  const xScale = createScale('linear');
  const cScale = createScale('interpolatedcolor', COLOR_RANGE);
  const plot = initPiePlot({ data, xScale, cScale, onInteraction, config, defaultSelected });
  return { plot };
}
