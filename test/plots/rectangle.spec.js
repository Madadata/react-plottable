import expect from 'expect';
import {
  generateSVG,
  generateRectangleData,
  plotConfig
} from '../testUtils';


describe('Rectangle Plot Tests', () => {
  let svg;
  let rectangle;
  let data;
  let config;

  beforeEach(() => {
    svg = generateSVG();
    data = generateRectangleData(10);
    config = new plotConfig().addOrientation().getConfig();
  });

  afterEach(() => {
    rectangle.destroy();
    svg.remove();
  });

  describe('Func: createBarPlot', () => {

    it('should run without error', () => {
      ({ plot: rectangle } = reactplottable.plots.rectangle.createRectanglePlot(data, config));
      rectangle.renderTo(svg);
    });

  });

});
