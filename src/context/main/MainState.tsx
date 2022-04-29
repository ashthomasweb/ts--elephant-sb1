import React, { createContext, useReducer } from 'react'
import { mainReducer } from './MainReducer'
import { initialArray } from '../../assets/initial-array'

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
    // trayText: '',
    // isTrayDisplay: false,
    // trayWidth: '150px',
    // trayHeight: '200px',
    // isMatBoard: false,
    // isNew: true,
    // noteGroup: [],
    // matOffsetX: 0,
    // matOffsetY: 0,
    // iframe: false
  }
  boardObj: any
  menuIsOpen: boolean
  notes: any
  display: any
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
    // trayText: '',
    // isTrayDisplay: false,
    // trayWidth: '150px',
    // trayHeight: '200px',
    // isMatBoard: false,
    // isNew: true,
    // noteGroup: [],
    // matOffsetX: 0,
    // matOffsetY: 0,
    // iframe: false
  },
  boardObj: {
    name: '',
    notes: [],
    backgroundColor: '#1670d7',
  },
  menuIsOpen: false,
  notes: initialArray,
  display: {
    uiZoom: 1.1,
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
