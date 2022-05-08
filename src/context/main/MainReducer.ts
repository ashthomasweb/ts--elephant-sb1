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
      let display = { ...state.display, uiZoom: data }
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
      let [note, notes] = noteSetup()
      let data = action.payload.noteData
      note = {
        ...note,
        left: data.left,
        top: data.top,
        zIndex: data.zIndex,
        isNew: false,
      }
      data.isMat &&
        note.noteGroup.forEach((noteID: string) => {
          let groupedNote = notes[indexFinder(notes, noteID)]
          groupedNote.left = parseFloat(note.left) - groupedNote.matOffsetX + 'px'
          groupedNote.top = parseFloat(note.top) - groupedNote.matOffsetY + 'px'
          groupedNote.isMatBoard && (groupedNote.zIndex = zIndexDrag(notes, true, true))
        })

      return setNoteAndReturnState(notes, note.id, note)
    }

    // DROP MENU AND BOARD OBJECT HANDLER //

    case 'TOG_BOARD_MENU': {
      let menuIsOpen = !state.menuIsOpen
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
      let updateActive
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
      console.log('hi5')

      let data = action.payload.noteText
      let newNote = { ...state.newNote, noteText: data }
      return {
        ...state,
        newNote: newNote,
      }
    }

    case 'ONCHANGE_PAD_NOTECOLOR': {
      console.log('hi4')

      let data = action.payload.noteBColor
      let newNote = { ...state.newNote, noteBColor: data }
      return {
        ...state,
        newNote: newNote,
      }
    }

    case 'ONRESIZE_PAD': {
      console.log('hi3')
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
      console.log('hi2')

      let data = action.payload.noteData
      let notes = [...state.notes]
      let newNote = { ...state.newNote, noteText: '' }
      notes[notes.length - 1] = {
        ...notes[notes.length - 1],
        left: data.left - 40,
        top: data.top - 40,
        zIndex: 2147483646
      }
      return {
        ...state,
        notes: notes,
        newNote: newNote,
      }
    }

    case 'ONCHANGE_NOTE_TEXT': {
      let data = action.payload.noteText
      let [note, notes] = noteSetup()
      note.noteText = data
      return setNoteAndReturnState(notes, note.id, note)
    }

    case 'ONRESIZE_NOTE': {
      let data = action.payload.dimensions
      let [note, notes] = noteSetup()
      note = {
        ...note,
        width: data.width,
        height: data.height,
      }
      return setNoteAndReturnState(notes, note.id, note)
    }

    // TRAY //

    // the following boolean-based toggles do NOT work when value is
    // pulled from note object here, needs to be passed in payload
    case 'TOG_NOTE_CHECKED': {
      let data = action.payload.isChecked
      let [note, notes] = noteSetup()
      note.isChecked = !data
      return setNoteAndReturnState(notes, note.id, note)
    }

    case 'TOG_TRAY': {
      let data = action.payload.isTrayDisplay
      let [note, notes] = noteSetup()
      note.isTrayDisplay = !data
      return setNoteAndReturnState(notes, note.id, note)
    }

    case 'ONRESIZE_TRAY': {
      let data = action.payload.dimensions
      let [note, notes] = noteSetup()
      note = {
        ...note,
        trayWidth: data.width,
        trayHeight: data.height,
      }
      return setNoteAndReturnState(notes, note.id, note)
    }

    case 'ONCHANGE_TRAY_TEXT': {
      let data = action.payload.trayText
      let [note, notes] = noteSetup()
      note = { ...note, trayText: data }
      return setNoteAndReturnState(notes, note.id, note)
    }

    // DRAW MODE

    case 'TOG_DRAW_MODE': {
      let drawModeActive = !state.drawModeActive
      return {
        ...state,
        drawModeActive: drawModeActive,
      }
    }

    case 'SET_ARROW_ARRAY': {
      let data = action.payload.arrowArray
      let arrowArray = data
      return {
        ...state,
        arrowArray: arrowArray
      }
    }

    case 'SET_ARROW_ORIGIN': {
      var data = action.payload.arrowData
      let [note, notes] = noteSetup()
      let attachmentsGroup = [...note.attachmentsGroup, data] // seemingly works!
      note = {
        ...note,
        attachmentsGroup: attachmentsGroup
      } // end new solution

      // var notes = [...state.notes]
      // var newId = indexFinder([...state.notes], data.originNoteId)
      // var note = notes[newId]
      // // note.attachmentsGroup.push(data) // produces artifact in all instances of attachmentsGroup
      // note.attachmentsGroup = [...note.attachmentsGroup, data] // produces duplicate in correct note
      // let test = note.noteText
      // console.log(test)
      // console.log(data)
      // console.log(note)

      // let index = group.length === 0 ? 0 : group.length - 1
      // group[index] = {...group[index], ...data}
      notes[indexFinder(notes,note.id)] = note
      // console.log(notes)
      
      var tempArrow = { ...data }
      return {
        ...state,
        tempArrow: tempArrow,
        notes: notes
      }
    }

    case 'SET_ARROW_END': {
      let data = action.payload.arrowData

      let [note, notes] = noteSetup()
      let attachmentsGroup = [...note.attachmentsGroup, data] // seemingly works!
      note = {
        ...note,
        attachmentsGroup: attachmentsGroup
      } // end new solution


      // let group = note.attachmentsGroup
      // group[group.length-1] = {...group[group.length-1], ...data}
      notes[indexFinder(notes,note.id)] = note

      let tempArrow = {}
      return {
        ...state,
        tempArrow: tempArrow,
        notes: notes
      }
    }

    // case 'SET_ARROWS_TO_NOTES': {
    //   let data = action.payload.arrowData
    //   let notes = [...state.notes]
    //   console.log(data.firstNote)
    //   console.log(notes[indexFinder(notes, data.firstNote)])
    //   let firstNote = notes[indexFinder(notes, data.firstNote)]
    //   let secondNote = notes[indexFinder(notes, data.secondNote)]
    //   // [data.firstNote, data.secondNote, data.arrowId]
    //   console.log(firstNote)
    //   firstNote.attachmentsGroup.push('hi')
    //   console.log(firstNote.attachmentsGroup)
    //   secondNote.attachmentsGroup.push('data')
    //   notes[indexFinder(notes, firstNote.id)] = firstNote
    //   notes[indexFinder(notes, secondNote.id)] = secondNote
    //   return {
    //     ...state,
    //     notes: notes
    //   }
    // }

    default: {
      return state
    }
  }
}

// END of document
