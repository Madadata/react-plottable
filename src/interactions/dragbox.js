import { FILL, SELECTED, DEFAULT_WAIT } from '../config';
import _ from 'lodash';
import $ from 'jquery';

/* eslint-disable */
function _bindDragBoxTo(plot, dragBox, onDrag, xScale, yScale, defaultSelected, plotName) {
  let curBox;
  let curMin;
  let curMax;
  if (!!defaultSelected) {
    $(document).ready(() => {
      setTimeout(() => {
        const xSelected = _.map(defaultSelected, datum => (xScale.scale(datum.x)));
        const ySelected = _.map(defaultSelected, datum => (yScale.scale(datum.y)));
        // set default dragbox
        const defaultBox = {
          bottomRight: { x: _.max(xSelected), y: _.min(ySelected) },
          topLeft: { x: _.min(xSelected), y: _.max(ySelected) },
        };
        dragBox.bounds(defaultBox);
        dragBox.boxVisible(true);
        // highlight default data
        const defaultSelectedData = [];
        _.forEach(plot.entities(), entity => {
          const selection = entity.selection;
          const datum = selection.datum();
          _.forEach(defaultSelected, point => {
            if (point.x === datum.x && point.y === datum.y) {
              selection.attr('fill', SELECTED);
              defaultSelectedData.push(datum);
            }
          });
        });
        onDrag(defaultSelectedData, 'drag');
      }, DEFAULT_WAIT);
    });
  }
  // dragbox settings
  dragBox.movable(true);
  dragBox.onDragStart(() => {
    d3.select('.plottable .selection-box-layer .selection-area')
      .attr('id', 'lineDragBox');
  });
  dragBox.onDrag(box => {
    plot.selections().attr('fill', FILL);
    if (plotName !== 'line') {
      plot.entitiesIn(box).forEach(entity => {
        entity.selection.attr('fill', SELECTED);
      });
    }
  });
  dragBox.onDragEnd(box => {
    const dataInBox = [];
    if (plotName !== 'line') {
      const entitiesInBox = plot.entitiesIn(box);
      _.forEach(entitiesInBox, entity => {
        dataInBox.push(entity.selection.datum());
      });
    } else {
      const xMin = box.topLeft.x;
      const xMax = box.bottomRight.x;
      const stepWidth = xScale.stepWidth();
      _.forEach(plot.datasets()[0].data(), (datum, idx) => {
        const position = (idx + 1) * stepWidth;
        if (position >= xMin && position <= xMax) {
          dataInBox.push(datum);
        }
      });
    }
    onDrag(dataInBox, 'drag');
    if (dataInBox.length !== 0) {
      curMin = dataInBox[0].x;
      curMax = dataInBox[dataInBox.length - 1].x;
      curBox = box;
    }
  });
  // resize the drag box when pan zoom happens
  xScale.onUpdate(() => {
    if (dragBox.boxVisible()) {
      const left = xScale.scale(curMin);
      const right = xScale.scale(curMax);
      const dataInBoxSet = new Set();
      const box = {
        topLeft: { x: left, y: curBox.topLeft.y },
        bottomRight: { x: right, y: curBox.bottomRight.y },
      };
      dragBox.bounds(box);
      plot.entitiesIn(box).forEach(entity => {
        dataInBoxSet.add(entity.selection.datum());
      });
      // reset the attr of plot
      plot.attr('fill', (d) => {
        if (dataInBoxSet.has(d)) {
          return SELECTED;
        }
        return FILL;
      });
    }
  });
  return new Plottable.Components.Group([dragBox, plot]);
}
/* eslint-enable */
export function bindDragBoxTo(
  plot, dragBoxType, onDrag, xScale, yScale, defaultSelected, plotName
) {
  switch (dragBoxType) {
    case 'x': {
      const xDragBox = new Plottable.Components.XDragBoxLayer();
      return _bindDragBoxTo(
        plot, xDragBox, onDrag, xScale, yScale, defaultSelected, plotName
      );
    }
    case 'y': {
      const yDragBox = new Plottable.Components.YDragBoxLayer();
      if (!!defaultSelected) {
        throw new Error('The default select is not supported by yDragBox now');
      }
      return _bindDragBoxTo(plot, yDragBox, onDrag);
    }
    case 'xy': {
      const regularDragBox = new Plottable.Components.DragBoxLayer();
      return _bindDragBoxTo(
        plot, regularDragBox, onDrag, xScale, yScale, defaultSelected, plotName
      );
    }
    default:
      throw new Error(`The drag box type ${dragBoxType} is not supported`);
  }
}
