import React, { useContext, useState, useEffect } from "react"
import {auth ,createUserDocument ,getDocumentByUid} from "../Hooks/firebase"
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData,setUSerData] =useState();
  const [loading, setLoading] = useState(true)


  async function signup(email, password ,username='dasniel' ,isAdmin=true) {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocument(user, { username ,isAdmin});
      return true;
    } catch (error) {
      
      console.log('error', error);
      return false;
    }

  }

   async function login(email, password) {

      try {
        const user = await auth.signInWithEmailAndPassword(
          email,
          password
        );
        const uid = user.user.uid;
        let userDoc;
        if(uid){
          userDoc = await getDocumentByUid(uid);
          setUSerData(userDoc);
        }
        return true;
      } catch (error) {
        console.log('error', error);
        return false;
      }
  }

  function logout() {
    setUSerData(null);
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  useEffect(  () => {
    if(currentUser){
      const setUser = async ()=>{
        const uid = currentUser.uid;
        if(uid){
          let userDoc = await getDocumentByUid(uid);
          setUSerData(userDoc);
        }
      }
      setUser();
    }
  }, [currentUser])
  


  const value = {
    currentUser,
    login,
    signup,
    logout,
    userData,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      { children}
    </AuthContext.Provider>
  )
}