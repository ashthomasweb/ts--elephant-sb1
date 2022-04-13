import { createContext, useReducer } from 'react'
import { mainReducer } from './MainReducer'

export const MainContext = createContext()

const MainState = (props) => {
  const initialState = {
    user: 'Ash',
    currentUser: null,
    mouseOffset: {
      left: 0,
      top: 0,
    },
    notePosition: {
      left: 0,
      top: 0
    }
  }

  const [state, dispatch] = useReducer(mainReducer, initialState)
  let value = { state, dispatch }

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  )
}

export default MainState

// END of document
