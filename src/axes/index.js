const axes = {};

const createAxis = (scale, orientation, type) => {
  if (!(!!scale && !!orientation && !!type)) {
    throw new Error('scale, orientation and type should be provided');
  }
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
};

const createAxes = ({ xConfig, yConfig }) => {
  if (!(!!xConfig && !!yConfig)) {
    throw new Error('xConfig and yConfig should be provided');
  }
  const { xScale, xOrientation, xType } = xConfig;
  const { yScale, yOrientation, yType } = yConfig;
  const xAxis = createAxis(xScale, xOrientation, xType);
  const yAxis = createAxis(yScale, yOrientation, yType);
  return { xAxis, yAxis };
};

axes.createAxis = createAxis;
axes.createAxes = createAxes;

export default axes;
