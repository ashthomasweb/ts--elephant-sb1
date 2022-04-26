// pad-frame.component.tsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import '../pad-frame/pad-frame.styles.scss'

const PadFrame = (): JSX.Element => {
  const { state: { newNote },
    dispatch,
  } = useContext(MainContext)

  // controlled input elements
  function changeInput(e: any) {
    dispatch({ type: 'ONCHANGE_TEXT', payload: e.target.textContent })
  }

  return (
    <div
      className='pad-frame'
      style={{ backgroundColor: newNote.noteBColor }}>
      <div id='input-text' contentEditable='true' onInput={(e) => changeInput(e)}></div>
    </div>
  )
}

export default PadFrame

// END of document
