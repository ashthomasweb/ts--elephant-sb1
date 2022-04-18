import React, { createContext, useReducer } from 'react'
import { mainReducer } from './MainReducer'
import { initialArray } from '../../assets/initial-array.js'

// interface ContextState {
//   name: string | null
// }

type defaultStateType = {
  user: string,
  mouseOffset: any,
  newNote: {
    id: number
    left: string
    top: string
    width: string
    height: string
    noteText: string
    // zIndex: 0,
    // trayText: '',
    // isTrayDisplay: false,
    // trayWidth: '150px',
    // trayHeight: '200px',
    // border: 'none',
    // noteBColor: '#f2ecb3',
    // isMatBoard: false,
    // isNew: true,
    // noteGroup: [],
    // matOffsetX: 0,
    // matOffsetY: 0,
    // isChecked: false,
    // iframe: false
  }
  notes: any
}

const defaultState = {
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
    // zIndex: 0,
    // trayText: '',
    // isTrayDisplay: false,
    // trayWidth: '150px',
    // trayHeight: '200px',
    // border: 'none',
    // noteBColor: '#f2ecb3',
    // isMatBoard: false,
    // isNew: true,
    // noteGroup: [],
    // matOffsetX: 0,
    // matOffsetY: 0,
    // isChecked: false,
    // iframe: false
  },
  notes: initialArray,
}

export const MainContext = createContext<{
  state: defaultStateType
  dispatch: React.Dispatch<any>
}>({ state: defaultState, dispatch: () => null })

const MainState = (props: any) => {
  // const initialState = {
  //   user: 'Ash',
  //   mouseOffset: {
  //     left: 0,
  //     top: 0,
  //   },
  //   newNote: {
  //     id: 1,
  //     left: '',
  //     top: '',
  //     width: '120px',
  //     height: '200px',
  //     noteText: '',
  //     // zIndex: 0,
  //     // trayText: '',
  //     // isTrayDisplay: false,
  //     // trayWidth: '150px',
  //     // trayHeight: '200px',
  //     // border: 'none',
  //     // noteBColor: '#f2ecb3',
  //     // isMatBoard: false,
  //     // isNew: true,
  //     // noteGroup: [],
  //     // matOffsetX: 0,
  //     // matOffsetY: 0,
  //     // isChecked: false,
  //     // iframe: false
  //   },
  //   notes: initialArray
  // }

  const [state, dispatch] = useReducer(mainReducer, defaultState)
  let value = { state, dispatch }

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  )
}

export default MainState

// END of document