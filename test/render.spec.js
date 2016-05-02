import {
  generateLinearData,
  generateSVG,
  plotConfig
} from './testUtils/';

import {
  renderChart
} from '../src/render';

import expect from 'expect';

describe('Render Tests', () => {
  let svg;
  let table;
  let data;
  let tableConfig = {};
  let onInteraction;

  beforeEach(() => {
    svg = generateSVG();
    tableConfig.content = [
      {
        data: generateLinearData(10),
        type: 'line',
        config: new plotConfig().addOrientation().getConfig()
      }
    ];
    tableConfig.config = {
      types: ['number', 'number'],
      isPlotGroup: false
    };
    onInteraction = (selected) => { console.log(selected); };
  });

  afterEach(() => {
    table.destroy();
    svg.remove();
  });

  describe('Func: renderChart', () => {

    it('should run without error', () => {
      table = renderChart(tableConfig, svg, onInteraction);
    });

  });

});
