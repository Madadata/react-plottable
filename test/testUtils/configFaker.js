import _ from 'lodash';

export class plotConfig {

  constructor(config = {}) {
    this.config = { ...config };
  }

  addOrientation() {
    this.config = _.assign(
      this.config, { xOrientation: 'bottom', yOrientation: 'left' }
    );
    return this;
  }

  addClickable() {
    this.config = _.assign(
      this.config, { clickable: true }
    );
    return this;
  }

  addDragBox(type) {
    const validTypes = ['x', 'y', 'xy'];
    if (!_.includes(validTypes, type)) {
      throw new Error('dragbox type not supported');
    }
    this.config = _.assign(
      this.config, { dragBoxType: type }
    );
  }

  addPanZoom(type) {
    const validTypes = ['x', 'y', 'xy'];
    if (!_.includes(validTypes, type)) {
      throw new Error('dragbox type not supported');
    }
    this.config = _.assign(
      this.config, { panZoomType: type }
    );
  }

  getConfig() {
    return this.config;
  }

}
