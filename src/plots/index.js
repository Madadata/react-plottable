import {
  createLinePlot,
  createTimeLinePlot,
  createCategoryLinePlot,
} from './line';

import {
  createBarPlot,
  createCategoryBarPlot,
  createTimeBarPlot,
} from './bar';

import {
  createAreaPlot,
  createTimeAreaPlot,
  createCategoryAreaPlot,
} from './area';

import {
  createScatterPlot,
  createTimeScatterPlot,
  createCategoryScatterPlot,
} from './scatter';

import {
  createClusteredBarPlot,
  createTimeClusteredBarPlot,
} from './clusteredbar';

import {
  createRectanglePlot,
} from './rectangle';

import {
  createPiePlot,
} from './pie';

import {
  bindInteraction,
  bindInteractionToPlotGroup,
} from './utils';

const plots = {};

plots.line = {};
plots.line.createLinePlot = createLinePlot;
plots.line.createTimeLinePlot = createTimeLinePlot;
plots.line.createCategoryLinePlot = createCategoryLinePlot;

plots.bar = {};
plots.bar.createBarPlot = createBarPlot;
plots.bar.createCategoryBarPlot = createCategoryBarPlot;
plots.bar.createTimeBarPlot = createTimeBarPlot;

plots.area = {};
plots.area.createAreaPlot = createAreaPlot;
plots.area.createTimeAreaPlot = createTimeAreaPlot;
plots.area.createCategoryAreaPlot = createCategoryAreaPlot;

plots.scatter = {};
plots.scatter.createScatterPlot = createScatterPlot;
plots.scatter.createTimeScatterPlot = createTimeScatterPlot;
plots.scatter.createCategoryScatterPlot = createCategoryScatterPlot;

plots.clusteredbar = {};
plots.clusteredbar.createClusteredBarPlot = createClusteredBarPlot;
plots.clusteredbar.createTimeClusteredBarPlot = createTimeClusteredBarPlot;

plots.rectangle = {};
plots.rectangle.createRectanglePlot = createRectanglePlot;

plots.pie = {};
plots.pie.createPiePlot = createPiePlot;

plots.utils = {};
plots.utils.bindInteraction = bindInteraction;
plots.utils.bindInteractionToPlotGroup = bindInteractionToPlotGroup;

export default plots;
