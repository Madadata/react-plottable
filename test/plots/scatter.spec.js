import expect from 'expect';
import {
  generateSVG,
  generateLinearData,
  plotConfig
} from '../testUtils';


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
      ({ plot: scatter } = reactplottable.plots.scatter.createScatterPlot(data, config));
      scatter.renderTo(svg);
    });

  });

});
