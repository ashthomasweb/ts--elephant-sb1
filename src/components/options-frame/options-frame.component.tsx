// options-frame.component.tsx

import { useContext } from "react";
import { MainContext } from '../../context/main/MainState'
import { newNoteGenerator } from "../../methods/new-note"
import { saveUserBoard, deleteUserBoard, userBoards } from '../../firebase/firebase.utils'
import './options-frame.styles.scss'

import { dropHelper } from '../../methods/drop-helper'


type PropsType = {
  currentUser: any
}

const OptionsFrame = (props: PropsType): JSX.Element => {

  const { state: { notes, newNote, boardObj }, dispatch } = useContext(MainContext)

  function newNoteHandler(notesObj: any, newNote: any, isMat=false) {
      let notes = newNoteGenerator(notesObj, newNote, isMat)
      dispatch({ type: 'SET_ALL_NOTES', payload: notes })
  }
  
  function saveCurrentBoard() {
    let newBoardObj: any = {}
    newBoardObj = {
      name: boardObj.name,
      notes: [...notes],
      backgroundColor: boardObj.backgroundColor,
    }
    dispatch({ type: 'SET_BOARDOBJ', payload: newBoardObj})
    saveBoardToDatabase(newBoardObj)
  }

  function saveBoardToDatabase(boardObj: {name: any, notes: any[], backgroundColor: string}) {
    if (props.currentUser === null) {
      // NEED localhost option
      console.log('no user')
    } else {
      saveUserBoard(props.currentUser.auth, boardObj)
    }
  }

  function changeBoardName(e: any) {
    boardObj.name = e.target.value
    dispatch({ type: 'ONCHANGE_BOARDNAME', payload: boardObj})
  }

  


  function userBoardDropDown() {
    let el = document.querySelector('.board-drop').style
    putBoardsToList()
    el.display === 'block' ? (el.display = 'none') : (el.display = 'block')
  }

  function putBoardsToList() {
    let parentMenuCont = document.querySelector('.board-drop')
    let newMenu = document.createElement('div')
    if (parentMenuCont.firstChild)
      parentMenuCont.removeChild(parentMenuCont.firstChild)
    userBoards.forEach((boardObj) => {
      const [cont, button, xButton] = dropHelper(boardObj)
      buildBoardButton(boardObj, button, xButton)
      cont.append(xButton, button)
      newMenu.append(cont)
    })
    parentMenuCont.append(newMenu)
  }

  function buildBoardButton(boardObj: any, button: any, xButton: any) {
    xButton.addEventListener('click', () =>
      deleteBoardHandler(boardObj.name)
    )
    button.addEventListener('click', async () => {
      console.log(arguments)
      let notes: any[] = []
      await dispatch({ type: 'SET_ALL_NOTES', payload: notes })
      notes = [...boardObj.notes]
      boardObj.backgroundColor ?? (boardObj.backgroundColor = '#1670d7')
      await dispatch({ type: 'SET_ALL_NOTES', payload: notes })
      await dispatch({ type: 'SET_BOARDOBJ', payload: boardObj })

      displayUpdate()
      document.querySelector('.save-board-input').value = boardObj.name
      document.querySelector('.board-drop').style.display = 'none'

      // this.setState({ notes, boardObj }, () => {
      // })
    })
  }

  function displayUpdate() {
    let bg = boardObj.backgroundColor
    document.querySelector('#note-color-pick').defaultValue = newNote.noteBColor
    document.querySelector('#bg-color-pick').defaultValue = bg.length > 7 ? '#1670d7' : bg
  }

  // confirmation request, then firestore method
  async function deleteBoardHandler(boardName: string) {
    let dropMenu = document.querySelector('.board-drop')
    if (
      window.confirm(
        `Are you sure you want to delete the board "${boardName}"? Action is permanent! However, this will NOT delete the notes from the screen, only the board in the database.`
      )
    ) {
      await deleteUserBoard(props.currentUser.auth, boardName)
      dropMenu.style.display = 'none'
    }
  }

  function displayUpdate() {
    let bg = boardObj.backgroundColor
    document.querySelector('#note-color-pick').defaultValue = newNote.noteBColor
    document.querySelector('#bg-color-pick').defaultValue = bg.length > 7 ? '#1670d7' : bg
  }


  return (
    <div className='options-frame'>
          <div className='zoom-options'>
            <h3>Zoom</h3>
            <h4>Interface</h4>
            <button type='button'
            // onClick={() => this.zoomIntDir(false)}
            >
              -
            </button>
            <button type='button'
            // onClick={() => this.zoomIntDir(true)}
            >
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
              onChange={changeBoardName}
            />
            <button type='button'
            onClick={() => saveCurrentBoard()}
            >
              Save
            </button>
            <button
              type='button'
              className='new-button'
              //   onClick={() => this.newBoard()}
              >
              New Board
            </button>
            <button
              type='button'
              style={{ width: '135px' }}
              onClick={() => userBoardDropDown()}
            >
              Your Saved Boards
            </button>
            <div className='board-drop'></div>
          </div>

          <button
            className='place-btn'
            type='button'
            onClick={() => newNoteHandler(notes, newNote)}
            >
            Place on Board
          </button>
          <button
            className='options-btn mat'
            type='button'
            // onClick={() => this.newMatHandler()}
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
            className='color-elements'
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
            className='color-elements'
            id='note-color-pick'></input>
          <label className='switch'>
            <label htmlFor='check-toggle' className='check-label'>
              Check
            </label>
            <input id='check-toggle' type='checkbox' />
            <span className='slider round'></span>
          </label>
          {/* <button
          type='button'
          className='embed-btn'
          onClick={() => this.embedBrowser()}
          >Embed</button> */}
        </div>
  )
}

export default OptionsFrame

// END of document
