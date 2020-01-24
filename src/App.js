// @ts-check
import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider, connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./firebase";
import "./App.css";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import store from "./store";
import { AppRoute, AdminRoute } from "./ExtendedRoutes";

import Admin from "./views/admin";
import { Snackbar } from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		// primary: {
		// 	main: "#000"
		// },
		// secondary: {
		// 	// light: will be calculated from palette.primary.main,
		// 	main: "#999966"
		// 	// dark: will be calculated from palette.primary.main,
		// 	// contrastText: will be calculated to contrast with palette.primary.main
		// }
	},
	// status: {
	// 	danger: "orange"
	// }
});

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

						<SnackbarContainer />
					</div>
				</Provider>
			</MuiThemeProvider>
		);
	}
}


const mapState = state => ({
	snackbar: state.snackbar
});

// @ts-ignore
const SnackbarContainer = connect(mapState)(({snackbar}) => {
	return (
	<Snackbar
		anchorOrigin={{ vertical: snackbar.vertical, horizontal: snackbar.horizontal }}
		key={snackbar.key}
		open={snackbar.open}
		onClose={snackbar.handleClose}
		ContentProps={{
			"aria-describedby": "message-id"
		}}
		title={snackbar.title}
		message={<span id="message-id">{snackbar.message}</span>}
	/>
)});

export default App;
