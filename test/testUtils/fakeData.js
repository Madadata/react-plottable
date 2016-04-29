export function generateLinearData(num) {
  const lineData = [];
  for (let i = 0; i < num; i++) {
    lineData[i] = { x: i, y: Math.random() * 20 };
  }
  return lineData;
}

export function generateTimeSeriesData(num) {
  const timeLineData = [];
  const factor = 1000000;
  const offset = 50000000;
  for (let i = 0; i < num; i++) {
    timeLineData[i] = { x: new Date(i * factor + offset), y: Math.random() * 20 };
  }
  return timeLineData;
}

export function generateCategoryData(num = 10) {
  const barData = [];
  for (let i = 0; i < num; i++) {
    barData[i] = { x: `bar ${i}`, y: Math.random() * 10 };
  }
  return barData;
}

export function generatePieData(num) {
  const pieData = [];
  for (let i = 0; i < num; i++) {
    pieData[i] = { x: Math.random() * 20 };
  }
  return pieData;
}

export function generateRectangleData() {
  const recData = [];
  const dimensions = ['coca', 'pepsi', 'startbar'];
  for (let i = 0; i < dimensions.length; i++) {
    for (let j = 0; j < dimensions.length; j++) {
      recData.push({
        x: dimensions[i],
        y: dimensions[j],
        z: Math.random() * 20,
      });
    }
  }
  return recData;
}
