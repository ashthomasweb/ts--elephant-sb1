// note.component.tsx

import { useContext, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import { indexFinder, newIdFinder } from '../../methods/num-finders'
import { getGroupIds } from '../../methods/find-group'

import check from '../../assets/check.png'
import './note.styles.scss'

const Note = (props: any) => {
  const { state: { notes, tempArrow, newArrow, arrowArray, drawModeActive }, dispatch } = useContext(MainContext)

  // Begin David Edits
  // End David Edits

  const currentNote: any = useRef(null)
  const currentTray: any = useRef(null)

  let noteData = props.noteData

  let notePosition = {
    left: noteData.left,
    top: noteData.top,
    zIndex: noteData.zIndex,
    outline: noteData.isUpdate ? '5px solid green' : 'none',
  }

  let noteStyle = {
    width: noteData.width,
    height: noteData.height,
    backgroundColor: noteData.noteBColor,
  }

  function noteClickHandler(e: any) {

    noteData.isMatBoard && !noteData.isNew && findMatGroup(e.target.parentElement.id)
    props.getMousePos(e)
  }

  async function findMatGroup(id: string) {
    let noteGroup = await getGroupIds(id, notes)
    let newNotes = [...notes]
    newNotes[indexFinder(notes, id)].noteGroup = noteGroup
    assignMatOffset(id, noteGroup, newNotes)
  }

  function assignMatOffset(id: any, noteGroup: number[], notes: any[]) {
    let mat = notes[indexFinder(notes, id)]
    noteGroup.forEach((itemID: number) => {
      let note = notes[indexFinder(notes, itemID)]
      note.matOffsetX = parseFloat(mat.left) - parseFloat(note.left)
      note.matOffsetY = parseFloat(mat.top) - parseFloat(note.top)
    })
    dispatch({ type: 'SET_ALL_NOTES', payload: {notes: notes} })
  }

  async function toggleUpdateMode(e: any) {
    let elem = e.currentTarget
    await dispatch({
      type: 'TOG_UPDATE_MODE',
      payload: { id: elem.parentElement.id }
    })
    elem.focus()
  }

  function updateNote(e: any) {
    dispatch({
      type: 'ONCHANGE_NOTE_TEXT',
      payload: {
        noteText: e.target.innerText,
        id: e.currentTarget.parentElement.id,
      }
    })
  }

  function resizeHandler(e: any) {
    if (e.target.id !instanceof Number) return // type clause: do not continue if event listener originates from tray
    let dimensions = currentNote.current.getBoundingClientRect()
    dispatch({
      type: 'ONRESIZE_NOTE',
      payload: {
        id: e.target.parentElement.id,
        dimensions: {
          width: dimensions.width,
          height: dimensions.height,
        }
      }
    })
  }

  function updateTray(e: any) {
    dispatch({
      type: 'ONCHANGE_TRAY_TEXT',
      payload: { trayText: e.target.value, id: props.id }
    })
  }

  function resizeTray(e: any) {
    if (e.target.id === '') return // type clause: do not continue if event listener originates from tray
    let dimensions = currentTray.current.getBoundingClientRect()
    dispatch({
      type: 'ONRESIZE_TRAY',
      payload: {
        id: props.id,
        dimensions: {
          width: dimensions.width,
          height: dimensions.height,
        }
      }
    })
  }

  function clickHandler(e: any) {
    console.log('hi0')
    dispatch({
      type: 'TOG_TRAY',
      payload: { id: e.target.parentElement.id, isTrayDisplay: noteData.isTrayDisplay },
    })
  }

  function drawArrow(e: any) {
    if (e.target.type === 'textarea') return // type clause: do not continue if event listener originates from tray
    if (!drawModeActive) return

    let noteId = e.target.parentElement.id
    let arrowId = newIdFinder(arrowArray)

    function pf(input: string) {
      return parseFloat(input)
    }

    function notePositionFinder(final: boolean = false) {
      let posX, posY
      // set the basic corner the first time, to the first note
      if (!final) {
        posX = notes[indexFinder(notes, noteId)].left
        posY = notes[indexFinder(notes, noteId)].top
        return [posX, posY]
      } else {
        // get rect
        let endNote = notes[indexFinder(notes, e.target.parentElement.id)]
        const { height: endHeight, width: endWidth, left: endLeft, top: endTop} = endNote
        // get origin rect
        let origId: any = tempArrow.originNoteId
        let origNote = notes[indexFinder(notes, origId)]
        const { height: origHeight, width: origWidth, left: origLeft, top: origTop} = origNote
        // compare
        const endMiddle = {y: pf(endTop) + (pf(endHeight) / 2), x: pf(endLeft) + (pf(endWidth) / 2)}
        const origMiddle = {y: pf(origTop) + (pf(origHeight) / 2), x: pf(origLeft) + (pf(origWidth) / 2)}
        return [origMiddle, endMiddle]
      }
    }

    if (tempArrow.originNoteId === undefined) { // first click
      let [posX, posY] = notePositionFinder()
      let newArrowInstance: any = { ...newArrow, id: arrowId, originNoteId: noteId, originPos: {x: posX, y: posY} }
      dispatch({ type: 'SET_ARROW_ORIGIN', payload: { arrowData: newArrowInstance, id: noteId } })
    } else if (tempArrow.originNoteId !== undefined) { // second click
      let [origMiddle, endMiddle] = notePositionFinder(true)
      let newArrowArray: any[] = [...arrowArray]
      let completedArrowInstance: any = { ...tempArrow, endNoteId: noteId, endPos: endMiddle, originPos: origMiddle }
      newArrowArray.push(completedArrowInstance)
      dispatch({ type: 'SET_ARROW_END', payload: { arrowData: completedArrowInstance, id: noteId } })
      dispatch({type: "SET_ARROW_ARRAY", payload: { arrowArray: newArrowArray }})
    }

  }

  return (
    <div
      className='note-wrapper'
      id={props.id}
      style={notePosition}
      onMouseUp={resizeHandler}
      onClick={(e) => drawArrow(e)}
      >

      <img
        className='note-check'
        style={{ opacity: `${props.noteData.isChecked ? '1' : '0.1'}` }}
        src={check}
        onClick={() =>
          dispatch({
            type: 'TOG_NOTE_CHECKED',
            payload: { id: props.id, isChecked: props.noteData.isChecked },
          })
        }
        alt='checkmark'
      />

      <div
        className='note-menu'
        data-tray={`tray-${noteData.id}`}
        onMouseDown={clickHandler}
      />

      <div
        className={`note-base isMat-${noteData.isMatBoard}`}
        ref={currentNote}
        style={noteStyle}
        draggable
        onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), -9000, -9000)}
        onDrag={props.dragNote}
        onMouseDown={noteClickHandler}
        onDoubleClick={toggleUpdateMode}
        contentEditable={noteData.isUpdate ? 'true' : 'false'}
        onBlur={(e) => updateNote(e)}
        suppressContentEditableWarning
        >
        {noteData.noteText}
      </div>

      <div
        className={`note-tray ${
          noteData.isTrayDisplay ? 'slide-out' : 'slide-in'
        }`}
        style={{
          backgroundColor: `${noteData.noteBColor}`,
          display: `${noteData.isTrayDisplay ? 'block' : 'none'}`,
        }}
        onDrag={(e) => e.preventDefault()}
        id={`tray-${noteData.id}`}
        >
          
        <textarea
          className={`tray-text ${
            noteData.isTrayDisplay ? 'slide-out' : 'slide-in'
          }`}
          style={{
            width: noteData.trayWidth,
            height: noteData.trayHeight,
            display: `${noteData.isTrayDisplay ? 'block' : 'none'}`,
          }}
          ref={currentTray}
          onMouseUp={(e) => resizeTray(e)}
          onChange={(e) => updateTray(e)}
          suppressContentEditableWarning
          contentEditable='true'
          value={noteData.trayText}>
          </textarea>

      </div>
      {/* Begin David Edits */}
          {/* <button type='button' >Arrow</button> */}
          {/* // End David Edits */}
    </div>
  )
}

export default Note

// END of document
