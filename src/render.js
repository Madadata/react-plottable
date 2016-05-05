const render = {};

import tables from './tables';

function renderChart(config, ref, onInteraction) {
  const table = tables.createTable(config, onInteraction);
  tables.drawTable(table, ref);
  return table;
}

render.renderChart = renderChart;
export default render;
