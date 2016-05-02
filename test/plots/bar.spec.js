import {
  createBarPlot,
  createTimeBarPlot,
  createCategoryBarPlot
} from '../../src/plots/bar';
import {
  generateLinearData,
  generateTimeSeriesData,
  generateCategoryData,
  generateSVG,
  plotConfig
} from '../testUtils/';

import expect from 'expect';

describe('Bar Plot Tests', () => {
  let svg;
  let bar;
  let data;
  let config;

  beforeEach(() => {
    svg = generateSVG();
    data = generateCategoryData(10);
    config = new plotConfig()
                .addOrientation()
                .addClickable()
                .getConfig();
  });

  afterEach(() => {
    bar.destroy();
    svg.remove();
  });

  describe('Func: createBarPlot', () => {

    it('should run without error', () => {
      ({ plot: bar } = createBarPlot(data, config));
      bar.renderTo(svg);
    });

  });

});
