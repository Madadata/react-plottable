import {
  createClusteredBarPlot,
  createTimeClusteredBarPlot
} from '../../src/plots/clusteredbar';
import {
  generateLinearData,
  generateTimeSeriesData,
  generateCategoryData,
  generateSVG,
  plotConfig
} from '../testUtils/';

import expect from 'expect';

describe('ClusteredBar Plot Tests', () => {
  let svg;
  let clusteredbar;
  let data;
  let config;

  beforeEach(() => {
    svg = generateSVG();
    data = [];
    _.times(3, data.push(generateCategoryData(10)));
    config = new plotConfig().addOrientation().getConfig();
  });

  afterEach(() => {
    clusteredbar.destroy();
    svg.remove();
  });

  describe('Func: createClusteredBarPlot', () => {

    it('should run without error', () => {
      ({ plot: clusteredbar } = createClusteredBarPlot(data, config));
      clusteredbar.renderTo(svg);
    });

  });

});
