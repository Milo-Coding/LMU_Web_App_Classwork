import { useState, useEffect } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
// If I had more time: figure out whats causing: [!] Cross-Origin-Opener-Policy policy would block the window.closed call

export function SignIn() {
  return <button className='buttons' onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>Sign In</button>
}

export function SignOut() {
  return (
    <div>
      Hello, {auth.currentUser.displayName} &nbsp;
      <button className='buttons' onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  )
}

export function useAuthentication() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null)
    })
  }, [])
  return user
}
