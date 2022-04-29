// pad-frame.component.tsx

import { useContext, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import { newNoteGenerator } from '../../methods/new-note'
import '../pad-frame/pad-frame.styles.scss'

const PadFrame = (): JSX.Element => {
  const { state: { newNote, display, notes },
    dispatch,
  } = useContext(MainContext)

  const padFrameRef: any = useRef(null)
  // controlled input elements
  function changeInput(e: any) {
    dispatch({ type: 'ONCHANGE_TEXT', payload: e.target.innerText })
  }

  function resizeHandler() {
    let dimensions = padFrameRef.current.getBoundingClientRect()
    dispatch({ type: 'ONRESIZE_PAD', payload: { width: dimensions.width, height: dimensions.height}})
  }

  function dragHandler(e: any) {
    e.dataTransfer.setDragImage(new Image(), -9000, -9000)
    let newNotes = newNoteGenerator(notes, newNote)
    dispatch({ type: 'SET_ALL_NOTES', payload: newNotes})
  }

  function newDragHandler(e: any) {
    let noteData: { [key: string]: string | number } = {
      left: e.clientX,
      top: e.clientY,
    }
    dispatch({ type: "DRAG_NEWNOTE", payload: noteData })
    padFrameRef.current.textContent = ''
  }

  return (
    <div
      className='pad-frame'
      onDrag={newDragHandler}
      onDragStart={dragHandler}

      onMouseUp={resizeHandler}
      draggable
      style={{ backgroundColor: newNote.noteBColor, zoom: `calc(100% / ${window.devicePixelRatio * display.uiZoom})` }}>
      <div id='input-text' 
      ref={padFrameRef}
      contentEditable='true' 
      onInput={(e) => changeInput(e)} 
      />
    </div>
  )
}

export default PadFrame

// END of document
