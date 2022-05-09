// firebase.utils.ts

// requires firebase 9.2 or earlier
// requires class component, in this case, the App.tsx
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

let config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}
export var userBoards: any[] = []

// returns reference object for user login
export const getUserRef = async (userAuth: any) => {
  if (!userAuth) return
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  return userRef
}

export const createNewUserProfile = async (userAuth: any, additionalData: any) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error: any) {
      console.log('error creating user', error.message)
    }
  }
}

export const saveUserBoard = async (userAuth: any, boardObj: {[key: string]: any}) => {
  if (boardObj.name === '') return

  const boardRef = firestore.doc(
    `users/${userAuth.uid}/boards/${boardObj.name}`
  )

  const snapShot = await boardRef.get()

  if (!snapShot.exists) {
    const { name, notes, arrowArray, backgroundColor } = boardObj
    try {
      await boardRef.set({
        name,
        notes,
        arrowArray,
        backgroundColor
      })
    } catch (error: any) {
      console.log('error creating board', error.message)
    }
  } else if (snapShot.exists) {
    const { notes, arrowArray, backgroundColor } = boardObj
    try {
      await boardRef.update({
        notes,
        arrowArray,
        backgroundColor
      })
    } catch (error: any) {
      console.log('error creating board', error.message)
    }
  }

  getUserBoards(userAuth)
}

export const deleteUserBoard = async (userAuth: any, boardName: string) => {
  const boardRef = firestore.doc(
    `users/${userAuth.uid}/boards/${boardName}`
  )

  const snapShot = await boardRef.get()
 
  if (snapShot.exists) {
    try {
      await boardRef.delete()
    } catch (error: any) {
      console.log('error deleting board', error.message)
    }
  }

  getUserBoards(userAuth)
}

export const getUserBoards = (userAuth: any) => {
  if (!userAuth) return
  userBoards = []
  firestore
    .collection('users')
    .doc(`${userAuth.uid}`)
    .collection('boards')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userBoards.push(doc.data())
      })
    })
}

export const clearBoards = () => {
  userBoards = []
}

firebase.initializeApp(config)
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

// END of document
