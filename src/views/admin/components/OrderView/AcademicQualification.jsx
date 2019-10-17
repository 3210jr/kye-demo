// @ts-check
import React, { useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuidV1 from "uuid/v1";
import { keys, map, omit } from "lodash";
import {
	Paper,
	Typography,
	Button,
	TextField,
	MenuItem,
	Grid
} from "@material-ui/core";
import { persistOrderEmbeddedResults, uploadFile } from "../../../../utils";

const ACADEMIC_REPORTS_TEMPLATE = {
	establishmentName: "",
	referenceMethod: "",
	dateSupplied: "",
	didCandidateStudyInTheEstablishment: true,
	attendanceDateCandidate: "",
	attendanceDateReference: "",
	nameOfCourseStudiedCandidate: "",
	nameOfCourseStudiedReference: "",
	qualificationAndGradedAwardedCandidate: "",
	qualificationAndGradedAwardedReference: "",
	supportingDocsURL: "",
	academicQualificationScore: ""
};

function AcademicReports({ order, type, snackbar, toggleSnackBar }) {
	const [state, setState] = useState({
		[uuidV1()]: {
			...ACADEMIC_REPORTS_TEMPLATE,
			loading: false,
			uploadingAttachment: false
		}
	});

	useEffect(() => {
		const initialState = { ...order[type], ...state };
		setState(initialState);
	}, []);

	function insertNewResult() {
		state[uuidV1()] = {
			...ACADEMIC_REPORTS_TEMPLATE,
			loading: false,
			uploadingAttachment: false
		};
		setState({ ...state });
	}

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

	function handleChange(key, field, value) {
		state[key][field] = value;
		return setState({ ...state });
	}

	function saveAcademicReports(resultKey) {
		const { loading, uploadingAttachment } = state;
		const currentState = omit(state[resultKey], [
			"loading",
			"uploadingAttachment"
		]);
		if (loading) return;
		const emptyFields = Object.keys(currentState).filter(
			key => currentState[key].length === 0
		);
		if (emptyFields.length > 0) {
			alert("Please fill in all the appropriate fields");
			return;
		}
		if (
			!currentState.supportingDocsURL ||
			currentState.supportingDocsURL.length < 5
		) {
			alert("Please upload the supporting documents");
			return;
		}

		state[resultKey].loading = true;
		setState({ ...state });

		persistOrderEmbeddedResults(order.id, type, resultKey, { ...currentState })
			.then(res => {
				toggleSnackBar({ message: "Academic Reports updated successfully!" });
			})
			.catch(error => {
				toggleSnackBar({
					message: "Error. There was an error updating the Academic report."
				});
				console.log("Error: ", error);
			})
			.finally(() => {
				state[resultKey].loading = false;
				setState({ ...state });
			});
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Academic Qualification</Typography>
			<Grid justify="space-between" container spacing={24}>
				<Grid item></Grid>

				<Grid item>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={insertNewResult}
					>
						Add another result
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
							<Grid item xs={3} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									label="Establish Name"
									value={result.establishmentName}
									onChange={({ target }) =>
										handleChange(key, "establishmentName", target.value)
									}
									fullWidth
									margin="normal"
									variant="outlined"
									style={{ margin: 3 }}
								/>
							</Grid>

							<Grid item xs={3} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									label="Reference Method"
									value={result.referenceMethod}
									onChange={({ target }) =>
										handleChange(key, "referenceMethod", target.value)
									}
									fullWidth
									margin="normal"
									variant="outlined"
									style={{ margin: 3 }}
								/>
							</Grid>

							<Grid item xs={3} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									label="Date Supplied"
									value={result.dateSupplied}
									onChange={({ target }) =>
										handleChange(key, "dateSupplied", target.value)
									}
									fullWidth
									margin="normal"
									variant="outlined"
									style={{ margin: 3 }}
								/>
							</Grid>

							<Grid item xs={3} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									label="Did candidate study at this Establishment?"
									value={result.didCandidateStudyInTheEstablishment}
									onChange={({ target }) =>
										handleChange(
											key,
											"didCandidateStudyInTheEstablishment",
											target.value
										)
									}
									select
									style={{ margin: 3 }}
									className="wide"
									margin="normal"
									variant="outlined"
								>
									<MenuItem value="yes">Yes</MenuItem>
									<MenuItem value="no">No</MenuItem>
								</TextField>
							</Grid>
						</Grid>

						{/* education details headers */}
						<Grid container style={{ marginTop: 10 }}>
							<Grid
								item
								xs={4}
								style={{ paddingLeft: 3, paddingRight: 3 }}
							></Grid>

							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<Typography variant="h6">Candidate</Typography>
							</Grid>

							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<Typography variant="h6">Reference</Typography>
							</Grid>
						</Grid>

						{/* education details headers ends */}

						{/* education details headers contents */}
						<Grid container style={{ marginTop: 10 }}>
							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<p>Attendance Date</p>
							</Grid>

							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									value={result.attendanceDateCandidate}
									onChange={({ target }) =>
										handleChange(key, "attendanceDateCandidate", target.value)
									}
									fullWidth
									margin="normal"
									variant="outlined"
									style={{ margin: 3 }}
								/>
							</Grid>

							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									value={result.attendanceDateReference}
									onChange={({ target }) =>
										handleChange(key, "attendanceDateReference", target.value)
									}
									fullWidth
									margin="normal"
									variant="outlined"
									style={{ margin: 3 }}
								/>
							</Grid>
						</Grid>

						<Grid container style={{ marginTop: 10 }}>
							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<p>Name of course(s) studied</p>
							</Grid>

							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									value={result.nameOfCourseStudiedCandidate}
									onChange={({ target }) =>
										handleChange(
											key,
											"nameOfCourseStudiedCandidate",
											target.value
										)
									}
									fullWidth
									margin="normal"
									variant="outlined"
									style={{ margin: 3 }}
								/>
							</Grid>

							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									value={result.nameOfCourseStudiedReference}
									onChange={({ target }) =>
										handleChange(
											key,
											"nameOfCourseStudiedReference",
											target.value
										)
									}
									fullWidth
									margin="normal"
									variant="outlined"
									style={{ margin: 3 }}
								/>
							</Grid>
						</Grid>

						<Grid container style={{ marginTop: 10 }}>
							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<p>Qualificication and grade awarded</p>
							</Grid>

							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									value={result.qualificationAndGradedAwardedCandidate}
									onChange={({ target }) =>
										handleChange(
											key,
											"qualificationAndGradedAwardedCandidate",
											target.value
										)
									}
									fullWidth
									margin="normal"
									variant="outlined"
									style={{ margin: 3 }}
								/>
							</Grid>

							<Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									value={result.qualificationAndGradedAwardedReference}
									onChange={({ target }) =>
										handleChange(
											key,
											"qualificationAndGradedAwardedReference",
											target.value
										)
									}
									fullWidth
									margin="normal"
									variant="outlined"
									style={{ margin: 3 }}
								/>
							</Grid>
						</Grid>

						<Grid container style={{ marginTop: 10 }}>
							<Grid item xs={6} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<p>Qualification check - System score</p>
							</Grid>

							<Grid item xs={6} style={{ paddingLeft: 3, paddingRight: 3 }}>
								<TextField
									id="outlined-name"
									value={result.academicQualificationScore}
									onChange={({ target }) =>
										handleChange(
											key,
											"academicQualificationScore",
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
									<MenuItem value="bad">Bad</MenuItem>
								</TextField>
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
									onClick={() => saveAcademicReports(key)}
								>
									{result.loading ? "Loading ..." : "Save"}
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
									variant={
										result.supportingDocsURL &&
										result.supportingDocsURL.length > 0
											? "text"
											: "contained"
									}
									onClick={() => fileUploaderRef.current.click()}
									color="primary"
								>
									{result.uploadingAttachment
										? "Uploading..."
										: result.supportingDocsURL &&
										  result.supportingDocsURL.length > 0
										? "Update Supporting Documents"
										: "Upload Supporting Documents"}
								</Button>
							</Grid>
						</Grid>
						{/* education details headers ends */}

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
)(AcademicReports);
