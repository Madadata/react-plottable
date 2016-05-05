import expect from 'expect';
import {
  generateSVG,
  generateLinearData,
  plotConfig
} from '../testUtils';

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
      ({ plot: area } = reactplottable.plots.area.createAreaPlot(data, config));
      area.renderTo(svg);
    });

  });

});
