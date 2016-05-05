import {
  SELECTED_FILL,
  SELECTED_STROKE,
  LINE_STROKE,
  LINE_SELECTED_STROKE,
  DEFAULT_WAIT,
} from '../config';
import _ from 'lodash';
import $ from 'jquery';

export function bindClickTo(plot, onClick, defaultSelected) {
  const interaction = new Plottable.Interactions.Click();
  // default selected
  if (!!defaultSelected) {
    $(document).ready(() => {
      setTimeout(() => {
        _.forEach(plot.entities(), entity => {
          const selection = entity.selection;
          const datum = selection.datum();
          _.forEach(defaultSelected, point => {
            if (point.x === datum.x && point.y === datum.y) {
              selection.attr('oriFill', selection.attr('fill'));
              selection.attr('fill', SELECTED_FILL);
              selection.attr('stroke', SELECTED_STROKE);
              onClick(datum, 'click');
            }
          });
        });
      }, DEFAULT_WAIT);
    });
  }

  interaction.onClick(point => {
    const selection = plot.entityNearest(point).selection;
    if (!selection.attr('ofill')) {
      selection.attr('ofill', selection.attr('fill'));
    }
    if (!selection.attr('ostroke')) {
      selection.attr('ostroke', selection.attr('stroke'));
    }

    switch (selection.attr('fill')) {
      case SELECTED_FILL:
        selection.attr('fill', selection.attr('ofill'));
        break;
      case selection.attr('ofill'):
        selection.attr('fill', SELECTED_FILL);
        break;
      default:
        throw new Error('Unexpected fill color');
    }

    switch (selection.attr('stroke')) {
      case LINE_STROKE:
        selection.attr('stroke', LINE_SELECTED_STROKE);
        break;
      case LINE_SELECTED_STROKE:
        selection.attr('stroke', LINE_STROKE);
        break;
      case SELECTED_STROKE:
        selection.attr('stroke', selection.attr('ostroke'));
        break;
      case selection.attr('ostroke'):
        selection.attr('stroke', SELECTED_STROKE);
        break;
      default:
        throw new Error('Unexpected stroke color');
    }

    onClick(selection.datum(), 'click');
  });
  interaction.attachTo(plot);
}
