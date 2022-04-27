// pad-frame.component.tsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import '../pad-frame/pad-frame.styles.scss'

const PadFrame = (): JSX.Element => {
  const { state: { newNote, display },
    dispatch,
  } = useContext(MainContext)

  // controlled input elements
  function changeInput(e: any) {
    dispatch({ type: 'ONCHANGE_TEXT', payload: e.target.innerText })
  }

  return (
    <div
      className='pad-frame'
      style={{ backgroundColor: newNote.noteBColor, zoom: `calc(100% / ${window.devicePixelRatio * display.uiZoom})` }}>
      <div id='input-text' contentEditable='true' onInput={(e) => changeInput(e)} />
    </div>
  )
}

export default PadFrame

// END of document
