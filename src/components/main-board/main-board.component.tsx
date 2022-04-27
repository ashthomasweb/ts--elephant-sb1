// main-board.component.tsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import Note from '../../components/note/note.component'
import UserInterface from '../user-interface/user-interface.component'
import { trashBoxDisplay, trashHandler } from '../../methods/trashHandlers'

import '../main-board/main-board.styles.scss'

type Props = {
  currentUser: any
}

const MainBoard = (props: Props): JSX.Element => {
  const {
    state: { mouseOffset, notes, boardObj },
    dispatch,
  } = useContext(MainContext)

  const getMousePos = (e: any): void => {
    const rect: any = e.target.getBoundingClientRect()
    const mouseOffset: object = {
      left: e.pageX - rect.left,
      top: e.pageY - rect.top,
    }
    dispatch({ type: 'SET_MOUSE_OFFSET', payload: mouseOffset })
  }

  const getPosition = (
    parent: any,
    position: string,
    mouse: number
  ): number => {
    return mouse - parent[position] - mouseOffset[position]
  }

  const dragNote = (e: any): void => {
    const parent: object = e.currentTarget.parentElement.getBoundingClientRect()
    let newLeft: number = getPosition(parent, 'left', e.pageX)
    let newTop: number = getPosition(parent, 'top', e.pageY)
    let notePosition: { [key: string]: string } = {
      left: `${newLeft}px`,
      top: `${newTop}px`,
      id: e.target.id,
    }
    dispatch({ type: 'SET_NOTE_POSITION', payload: notePosition })
    trashBoxDisplay(e)
  }

  const onDrop = async (e: any) => {
    let newNotes: any[] = await trashHandler(e, [...notes], dispatch)
    dispatch({ type: 'SET_ALL_NOTES', payload: newNotes})
  }

  return (
    <div className='board'>
      {/* Interface Components */}
      <UserInterface currentUser={props.currentUser} />
      {/* background and notes */}
      <div 
      className='board__backing' 
      style={{backgroundColor: boardObj.backgroundColor}}
      onDrop={onDrop}
      >
        {notes.map(({ id, ...noteProps }: { id: number; noteProps: [] }) => (
          <Note
            id={id}
            key={id}
            dragNote={dragNote}
            getMousePos={getMousePos}
            noteData={noteProps}
          />
        ))}
      </div>
    </div>
  )
}

export default MainBoard

// END of document
