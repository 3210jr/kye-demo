// @ts-check
import React, { Component, useState, useEffect, createRef } from "react";
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
import { uploadFile, persistOrderEmbeddedResults } from "../../../../utils";

const GAPS_REPORT_TEMPLATE = {
	period: "",
	comments: "",
	gapInEmploymentHistoryScore: "",
	generalComments: "",
	supportingDocsURL: ""
};

function GapsReports({ order, type, snackbar, toggleSnackBar }) {
	const [state, setState] = useState({
		[uuidV1()]: {
			...GAPS_REPORT_TEMPLATE,
			loading: false,
			uploadingAttachment: false
		}
	});

	useEffect(() => {
		const initialState = { ...order[type], ...state };
		setState(initialState);
	}, []);

	function uploadAttachment(evt, key) {
		if (state[key].uploadingAttachment) return;
		const file = evt.target.files[0];

		state[key].uploadingAttachment = true;
		setState({ ...state });

		uploadFile(file, "supporting-documents")
			.then(res => {
				res.ref.getDownloadURL().then(url => {
					state[key].uploadingAttachment = false;
					state[key].supportingDocsURL = url;
					setState({ ...state });
				});
			})
			.catch(error => {
				alert("There was an error uploading your assets, please try again");
				console.log(error);
				state[key].uploadingAttachment = false;
				setState({ ...state });
			});
	}

	function insertNewResult() {
		state[uuidV1()] = { ...GAPS_REPORT_TEMPLATE, loading: false, uploadingAttachment: false };
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
			supportingDocsURL = "",
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

		if (supportingDocsURL.length < 5) {
			alert("Please upload the supporting documents");
			return;
		}
		state[resultKey].loading = true;
		setState(clone(state));

		persistOrderEmbeddedResults(order.id, type, resultKey, {
			period,
			comments,
			gapInEmploymentHistoryScore,
			generalComments,
			supportingDocsURL
		})
			.then(res => {
				toggleSnackBar({ message: "Gap Reports updated successfully!" });
			})
			.catch(error => {
				toggleSnackBar({
					message: "Error. There was an error updating the Gap report."
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

			{map(state, (result, key) => {
				let fileUploaderRef = createRef();
				return (
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
										handleChange(
											key,
											"gapInEmploymentHistoryScore",
											target.value
										)
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
								xs={12}
								md={2}
								style={{ paddingLeft: 3, paddingRight: 3 }}
							>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									style={{ marginRight: 10 }}
									onClick={() => saveGapsReport(key)}
								>
									{result.loading
										? "Loading ..."
										: result.updatedAt
										? "Update"
										: "Save"}
								</Button>
							</Grid>
							<Grid
								item
								xs={12}
								md={3}
								style={{ paddingLeft: 3, paddingRight: 3 }}
							>
								<Button
									fullWidth
									variant={result.supportingDocsURL.length > 0 ? "text":"contained"}
									onClick={() => fileUploaderRef.current.click()}
									color="primary"
								>
									{result.uploadingAttachment
										? "Uploading..."
										: result.supportingDocsURL && result.supportingDocsURL.length > 0
										? "Update Supporting Documents"
										: "Upload Supporting Documents"}
								</Button>
							</Grid>
						</Grid>

						<input
							type="file"
							ref={fileUploaderRef}
							onChange={evt => uploadAttachment(evt, key)}
							id="attachmentUploader"
							className="hidden"
						/>
					</div>
				);
			})}
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
