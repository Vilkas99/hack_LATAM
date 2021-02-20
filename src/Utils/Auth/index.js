import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import "@firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password, name, userType) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User created successfully");
        //insert to users collection here
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("Signed in");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  const value = { signUp, login, currentProfile, currentUser };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
