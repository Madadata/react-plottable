import {
  createLinePlot,
  createTimeLinePlot,
  createCategoryLinePlot
} from '../../src/plots/line';
import {
  generateLinearData,
  generateTimeSeriesData,
  generateCategoryData
} from '../testUtils/fakeData';
import {
  createScales
} from '../../src/scales/scales';
import {
  createAxis
} from '../../src/axes/axes';

import expect from 'expect';

describe('Line Plot Tests', () => {

  describe('Func: createLinePlot', () => {
    const data = generateLinearData(10);
    const config = {
      xOrientation: 'bottom',
      yOrientation: 'left'
    };
    // const onInteraction = () => { console.log('interacted'); };
    it('should run without error', () => {
      createLinePlot(data, config);
    });

  });

});
