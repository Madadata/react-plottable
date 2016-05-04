import {
  createPiePlot
} from '../../src/plots/pie';
import {
  generateCategoryData,
  generateSVG,
  plotConfig
} from '../testUtils/';

import expect from 'expect';

describe('Pie Plot Tests', () => {
  let svg;
  let pie;
  let data;
  let config;

  beforeEach(() => {
    svg = generateSVG();
    data = generateCategoryData(10);
    config = new plotConfig().addOrientation().getConfig();
  });

  afterEach(() => {
    pie.destroy();
    svg.remove();
  });

  describe('Func: createBarPlot', () => {

    it('should run without error', () => {
      ({ plot: pie } = createPiePlot(data, config));
      pie.renderTo(svg);
    });

  });

});
