import {
  createSingle2DPlot,
  createDouble2DPlot,
  createMultiple2DPlot,
  createPlotGroup } from './group';
import {
  createSingle2DPlotLabels,
  createDouble2DPlotLabels,
  createMultiple2DPlotLabels } from './labels';
import { regroup } from './utils';

export function initSinglePlotTable(singlePlotConfig) {
  const { plot, xAxis, yAxis, xLabel, yLabel, titleLabel } = singlePlotConfig;
  if (!!xAxis) {
    const table = new Plottable.Components.Table([
      [null, null, titleLabel],
      [yLabel, yAxis, plot],
      [null, null, xAxis],
      [null, null, xLabel],
    ]);
    return table;
  }
  const table = new Plottable.Components.Table([
    [titleLabel],
    [plot],
  ]);
  return table;
}

export function initDoublePlotTable(doublePlotConfig) {
  const {
          group,
          xAxis,
          y1Axis,
          y2Axis,
          xLabel,
          y1Label,
          y2Label,
          titleLabel,
        } = doublePlotConfig;
  const table = new Plottable.Components.Table([
    [null, null, titleLabel, null, null],
    [y1Label, y1Axis, group, y2Axis, y2Label],
    [null, null, xAxis, null, null],
    [null, null, xLabel, null, null],
  ]);
  return table;
}

export function initMultiplePlotTable(multiplePlotConfig) {
  const {
          group,
          xAxis,
          xLabel,
          titleLabel,
        } = multiplePlotConfig;
  const table = new Plottable.Components.Table([
    [titleLabel],
    [group],
    [xAxis],
    [xLabel],
  ]);
  return table;
}

export function createTable({ content, config: { types, isPlotGroup } }, onInteraction) {
  const xType = types[0];
  const plotCollections = regroup(content);
  if (plotCollections.length === 0) {
    throw new Error('There must be at least one plot job');
  }
  switch (plotCollections.length) {
    case 1: {
      const { plot, xAxis, yAxis } = createSingle2DPlot(plotCollections[0], xType, onInteraction);
      const { xLabel, yLabel, titleLabel } = createSingle2DPlotLabels(plotCollections[0].config);
      const table = initSinglePlotTable(
        {
          plot,
          xAxis,
          yAxis,
          xLabel,
          yLabel,
          titleLabel,
        }
      );
      return table;
    }
    case 2: {
      let group;
      let xAxis;
      let y1Axis;
      let y2Axis;
      if (isPlotGroup) {
        ({ group, xAxis, y1Axis, y2Axis } = createPlotGroup(plotCollections, xType, onInteraction));
      } else {
        ({ group, xAxis, y1Axis, y2Axis } = createDouble2DPlot(plotCollections, xType));
      }
      const {
              xLabel,
              y1Label,
              y2Label,
              titleLabel,
            } = createDouble2DPlotLabels(plotCollections);
      const table = initDoublePlotTable(
        {
          group,
          xAxis,
          y1Axis,
          y2Axis,
          xLabel,
          y1Label,
          y2Label,
          titleLabel,
        }
      );
      return table;
    }
    default: {
      let group;
      let xAxis;
      if (isPlotGroup) {
        ({ group, xAxis } = createPlotGroup(plotCollections, xType));
      } else {
        ({ group, xAxis } = createMultiple2DPlot(plotCollections, xType));
      }
      const { xLabel, titleLabel } = createMultiple2DPlotLabels(plotCollections);
      const table = initMultiplePlotTable(
        {
          group,
          xAxis,
          xLabel,
          titleLabel,
        }
      );
      return table;
    }
  }
}

export function drawTable(table, ref) {
  table.renderTo(ref);
}
