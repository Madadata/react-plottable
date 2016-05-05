import expect from 'expect';
import {
  generateSVG,
  generateCategoryData,
  plotConfig
} from '../testUtils';

const createScale = reactplottable.scales.createScale;

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

  describe('Func: createPiePlot', () => {

    it('should run without error', () => {
      ({ plot: pie } = reactplottable.plots.pie.createPiePlot(data, config));
      pie.renderTo(svg);
    });

  });

});
