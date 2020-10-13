import React, { useEffect, useState } from "react";
import base from "base.js";
import { connect } from "react-redux";
import PropTypes from 'prop-types';


export const AuthContext = React.createContext();

export const AuthProvider = ({ children, __Sucure_user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [sucure, setSucure] = useState(null);
  useEffect(() => {
    console.log(__Sucure_user);
    base.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
    // Thuc ra la kiem tra token trong cookie xem co hop le hay khong
  }, [__Sucure_user]);
  

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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  __Sucure_user: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    __Sucure_user: state.dataAlertMiniPage.sigIn.token
  }
}

export default connect(mapStateToProps, null)(AuthProvider)