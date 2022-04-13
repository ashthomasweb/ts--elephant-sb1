// user-interface.component.tsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import '../pad-frame/pad-frame.styles.scss'

const PadFrame = (): JSX.Element => {
  const {
    state: { mouseOffset, notePosition },
    dispatch,
  } = useContext(MainContext)

  return (
    <div
      className='pad-frame'
      //   style={{ backgroundColor: this.state.newNote.noteBColor }}
      style={{ backgroundColor: 'lightblue' }}>
      <div id='input-text' contentEditable='true'></div>
    </div>
  )
}

export default PadFrame

// END of document
