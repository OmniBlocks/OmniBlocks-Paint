// Minimal brush registry and API for bitmap editor brushes
// This file is intentionally small — it provides a place to register brushes
// and a tiny interface that the bitmap brush tool can import and use.

const brushes = new Map();

function registerBrush(id, brushImpl) {
  if (typeof id !== 'string' || !id) throw new Error('brush id required');
  if (!brushImpl || typeof brushImpl.stamp !== 'function') {
    throw new Error('brush implementation must expose a stamp(canvasContext, x, y, options) method');
  }
  brushes.set(id, brushImpl);
}

function getBrush(id) {
  return brushes.get(id);
}

function listBrushes() {
  return Array.from(brushes.keys());
}

module.exports = {
  registerBrush,
  getBrush,
  listBrushes
};
