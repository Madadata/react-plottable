export function createLinearScale() {
  return new Plottable.Scales.Linear();
}
export function createCategoryScale() {
  return new Plottable.Scales.Category();
}
export function createColorScale() {
  return new Plottable.Scales.Color();
}
export function createTimeScale() {
  return new Plottable.Scales.Time();
}
export function createInterpolatedColorScale(range) {
  const interpolatedColorScale = new Plottable.Scales.InterpolatedColor();
  interpolatedColorScale.range(range);
  return interpolatedColorScale;
}

export function createScale(type, range) {
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
      } else {
        throw new Error(`
          color range should be provided in order to create InterpolatedScale
        `);
      }
    }
    default:
      throw new Error(`scale type ${type} is not supported`);
  }
}

export function createScales(xType, yType, xRange, yRange) {
  const xScale = createScale(xType, xRange);
  const yScale = createScale(yType, yRange);
  return { xScale, yScale };
}
