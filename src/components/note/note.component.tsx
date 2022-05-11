// note.component.tsx

import { useContext, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import { indexFinder, newIdFinder } from '../../methods/num-finders'
import { getGroupIds } from '../../methods/find-group'
import { trashBoxDisplay } from '../../methods/trashHandlers'
import { zIndexDrag } from '../../methods/num-finders'
import { blankImage } from '../../assets/initial-array'

import check from '../../assets/check.png'
import './note.styles.scss'

const Note = (props: any) => {
  const { state: { notes, tempArrow, newArrow, arrowArray, drawModeActive, mouseOffset, isFireFox, dragMouseDown }, dispatch } = useContext(MainContext)

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
    dispatch({ type: 'TOG_MOUSE_DOWN', payload: { dragMouseDown: dragMouseDown}})
    noteData.isMatBoard && !noteData.isNew && findMatGroup(e.target.parentElement.id)
    getMousePos(e)
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

  function trayClickHandler(e: any) {
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
      dispatch({ type: 'SET_ARROW_ORIGIN', payload: { arrowData: {tempArrow: newArrowInstance, arrowId: arrowId}, id: noteId } }) // NEEDS DATA RESTRUCTURE
    } else if (tempArrow.originNoteId !== undefined) { // second click
      let [origMiddle, endMiddle] = notePositionFinder(true)
      let newArrowArray: any[] = [...arrowArray]
      let completedArrowInstance: any = { ...tempArrow, endNoteId: noteId, endPos: endMiddle, originPos: origMiddle }
      newArrowArray.push(completedArrowInstance)
      dispatch({ type: 'SET_ARROW_END', payload: { arrowData: {arrowId: arrowId}, id: noteId } })
      dispatch({type: "SET_ARROW_ARRAY", payload: { arrowArray: newArrowArray }})
    }

  }


  // ***** Safari pain point
  // actually the whole issue!
  // although the onDragOver IS a secondary event, when this isn't being re-rendered on every
  // pixel dragged the sluggishness and potential dropped note does not occur, meaning the 
  // FF event workaround can stay in place

  // var img = document.createElement("img")
  // img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  
  // **END Safari pain point



  const getMousePos = (e: any): void => {
    const mouseOffset: object = {
      left: e.clientX - parseFloat(getComputedStyle(e.target.parentNode).left),
      top: e.clientY - parseFloat(getComputedStyle(e.target.parentNode).top),
    }
    dispatch({ type: 'SET_NOTE_MOUSE_OFFSET', payload: {mouseOffset: mouseOffset} })
  }

  const getPosition = (position: string, mousePos: number): number => {
    return mousePos - mouseOffset[position]
  }

  const fireFoxDragHandler = (e: any) => { // coming from onDragOver for Gecko rendered browsers (FireFox)
    if (isFireFox) {
      dragNote(e)
    } else {
      return
    }
  }

  const nonFFDragHandler = (e: any) => { // coming from onDrag for non-Gecko rendered browsers (Chrome, Safari, Opera)
    if (!isFireFox) {
      dragNote(e)
    } else {
      return
    }
  }
  
  const dragNote = (e: any): void => {
    let noteId = e.target.parentElement.id
    let note = notes[indexFinder(notes, noteId)]
    let isMat = note.isMatBoard
    let newLeft: number = getPosition('left', e.clientX)
    let newTop: number = getPosition('top', e.clientY)
    let noteData: { [key: string]: string | number } = {
      left: `${newLeft}px`,
      top: `${newTop}px`,
      zIndex: zIndexDrag(notes, isMat),
      isMat: isMat,
    }
    let associatedArrows = note.attachmentsGroup
    let newArrowArray = [...arrowArray]

    function pf(input: string) {
      return parseFloat(input)
    }
    function centerPointFinder() {
      let x
      let y
      x = pf(note.left) + (pf(note.width) / 2)
      y = pf(note.top) + (pf(note.height) / 2)
      return [x,y]
    }

    if (newArrowArray.length > 0) {

      let [xCenter, yCenter] = centerPointFinder()

      newArrowArray.forEach(arrow => {
        if ( associatedArrows.includes(arrow.id)) {
          if (arrow.originNoteId === noteId) {
            arrow.originPos = {
              x: xCenter,
              y: yCenter
            }
          } else if (arrow.endNoteId === noteId) {
            arrow.endPos = {
              x: xCenter,
              y: yCenter
            }
          }
        }
      })
    }

    e.clientX !== 0 && dispatch({ type: 'ONDRAG_NOTE_DATA', payload: {noteData: noteData, id: noteId} })
    dispatch({ type: 'SET_ALL_ARROWS', payload: { arrowArray: newArrowArray} })
    trashBoxDisplay(e)
  }

  return (
    <div
      className='note-wrapper'
      id={props.id}
      style={notePosition}
      onMouseUp={resizeHandler}
      onClick={(e) => drawArrow(e)}

      // ***** FF pain point
      onDragOver={(e) => fireFoxDragHandler(e)}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      // **END FF pain point

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
        onMouseDown={trayClickHandler}
      />

      <div
        className={`note-base isMat-${noteData.isMatBoard}`}
        ref={currentNote}
        style={noteStyle}
        draggable

        // ***** Safari pain point
        onDragStart={(e) => e.dataTransfer.setDragImage(blankImage, 0, 0)}
        // onDragStart={(e) => e.dataTransfer.setDragImage(img, 0, 0)}
        // onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), 0, 0)}

        // **END Safari pain point

        onDrag={(e) => nonFFDragHandler(e)}
        
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
