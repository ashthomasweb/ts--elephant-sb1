// user-options.component.jsx

// import { useContext } from 'react'
// import { MainContext } from '../../context/main/MainState'
import SignInUpModal from '../signinupmodal/signinupmodal.component'
import { auth } from '../../firebase/firebase.utils'
import logo from '../../assets/elephant-logo.png'
import './user-options.styles.scss'

type Props = {
  currentUser: any
}

const UserOptions = (props: Props): JSX.Element => {
  // const {
  //   state: { user },
  //   dispatch,
  // } = useContext(MainContext)

  const modalToggle = () => { // NEEDS DISPLAY REDUCER
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let el: any = document.querySelector('.sign-modal').style
    el.display === 'block' ? (el.display = 'none') : (el.display = 'block')
  }

  return (
    <div className='header'>
      <div className='user-options'>
        {props.currentUser ? (
          <div>
            <div className='welcome'>{props.currentUser.displayName}</div>
            <div className='logo-container'>
              <img src={logo} className='logo' alt='elephant-logo' />
              <button
                className='option'
                onClick={() => {
                  // clearBoards()
                  // this.props.reset()
                  auth.signOut()
                }}>
                SIGN OUT
              </button>
            </div>
          </div>
        ) : (
          <div>
            <img src={logo} className='logo' alt='elephant-logo' />
            <button
              type='button'
              className='sign-in-modal-btn'
              onClick={() => modalToggle()}>
              SIGN IN / UP
            </button>
          </div>
        )}
      </div>

      <div className='sign-modal'>
        <SignInUpModal />
      </div>
    </div>
  )
}

export default UserOptions

// END of document
