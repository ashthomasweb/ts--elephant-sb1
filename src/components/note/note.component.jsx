// new-note.component.jsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'

import './note.styles.scss'

const Note = (props) => {
  const {
    state: { user },
    dispatch,
  } = useContext(MainContext)

  let notePosition = {
    left: props.noteData.left,
    top: props.noteData.top
  }

  return (
    <div
      className='note-base'
      id={props.id}
      style={notePosition}
      onDrag={props.dragNote}
      onMouseDown={props.getMousePos}
      onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), -9000, -9000)}
      draggable>
      <button type='button' onClick={() => dispatch({ type: 'TOG_USER' })}>
        Name
      </button>
      {user}
    </div>
  )
}

export default Note

// END of document
