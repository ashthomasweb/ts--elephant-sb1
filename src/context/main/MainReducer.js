export const mainReducer = (state, action) => {
    switch (action.type) {
        case "TOG_USER":
            let user = state.user === 'Ash' ? 'Dave' : 'Ash'
            return {
                ...state,
                user: user
            }
        case "SET_MOUSE_OFFSET":
            let mouseOffset = {
                left: action.payload.left,
                top: action.payload.top
            }
            return {
                ...state,
                mouseOffset: mouseOffset
            }
        case "SET_NOTE_POSITION":
            let notePosition = {
                left: action.payload.left,
                top: action.payload.top
            }
            return {
                ...state,
                notePosition: notePosition
            }
        default:
            return state
    }
}

// END of document
