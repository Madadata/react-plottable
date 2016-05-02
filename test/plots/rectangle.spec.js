import {
  createRectanglePlot
} from '../../src/plots/rectangle';
import {
  generateRectangleData,
  generateSVG,
  plotConfig
} from '../testUtils/';

import expect from 'expect';

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
      ({ plot: rectangle } = createRectanglePlot(data, config));
      rectangle.renderTo(svg);
    });

  });

});
