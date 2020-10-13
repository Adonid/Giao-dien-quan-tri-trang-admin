import React, { useEffect, useState } from "react";
import base from "base.js";
import Axios from "axios";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  
  useEffect( async () => {
    const user = await Axios({
      method: 'GET',
      baseURL: 'https://us-central1-nodejs-firebase-cloud-func.cloudfunctions.net/api/',
      url: '/check',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'authorization': `Bearer ${readCookie()}`},
    }).then( res => {
        console.log(res);
        setCurrentUser(true);
        setPending(false);
    }).catch( e => {
        console.log(e);
        setCurrentUser(false);
        setPending(false);
    });
    // Thuc ra la kiem tra token trong cookie xem co hop le hay khong
  }, []);

    const readCookie = () =>
    {
        var allcookies = window.document.cookie;

        // Get all the cookies pairs in an array
        var cookiearray = allcookies.split(';');

        // Now take key value pair out of this array
        for(var i=0; i<cookiearray.length; i++){
          let name = cookiearray[i].split('=')[0];
          let value = cookiearray[i].split('=')[1];
          if(name==="__Sucure_user" && value)
            return value;
          else
            return null;
        }
    }

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