export const createLinearScale = () => (new Plottable.Scales.Linear());
export const createCategoryScale = () => (new Plottable.Scales.Category());
export const createColorScale = () => (new Plottable.Scales.Color());
export const createTimeScale = () => (new Plottable.Scales.Time());
export const createInterpolatedColorScale = (range) => {
  const interpolatedColorScale = new Plottable.Scales.InterpolatedColor();
  interpolatedColorScale.range(range);
  return interpolatedColorScale;
};

export const createScale = (type, range) => {
  if (!type) {
    throw new Error('A scale type should be provided');
  }
  switch (type) {
    case 'linear':
      return createLinearScale();
    case 'category':
      return createCategoryScale();
    case 'color':
      return createColorScale();
    case 'time':
      return createTimeScale();
    case 'interpolatedcolor': {
      if (!!range) {
        return createInterpolatedColorScale(range);
      }
      throw new Error(
       'color range should be provided in order to create InterpolatedScale'
      );
    }
    default:
      throw new Error(`scale type ${type} is not supported`);
  }
};

export const createScales = (xType, yType, xRange, yRange) => {
  const xScale = createScale(xType, xRange);
  const yScale = createScale(yType, yRange);
  return { xScale, yScale };
};
