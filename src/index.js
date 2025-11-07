// Ensure generator/async helpers are available at runtime (fixes
// "regeneratorRuntime is not defined" when using async/await).
import 'regenerator-runtime/runtime';

import PaintEditor from './containers/tw-paint-editor-wrapper.jsx';
import ScratchPaintReducer from './reducers/scratch-paint-reducer';

// Auto-register example brushes so the UI has at least one entry by default.
// This keeps the change minimal and avoids touching app bootstrap logic elsewhere.
import { registerBrush } from './brushes/index.js';
import simpleBrush from './brushes/simple-brush.js';

try {
    registerBrush(simpleBrush.id, simpleBrush);
} catch (e) {
    // Fail silently in case of early import/runtime ordering issues in tests or
    // environments where the registry isn't available yet.
    // eslint-disable-next-line no-console
    console.warn('Could not auto-register simple brush:', e && e.message);
}

export {
        PaintEditor as default,
        ScratchPaintReducer
};
