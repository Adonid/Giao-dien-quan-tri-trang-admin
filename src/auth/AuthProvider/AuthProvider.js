import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {FirebaseConnect} from 'firebaseConnect';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    console.log(FirebaseConnect);
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

export default AuthProvider;
