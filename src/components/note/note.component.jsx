// new-note.component.jsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'

import './note.styles.scss'

const Note = (props) => {
  const {
    dispatch
  } = useContext(MainContext)

  let noteData = props.noteData

  let notePosition = { // package position coordinates for easy CSS assignment
    left: noteData.left,
    top: noteData.top
  }

  return (
    <div
      className='note-base'
      id={props.id}
      style={notePosition}
      onDrag={props.dragNote}
      onMouseDown={props.getMousePos}
      onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), -9000, -9000)}
      draggable
      >
      <button type='button' onClick={() => dispatch({ type: 'TOG_USER' })}>
        Name
      </button>
      {noteData.noteText}
    </div>
  )
}

export default Note

// END of document
