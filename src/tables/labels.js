export function createSingle2DPlotLabels(generic2DPlotConfig) {
  const { xlabel, ylabel, title } = generic2DPlotConfig;
  const xLabel = new Plottable.Components.AxisLabel(xlabel);
  const yLabel = new Plottable.Components.AxisLabel(ylabel);
  const titleLabel = new Plottable.Components.TitleLabel(title);
  return { xLabel, yLabel, titleLabel };
}

export function createDouble2DPlotLabels(generic2DPlotConfigArray) {
  const { config: config1 } = generic2DPlotConfigArray[0];
  const { config: config2 } = generic2DPlotConfigArray[1];
  const { yLabel: y1Label, titleLabel } = createSingle2DPlotLabels(config1);
  const { xLabel, yLabel: y2Label } = createSingle2DPlotLabels(config2);
  return { xLabel, y1Label, y2Label, titleLabel };
}

export function createMultiple2DPlotLabels(generic2DPlotConfigArray) {
  // add hoc code. Assume the title of multiple plots is the title
  // of the first plot.
  const { config } = generic2DPlotConfigArray[0];
  const { xLabel, titleLabel } = createSingle2DPlotLabels(config);
  return { xLabel, titleLabel };
}
