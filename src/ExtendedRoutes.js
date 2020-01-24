// @ts-check
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Provider, connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const isAdmin = profile => {
    if (profile && profile.admin) {
        return true;
    }
    return false;
};
const isLoggedIn = true;

const mapState = (state, ...rest) => ({
    profile: state.profile,
    ...rest
});

function Loader() {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <CircularProgress />
        </div>
    );
}

export const AdminRoute = connect(mapState)(
    ({ component: Component, ...rest }) => {
        if (rest.profile.loading) {
            return <Loader />;
        }
        return (
            <Route
                {...rest}
                render={props =>
                    isAdmin(rest.profile) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
            />
        );
    }
);

export const AppRoute = connect(mapState)(
    ({ component: Component, ...rest }) => {
        if (rest.profile.loading) {
            return <Loader />;
        }
        return (
            <Route
                {...rest}
                render={props =>
                    rest.profile.email ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
            />
        );
    }
);
