import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";


const GlobalContext = React.createContext();

export function useGlobal() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {  
  const [currentMicrophone, setMicrophone] = useState();
  const [currentVideo, setVideo] = useState();  
  

  function changeMicro () {         
    setMicrophone(!currentMicrophone);
    return currentMicrophone;
    
  }

  function changeVideo () {         
    setVideo(!currentVideo);
    return currentVideo;
    
  }


  const value = {changeMicro, currentMicrophone, changeVideo, currentVideo  };
  return (
    <GlobalContext.Provider value={value}>      
      {children}
    </GlobalContext.Provider>
  );
}