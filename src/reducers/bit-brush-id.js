const CHANGE_BIT_BRUSH_ID = 'scratch-paint/bit-brush-id/CHANGE_BIT_BRUSH_ID';
const initialState = null;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case CHANGE_BIT_BRUSH_ID:
        return action.brushId;
    default:
        return state;
    }
};

const changeBitBrushId = function (brushId) {
    return {
        type: CHANGE_BIT_BRUSH_ID,
        brushId
    };
};

export {
    reducer as default,
    changeBitBrushId
};
