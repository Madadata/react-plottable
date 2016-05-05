import interactions from '../interactions';
import _ from 'lodash';

const clickablePlots = Object.freeze([
  'line',
  'bar',
  'clusteredbar',
  'histogram',
  'pie',
  'rectangle',
  'scatter',
  'plotgroup',
]);

const zoomablePlots = Object.freeze([
  'bar',
  'clusteredbar',
  'histogram',
  'line',
  'area',
  'scatter',
]);

const draggablePlots = Object.freeze([
  'line',
  'bar',
  'clusteredbar',
  'histogram',
  'scatter',
]);

export function bindInteraction(
  plot,
  plotName,
  xScale,
  yScale,
  xAxis,
  yAxis,
  onInteraction,
  config,
  defaultSelected
) {
  const { dragBoxType, clickable, panZoomType } = config;
  let interactivePlot = plot;

  if (!!clickable && _.includes(clickablePlots, plotName)) {
    interactions.bindClickTo(interactivePlot, onInteraction, defaultSelected);
  } else if (!!clickable && !_.includes(clickablePlots, plotName)) {
    throw new Error(`click is not supported by ${plotName}`);
  }
  if (!!panZoomType && _.includes(zoomablePlots, plotName)) {
    interactions.bindPanZoomTo(interactivePlot, panZoomType, xScale, yScale, xAxis, yAxis);
  } else if (!!panZoomType && !_.includes(zoomablePlots, plotName)) {
    throw new Error(`zoom is not supported by ${plotName}`);
  }
  if (!!dragBoxType && _.includes(draggablePlots, plotName)) {
    interactivePlot = interactions.bindDragBoxTo(
      plot, dragBoxType, onInteraction, xScale, yScale, defaultSelected, plotName
    );
  } else if (!!dragBoxType && !_.includes(draggablePlots, plotName)) {
    throw new Error(`drag box is not supported by ${plotName}`);
  }
  return interactivePlot;
}

export function bindInteractionToPlotGroup(
  plotGroup,
  onInteraction,
  config,
  defaultSelected
) {
  const { dragBoxType, clickable, panZoomType } = config;
  const interactivePlotGroup = plotGroup;
  if (!!clickable && _.includes(clickablePlots, 'plotgroup')) {
    interactions.bindClickTo(interactivePlotGroup, onInteraction, defaultSelected);
  }
  if (!!panZoomType) {
    throw new Error('zoom is not supported by plotgroup');
  }
  if (!!dragBoxType) {
    throw new Error('drag box is not supported by plotgroup');
  }
  return interactivePlotGroup;
}
