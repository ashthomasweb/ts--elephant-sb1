// trash-frame.component.tsx

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import trashTop from '../../assets/trash-top.png'
import trashBottom from '../../assets/trash-bottom.png'
import '../trash-frame/trash-frame.styles.scss'

const TrashFrame = () : JSX.Element => {
  const { state: { display }
  } = useContext(MainContext)

  return (
    <div 
      className='trash-frame'
      style={{
        zoom: `calc(100% / ${window.devicePixelRatio * display.uiZoom})`
      }}
      >
      <div className='trash-cont'>
        <img src={trashTop} className='trash-top' alt='Lid of recycle can' />
        <img
          src={trashBottom}
          className='trash-bottom'
          alt='Body of recycle can'
        />
      </div>
    </div>
  )
}

export default TrashFrame

// END of document
