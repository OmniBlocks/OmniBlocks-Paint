// Image brush: use a transparent monotone image (PNG) as an alpha mask for stamping.
// The stamp will tint the mask with the provided color (for drawing) or use the mask
// as an eraser when `isEraser` is true.

function createImageBrushFromImage(img, opts = {}) {
  const id = opts.id || `image-brush-${Date.now()}`;

  function stamp(ctx, x, y, options = {}) {
    const size = options.size || opts.size || Math.max(img.width, img.height);
    const color = options.color || opts.color || 'rgba(0,0,0,1)';
    const isEraser = options.isEraser || false;

    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(size);
    canvas.height = Math.ceil(size);
    const cctx = canvas.getContext('2d');
    cctx.imageSmoothingEnabled = false;

    // Draw the source image centered and scaled to fit the requested size
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const dx = (canvas.width - drawW) / 2;
    const dy = (canvas.height - drawH) / 2;
    cctx.drawImage(img, dx, dy, drawW, drawH);

    if (isEraser) {
      // Use the image alpha as destination-out on the target context
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(canvas, ~~x - canvas.width / 2, ~~y - canvas.height / 2);
      ctx.restore();
      return;
    }

    // Tint the image by using source-in: draw the mask, then fill with color where alpha exists
    const tinted = document.createElement('canvas');
    tinted.width = canvas.width;
    tinted.height = canvas.height;
    const tctx = tinted.getContext('2d');
    tctx.imageSmoothingEnabled = false;
    tctx.drawImage(canvas, 0, 0);
    tctx.globalCompositeOperation = 'source-in';
    tctx.fillStyle = color;
    tctx.fillRect(0, 0, tinted.width, tinted.height);

    // Draw onto destination
    ctx.drawImage(tinted, ~~x - tinted.width / 2, ~~y - tinted.height / 2);
  }

  return {
    id,
    description: opts.description || 'Image brush (alpha mask)',
    stamp
  };
}

// Accepts a URL or Image/Canvas element. Returns a Promise resolving to a brush.
export function createImageBrush(source, opts = {}) {
  return new Promise((resolve, reject) => {
    if (!source) return reject(new Error('source required'));
    if (typeof source === 'string') {
      const img = new Image();
      img.crossOrigin = opts.crossOrigin || 'anonymous';
      img.onload = () => resolve(createImageBrushFromImage(img, opts));
      img.onerror = (e) => reject(e || new Error('failed to load image'));
      img.src = source;
      return;
    }
    // Assume an image-like object
    if (source instanceof HTMLImageElement || source instanceof HTMLCanvasElement) {
      resolve(createImageBrushFromImage(source, opts));
      return;
    }
    reject(new Error('unsupported source type for image brush'));
  });
}

export default createImageBrush;
