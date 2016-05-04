import {
  createLinePlot,
  createTimeLinePlot,
  createCategoryLinePlot
} from '../../src/plots/line';
import {
  generateLinearData,
  generateTimeSeriesData,
  generateCategoryData,
  generateSVG,
  plotConfig
} from '../testUtils/';

import expect from 'expect';

describe('Line Plot Tests', () => {
  let svg;
  let line;
  let data;
  let config;

  beforeEach(() => {
    svg = generateSVG();
    data = generateLinearData(10);
    config = new plotConfig().addOrientation().getConfig();
  });

  afterEach(() => {
    line.destroy();
    svg.remove();
  });

  describe('Func: createLinePlot', () => {

    it('should run without error', () => {
      ({ plot: line } = createLinePlot(data, config));
      line.renderTo(svg);
    });

  });

});
