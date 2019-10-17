// @ts-check
import React, { useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upperFirst, clone } from "lodash";
import {
	Paper,
	Typography,
	Button,
	TextField,
	MenuItem,
	Grid
} from "@material-ui/core";
import { persistOrderResults, uploadFile } from "../../../../utils";

function PoliceReports({ order, type, snackbar, toggleSnackBar }) {
	const [state, setState] = useState({
		comments: "",
		criminalAnalysisScore: "",
		supportingDocsURL: "",
		uploadingAttachment: false,
		loading: false
	});

	useEffect(() => {
		const { comments, criminalAnalysisScore } = order[type];
		const initialState = { ...state, comments, criminalAnalysisScore };
		setState(initialState);
	}, []);

	let fileUploaderRef = createRef();

	function uploadAttachment(evt) {
		if (state.uploadingAttachment) return;
		const file = evt.target.files[0];

		setState({ ...state, uploadingAttachment: true });
		uploadFile(file, "supporting-documents")
			.then(res => {
				res.ref.getDownloadURL().then(url =>
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

	function handleChange(field, value) {
		state[field] = value;
		return setState(clone(state));
	}

	function saveCriminalCheck() {
		const {
			comments,
			criminalAnalysisScore,
			supportingDocsURL,
			loading
		} = state;
		if (loading) return;
		if (comments.length < 5) {
			alert("Comments are too short. Please enter valid comments.");
			return;
		}

		if (criminalAnalysisScore.length < 2) {
			alert("Please enter a valid analysis score");
			return;
		}

		if (supportingDocsURL.length < 5) {
			alert("Please upload any supporting documents");
			return;
		}

		state.loading = true;
		setState(clone(state));

		persistOrderResults(order.id, type, {
			comments,
			criminalAnalysisScore,
			supportingDocsURL
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
				state.loading = false;
				setState(clone(state));
			});
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Criminal check</Typography>

			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs={12} sm={12} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<TextField
						fullWidth
						label="Comments"
						value={state.comments}
						onChange={({ target }) => handleChange("comments", target.value)}
						id="outlined-dense-multiline"
						margin="dense"
						variant="outlined"
						multiline
						rowsMax="4"
					/>
				</Grid>
			</Grid>

			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs={6} sm={6}>
					<p style={{ paddingLeft: 6 }}>Criminal Analysis - System score</p>
				</Grid>

				<Grid item xs={6} sm={6} style={{ paddingLeft: 6 }}>
					<TextField
						id="outlined-name"
						value={state.criminalAnalysisScore}
						onChange={({ target }) =>
							handleChange("criminalAnalysisScore", target.value)
						}
						select
						style={{ margin: 3 }}
						className="wide"
						margin="normal"
						variant="outlined"
					>
						<MenuItem value="good">Good</MenuItem>
						<MenuItem value="normal">Normal</MenuItem>
						<MenuItem value="bad">Bad</MenuItem>
					</TextField>
				</Grid>
			</Grid>

			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs={2} sm={2} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={saveCriminalCheck}
					>
						{state.loading ? "Loading" : "Save"}
					</Button>
				</Grid>

				<Grid item xs={2} sm={3} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Button
						variant={state.supportingDocsURL.length > 0 ? "text" : "contained"}
						color="primary"
						onClick={() => fileUploaderRef.current.click()}
					>
						{state.uploadingAttachment
							? "Uploading..."
							: state.supportingDocsURL.length > 0
							? "Update Supporting Documents"
							: "Upload Supporting Documents"}
					</Button>
				</Grid>
			</Grid>

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
)(PoliceReports);
