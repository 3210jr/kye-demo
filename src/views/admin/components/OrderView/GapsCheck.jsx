// @ts-check
import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { map, clone, keys } from "lodash";
import uuidV1 from "uuid/v1";
import {
	Paper,
	Typography,
	Button,
	TextField,
	MenuItem,
	Grid
} from "@material-ui/core";
import {
	persistOrderResults,
	persistOrderEmbeddedResults
} from "../../../../utils";

const GAPS_REPORT_TEMPLATE = {
	period: "",
	comments: "",
	gapInEmploymentHistoryScore: "",
	generalComments: ""
};

function GapsReports({ order, type, snackbar, toggleSnackBar }) {
	const [state, setState] = useState({
		[uuidV1()]: { ...GAPS_REPORT_TEMPLATE, loading: false }
	});

	useEffect(() => {
		// const { period = "", comments = "", gapInEmploymentHistoryScore = "", generalComments = "" } = order[type];
		// const data = { ...order[type] };
		const initialState = { ...order[type], ...state };
		setState(initialState);
	}, []);

	function insertNewResult() {
		state[uuidV1()] = { ...GAPS_REPORT_TEMPLATE, loading: false };
		setState({ ...state });
	}

	function handleChange(key, field, value) {
		state[key][field] = value;
		return setState({ ...state });
	}

	function saveGapsReport(resultKey) {
		const {
			period,
			comments,
			gapInEmploymentHistoryScore,
			generalComments,
			loading
		} = state[resultKey];
		if (loading) return;
		if (
			period.length < 3 ||
			comments.length < 5 ||
			generalComments.length < 5 ||
			gapInEmploymentHistoryScore.length < 3
		) {
			alert("Please fill all the provided fields");
			return;
		}
		state[resultKey].loading = true;
		setState(clone(state));
		console.log(state);

		persistOrderEmbeddedResults(order.id, type, resultKey, {
			period,
			comments,
			gapInEmploymentHistoryScore,
			generalComments
		})
			.then(res => {
				toggleSnackBar({ message: "Police Reports updated successfully!" });
			})
			.catch(error => {
				toggleSnackBar({
					message: "Error. There was an error updating the police report."
				});
				console.log("Error: ", error);
			})
			.finally(() => {
				state[resultKey].loading = false;
				setState(clone(state));
			});
	}

	console.log("STATE: ", state);

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Gap Analysis</Typography>

			<Grid justify="space-between" container spacing={24}>
				<Grid item></Grid>

				<Grid item>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={insertNewResult}
					>
						Add another Result
					</Button>
				</Grid>
			</Grid>

			{map(state, (result, key) => (
				<div
					key={key}
					style={{
						marginBottom: 15,
						marginTop: 5,
						paddingBottom: 10,
						paddingTop: 10,
						borderTop: `${keys(state).length > 1 ? 1 : 0}px solid #ccc`
					}}
				>
					<Grid container style={{ marginTop: 5 }}>
						<Grid item xs style={{ paddingLeft: 3, paddingRight: 3 }}>
							<TextField
								id="outlined-name"
								label="Period"
								value={result.period}
								onChange={({ target }) =>
									handleChange(key, "period", target.value)
								}
								fullWidth
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>
						</Grid>
						<Grid item xs style={{ paddingLeft: 3, paddingRight: 3 }}>
							<TextField
								id="outlined-name"
								label="Comments"
								value={result.comments}
								onChange={({ target }) =>
									handleChange(key, "comments", target.value)
								}
								fullWidth
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>
						</Grid>
					</Grid>

					<Grid container style={{ marginTop: 5 }}>
						<Grid item xs={6} sm={6}>
							<p style={{ paddingLeft: 6 }}>
								Gap in Employment History - System score
							</p>
						</Grid>

						<Grid item xs={6} sm={6} style={{ paddingLeft: 6 }}>
							<TextField
								id="outlined-name"
								value={result.gapInEmploymentHistoryScore}
								onChange={({ target }) =>
									handleChange(key, "gapInEmploymentHistoryScore", target.value)
								}
								select
								style={{ margin: 3 }}
								className="wide"
								margin="normal"
								variant="outlined"
							>
								<MenuItem value="good">Good</MenuItem>
								<MenuItem value="average">Average</MenuItem>
								<MenuItem value="bar">Bad</MenuItem>
							</TextField>
						</Grid>
					</Grid>

					<Grid container style={{ marginTop: 5 }}>
						<Grid
							item
							xs={12}
							sm={12}
							style={{ paddingLeft: 3, paddingRight: 3 }}
						>
							<TextField
								fullWidth
								label="Comments"
								value={result.generalComments}
								onChange={({ target }) =>
									handleChange(key, "generalComments", target.value)
								}
								id="outlined-dense-multiline"
								margin="dense"
								variant="outlined"
								multiline
								rowsMax="4"
							/>
						</Grid>
					</Grid>

					<Grid container style={{ marginTop: 5 }}>
						<Grid
							item
							xs={2}
							sm={2}
							style={{ paddingLeft: 3, paddingRight: 3 }}
						>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								onClick={() => saveGapsReport(key)}
							>
								{result.loading
									? "Loading ..."
									: result.updatedAt
									? "Update"
									: "Save"}
							</Button>
						</Grid>
					</Grid>
				</div>
			))}
		</Paper>
	);
}

const mapState = state => ({
	snackbar: state.snackbar
});

const mapDispatch = ({ snackbar: { asyncToggleSnackBar } }) => ({
	toggleSnackBar: payload => asyncToggleSnackBar(payload)
});

export default connect(
	mapState,
	mapDispatch
)(GapsReports);
