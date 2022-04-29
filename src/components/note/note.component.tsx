// note.component.tsx

import { useContext, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'

import './note.styles.scss'

const Note = (props: any) => {
  const { dispatch
  } = useContext(MainContext)

  const currentNote: any = useRef(null)

  let noteData = props.noteData

  let noteStyle = { // package style properties for easy CSS assignment
    left: noteData.left,
    top: noteData.top,
    width: noteData.width,
    height: noteData.height,
    zIndex: noteData.zIndex,
    outline: noteData.isUpdate ? '5px solid green' : 'none',
    backgroundColor: noteData.noteBColor,
  }

  async function toggleUpdateMode(e: any) {
    let el = e.currentTarget
    console.log(el)
    await dispatch({ type: 'TOG_UPDATE_MODE', payload: e.currentTarget.parentElement.id })
    el.focus()
  }

  // controlled input elements
  function updateNote(e: any) {
    dispatch({ type: 'ONCHANGE_NOTETEXT', payload: { text: e.target.innerText, id: e.currentTarget.parentElement.id } })
  }

  function resizeHandler(e: any) {
    let dimensions = currentNote.current.getBoundingClientRect()
    dispatch({ type: 'ONRESIZE_NOTE', payload: { id: e.target.id, width: dimensions.width, height: dimensions.height}})
  }

  return (
    <div
      className='note-wrapper'
      style={noteStyle}
      onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), -9000, -9000)}
      draggable
      onDrag={props.dragNote}
      onMouseDown={props.getMousePos}
      onMouseUp={resizeHandler}
      id={props.id}
      ref={currentNote}
      >
      <div
        onDoubleClick={toggleUpdateMode}
        className='note-base'
        contentEditable={noteData.isUpdate ? 'true' : 'false'}
        onBlur={(e) => updateNote(e)}
        suppressContentEditableWarning
        >
        {noteData.noteText}
      </div>
    </div>
  )
}

export default Note

// END of document
