import React, { Component } from 'react'
import { auth, createNewUserProfile, getUserRef, getUserBoards } from './firebase/firebase.utils'

import './App.css'
import MainBoard from './components/main-board/main-board.component'

type MyProps = {
  currentUser: null
}

type MyState = {
  [currentUser: string]: any
}

class App extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)
    this.state = {
      uiZoom: 1.1
    }
  }

  unsubscribeFromAuth: any = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        createNewUserProfile(userAuth, null)
        const userRef: any = await getUserRef(userAuth)
        userRef.onSnapshot((snapShot: any) => {
          this.setState(
            {
              currentUser: {
                auth: userAuth,
                id: snapShot.id,
                ...snapShot.data(),
              },
            }
          )
        })
      } else if (userAuth == null) {
        this.setState({ currentUser: userAuth })
      }
      getUserBoards(userAuth)
    })

    function setZoom() {
      let zoom = window.devicePixelRatio * 1.1
      let ui = ['.options-frame', '.header', '.pad-frame', '.trash-frame']
      ui.forEach((item: any) => {
        document.querySelector(item).style.zoom = `calc(100% / ${zoom})`
      })
      // document.querySelector('#backing').scrollTo(3460, 1211)
    }
    // partially handles bad clientX value on fast note clicking
    // window.addEventListener('dragover', (e) => e.preventDefault(), false)
    // window.addEventListener('dragend', (e) => e.preventDefault(), false)
    window.addEventListener('DOMContentLoaded', () => setZoom() )

    window.addEventListener('resize', () => {
      let ui = [
        '.options-frame',
        '.header',
        '.pad-frame',
        '.trash-frame',
      ]
      ui.forEach((item: any) => {
        document.querySelector(item).style.zoom = `calc(100% / ${
          this.state.uiZoom * window.devicePixelRatio
        })`
      })
    })

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <MainBoard currentUser={this.state?.currentUser}/>
      </div>
    )
  }
}

export default App

// END of document
