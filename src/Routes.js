import PrivateRoute from 'auth/PrivateRoute';
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  UserDetail as UserDetailView,
  UserEditor as UserEditorView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  ForeverPassword as ForeverPasswordView,
  ResetPassword as ResetPasswordView,
  NotFound as NotFoundView,
  Chats as ChatsView,
  AddNewProduct as AddNewProductView,
  ViewProduct as ViewProductView,
  EditProduct as EditProductView,
  CategorysTags as CategorysTagsView,
  Term as TermView,

} from './views'; 

const Routes = () => {
  return (    
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <PrivateRoute
        component={UserDetailView}
        exact
        layout={MainLayout}
        path="/user-detail"
      />
      <PrivateRoute
        component={UserEditorView}
        exact
        layout={MainLayout}
        path="/user-editor"
      />
      <PrivateRoute
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <PrivateRoute
        component={ViewProductView}
        exact
        layout={MainLayout}
        path="/product-detail"
      />
      <PrivateRoute
        component={EditProductView}
        exact
        layout={MainLayout}
        path="/product-edit"
      />
      <PrivateRoute
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <PrivateRoute
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PrivateRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <PrivateRoute
        component={ChatsView}
        exact
        layout={MainLayout}
        path="/chats-room"
      />
      <PrivateRoute
        component={AddNewProductView}
        exact
        layout={MainLayout}
        path="/add-new-product"
      />
      <PrivateRoute
        component={CategorysTagsView}
        exact
        layout={MainLayout}
        path="/category-tag"
      />
      <PrivateRoute
        component={TermView}
        exact
        layout={MainLayout}
        path="/terms-used"
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
