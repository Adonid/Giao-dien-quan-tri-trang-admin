import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = props => {
    const { layout: Layout, component: RouteComponent, enable, ...rest } = props;

    return (
        <Route
        {...rest}
        render={routeProps => (
            !!enable
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
    path: PropTypes.string,
    enable: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
      enable: state.dataLogin.enable
    }
  }

export default connect(mapStateToProps, null)(PrivateRoute);