// main-board.component.tsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import Note from '../../components/note/note.component'
import UserInterface from '../user-interface/user-interface.component'
import { trashBoxDisplay, trashHandler } from '../../methods/trashHandlers'
import { indexFinder, zIndexDrag } from '../../methods/num-finders'

import '../main-board/main-board.styles.scss'
import { firstDragHandler } from '../../methods/new-note'
import Arrow from '../graphics/arrow/arrow.component'

type Props = {
  currentUser: any
}

const MainBoard = (props: Props): JSX.Element => {
  const {
    state: { mouseOffset, notes, boardObj, arrowArray },
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
    let note = notes[indexFinder(notes, noteId)]
    let isMat = note.isMatBoard
    let newLeft: number = getPosition('left', e.clientX)
    let newTop: number = getPosition('top', e.clientY)
    let noteData: { [key: string]: string | number } = {
      left: `${newLeft}px`,
      top: `${newTop}px`,
      zIndex: zIndexDrag(notes, isMat),
      isMat: isMat,
    }
    let associatedArrows = note.attachmentsGroup
    let newArrowArray = [...arrowArray]

    function pf(input: string) {
      return parseFloat(input)
    }

    function centerPointFinder() {
      let x
      let y
      x = pf(note.left) + (pf(note.width) / 2)
      y = pf(note.top) + (pf(note.height) / 2)
      return [x,y]
    }
    let [xCenter, yCenter] = centerPointFinder()

    newArrowArray.forEach(arrow => {
      if ( associatedArrows.includes(arrow.id)) {
        if (arrow.originNoteId === noteId) {
          arrow.originPos = {
            x: xCenter,
            y: yCenter
          }
        } else if (arrow.endNoteId === noteId) {
          arrow.endPos = {
            x: xCenter,
            y: yCenter
          }
        }
      }
    })

    e.clientX !== 0 && dispatch({ type: 'ONDRAG_NOTE_DATA', payload: {noteData: noteData, id: noteId} })
    dispatch({ type: 'SET_ALL_ARROWS', payload: { arrowArray: newArrowArray} })
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
