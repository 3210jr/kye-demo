// @ts-check
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upperFirst, clone } from "lodash";
import { Paper, Typography, Button, TextField, MenuItem} from "@material-ui/core";



function IdentityCheck({ order }) {
	const [state, setstate] = useState({
		documentType: "",
		countryOfIssue: "",
		dateOfCheck: "",
		result: "",
		dateOfBirthConsisntency: "no",
		passportScore: "risk", // risk, medium, good
		comments: ""
	});

	function handleChange(field, value) {
		state[field] = value;
		return setstate(clone(state));
	}

	function updateIdentityCheck() {
		console.log("Identity check state",state)
		return;
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Identification Check</Typography>

			<div className="flex-row" style={{ marginTop: 5 }}>
				<div style={{ flex: 1, display: "flex" }}>
					<TextField
						id="outlined-name"
						label="Document Type"
						style={{ margin: 3 }}
						className="wide"
						value={state.documentType}
						onChange={({ target }) => handleChange("documentType", target.value)}
						margin="normal"
						variant="outlined"
					/>
				</div>
				<div style={{ flex: 1, display: "flex" }}>
					<TextField
						id="outlined-name"
						label="Country of issue"
						style={{ margin: 3 }}
						className="wide"
						value={state.countryOfIssue}
						onChange={({ target }) => handleChange("countryOfIssue", target.value)}
						margin="normal"
						variant="outlined"
					/>
				</div>
				<div style={{ flex: 1, display: "flex" }}>
					<TextField
						id="outlined-name"
						label="Date of Check"
						style={{ margin: 3 }}
						className="wide"
						value={state.dateOfCheck}
						onChange={({ target }) => handleChange("dateOfCheck", target.value)}
						margin="normal"
						variant="outlined"
					/>
				</div>
				<div style={{ flex: 1, display: "flex" }}>
					<TextField
						id="outlined-name"
						label="Result"
						style={{ margin: 3 }}
						className="wide"
						value={state.result}
						onChange={({ target }) => handleChange("result", target.value)}
						margin="normal"
						variant="outlined"
					/>
				</div>
			</div>

			<div className="flex-row" style={{ marginTop: 20 }}>
				<div style={{ flex: 1 }}>
					<TextField
						id="outlined-name"
						label="Appearence on Document Matches Age?"
						select
						style={{ margin: 3 }}
						className="wide"
						value={state.dateOfBirthConsisntency}
						onChange={({ target }) =>
							handleChange("dateOfBirthConsisntency", target.value)
						}
						margin="normal"
						variant="outlined"
					>
						<MenuItem value="yes">Yes</MenuItem>
						<MenuItem value="no">No</MenuItem>
					</TextField>
				</div>
				<div style={{ flex: 1, paddingLeft: 10 }}>
					<TextField
						id="outlined-name"
						label="Passport Check - System Score"
						select
						style={{ margin: 3 }}
						className="wide"
						value={state.passportScore}
						onChange={({ target }) => handleChange("passportScore", target.value)}
						margin="normal"
						variant="outlined"
					>
						<MenuItem value="risk">Risk</MenuItem>
						<MenuItem value="medium">Medium</MenuItem>
						<MenuItem value="good">Good</MenuItem>
					</TextField>
				</div>
				<div style={{ flex: 1 }} />
			</div>

			<div className="flex-row" style={{ marginTop: 10 }}>
				<TextField
					id="outlined-name"
					label="Comments"
					multiline
					// style={{ margin: 3 }}
					className="wide"
					value={state.comments}
					onChange={({ target }) => handleChange("comments", target.value)}
					margin="normal"
					variant="outlined"
				/>
			</div>

			<div className="flex-row" style={{ marginTop: 10 }}>
				<Button
					variant="contained"
					color="primary"
					onClick={updateIdentityCheck}
					// className=""
				>
					Publish Identity Verification Check
				</Button>
			</div>
		</Paper>
	);
}


export default IdentityCheck