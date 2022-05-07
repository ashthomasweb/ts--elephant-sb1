// main-board.component.tsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import Note from '../../components/note/note.component'
import UserInterface from '../user-interface/user-interface.component'
import { trashBoxDisplay, trashHandler } from '../../methods/trashHandlers'
import { indexFinder, zIndexDrag } from '../../methods/num-finders'

import '../main-board/main-board.styles.scss'
import { firstDragHandler } from '../../methods/new-note'

type Props = {
  currentUser: any
}

const MainBoard = (props: Props): JSX.Element => {
  const {
    state: { mouseOffset, notes, boardObj },
    dispatch,
  } = useContext(MainContext)

  const getMousePos = (e: any): void => {
    const mouseOffset: object = {
      left: e.clientX - parseFloat(getComputedStyle(e.target.parentNode).left),
      top: e.clientY - parseFloat(getComputedStyle(e.target.parentNode).top),
    }
    dispatch({ type: 'SET_NOTE_MOUSE_OFFSET', payload: {mouseOffset: mouseOffset} })
  }

  const getPosition = (position: string, mousePos: number): number => {
    return mousePos - mouseOffset[position]
  }

  const dragNote = (e: any): void => {
    let noteId = e.target.parentElement.id
    let isMat = notes[indexFinder(notes, noteId)].isMatBoard
    let newLeft: number = getPosition('left', e.clientX)
    let newTop: number = getPosition('top', e.clientY)
    let noteData: { [key: string]: string | number } = {
      left: `${newLeft}px`,
      top: `${newTop}px`,
      zIndex: zIndexDrag(notes, isMat),
      isMat: isMat,
    }
    e.clientX !== 0 && dispatch({ type: 'ONDRAG_NOTE_DATA', payload: {noteData: noteData, id: noteId} })
    trashBoxDisplay(e)
  }
  
  const onDrop = async (e: any) => {
    let newNotes: any[]
    newNotes = await firstDragHandler(notes)
    newNotes = await trashHandler(e, [...newNotes], dispatch)
    dispatch({ type: 'SET_ALL_NOTES', payload: {notes: newNotes} })
  }

  return (
      <div
        id='backing'
        className='board-backing'
        style={{ backgroundColor: boardObj.backgroundColor }}
        onDrop={onDrop}
      >

        <UserInterface currentUser={props.currentUser} />

        <svg 
          width="10000px"
          height="8000px"
          // viewBox="-1000 -1000 14000 11000"
          style={{backgroundColor: '#ffffff00', pointerEvents: 'none'}}
        >
          <line x1='625px' y1='880px' x2='225px' y2='280px' stroke='blue' strokeWidth='40' />
          <line style={{pointerEvents: 'all'}} onClick={() => console.log('hidave')} x1='225px' y1='480px' x2='5325px' y2='5380px' stroke='red' strokeWidth='40' />

        </svg>

        {notes.map(({ id, ...noteProps }: { id: number; noteProps: any[] }) => (
          <Note
            id={id}
            key={id}
            dragNote={dragNote}
            getMousePos={getMousePos}
            noteData={noteProps}
            autofocus='true'
          />
        ))}

      </div>
  )
}

export default MainBoard

// END of document
