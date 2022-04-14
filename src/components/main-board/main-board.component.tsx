// main-board.component.tsx

import { useContext } from "react";
import { MainContext } from '../../context/main/MainState'
import Note from '../../components/note/note.component'
import UserInterface from '../user-interface/user-interface.component'
import '../main-board/main-board.styles.scss'

type Props = {
  currentUser: any
}

type State = {
  mouseOffset: {},
  notePosition: {},
  notes: []
}



const MainBoard = (props: Props): JSX.Element => {

  const { state: { mouseOffset, notePosition, notes }, dispatch } = useContext(MainContext)

  const getPosition = (parent: any, position: string, mouse: number) : number => {
    let newPos: number = mouse - parent[position] - mouseOffset[position];
    return newPos;
  }

  const dragNote = (e: any) : void => {
    console.log(e.target.id)
    const parent: object = e.currentTarget.parentElement.getBoundingClientRect();
    let newLeft: number = getPosition(parent, "left", e.pageX);
    let newTop: number = getPosition(parent, "top", e.pageY);
    let notePosition: {[key: string]: string} = { left: `${newLeft}px`, top: `${newTop}px`, id: e.target.id}
    dispatch({ type: 'SET_NOTE_POSITION', payload: notePosition})
  }

  const getMousePos = (e: any) : void => {
    const rect: any = e.target.getBoundingClientRect();
    const mouseOffset: object = {left: e.pageX - rect.left, top: e.pageY - rect.top}
    dispatch({ type: 'SET_MOUSE_OFFSET', payload: mouseOffset })
  }

  return (
    <div className="board">
      {/* Interface Components */}
      <UserInterface currentUser={props.currentUser}/>
      {/* Board and notes */}
      <div className="board__backing">
      {notes.map(({ id, ...noteProps }: {id: number; noteProps: []}) => (

        <Note
        id={id}
        notePosition={notePosition}
        dragNote={dragNote}
        getMousePos={getMousePos}
        props={noteProps}
        />
      ))}
      </div>
    </div>
  )
}

export default MainBoard

// END of document

