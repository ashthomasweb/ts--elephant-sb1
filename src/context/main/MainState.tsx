import React, { createContext, useReducer } from 'react'
import { mainReducer } from './MainReducer'
import { initialArray, initialArrowArray } from '../../assets/initial-array'

interface initialStateType {
  user: string
  mouseOffset: any
  updateActive: boolean
  newNote: {
    id: number
    left: string
    top: string
    width: string
    height: string
    noteText: string
    noteBColor: string
    border: string
    isUpdate: boolean
    zIndex: number
    isChecked: boolean
    trayText: string
    isTrayDisplay: boolean
    trayWidth: string
    trayHeight: string
    isMatBoard: boolean
    isNew: boolean
    isFirstDrag: boolean
    noteGroup: any[]
    attachmentsGroup: any[]
    matOffsetX: number
    matOffsetY: number
    // iframe: false
  }
  newArrow: {
    id: number
    originNoteId: number | undefined
    originPos: {x: number, y: number}
    endNoteId: number | undefined
    endPos: {x: number, y: number}
  }
  tempArrow: {
    id: number
    originNoteId: number | undefined
    originPos: {x: number, y: number}
    endNoteId: number | undefined
    endPos: {x: number, y: number}
  }
  boardObj: any
  menuIsOpen: boolean
  drawModeActive: boolean
  notes: any[]
  arrowArray: any[]
  display: any
  dragMouseDown: boolean
}

const initialState = {
  user: 'Ash',
  mouseOffset: {
    left: 0,
    top: 0,
  },
  updateActive: false,
  newNote: {
    id: 1,
    left: '',
    top: '',
    width: '140px',
    height: '104px',
    noteText: '',
    noteBColor: '#f2ecb3',
    border: 'none',
    isUpdate: false,
    zIndex: 0,
    isChecked: false,
    trayText: '',
    isTrayDisplay: false,
    trayWidth: '150px',
    trayHeight: '200px',
    isMatBoard: false,
    isNew: true,
    isFirstDrag: true,
    noteGroup: [],
    attachmentsGroup: [],
    matOffsetX: 0,
    matOffsetY: 0,
    // iframe: false
  },
  newArrow: {
    id: 0,
    originNoteId: undefined,
    originPos: {x: 0, y: 0},
    endNoteId: undefined,
    endPos: {x: 0, y: 0}
  },
  tempArrow: {
    id: 0,
    originNoteId: undefined,
    originPos: {x: 0, y: 0},
    endNoteId: undefined,
    endPos: {x: 0, y: 0}
  },
  boardObj: {
    name: '',
    notes: [],
    arrowArray: [],
    backgroundColor: '#1670d7',
  },
  menuIsOpen: false,
  drawModeActive: false,
  notes: initialArray,
  arrowArray: initialArrowArray,
  display: {
    uiZoom: 1.1,
  },
  dragMouseDown: false
}

export const MainContext = createContext< {state: initialStateType, dispatch: React.Dispatch<any>} >({ state: initialState, dispatch: () => null })

const MainState = (props: any) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  const value = { state, dispatch }

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  )
}

export default MainState

// END of document
