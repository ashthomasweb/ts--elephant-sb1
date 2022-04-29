// note.component.tsx

import { useContext, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import check from '../../assets/check.png'

import './note.styles.scss'

const Note = (props: any) => {
  const { dispatch
  } = useContext(MainContext)

  const currentNote: any = useRef(null)
  const currentTray: any = useRef(null)

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

  function updateTray(e: any) {
    dispatch({ type: 'ONCHANGE_TRAYTEXT', payload: { text: e.target.value, id: props.id } })
  }

  function resizeTray(e: any) {
    let dimensions = currentTray.current.getBoundingClientRect()
    dispatch({ type: 'ONRESIZE_TRAY', payload: { id: props.id, width: dimensions.width, height: dimensions.height}})
  }

  // function traySize(id: any) {
  //   let tray: any = document.querySelector(`#tray-${id} textarea`)
  //   let trayWidth = getComputedStyle(tray).getPropertyValue('width')
  //   let trayHeight = getComputedStyle(tray).getPropertyValue('height')
  //   this.props.traySize(id, trayWidth, trayHeight)
  // }

  // function saveTray(id) {
  //   let tray = document.querySelector(`#tray-${id} textarea`)
  //   let trayText = tray.value
  //   this.setState({ trayText })
  //   this.props.passTrayText(id, trayText)
  // }

  
  function clickHandler(e: any) {
      let id = e.target.parentElement.id
      dispatch({ type: 'TOG_TRAY', payload: { id: id, tray: noteData.isTrayDisplay }})
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
        <img
              src={check}
              style={{ opacity: `${props.noteData.isChecked ? '1' : '0.1'}` }}
              className='note-check'
              alt='checkmark'
              onClick={() => dispatch({ type: 'TOG_NOTE_CHECKED', payload: { id: props.id, isChecked: props.noteData.isChecked }})}
            />
            <div className='note-menu' data-tray={`tray-${noteData.id}`} onMouseDown={clickHandler}/>
      <div
        onDoubleClick={toggleUpdateMode}
        
        className='note-base'
        contentEditable={noteData.isUpdate ? 'true' : 'false'}
        onBlur={(e) => updateNote(e)}
        suppressContentEditableWarning
        >
        {noteData.noteText}
      </div>
      <div
          style={{
            backgroundColor: `${noteData.noteBColor}`,
            display: `${noteData.isTrayDisplay ? 'block' : 'none'}`,
          }}
          id={`tray-${noteData.id}`}
          
          className={`note-tray ${
            noteData.isTrayDisplay ? 'slide-out' : 'slide-in'
          }`}
          data-display={noteData.isTrayDisplay ?? false}>
          <textarea
            ref={currentTray}
            className={`tray-text ${
              noteData.isTrayDisplay ? 'slide-out' : 'slide-in'
            }`}
            style={{
              width: `${noteData.trayWidth ?? '150px'}`,
              height: `${noteData.trayHeight ?? '200px'}`,
              display: `${noteData.isTrayDisplay ? 'block' : 'none'}`,
            }}
            suppressContentEditableWarning={true}
            contentEditable='true'
            onMouseUp={(e) => resizeTray(e)}
            onChange={(e) => updateTray(e)}
            value={noteData.trayText}>sdf</textarea>
            {/* {!iframe ||
              <iframe id={`iframe-${id}`} style={{ resize: 'both', width: `${iframeWidth}`, height: `${iframeHeight}` }}
              src={iframe}
              title='Barrueco'
              onMouseUp={() => this.iframeSize(id)}
              loading='lazy'></iframe>
            } */}
        </div>
    </div>
  )
}

export default Note

// END of document
