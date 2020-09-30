import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {FirebaseConnect} from 'firebaseConnect';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    
    const [ currentUser, setCurrentUser ] = useState(null);

    useEffect( () => {
        FirebaseConnect.auth().onAuthStateChanged( setCurrentUser );
    },[]);

    return (
        <AuthContext.Provider
            value={{currentUser}}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object
};