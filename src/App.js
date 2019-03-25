// @ts-check
import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {} from "@material-ui/core/colors";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

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
				<div className="App">
					<BrowserRouter>
						<ScrollToTop>
							<Switch>
								<Route path="/" exact component={Login} />
								<Route path="/dashboard/" component={Dashboard} />
							</Switch>
						</ScrollToTop>
					</BrowserRouter>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
