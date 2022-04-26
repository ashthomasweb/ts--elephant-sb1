import React, { createContext, useReducer } from 'react'
import { mainReducer } from './MainReducer'
import { initialArray } from '../../assets/initial-array'

interface initialStateType {
  user: string
  mouseOffset: any
  newNote: {
    id: number
    left: string
    top: string
    width: string
    height: string
    noteText: string
    noteBColor: string
    // zIndex: 0,
    // trayText: '',
    // isTrayDisplay: false,
    // trayWidth: '150px',
    // trayHeight: '200px',
    // border: 'none',
    // isMatBoard: false,
    // isNew: true,
    // noteGroup: [],
    // matOffsetX: 0,
    // matOffsetY: 0,
    // isChecked: false,
    // iframe: false
  }
  boardObj: any
  boardIsOpen: boolean
  notes: any
  display: any
}

const initialState = {
  user: 'Ash',
  mouseOffset: {
    left: 0,
    top: 0,
  },
  newNote: {
    id: 1,
    left: '',
    top: '',
    width: '120px',
    height: '200px',
    noteText: '',
    noteBColor: '#f2ecb3',
    // zIndex: 0,
    // trayText: '',
    // isTrayDisplay: false,
    // trayWidth: '150px',
    // trayHeight: '200px',
    // border: 'none',
    // isMatBoard: false,
    // isNew: true,
    // noteGroup: [],
    // matOffsetX: 0,
    // matOffsetY: 0,
    // isChecked: false,
    // iframe: false
  },
  boardObj: {
    name: '',
    notes: [],
    backgroundColor: '#1670d7',
  },
  boardIsOpen: false,
  notes: initialArray,
  display: {
    bgColor: '#1670d7'
  }
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
