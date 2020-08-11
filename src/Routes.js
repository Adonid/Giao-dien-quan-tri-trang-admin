import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  UserDetail as UserDetailView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  ForeverPassword as ForeverPasswordView,
  ResetPassword as ResetPasswordView,
  ResetPasswordSuccess as ResetPasswordSuccessView,
  CreateAccountSuccess as CreateAccountSuccessView,
  NotFound as NotFoundView

} from './views'; 

// import { Snackbars } from './alerts';
// import { BackDrop, Skeletons } from 'elements';

const Routes = () => {
  return (
    // <>
    // {/* //   <Snackbars content='This is a success message number 1!' type='info'/> */}
    // {/* //   <BackDrop open={true}/> */}
    // {/* //   <Skeletons qtys={8} /> */}
    // </>
    
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={UserDetailView}
        exact
        layout={MainLayout}
        path="/users-detail"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={ForeverPasswordView}
        exact
        layout={MinimalLayout}
        path="/forever-password"
      />
      <RouteWithLayout
        component={ResetPasswordView}
        exact
        layout={MinimalLayout}
        path="/reset-password"
      />
      <RouteWithLayout
        component={ResetPasswordSuccessView}
        exact
        layout={MinimalLayout}
        path="/reset-password-success"
      />
      <RouteWithLayout
        component={CreateAccountSuccessView}
        exact
        layout={MinimalLayout}
        path="/create-account-success"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>

  );
};

export default Routes;
