import expect from 'expect';
import {
  generateSVG,
  generateCategoryData,
  plotConfig
} from '../testUtils';

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
      ({ plot: bar } = reactplottable.plots.bar.createBarPlot(data, config));
      bar.renderTo(svg);
    });

  });

});
