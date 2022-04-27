// MainReducer.ts

import { indexFinder } from '../../methods/num-finders'
import { updateModeCheck } from '../../methods/update-helper'

export const mainReducer = (state: any, action: any) => {
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
            let note = state.notes.filter((item: any) => item.id === Number(action.payload.id))[0]
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
        case "SET_ALL_NOTES":
            {
            let notes = [...action.payload]
            return {
                ...state,
                notes: notes
            }
        }
        case "ONCHANGE_TEXT":
        {
            let newNote = {...state.newNote}
            newNote.noteText = action.payload
            return {
                ...state,
                newNote: newNote
            }
        }
        case "SET_BOARDOBJ":
            return {
                ...state,
                boardObj: action.payload
            }
        case "ONCHANGE_BOARDNAME":
            return {
                ...state,
                boardObj: action.payload
        }
        case "TOG_BOARD_MENU":
            let menuIsOpen = !action.payload
            return {
                ...state,
                menuIsOpen: menuIsOpen
        }
        case "ONCHANGE_BGCOLOR":
            return {
                ...state,
                boardObj: action.payload
        }
        case "ONCHANGE_NOTECOLOR":
            return {
                ...state,
                newNote: action.payload
        }
        case "TOG_UPDATE_MODE":
            {
                let note = state.notes.filter((item: any) => item.id === Number(action.payload))[0]
                let notes = [ ...state.notes]
                // updateActive doesn't have to be set to the state value, 
                // the handler will return the correct value either way, 
                // but in this case the variable is being declared so 
                // that it is hoisted and the handler is run at the 
                // appropriate place in the stack
                let updateActive = state.updateActive
                note = {
                    ...note,
                    isUpdate: !note.isUpdate
                }
                notes[indexFinder(notes, note.id)] = note
                // check if any notes are in update status
                updateActive = updateModeCheck(notes)
                return {
                    ...state,
                    notes,
                    updateActive
                }
            }
        case "ONCHANGE_NOTETEXT":
            {
                let note = state.notes.filter((item: any) => item.id === Number(action.payload.id))[0]
                let notes = [ ...state.notes]
                note = {
                    ...note,
                    noteText: action.payload.text
                }
                notes[indexFinder(notes, note.id)] = note
                return {
                    ...state,
                    notes: notes
                }
            }
        case "SET_INTERFACE_ZOOM":
            let display = {...state.display}
            display.uiZoom = action.payload
            return {
                ...state,
                display: display
            }
        case "DISABLE_UPDATE_MODE":
            let updateActive = false
            return {
                ...state,
                updateActive: updateActive
            }
        default:
            return state
    }
}

// END of document
