import {
  createScatterPlot,
  createTimeScatterPlot,
  createCategoryScatterPlot
} from '../../src/plots/scatter';
import {
  generateLinearData,
  generateTimeSeriesData,
  generateCategoryData,
  generateSVG,
  plotConfig
} from '../testUtils/';

import expect from 'expect';

describe('Scatter Plot Tests', () => {
  let svg;
  let scatter;
  let data;
  let config;

  beforeEach(() => {
    svg = generateSVG();
    data = generateLinearData(10);
    config = new plotConfig().addOrientation().getConfig();
  });

  afterEach(() => {
    scatter.destroy();
    svg.remove();
  });

  describe('Func: createScatterPlot', () => {

    it('should run without error', () => {
      ({ plot: scatter } = createScatterPlot(data, config));
      scatter.renderTo(svg);
    });

  });

});
