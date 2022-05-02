// MainReducer.ts

import { indexFinder, zIndexDrag } from '../../methods/num-finders'
import { updateModeCheck } from '../../methods/update-helper'

export const mainReducer = (state: any, action: any) => {

  function noteSetup() {
    let note = state.notes.find(
      (item: any) => item.id === Number(action.payload.id)
    )
    let notes = [...state.notes]
    return [note, notes]
  }

  function setNoteAndReturnState(notes: any[], id: number, note: any) {
    notes[indexFinder(notes, id)] = note
    return {
      ...state,
      notes: notes,
    }
  }

  switch (action.type) {
    case 'TOG_USER': {
      let user = state.user === 'Ash' ? 'Dave' : 'Ash'
      return {
        ...state,
        user: user,
      }
    }
    case 'SET_MOUSE_OFFSET': {
      let mouseOffset = {
        left: action.payload.left,
        top: action.payload.top,
      }
      return {
        ...state,
        mouseOffset: mouseOffset,
      }
    }
    case 'ONDRAG_NOTE_DATA': {
      let [note, notes] = noteSetup()
      note = {
        ...note,
        left: action.payload.left,
        top: action.payload.top,
        zIndex: action.payload.zIndex,
        isNew: false,
      }
      if (action.payload.isMat) {
        note.noteGroup.forEach((noteID: any) => {
          let groupedNote = notes[indexFinder(notes, noteID)]
          groupedNote.left =
            parseFloat(note.left) - groupedNote.matOffsetX + 'px'
          groupedNote.top = parseFloat(note.top) - groupedNote.matOffsetY + 'px'
          groupedNote.isMatBoard &&
            (groupedNote.zIndex = zIndexDrag(notes, true, true))
        })
      }
      return setNoteAndReturnState(notes, note.id, note)
    }
    case 'SET_CURRENT_USER':
      let currentUser = action.payload
      return {
        ...state,
        currentUser: currentUser,
      }
    case 'SET_ALL_NOTES': {
      let notes = [...action.payload]
      return {
        ...state,
        notes: notes,
      }
    }
    case 'ONCHANGE_TEXT': {
      let newNote = {
        ...state.newNote,
      }
      newNote.noteText = action.payload
      return {
        ...state,
        newNote: newNote,
      }
    }
    case 'SET_BOARDOBJ': {
      let boardObj = action.payload
      return {
        ...state,
        boardObj: boardObj,
      }
    }
    case 'TOG_BOARD_MENU': {
      let menuIsOpen = !action.payload
      return {
        ...state,
        menuIsOpen: menuIsOpen,
      }
    }
    case 'ONCHANGE_NOTECOLOR': {
      let newNote = action.payload
      return {
        ...state,
        newNote: newNote,
      }
    }
    case 'TOG_UPDATE_MODE': {
      let [note, notes] = noteSetup()
      // updateActive doesn't have to be set to the state value,
      // the handler will return the correct value either way,
      // but in this case the variable is being declared so
      // that it is hoisted and the handler is run at the
      // appropriate place in the stack
      let updateActive = state.updateActive
      note = {
        ...note,
        isUpdate: !note.isUpdate,
      }
      notes[indexFinder(notes, note.id)] = note
      updateActive = updateModeCheck(notes)
      return {
        ...state,
        notes,
        updateActive,
      }
    }
    case 'ONCHANGE_NOTETEXT': {
      let [note, notes] = noteSetup()
      note = {
        ...note,
        noteText: action.payload.text,
      }
      return setNoteAndReturnState(notes, note.id, note)
    }
    case 'SET_INTERFACE_ZOOM': {
      let display = {
        ...state.display,
      }
      display.uiZoom = action.payload
      return {
        ...state,
        display: display,
      }
    }
    case 'DISABLE_UPDATE_MODE': {
      let updateActive = false
      let notes = [...state.notes]
      notes.forEach((note) => (note.isUpdate = false))
      return {
        ...state,
        notes: notes,
        updateActive: updateActive,
      }
    }
    case 'ONRESIZE_NOTE': {
      let [note, notes] = noteSetup()
      note = {
        ...note,
        width: `${action.payload.width}px`,
        height: `${action.payload.height}px`,
      }
      return setNoteAndReturnState(notes, note.id, note)
    }
    case 'ONRESIZE_PAD': {
      let newNote = {...state.newNote}
      newNote.width = `${action.payload.width}px`
      newNote.height = `${action.payload.height}px`
      return {
        ...state,
        newNote: newNote,
      }
    }
    case 'DRAG_NEWNOTE': {
      let latestNote = state.notes[state.notes.length - 1]
      let notes = [...state.notes]
      let newNote = {
        ...state.newNote,
      }
      newNote.noteText = ''
      latestNote = {
        ...latestNote,
        left: action.payload.left - 40,
        top: action.payload.top - 40,
      }
      notes[state.notes.length - 1] = latestNote
      return {
        ...state,
        notes: notes,
        newNote: newNote,
      }
    }
    case 'TOG_NOTE_CHECKED': {
      let [note, notes] = noteSetup()
      note.isChecked = !action.payload.isChecked
      return setNoteAndReturnState(notes, note.id, note)
    }
    case 'TOG_TRAY': {
      let [note, notes] = noteSetup()
      note.isTrayDisplay = !action.payload.tray
      return setNoteAndReturnState(notes, note.id, note)
    }
    case 'ONRESIZE_TRAY': {
      let [note, notes] = noteSetup()
      note = {
        ...note,
        trayWidth: `${action.payload.width}px`,
        trayHeight: `${action.payload.height}px`,
      }
      return setNoteAndReturnState(notes, note.id, note)
    }
    case 'ONCHANGE_TRAYTEXT': {
      let [note, notes] = noteSetup()
      note = {
        ...note,
        trayText: action.payload.text,
      }
      return setNoteAndReturnState(notes, note.id, note)
    }
    default:
      return state
  }
}

// END of document
