import { bindClickTo } from './click';
import { bindDragBoxTo } from './dragbox';
import { bindPanZoomTo } from './panzoom';

const interactions = {};

interactions.bindClickTo = bindClickTo;
interactions.bindDragBoxTo = bindDragBoxTo;
interactions.bindPanZoomTo = bindPanZoomTo;

export default interactions;
