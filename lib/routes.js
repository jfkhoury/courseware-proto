import React from "react";
import Router from "react-router";
import { DashboardVC } from "@app/Dashboard";
import { SignInVC } from "@app/sign-in";
import { App } from "spak"

var { Route, DefaultRoute, NotFoundRoute, RouteHandler } = Router;

// TODO Remove into separate AppShell module, or use @yuzu/ui.
var AppLoader = () => <h2>App is loading...</h2>;

class DefaultView extends React.Component {
    static willTransitionTo(transition) {
        if (App.session().isAuthenticated) {
            transition.redirect("dashboard");
        } else {
            transition.redirect("signIn");
        }
    }
}

var NotFound = () => <h1>Route was not found!</h1>;

var AppShell = (props) => {
    var Content = props.isLoading ? AppLoader : RouteHandler;
    return (
        <div className="courseware-proto">
            <Content />
        </div>
    );
};

export default (
    <Route handler={AppShell} path="/">
        <Route name="dashboard" path="dashboard" handler={DashboardVC} />
        <Route name="signIn" path="signIn" handler={SignInVC} />
        <DefaultRoute handler={DefaultView} />
        <NotFoundRoute handler={NotFound}/>
    </Route>
);
