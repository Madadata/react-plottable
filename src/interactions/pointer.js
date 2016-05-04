import { HOVERED, FILL } from '../config';
import _ from 'lodash';

export function bindHoverPointerTo(plot) {
  const interaction = new Plottable.Interactions.Pointer();
  interaction.onPointerMove(p => {
    _.forEach(plot.entities(), entity => {
      entity.selection.attr('fill', FILL);
    });

    const entity = plot.entityNearest(p);
    entity.selection.attr('fill', HOVERED);
  });

  interaction.attachTo(plot);
}

export function bindToolTipPointerTo(plot) {
  // append tooltip div
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('line-height', 1)
    .style('font-weight', 'bold')
    .style('font-size', '12px')
    .style('padding', '12px')
    .style('background', 'rgba(0, 0, 0, 0.8)')
    .style('color', '#fff')
    .style('border-radius', '2px')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('visibility', 'hidden');

  const interaction = new Plottable.Interactions.Pointer();
  interaction.onPointerMove(() => {
    _.forEach(plot.entities(), entity => {
      entity.selection.on('mouseover', () => (tooltip.style('visibility', 'visible')))
        .on('mousemove', () => (tooltip
          .style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`)
          .text(entity.selection.datum().y)
        ))
        .on('mouseout', () => (tooltip.style('visibility', 'hidden')));
    });
  });
  interaction.attachTo(plot);
}
