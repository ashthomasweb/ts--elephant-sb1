// trash-frame.component.tsx

// import { useContext } from 'react'
// import { MainContext } from '../../context/main/MainState'
import trashTop from '../../assets/trash-top.png'
import trashBottom from '../../assets/trash-bottom.png'
import '../trash-frame/trash-frame.styles.scss'

const TrashFrame = () : JSX.Element => {
  // const {
  //   dispatch,
  // } = useContext(MainContext)

  function trashHover() {
    console.log('hidave')
    
  }

  return (
    <div className='trash-frame'
      onMouseOver={trashHover}>
      <div className='trash-cont'>
        <img src={trashTop} className='trash-top' alt='Lid of recycle can' />
        <img
          src={trashBottom}
          className='trash-bottom'
          alt='Body of recycle can'
        />
      </div>

      {/* <button
            type='button'
            style={{
              position: 'absolute',
              height: '30px',
              top: '0',
              left: '0',
              zIndex: '9999999999',
            }}
            onClick={() => {
              console.log(this.state.notes)
              // this.coordFinder()
            }}
            >
            Board Notes
          </button> */}
    </div>
  )
}

export default TrashFrame

// END of document
