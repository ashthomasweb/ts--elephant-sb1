// MainReducer.js

import { indexFinder } from '../../methods/finders/num-finders.tsx'

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
            let note = state.notes.filter((item) => item.id === Number(action.payload.id))[0]
            let notes = [ ...state.notes]
            note = {
                ...note,
                left: action.payload.left,
                top: action.payload.top
            }
            notes[indexFinder(notes, note.id)] = note
            return {
                ...state,
                notes
            }
        case "SET_CURRENT_USER":
            let currentUser = action.payload
            return {
                ...state,
                currentUser: currentUser
            }   
        default:
            return state
    }
}

// END of document
