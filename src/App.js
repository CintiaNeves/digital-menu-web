import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import Products from './components/products'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr9t-ITNBysqEN7RqEMjLgHBeQmhUv1P4",
  authDomain: "digital-menu-14dae.firebaseapp.com",
  projectId: "digital-menu-14dae",
  storageBucket: "digital-menu-14dae.appspot.com",
  messagingSenderId: "374169097736",
  appId: "1:374169097736:web:241905900b05f88b78a3bd",
  measurementId: "G-14CVQDLYVQ"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

function App() {
  
  const [user] = useAuthState(auth)
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
        {user ? <SignOut /> : <SignIn />}
        {<Products />}
        
      </section>
    </div>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sign In</button>
  )
}

export default App;
