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
    // GLOBAL //

    case 'SET_INTERFACE_ZOOM': {
      let data = action.payload.uiZoom
      let display = { ...state.display }
      display.uiZoom = data
      return {
        ...state,
        display: display,
      }
    }

    case 'SET_ALL_NOTES': {
      let data = [...action.payload.notes]
      let notes = data
      return {
        ...state,
        notes: notes,
      }
    }

    // DRAG HANDLING //

    case 'SET_NOTE_MOUSE_OFFSET': {
      let data = action.payload.mouseOffset
      let mouseOffset = { ...data }
      return {
        ...state,
        mouseOffset: mouseOffset,
      }
    }

    case 'ONDRAG_NOTE_DATA': {
      let [note, notes] = noteSetup() // payload id is present and available to this call
      let data = action.payload.noteData
      note = {
        ...note,
        left: data.left,
        top: data.top,
        zIndex: data.zIndex,
        isNew: false,
      }
      if (data.isMat) {
        note.noteGroup.forEach((noteID: string) => {
          let gItem = notes[indexFinder(notes, noteID)]
          gItem.left = parseFloat(note.left) - gItem.matOffsetX + 'px'
          gItem.top = parseFloat(note.top) - gItem.matOffsetY + 'px'
          gItem.isMatBoard && (gItem.zIndex = zIndexDrag(notes, true, true))
        })
      }

      return setNoteAndReturnState(notes, note.id, note)
    }

    // DROP MENU AND BOARD OBJECT HANDLER //

    case 'TOG_BOARD_MENU': {
      let data = action.payload.menuIsOpen
      let menuIsOpen = !data
      return {
        ...state,
        menuIsOpen: menuIsOpen,
      }
    }

    case 'SET_BOARDOBJ': {
      let data = action.payload.boardObj
      let boardObj = data
      return {
        ...state,
        boardObj: boardObj,
      }
    }

    // UPDATE MODE //

    case 'TOG_UPDATE_MODE': {
      let [note, notes] = noteSetup()
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

    // PAD ACTIONS AND HANDLING //

    case 'ONCHANGE_PAD_TEXT': {
      let data = action.payload.noteText
      let newNote = { ...state.newNote, noteText: data }
      return {
        ...state,
        newNote: newNote,
      }
    }

    case 'ONCHANGE_PAD_NOTECOLOR': {
      let data = action.payload.noteBColor
      let newNote = { ...state.newNote, noteBColor: data }
      return {
        ...state,
        newNote: newNote,
      }
    }

    case 'ONRESIZE_PAD': {
      let data = action.payload.dimensions
      let newNote = {
        ...state.newNote,
        width: data.width,
        height: data.height
      }
      return {
        ...state,
        newNote: newNote,
      }
    }

    case 'DRAG_NOTE_FROM_PAD': {
      let data = action.payload.noteData
      let notes = [...state.notes]
      let newNote = { ...state.newNote, noteText: '' }
      notes[notes.length - 1] = {
        ...notes[notes.length - 1],
        left: data.left - 40,
        top: data.top - 40,
      }
      return {
        ...state,
        notes: notes,
        newNote: newNote,
      }
    }

    case 'ONCHANGE_NOTE_TEXT': {
      let [note, notes] = noteSetup()
      note.noteText = action.payload.text
      return setNoteAndReturnState(notes, note.id, note)
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

    // TRAY //

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

    case 'ONCHANGE_TRAY_TEXT': {
      let [note, notes] = noteSetup()
      note = {
        ...note,
        trayText: action.payload.text,
      }
      return setNoteAndReturnState(notes, note.id, note)
    }

    default: {
      return state
    }
  }
}

// END of document
