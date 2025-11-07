// A tiny example brush implementation.
// Exposes a `stamp(ctx, x, y, options)` method which paints a soft circular stamp.

function _applySoftCircle(ctx, x, y, radius, color) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
  grad.addColorStop(0, color);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

const simpleBrush = {
  id: 'simple-soft',
  description: 'Soft circular brush (example)',
  stamp(ctx, x, y, options = {}) {
    const size = options.size || 10;
    const color = options.color || 'rgba(0,0,0,1)';
    // Save/restore to avoid mutating user context state
    ctx.save();
    ctx.globalCompositeOperation = options.composite || ctx.globalCompositeOperation;
    _applySoftCircle(ctx, x, y, size, color);
    ctx.restore();
  }
};

export default simpleBrush;
