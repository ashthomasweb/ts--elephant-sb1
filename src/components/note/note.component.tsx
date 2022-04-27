// note.component.tsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'

import './note.styles.scss'

const Note = (props: any) => {
  const { dispatch
  } = useContext(MainContext)
  
  let noteData = props.noteData

  let noteStyle = { // package style properties for easy CSS assignment
    left: noteData.left,
    top: noteData.top,
    backgroundColor: noteData.noteBColor,
    outline: noteData.isUpdate ? '5px solid green' : 'none'
  }

  function toggleUpdateMode(e: any) {
    console.log(e.target.id)
    dispatch({ type: 'TOG_UPDATE_BORDER', payload: e.target.id })
  }

  // controlled input elements
  function updateNote(e: any) {
    dispatch({ type: 'ONCHANGE_NOTETEXT', payload: { text: e.target.innerText, id: e.target.id } })
  }

  return (
    <div
      className='note-base'
      id={props.id}
      style={noteStyle}
      contentEditable={noteData.isUpdate ? 'true' : 'false'}
      onBlur={(e) => updateNote(e)}
      onDrag={props.dragNote}
      onDoubleClick={toggleUpdateMode}
      onMouseDown={props.getMousePos}
      onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), -9000, -9000)}
      draggable
      suppressContentEditableWarning
      >
      {/* <button type='button' onClick={() => dispatch({ type: 'TOG_USER' })}>
        Name
      </button> */}
      {noteData.noteText}
    </div>
  )
}

export default Note

// END of document
