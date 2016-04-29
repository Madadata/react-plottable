export function createAxis(scale, orientation, type) {
  switch (type) {
    case 'numeric':
      return new Plottable.Axes.Numeric(scale, orientation);
    case 'time':
      return new Plottable.Axes.Time(scale, orientation);
    case 'category':
      return new Plottable.Axes.Category(scale, orientation);
    default:
      throw new Error(`the axis type ${type} is not supported`);
  }
}

export function createAxes(xConfig, yConfig) {
  const { xScale, xOrientation, xType } = xConfig;
  const { yScale, yOrientation, yType } = yConfig;
  const xAxis = createAxis(xScale, xOrientation, xType);
  const yAxis = createAxis(yScale, yOrientation, yType);
  return { xAxis, yAxis };
}