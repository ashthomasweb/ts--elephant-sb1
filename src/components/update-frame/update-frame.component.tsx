// update-frame.component.tsx

// import { useContext } from 'react'
// import { MainContext } from '../../context/main/MainState'

import '../update-frame/update-frame.styles.scss'

const TrashFrame = (): JSX.Element => {
  // const {
  //   state: { mouseOffset, notePosition },
  //   dispatch,
  // } = useContext(MainContext)

  return (
    <div className='update-frame'>
      <button
        className='update-btn'
        type='button'
        // onClick={this.updateNoteHandler}
      >
        Update
      </button>
      <button
        className='update-btn'
        type='button'
        // onClick={() => this.cancelUpdateMode(true)}
      >
        Cancel Update
      </button>
    </div>
  )
}

export default TrashFrame

// END of document
