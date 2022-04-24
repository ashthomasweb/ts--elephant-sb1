// board-menu.component.tsx

import { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import { dropHelper } from '../../methods/drop-helper'
import { deleteUserBoard, userBoards } from '../../firebase/firebase.utils'
import '../board-menu/board-menu.styles.scss'

type PropsType = {
    currentUser: any
}

const BoardMenu = (props: PropsType): JSX.Element => {
  const { state: {boardObj, newNote, boardIsOpen}, // needs to get input from board save
    dispatch,
  } = useContext(MainContext)

  const boardDropMenu = useRef(null)

  useEffect(() => {
      function buildMenu() {
          putBoardsToList()
      }
      userBoards.length > 0 && buildMenu()
  })
  
  function putBoardsToList() {
    let parentMenuCont: any = boardDropMenu.current
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
    let input: any = boardInput.current

    xButton.addEventListener('click', () =>
      deleteBoardHandler(boardObj.name)
    )
    button.addEventListener('click', async () => {
      let notes: any[] = []
      await dispatch({ type: 'SET_ALL_NOTES', payload: notes })
      notes = [...boardObj.notes]
      boardObj.backgroundColor ?? (boardObj.backgroundColor = '#1670d7')
      await dispatch({ type: 'SET_ALL_NOTES', payload: notes })
      await dispatch({ type: 'SET_BOARDOBJ', payload: boardObj })
      displayUpdate()
      input.value = boardObj.name // should be controlled input
      dispatch({ type: 'TOG_BOARD_MENU', payload: boardIsOpen})
    })
  }

  function displayUpdate() { // refs and display reducer
    let bg = boardObj.backgroundColor
    document.querySelector('#note-color-pick').defaultValue = newNote.noteBColor
    document.querySelector('#bg-color-pick').defaultValue = bg.length > 7 ? '#1670d7' : bg
  }

  // confirmation request, then firestore method
  async function deleteBoardHandler(boardName: string) {
    if (
      window.confirm(
        `Are you sure you want to delete the board "${boardName}"? Action is permanent! However, this will NOT delete the notes from the screen, only the board in the database.`
      )
    ) {
      await deleteUserBoard(props.currentUser.auth, boardName)
      dispatch({ type: 'TOG_BOARD_MENU', payload: boardIsOpen})
    }
  }

  return (
    <div className='board-drop' style={ boardIsOpen ? ( {display: 'block'} ) : ( { display: 'none' }) } ref={boardDropMenu}></div>
  )
}

export default BoardMenu

// END of document
