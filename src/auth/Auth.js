import React, { useEffect, useState } from "react";
import base from "base.js";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  useEffect( async () => {
    const user = await base.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
    // Thuc ra la kiem tra token trong cookie xem co hop le hay khong
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};