// main-board.component.tsx

import { useContext, useEffect } from 'react'
import { MainContext } from '../../context/main/MainState'
import Note from '../../components/note/note.component'
import UserInterface from '../user-interface/user-interface.component'
import { trashHandler } from '../../methods/trashHandlers'
import { firstDragHandler } from '../../methods/new-note'
import Arrow from '../graphics/arrow/arrow.component'

import '../main-board/main-board.styles.scss'
type Props = {
  currentUser: any
}

const MainBoard = (props: Props): JSX.Element => {
  const {
    state: { notes, isFireFox, boardObj, arrowArray },
    dispatch,
  } = useContext(MainContext)
  
  const onDrop = async (e: any) => {
    e.preventDefault()
    let newNotes: any[]
    newNotes = await firstDragHandler(notes)
    newNotes = await trashHandler(e, [...newNotes], dispatch)
    dispatch({ type: 'SET_ALL_NOTES', payload: {notes: newNotes} })
  }

  useEffect(() => {
    if (navigator.userAgent.includes('Gecko/')) {
      dispatch({ type: 'CHECK_FIREFOX', payload: { isFireFox: true }})
    } else {
      dispatch({ type: 'CHECK_FIREFOX', payload: { isFireFox: false }})
    }
  }, [dispatch, isFireFox])

  return (
      <div
        id='backing'
        className='board-backing'
        style={{ backgroundColor: boardObj.backgroundColor }}
        onDrop={onDrop}
      >

        <UserInterface currentUser={props.currentUser} />
        <button type="button" style={{position: 'fixed', top: '450px', left: '20px', zIndex: '1000000000'}} onClick={() => console.log(notes)}>Log Notes</button>

        {notes.map(({ id, ...noteProps }: { id: number; noteProps: any[] }) => (
          <Note
            id={id}
            key={id}
            noteData={noteProps}
            autofocus='true'
          />
        ))}

        <svg
          width="10000px"
          height="8000px"
          style={{backgroundColor: '#ffffff00', pointerEvents: 'none', position: 'absolute', zIndex: '-2147483647'}}
        >
          {arrowArray.map(({id, ...arrowProps}) => (
            <Arrow
              id={id}
              key={id}
              arrowData={arrowProps} />
          ))}
        </svg>
      </div>
  )
}

export default MainBoard

// END of document
