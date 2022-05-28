import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import SignIn from "./pages/signIn";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import Profile from "./pages/profile";
import Layout from "./components/Layout";
import { UserProvider } from "./contexts/userContext";
import { MenuProvider } from "./contexts/menuContext";
import ResetPassword from "./pages/resetPassword";
import { HashRouter } from "react-router-dom";

const PrivateRoute = ({ component: Component, layout: Layout, showMenu: showMenu, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Layout showMenu={showMenu} {...props}>
                    <Component {...props} />
                </Layout>
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);


export default function Routes() {
    return (
        <HashRouter>
            <Switch>
                <UserProvider>
                    <MenuProvider>
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/forgot-password" component={ResetPassword} />
                        {/* <RouteWrapper path="/consulta/" component={Consulta} /> */}
                        <PrivateRoute path="/profile" component={Profile} layout={Layout} showMenu={false} />
                        <PrivateRoute exact path="/" component={Home} layout={Layout} showMenu={true} />
                    </MenuProvider>
                </UserProvider>
            </Switch>
        </HashRouter>
    );
}
