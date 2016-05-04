export function generateSVG(width = 400, height = 400) {
  const body = d3.select('body');
  return body.append('svg')
             .attr('width', width)
             .attr('height', height)
}
