import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'auth/Auth';

const PrivateRoute = props => {
    const { layout: Layout, component: RouteComponent, ...rest } = props;
    const { currentUser } = useContext( AuthContext );

    return (
        <Route
        {...rest}
        render={routeProps => (
            !!currentUser
            ?
                <Layout>
                    <RouteComponent {...routeProps} />
                </Layout>
            :
                <Redirect to="/sign-in"/>
        )}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string
};

export default PrivateRoute;