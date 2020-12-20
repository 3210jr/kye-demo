// @ts-check
import React, { Component, useState } from "react";
import { Provider, connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import OverviewCard from "../../components/OverviewCard";
import {
	Grid,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Table,
	Fab,
	Typography,
	Paper,
	FormControlLabel,
	FormControl,
	FormLabel,
	Switch as SwitchButton,
	FormGroup,
	Button,
	FormHelperText,
	TextField,
	TablePagination
} from "@material-ui/core";
import CasesTable from "./CasesTable";
import PreLitigationCaseView from "./PreLitigationCaseView";

class PreLitigation extends Component {
	render() {
		const { match, history } = this.props;
		console.log(match);
		return (
			<div className="App">
				<Switch>
					<Route path={`${match.path}`} exact component={Dashboard} />
					<Route path={`${match.path}/case/:caseId`} exact component={PreLitigationCaseView} />
				</Switch>
			</div>
		);
	}
}

class Dashboard extends Component {
	render() {
		const { history } = this.props;
		function openCase(caseId) {
			return history.push("/dashboard/pre-litigation/case/"+caseId);
		}
		return (
			<div>
				<Grid container style={{ marginBottom: "1em" }}>
					<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
						<OverviewCard bgColor="#311b92" title="Open" count={43} />
					</Grid>
					<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
						<OverviewCard bgColor="#ffc400" title="Pending" count={3} />
					</Grid>
					<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
						<OverviewCard bgColor="#2e7d32" title="Declined" count={12} />
					</Grid>
					<Grid item sm={6} md={3}>
						<OverviewCard bgColor="#d84315" title="Completed" count={4} />
					</Grid>
				</Grid>

				<Grid container style={{ marginBottom: "1em" }}>
					<Grid item sm>
						<CasesTable onClickCase={openCase} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default PreLitigation;
