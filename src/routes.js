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

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Layout {...props}>
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
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <UserProvider>
                    <MenuProvider>
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/forgot-password" component={ResetPassword} />
                        {/* <RouteWrapper path="/consulta/" component={Consulta} /> */}
                        <PrivateRoute path="/profile" component={Profile} layout={Layout} />
                        <PrivateRoute exact path="/" component={Home} layout={Layout} />
                    </MenuProvider>
                </UserProvider>
            </Switch>
        </BrowserRouter>
    );
}
