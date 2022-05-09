// options-frame.component.tsx

import { useContext, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import { newNoteGenerator } from '../../methods/new-note'
import { saveUserBoard } from '../../firebase/firebase.utils'
import BoardMenu from '../board-menu/board-menu.component'
import { newBoardArray } from '../../assets/initial-array'
import './options-frame.styles.scss'

type PropsType = {
  currentUser: any
}

const OptionsFrame = (props: PropsType): JSX.Element => {
  const {
    state: { notes, newNote, boardObj, arrowArray, menuIsOpen, display, updateActive, drawModeActive },
    dispatch,
  } = useContext(MainContext)

  const optionsRef = useRef(null)

  function newNoteHandler(notesObj: any, newNote: any, isMat = false) { // refactor with below
    let newNotes = newNoteGenerator(notesObj, newNote, isMat, optionsRef)
    dispatch({ type: 'SET_ALL_NOTES', payload: {notes: newNotes} })
  }

  function newMatHandler() { // refactor with above
    let newNotes = newNoteGenerator(notes, newNote, true, optionsRef)
    dispatch({ type: 'SET_ALL_NOTES', payload: {notes: newNotes} })
  }

  function saveCurrentBoard() {
    let newBoardObj: any = {}
    newBoardObj = {
      name: boardObj.name,
      notes: [...notes],
      arrowArray: [...arrowArray],
      backgroundColor: boardObj.backgroundColor,
    }
    dispatch({ type: 'SET_BOARDOBJ', payload: {boardObj: newBoardObj} })
    saveBoardToDatabase(newBoardObj)
  }

  function saveBoardToDatabase(boardObj: {
    name: any
    notes: any[]
    arrowArrow: any[]
    backgroundColor: string
  }) {
    if (props.currentUser === null) {
      // NEED localhost option
      console.log('no user')
    } else {
      saveUserBoard(props.currentUser.auth, boardObj)
    }
  }

  function changeBoardName(e: any) {
    boardObj.name = e.target.value
    dispatch({ type: 'SET_BOARDOBJ', payload: {boardObj: boardObj} })
  }

  function changeBGColor(e: any) {
    boardObj.backgroundColor = e.target.value
    dispatch({ type: 'SET_BOARDOBJ', payload: {boardObj: boardObj} })
  }

  function changeNoteColor(e: any) {
    if (updateActive) {
      notes.forEach((note: any) => {
        note.isUpdate === true && (note.noteBColor = e.target.value)
      })
      dispatch({ type: 'SET_ALL_NOTES', payload: {notes: notes} })
    } else {
      dispatch({ type: 'ONCHANGE_PAD_NOTECOLOR', payload: {noteBColor: e.target.value} })
    }
  }

  function newBoard() {
    let newNotes: any[] = [...newBoardArray] // exported object containing single anchor note. Possibly no longer needed with svg frame.
    let arrowArray: any[] = []
    let newBoardObj = {
      name: '',
      notes: newNotes,
      arrowArray: arrowArray,
      backgroundColor: '#1670d7'
    }
    dispatch({ type: 'SET_BOARDOBJ', payload: {boardObj: newBoardObj} })
    dispatch({ type: 'SET_ALL_NOTES', payload: {notes: newNotes } })
    dispatch({ type: 'SET_ALL_ARROWS', payload: {arrowArray: arrowArray } })
  }

  function userBoardDropDown() {
    dispatch({ type: 'TOG_BOARD_MENU' })
  }

  // devicePixelRatio scaling via user zoom
  window.addEventListener('resize', () => {
    let ui = ['.options-frame', '.header', '.pad-frame', '.trash-frame']
    ui.forEach((item: any) => {
      document.querySelector(item).style.zoom = `calc(100% / ${
        window.devicePixelRatio * display.uiZoom
      })`
    })
  })

  // interface scaling via state property uiZoom
  function zoomIntDir(directionUp: boolean) {
    let uiZoom = display.uiZoom
    directionUp ? (uiZoom = uiZoom - 0.14) : (uiZoom = uiZoom + 0.14)
    dispatch({ type: 'SET_INTERFACE_ZOOM', payload: { uiZoom: uiZoom } })
  }

  function cancelUpdateMode() {
    dispatch({ type: 'DISABLE_UPDATE_MODE' })
  }

  function toggleDrawMode() {
    dispatch({ type: 'TOG_DRAW_MODE' })
  }

  return (
    <div
      className='options-frame'
      ref={optionsRef}
      style={{
        zoom: `calc(100% / ${window.devicePixelRatio * display.uiZoom})`,
      }}>
      <div className='zoom-options'>
        <h3>Zoom</h3>
        <h4>Interface</h4>
        <button type='button' onClick={() => zoomIntDir(false)}>
          -
        </button>
        <button type='button' onClick={() => zoomIntDir(true)}>
          +
        </button>
        <h4 style={{ marginTop: '3px' }}>Board</h4>
        <p>
          Hold CTRL
          <br /> + Wheel
        </p>
      </div>

      <div className='database-options'>
        <h3>Save Boards</h3>
        <input
          type='text'
          className='save-board-input'
          placeholder='Enter Board Name'
          value={boardObj.name}
          onChange={changeBoardName}
        />
        <button type='button' onClick={() => saveCurrentBoard()}>
          Save
        </button>
        <button type='button' className='new-button' onClick={newBoard}>
          New Board
        </button>
        <button
          type='button'
          style={{ width: '135px' }}
          onClick={() => userBoardDropDown()}>
          Your Saved Boards
        </button>
        {menuIsOpen && <BoardMenu currentUser={props.currentUser} />}
      </div>
      
      <button
        className='place-btn'
        type='button'
        onClick={() => newNoteHandler(notes, newNote)}>
        Place on Board
      </button>
      <button className='options-btn mat' type='button' onClick={newMatHandler}>
        Mat
      </button>
      <label className='color-elements-label'>Set Background</label>
      <input
        type='color'
        value={boardObj.backgroundColor}
        className='color-elements'
        onChange={changeBGColor}
        id='bg-color-pick'
      />
      <label className='color-elements-label'>Set Note Color</label>
      <input
        type='color'
        value={newNote.noteBColor}
        className='color-elements'
        onChange={changeNoteColor}
        id='note-color-pick'
      />
      <button
        type='button'
        style={{ width: '80px', marginRight: '7px', backgroundColor: `${drawModeActive ? 'lightgreen' : 'whitesmoke'}` }}
        className='color-elements'
        onClick={toggleDrawMode}>
        Draw
      </button>
      <button
        type='button'
        style={{ width: '80px', backgroundColor: `${updateActive ? 'lightgreen' : 'whitesmoke'}` }}
        className='color-elements'
        onClick={cancelUpdateMode}>
        Update
      </button>
    </div>
  )
}

export default OptionsFrame

// END of document
