function bindXPanZoomTo (plot, xScale, xAxis) {
  const pziXAxis = new Plottable.Interactions.PanZoom();
  pziXAxis.addXScale(xScale);
  pziXAxis.attachTo(xAxis);
};

function bindYPanZoomTo (plot, yScale, yAxis) {
  const pziYAxis = new Plottable.Interactions.PanZoom();
  pziYAxis.addYScale(yScale);
  pziYAxis.attachTo(yAxis);
};

function bindXYPanZoomTo (plot, xScale, yScale, xAxis, yAxis) {
  bindXPanZoomTo(plot, xScale, xAxis);
  bindYPanZoomTo(plot, yScale, yAxis);
};

export function bindPanZoomTo (plot, panZoomType, xScale, yScale, xAxis, yAxis) {
  switch (panZoomType) {
    case 'x':
      bindXPanZoomTo(plot, xScale, xAxis);
      break;
    case 'y':
      bindYPanZoomTo(plot, yScale, yAxis);
      break;
    case 'xy':
      bindXYPanZoomTo(plot, xScale, yScale, xAxis, yAxis);
      break;
    default:
      throw new Error(`The type of pan zoom ${panZoomType} is not supported`);
  }
};
