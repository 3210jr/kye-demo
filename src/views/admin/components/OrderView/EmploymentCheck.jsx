// @ts-check
import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upperFirst, clone, omit } from "lodash";
import {
	Paper,
	Typography,
	Button,
	TextField,
	MenuItem,
	Grid
} from "@material-ui/core";
import { persistOrderResults } from "../../../../utils";

function EmploymentHistory({ order, type, snackbar, toggleSnackBar }) {
	const [state, setState] = useState({
		organization: "",
		referenceMethod: "",
		dateProduced: "",
		positionHeldCandidate: "",
		positionHeldReferee: "",
		employmentStartDateCandidate: "",
		employmentStartDateReferee: "",
		employmentEndDateCandidate: "",
		employmentEndDateReferee: "",
		employmentHistoryScore: "",
		comments: "",
		additionalInformation: "",
		loading: false
	});

	useEffect(() => {
		const initialState = { ...state, ...order[type] };
		setState(initialState);
	}, []);

	function handleChange(field, value) {
		state[field] = value;
		return setState(clone(state));
	}

	function saveEmplymentHistoryCheck() {
		const { loading } = state;
		const currentState = omit(state, ["loading"]);
		if (loading) return;
		const emptyFields = Object.keys(currentState).filter(
			key => state[key].length < 2
		);
		if (emptyFields.length > 0) {
			alert("Please fill in all the appropriate fields");
			return;
		}

		setState({ ...state, loading: true });

		persistOrderResults(order.id, type, { ...currentState })
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
				setState({ ...state, loading: false });
			});
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Employment History and References</Typography>

			<Grid justify="space-between" container spacing={24}>
				<Grid item></Grid>

				<Grid item>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={() => {}}
					>
						Save and Add another
					</Button>
				</Grid>
			</Grid>

			{/* first row */}

			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs style={{ paddingLeft: 3, paddingRight: 3 }}>
					<TextField
						id="outlined-name"
						value={state.organization}
						onChange={({ target }) =>
							handleChange("organization", target.value)
						}
						label="Organization"
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>
				<Grid item xs style={{ paddingLeft: 3, paddingRight: 3 }}>
					<TextField
						id="outlined-name"
						label="Reference method"
						value={state.referenceMethod}
						onChange={({ target }) =>
							handleChange("referenceMethod", target.value)
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
						label="Date Produced"
						value={state.dateProduced}
						onChange={({ target }) =>
							handleChange("dateProduced", target.value)
						}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>
			</Grid>

			{/* second row */}

			<p style={{ paddingLeft: 6 }}>Position held</p>
			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs style={{ paddingLeft: 3, paddingRight: 3 }}>
					<TextField
						id="outlined-name"
						label="Candidate"
						value={state.positionHeldCandidate}
						onChange={({ target }) =>
							handleChange("positionHeldCandidate", target.value)
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
						label="Referee"
						value={state.positionHeldReferee}
						onChange={({ target }) =>
							handleChange("positionHeldReferee", target.value)
						}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>
			</Grid>
			{/* second row ends */}

			{/* third row */}
			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Grid item xs={4}>
						<p style={{ paddingLeft: 6 }}>Employment Start Date</p>
					</Grid>
					<Grid container>
						<Grid item xs={6} style={{ paddingLeft: 3, paddingRight: 3 }}>
							<TextField
								id="outlined-name"
								label="Candidate"
								value={state.employmentStartDateCandidate}
								onChange={({ target }) =>
									handleChange("employmentStartDateCandidate", target.value)
								}
								fullWidth
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>
						</Grid>

						<Grid item xs={6} style={{ paddingLeft: 3, paddingRight: 3 }}>
							<TextField
								id="outlined-name"
								label="Referee"
								value={state.employmentStartDateReferee}
								onChange={({ target }) =>
									handleChange("employmentStartDateReferee", target.value)
								}
								fullWidth
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Grid item xs={4}>
						<p style={{ paddingLeft: 6 }}>Employment End Date</p>
					</Grid>
					<Grid container>
						<Grid item xs={6} style={{ paddingLeft: 3, paddingRight: 3 }}>
							<TextField
								id="outlined-name"
								label="Candidate"
								value={state.employmentEndDateCandidate}
								onChange={({ target }) =>
									handleChange("employmentEndDateCandidate", target.value)
								}
								fullWidth
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>
						</Grid>

						<Grid item xs={6} style={{ paddingLeft: 3, paddingRight: 3 }}>
							<TextField
								id="outlined-name"
								label="Referee"
								value={state.employmentEndDateReferee}
								onChange={({ target }) =>
									handleChange("employmentEndDateReferee", target.value)
								}
								fullWidth
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>
						</Grid>
					</Grid>
				</Grid>

				{/* third row ends */}

				{/* forth row */}

				<Grid container spacing={3} style={{ marginTop: 5 }}>
					<Grid item xs={6} sm={6}>
						<p style={{ paddingLeft: 6 }}>
							Employment history and references - System score
						</p>
					</Grid>
					<Grid item xs={6} sm={6} style={{ paddingLeft: 6 }}>
						<TextField
							id="outlined-name"
							select
							value={state.employmentHistoryScore}
							onChange={({ target }) =>
								handleChange("employmentHistoryScore", target.value)
							}
							style={{ margin: 3 }}
							className="wide"
							margin="normal"
							variant="outlined"
						>
							<MenuItem value="good">Good</MenuItem>
							<MenuItem value="other">Other</MenuItem>
							<MenuItem value="other2">Other2</MenuItem>
						</TextField>
					</Grid>
				</Grid>
			</Grid>

			{/* forth row ends */}

			{/* comments section */}
			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs={12} sm={12} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<TextField
						fullWidth
						value={state.comments}
						onChange={({ target }) => handleChange("comments", target.value)}
						label="Comments"
						id="outlined-dense-multiline"
						margin="dense"
						variant="outlined"
						multiline
						rowsMax="4"
					/>
				</Grid>
			</Grid>

			{/* comments section ends */}

			{/* Addition information section */}
			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs={12} sm={12} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<TextField
						fullWidth
						value={state.additionalInformation}
						onChange={({ target }) =>
							handleChange("additionalInformation", target.value)
						}
						label="Additional information"
						id="outlined-dense-multiline"
						margin="dense"
						variant="outlined"
						multiline
						rowsMax="4"
					/>
				</Grid>
			</Grid>

			{/* Addition information ends */}

			{/* save button section */}

			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs={2} sm={2} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={saveEmplymentHistoryCheck}
					>
						{state.loading ? "Loading ..." : "Save"}
					</Button>
				</Grid>
			</Grid>

			{/* save button section ends */}
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
)(EmploymentHistory);
