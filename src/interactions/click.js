import { SELECTED, DEFAULT_WAIT } from '../config';
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
              selection.attr('fill', SELECTED);
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
    if (selection.attr('fill') !== SELECTED) {
      selection.attr('fill', SELECTED);
    } else {
      selection.attr('fill', selection.attr('ofill'));
    }
    if (selection.attr('stroke') !== SELECTED) {
      selection.attr('stroke', SELECTED);
    } else {
      selection.attr('stroke', selection.attr('ostroke'));
    }
    onClick(selection.datum(), 'click');
  });
  interaction.attachTo(plot);
}
