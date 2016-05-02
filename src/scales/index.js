const scales = {};

const createLinearScale = () => (new Plottable.Scales.Linear());
const createCategoryScale = () => (new Plottable.Scales.Category());
const createColorScale = () => (new Plottable.Scales.Color());
const createTimeScale = () => (new Plottable.Scales.Time());
const createInterpolatedColorScale = (range) => {
  const interpolatedColorScale = new Plottable.Scales.InterpolatedColor();
  interpolatedColorScale.range(range);
  return interpolatedColorScale;
};

const createScale = (type, range) => {
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

const createScales = (xType, yType, xRange, yRange) => {
  const xScale = createScale(xType, xRange);
  const yScale = createScale(yType, yRange);
  return { xScale, yScale };
};

scales.createLinearScale = createLinearScale;
scales.createCategoryScale = createCategoryScale;
scales.createColorScale = createColorScale;
scales.createTimeScale = createTimeScale;
scales.createInterpolatedColorScale = createInterpolatedColorScale;
scales.createScale = createScale;
scales.createScales = createScales;

export default scales;
