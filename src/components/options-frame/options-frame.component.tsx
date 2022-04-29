// options-frame.component.tsx

import { useContext, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import { newNoteGenerator } from '../../methods/new-note'
import { saveUserBoard } from '../../firebase/firebase.utils'
import BoardMenu from '../board-menu/board-menu.component'
import './options-frame.styles.scss'

type PropsType = {
  currentUser: any
}

const OptionsFrame = (props: PropsType): JSX.Element => {
  const {
    state: { notes, newNote, boardObj, menuIsOpen, display, updateActive },
    dispatch,
  } = useContext(MainContext)

  const optionsRef = useRef(null)

  function newNoteHandler(notesObj: any, newNote: any, isMat = false) {
    let notes = newNoteGenerator(notesObj, newNote, isMat, optionsRef)
    dispatch({ type: 'SET_ALL_NOTES', payload: notes })
  }

  function saveCurrentBoard() {
    let newBoardObj: any = {}
    newBoardObj = {
      name: boardObj.name,
      notes: [...notes],
      backgroundColor: boardObj.backgroundColor,
    }
    dispatch({ type: 'SET_BOARDOBJ', payload: newBoardObj })
    saveBoardToDatabase(newBoardObj)
  }

  function saveBoardToDatabase(boardObj: {
    name: any
    notes: any[]
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
    dispatch({ type: 'ONCHANGE_BOARDNAME', payload: boardObj })
  }

  function changeBGColor(e: any) {
    boardObj.backgroundColor = e.target.value
    dispatch({ type: 'ONCHANGE_BGCOLOR', payload: boardObj })
  }

  function changeNoteColor(e: any) {
    if (updateActive) {
      notes.forEach((note: any) => {
        note.isUpdate === true && (note.noteBColor = e.target.value)
      })
      dispatch({ type: 'SET_ALL_NOTES', payload: notes })
    } else {
      newNote.noteBColor = e.target.value
      dispatch({ type: 'ONCHANGE_NOTECOLOR', payload: newNote })
    }
  }

  function newBoard() {
    boardObj.name = ''
    dispatch({ type: 'ONCHANGE_BOARDNAME', payload: boardObj })
    let notes: any[] = []
    dispatch({ type: 'SET_ALL_NOTES', payload: notes})
  }

  function userBoardDropDown() {
    dispatch({ type: 'TOG_BOARD_MENU', payload: menuIsOpen })
  }

  // devicePixelRatio scaling via user zoom
  window.addEventListener('resize', () => {
    let ui = [
      '.options-frame',
      '.header',
      '.pad-frame',
      '.trash-frame',
    ]
    ui.forEach((item: any) => {
      document.querySelector(item).style.zoom = `calc(100% / ${ window.devicePixelRatio * display.uiZoom})`
    })
  })

  // interface scaling via state property uiZoom
  function zoomIntDir(directionUp: boolean) {
    let uiZoom = display.uiZoom
    directionUp ? (uiZoom = uiZoom - 0.14) : (uiZoom = uiZoom + 0.14)
    dispatch({ type: 'SET_INTERFACE_ZOOM', payload: uiZoom })
  }

  return (
    <div
      className='options-frame'
      ref={optionsRef}
      style={{
        zoom: `calc(100% / ${window.devicePixelRatio * display.uiZoom})`
      }}
      >
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

      <div
        className='database-options'
        
        >
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
        <button
          type='button'
          className='new-button'
          onClick={newBoard}
        >
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
      <button
        className='options-btn mat'
        type='button'
        // onClick={this.newMatHandler}
      >
        Mat
      </button>
      <button
        type='button'
        className='color-elements'
        // onClick={this.setBackgroundColor}
      >
        Set Background
      </button>
      <input
        type='color'
        value={boardObj.backgroundColor}
        className='color-elements'
        onChange={changeBGColor}
        id='bg-color-pick'></input>
      <button
        type='button'
        className='color-elements'
        style={{ width: '110px' }}
        // onClick={this.setNoteColor}
      >
        Set Note Color
      </button>
      <input
        type='color'
        value={newNote.noteBColor}
        className='color-elements'
        onChange={changeNoteColor}
        id='note-color-pick'></input>
      <label className='switch'>
        <label htmlFor='check-toggle' className='check-label'>
          Check
        </label>
        <input id='check-toggle' type='checkbox' />
        <span className='slider round'></span>
      </label>
    </div>
  )
}

export default OptionsFrame

// END of document
