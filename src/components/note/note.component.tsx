// note.component.tsx

import { useContext, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import check from '../../assets/check.png'

import './note.styles.scss'

const Note = (props: any) => {
  const { dispatch } = useContext(MainContext)

  const currentNote: any = useRef(null)
  const currentTray: any = useRef(null)

  let noteData = props.noteData

  let notePosition = {
    // package style properties for easy CSS assignment
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

  async function toggleUpdateMode(e: any) {
    let el = e.currentTarget
    console.log(el)
    await dispatch({
      type: 'TOG_UPDATE_MODE',
      payload: e.currentTarget.parentElement.id,
    })
    el.focus()
  }

  // controlled input elements
  function updateNote(e: any) {
    dispatch({
      type: 'ONCHANGE_NOTETEXT',
      payload: {
        text: e.target.innerText,
        id: e.currentTarget.parentElement.id,
      },
    })
  }

  function resizeHandler(e: any) {
    console.log(e.target)
    let dimensions = currentNote.current.getBoundingClientRect()
    dispatch({
      type: 'ONRESIZE_NOTE',
      payload: {
        id: e.target.parentElement.id,
        width: dimensions.width,
        height: dimensions.height,
      },
    })
  }

  function updateTray(e: any) {
    dispatch({
      type: 'ONCHANGE_TRAYTEXT',
      payload: { text: e.target.value, id: props.id },
    })
  }

  function resizeTray(e: any) {
    let dimensions = currentTray.current.getBoundingClientRect()
    dispatch({
      type: 'ONRESIZE_TRAY',
      payload: {
        id: props.id,
        width: dimensions.width,
        height: dimensions.height,
      },
    })
  }

  function clickHandler(e: any) {
    let id = e.target.parentElement.id
    dispatch({
      type: 'TOG_TRAY',
      payload: { id: id, tray: noteData.isTrayDisplay },
    })
  }

  return (
    <div
      className='note-wrapper'
      style={notePosition}
      
      onMouseUp={resizeHandler}
      id={props.id}
      ref={currentNote}
      >
      <img
        src={check}
        style={{ opacity: `${props.noteData.isChecked ? '1' : '0.1'}` }}
        className='note-check'
        alt='checkmark'
        onClick={() =>
          dispatch({
            type: 'TOG_NOTE_CHECKED',
            payload: { id: props.id, isChecked: props.noteData.isChecked },
          })
        }
      />
      <div
        className='note-menu'
        data-tray={`tray-${noteData.id}`}
        onMouseDown={clickHandler}
      />
      <div
      onDragStart={(e) =>
        e.dataTransfer.setDragImage(new Image(), -9000, -9000)
      }
      draggable
      onDrag={props.dragNote}
      onMouseDown={props.getMousePos}
        onDoubleClick={toggleUpdateMode}
        style={noteStyle}
        className='note-base'
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
        // data-display={noteData.isTrayDisplay ?? false}
        >
        <textarea
          className={`tray-text ${
            noteData.isTrayDisplay ? 'slide-out' : 'slide-in'
          }`}
          ref={currentTray}
          style={{
            width: `${noteData.trayWidth}`,
            height: `${noteData.trayHeight}`,
            display: `${noteData.isTrayDisplay ? 'block' : 'none'}`,
          }}
          suppressContentEditableWarning
          contentEditable='true'
          onMouseUp={(e) => resizeTray(e)}
          onChange={(e) => updateTray(e)}
          value={noteData.trayText}></textarea>
      </div>
    </div>
  )
}

export default Note

// END of document
