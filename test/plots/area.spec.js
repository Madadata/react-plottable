import {
  createAreaPlot,
  createTimeAreaPlot,
  createCategoryAreaPlot
} from '../../src/plots/area';
import {
  generateLinearData,
  generateSVG,
  plotConfig
} from '../testUtils/';

import expect from 'expect';

describe('Area Plot Tests', () => {
  let svg;
  let area;
  let data;
  let config;

  beforeEach(() => {
    svg = generateSVG();
    data = generateLinearData(10);
    config = new plotConfig().addOrientation().getConfig();
  });

  afterEach(() => {
    area.destroy();
    svg.remove();
  });

  describe('Func: createAreaPlot', () => {

    it('should run without error', () => {
      ({ plot: area } = createAreaPlot(data, config));
      area.renderTo(svg);
    });

  });

});
