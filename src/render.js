import { createTable, drawTable } from './tables';

export const renderChart = (config, ref, onInteraction) => {
  const table = createTable(config, onInteraction);
  console.log(table);
  drawTable(table, ref);
  return table;
};
