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
        case "SET_NOTE_DATA":
            let note = state.notes.filter((item: any) => item.id === Number(action.payload.id))[0]
            let notes = [ ...state.notes]
            note = {
                ...note,
                left: action.payload.left,
                top: action.payload.top,
                zIndex: action.payload.zIndex
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
        case "ONRESIZE_NOTE":
            {
                let note = state.notes.filter((item: any) => item.id === Number(action.payload.id))[0]
                let notes = [ ...state.notes]
                let width = `${action.payload.width}px`
                let height = `${action.payload.height}px`
                note = {
                    ...note,
                    width: width,
                    height: height
                }
                notes[indexFinder(notes, note.id)] = note
            return {
                ...state,
                notes: notes
            }
        }
        case "ONRESIZE_PAD":
            {
                let newNote = {...state.newNote}
                let width = `${action.payload.width}px`
                let height = `${action.payload.height}px`
                newNote.width = width
                newNote.height = height
            return {
                ...state,
                newNote: newNote
            }
        }
        case "DRAG_NEWNOTE":
            let latestNote = state.notes[state.notes.length-1]
            let newNotes = [...state.notes]
            let newNote = {...state.newNote}
            newNote.noteText = ''
            latestNote = {
                ...latestNote,
                left: action.payload.left-40,
                top: action.payload.top-40,
            }
            newNotes[state.notes.length-1] = latestNote
            return  {
                ...state,
                notes: newNotes,
                newNote: newNote
            }
        case "TOG_NOTE_CHECKED":
            {
            let note = state.notes.filter((item: any) => item.id === Number(action.payload.id))[0]
            let notes = [ ...state.notes]
            note.isChecked = !action.payload.isChecked
            notes[indexFinder(notes, note.id)] = note
            return {
                ...state,
                notes: notes
            }
        }
        case "TOG_TRAY":
            {
            let note = state.notes.filter((item: any) => item.id === Number(action.payload.id))[0]
            let notes = [...state.notes]
            note.isTrayDisplay = !action.payload.tray
            notes[indexFinder(notes, note.id)] = note
            return {
                ...state,
                notes: notes
            }
        }
        case "ONRESIZE_TRAY":
            {
                let note = state.notes.filter((item: any) => item.id === Number(action.payload.id))[0]
                let notes = [ ...state.notes]
                let width = `${action.payload.width}px`
                let height = `${action.payload.height}px`
                note = {
                    ...note,
                    trayWidth: width,
                    trayHeight: height
                }
                notes[indexFinder(notes, note.id)] = note
            return {
                ...state,
                notes: notes
            }
        }
        case "ONCHANGE_TRAYTEXT":
            {
                let note = state.notes.filter((item: any) => item.id === Number(action.payload.id))[0]
                let notes = [ ...state.notes]
                note = {
                    ...note,
                    trayText: action.payload.text
                }
                notes[indexFinder(notes, note.id)] = note
                return {
                    ...state,
                    notes: notes
                }
            }
        default:
            return state
    }
}

// END of document
