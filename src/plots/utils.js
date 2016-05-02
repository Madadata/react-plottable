import { bindDragBoxTo, bindPanZoomTo, bindClickTo } from '../interactions';
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

export const bindInteraction = (
  plot,
  plotName,
  xScale,
  yScale,
  xAxis,
  yAxis,
  onInteraction,
  config,
  defaultSelected
) => {
  const { dragBoxType, clickable, panZoomType } = config;
  let interactivePlot = plot;

  if (!!clickable && _.includes(clickablePlots, plotName)) {
    bindClickTo(interactivePlot, onInteraction, defaultSelected);
  } else if (!!clickable && !_.includes(clickablePlots, plotName)) {
    throw new Error(`click is not supported by ${plotName}`);
  }
  if (!!panZoomType && _.includes(zoomablePlots, plotName)) {
    bindPanZoomTo(interactivePlot, panZoomType, xScale, yScale, xAxis, yAxis);
  } else if (!!panZoomType && !_.includes(zoomablePlots, plotName)) {
    throw new Error(`zoom is not supported by ${plotName}`);
  }
  if (!!dragBoxType && _.includes(draggablePlots, plotName)) {
    interactivePlot = bindDragBoxTo(
      plot, dragBoxType, onInteraction, xScale, yScale, defaultSelected, plotName
    );
  } else if (!!dragBoxType && !_.includes(draggablePlots, plotName)) {
    throw new Error(`drag box is not supported by ${plotName}`);
  }
  return interactivePlot;
};

export const bindInteractionToPlotGroup = (
  plotGroup,
  onInteraction,
  config,
  defaultSelected
) => {
  const { dragBoxType, clickable, panZoomType } = config;
  const interactivePlotGroup = plotGroup;
  if (!!clickable && clickablePlots.has('plotgroup')) {
    bindClickTo(interactivePlotGroup, onInteraction, defaultSelected);
  }
  if (!!panZoomType) {
    throw new Error('zoom is not supported by plotgroup');
  }
  if (!!dragBoxType) {
    throw new Error('drag box is not supported by plotgroup');
  }
  return interactivePlotGroup;
};
