// @ts-check
import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {} from "@material-ui/core/colors";
import { Provider, connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./firebase";
import "./App.css";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import store from "./store";
import { AppRoute, AdminRoute } from "./ExtendedRoutes";

import Admin from "./views/admin";

const theme = createMuiTheme({});

class ScrollToTop extends React.Component {
	componentDidUpdate(prevProps) {
		const { location } = this.props;
		if (location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		// eslint-disable-next-line
		return this.props.children;
	}
}

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<div className="App">
						<BrowserRouter>
							<ScrollToTop>
								<Switch>
									<Route path="/" exact component={Login} />
									<AppRoute path="/dashboard/" component={Dashboard} />
									<AdminRoute path="/admin/" component={Admin} />
								</Switch>
							</ScrollToTop>
						</BrowserRouter>
					</div>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;
