// @ts-check
import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {} from "@material-ui/core/colors";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

const theme = createMuiTheme({
	
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<BrowserRouter>
						<Switch>
							<Route path="/login" component={Login} />
							<Route path="/dashboard/" component={Dashboard} />
						</Switch>
					</BrowserRouter>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
