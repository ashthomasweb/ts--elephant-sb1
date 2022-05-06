// main-board.component.tsx

import { useContext, useEffect, useRef, useState } from 'react'
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
    state: { mouseOffset, notes, boardObj, drawModeActive },
    dispatch,
  } = useContext(MainContext)

  const canvasRef: any = useRef(null)
  const contextRef: any = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  

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

  useEffect(() => {
    const canvas: any = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const context = canvas.getContext('2d')
    context.scale(2,2)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context
  }, [])

  const startDrawing = ({nativeEvent}: any) => {
    console.log('hi')
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}: any) => {
    if (!isDrawing) return
    const {offsetX, offsetY}= nativeEvent
    contextRef.current.lineTo(offsetX,offsetY)
    contextRef.current.stroke()
  }

  return (
      <div
        id='backing'
        className='board-backing'
        style={{ backgroundColor: boardObj.backgroundColor }}
        onDrop={onDrop}
      >

        <UserInterface currentUser={props.currentUser} />
        <canvas
          className='canvas'
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
        />

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
