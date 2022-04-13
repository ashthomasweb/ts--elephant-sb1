// new-note.component.jsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'

import './note.styles.scss'

const Note = (props) => {
  const {
    state: { user },
    dispatch,
  } = useContext(MainContext)

  return (
    <div
      className='note-base'
      style={props.notePosition}
      onDrag={props.dragNote}
      onMouseDown={props.getMousePos}
      draggable>
      <button type='button' onClick={() => dispatch({ type: 'TOG_USER' })}>
        Name
      </button>
      {user}
    </div>
  )
}

export default Note

// SCRATCH
// supposed solution for skateboard 1, now not necessary
// onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), -9000, -9000)}

// END of document
