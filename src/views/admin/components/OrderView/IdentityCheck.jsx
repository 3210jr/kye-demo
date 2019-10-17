// @ts-check
import React, { Component, useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { omit, clone } from "lodash";
import {
	Paper,
	Typography,
	Button,
	TextField,
	MenuItem
} from "@material-ui/core";
import { persistOrderResults, uploadFile } from "../../../../utils";

function IdentityCheck({ order, type, snackbar, toggleSnackBar }) {
	const [state, setState] = useState({
		documentType: "",
		countryOfIssue: "",
		dateOfCheck: "",
		result: "",
		dateOfBirthConsisntency: "no",
		passportScore: "risk", // risk, medium, good
		comments: "",
		supportingDocsURL: "",
		uploadingAttachment: false,
		loading: false
	});

	let fileUploaderRef = createRef();

	function uploadAttachment(evt) {
		if (state.uploadingAttachment) return;
		const file = evt.target.files[0];

		setState({ ...state, uploadingAttachment: true });
		uploadFile(file, "supporting-documents")
			.then(res => {
				res.ref
					.getDownloadURL()
					.then(url =>
						setState({
							...state,
							uploadingAttachment: false,
							supportingDocsURL: url
						})
					);
			})
			.catch(error => {
				alert("There was an error uploading your assets, please try again");
				console.log(error);
				setState({ uploadingAttachment: false });
			});
	}

	useEffect(() => {
		const initialState = { ...state, ...order[type] };
		setState(initialState);
	}, []);

	function handleChange(field, value) {
		state[field] = value;
		return setState(clone(state));
	}

	function saveIdentityCheck() {
		const { loading } = state;
		const currentState = omit(state, ["loading"]);
		if (loading) return;
		const emptyFields = Object.keys(currentState).filter(
			key => state[key].length === 0
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
			<Typography variant="h6">Identification Check</Typography>

			<div className="flex-row" style={{ marginTop: 5 }}>
				<div style={{ flex: 1, display: "flex" }}>
					<TextField
						id="outlined-name"
						label="Document Type"
						style={{ margin: 3 }}
						className="wide"
						value={state.documentType}
						onChange={({ target }) =>
							handleChange("documentType", target.value)
						}
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
						onChange={({ target }) =>
							handleChange("countryOfIssue", target.value)
						}
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
						onChange={({ target }) =>
							handleChange("passportScore", target.value)
						}
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
					onClick={saveIdentityCheck}
					style={{ marginRight: 10 }}
				>
					{state.loading ? "Loading ..." : "Save"}
				</Button>
				<Button
					variant={state.supportingDocsURL.length > 0 ? "text":"contained"}
					color="primary"
					onClick={() => fileUploaderRef.current.click()}
				>
					{state.uploadingAttachment
						? "Uploading..."
						: state.supportingDocsURL.length > 0
						? "Update Supporting Documents"
						: "Upload Supporting Documents"}
				</Button>
			</div>

			<input
				type="file"
				ref={fileUploaderRef}
				onChange={uploadAttachment}
				id="attachmentUploader"
				className="hidden"
			/>
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
)(IdentityCheck);
