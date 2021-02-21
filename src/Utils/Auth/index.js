import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password, name, userType) {
    const id = uuidv4();
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = {
          email: email,
          level: 0,
          name: name,
          points: 0,
          quest: [],
          type: (userType = "100001") ? "TEACHER" : "STUDENT",
        };
        console.log(user);
        const res = db.collection("users").doc(id).set(user);
        console.log(`User ${id} created successfully`);
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
      console.log(user);
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
