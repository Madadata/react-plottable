import expect from 'expect';
import {
  generateSVG,
  generateLinearData,
  plotConfig
} from '../testUtils';


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
      ({ plot: line } = reactplottable.plots.line.createLinePlot(data, config));
      line.renderTo(svg);
    });

  });

});
