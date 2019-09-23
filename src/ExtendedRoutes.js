// @ts-check
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Provider, connect } from "react-redux";

const isAdmin = (profile) => {
    if (profile && profile.admin) {
        return true;
    }
    return false;
}
const isLoggedIn = true;

const mapState = state => ({
	profile: state.profile
});


export const AdminRoute = connect(mapState)(({ component: Component, ...rest }) => {
    if (rest.profile.loading) {
		return "Loading ...";
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
});



export const AppRoute = connect(mapState)(({ component: Component, ...rest }) => {
	if (rest.profile.loading) {
		return "Loading ...";
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
});
