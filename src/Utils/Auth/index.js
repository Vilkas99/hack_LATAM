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

  let misiones_inicial = [
    {
      titulo: "Termodinámica FTW!",
      descripcion: "Esta es una descripción",
      recompensaTxt: "200 puntos extra",
      recompensa: 200,
      tipo: "puntos",
      color: "#42d469",
      nivel: 1.5,
      ID: "ASDADASDAS",
    },
    {
      titulo: "A por ellos sí señor",
      descripcion: "Esta es otra descripción",
      nivel: 5,
      recompensaTxt: "Item legendario",
      recompensa: {
        nombreItem: "Capa de la verdad",
        descripcionItem: "Una capa que dice unas cuantas mentiras",
      },
      tipo: "item",
      color: "#7842f5",
      ID: "ASDASDAS",
    },
    {
      titulo: "Jefe final",
      descripcion: "Esta es otra descripción",
      nivel: 2,
      recompensaTxt: "500 puntos extra",
      recompensa: 500,
      tipo: "puntos",
      color: "#42d469",
      ID: "ASDASDAS",
    },
    {
      titulo: "Destrucción del cálculo!",
      descripcion: "Esta es otra descripción",
      nivel: 2,
      recompensaTxt: "Espada de la justicia",
      recompensa: {
        nombreItem: "Espada de la justicia",
        descripcionItem: "Es una espada que mola mucho!",
      },
      tipo: "item",
      color: "#42d469",
      ID: "ASDASDAS",
    },
    {
      titulo: "A por las matemáticas",
      descripcion: "Esta es otra descripción",
      nivel: 2,
      recompensaTxt: "100 puntos extra",
      recompensa: 100,
      tipo: "puntos",
      color: "#42d469",
      ID: "ASDASDAS",
    },
  ];

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
          quest: misiones_inicial,
          completadas: 0,
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
