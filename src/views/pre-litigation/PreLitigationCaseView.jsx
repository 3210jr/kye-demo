// @ts-check
import React, { Component, createRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
	Paper,
	IconButton,
	Tooltip,
	Toolbar,
	Typography,
	Table,
	TableSortLabel,
	TablePagination,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	Grid,
	Button,
	TextField
} from "@material-ui/core";
import { upperFirst, omit } from "lodash";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { connect } from "react-redux";
import { Timeline, Event } from "react-timeline-scribble";
import {
	fullFormatDate,
	friendlyFormatDate,
	uploadFile,
	addCaseUpdate
} from "../../utils";
import {
	CloudDownload,
	Delete as DeleteIcon,
	FilterList as FilterListIcon
} from "@material-ui/icons";
import firebase from "firebase";

class PreLitigationCaseView extends Component {
	state = {
		addingUpdates: false,
		showUpdateForm: false,
		updates: [],
		title: "",
		comments: "",
		description: "",
		attachmentURL: "",
		loadingUpdates: true,
		uploadingAttachment: false
	};

	fileUploaderRef = createRef();

	componentDidMount() {
		const { profile, cases, match } = this.props;
		const { caseId } = match.params;
		this.updatesListener = firebase
			.firestore()
			.collection("preLitigationCases")
			.doc(caseId)
			.collection("updates")
			.onSnapshot(snap => {
				const updates = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
				this.setState({ loadingUpdates: false, updates });
			});
	}

	toggleUpdateForm = () => {
		this.setState({ showUpdateForm: !this.state.showUpdateForm });
	};

	handleChange = (field, evt) => {
		const { value } = evt.target;
		this.setState({ [field]: value });
	};

	uploadAttachment = (evt, key) => {
		const state = this.state;
		if (state.uploadingAttachment) return;
		const file = evt.target.files[0];

		this.setState({ uploadingAttachment: true });

		uploadFile(file, "supporting-documents")
			.then(res => {
				res.ref.getDownloadURL().then(url => {
					this.setState({ uploadingAttachment: false, attachmentURL: url });
				});
			})
			.catch(error => {
				alert("There was an error uploading your assets, please try again");
				console.log(error);
				this.setState({ uploadingAttachment: false });
			});
	};

	saveCaseUpdate = () => {
		const { loading, uploadingAttachment } = this.state;
		const { match } = this.props;
		const { caseId } = match.params;
		const { title, description, comments, attachmentURL } = omit(this.state, [
			"loading",
			"uploadingAttachment",
			"showUpdateForm",
			"addingUpdates",
			"loadingUpdates"
		]);

		addCaseUpdate({
			caseId,
			title,
			description,
			comments,
			attachmentURL
		})
			.then(res => {
				alert("Update Added!");
				this.setState({
					title: "",
					comments: "",
					description: "",
					attachmentURL: "",
					loadingUpdates: true,
					uploadingAttachment: false,
					showUpdateForm: false
				});
			})
			.catch(error => {
				alert("There was an error saving your update. Please try again.");
				console.log("Error: ", error);
			});
	};

	downloadAtt = url => {
		window.open(url, "_blank");
	};

	render() {
		const { profile, cases, match } = this.props;
		const { caseId } = match.params;
		const litigationCase = cases.filter(c => c.id === caseId)[0];
		if (!litigationCase) {
			return null;
		}
		const state = this.state;
		console.log(litigationCase);
		return (
			<div>
				<p style={{ fontSize: 24 }}>{litigationCase.customerName}</p>
				<Timeline>
					<Event
						interval={friendlyFormatDate(litigationCase.createdAt.toDate())}
						title={"Case Opened"}
						subtitle={""}
					>
						{litigationCase.description}
						<br />
						{litigationCase.comments}

						{litigationCase.attachmentURL.length > 3 && (
							<>
								<br />
								<br />
								<Button
									variant="text"
									color="primary"
									onClick={() => this.downloadAtt(litigationCase.attachmentURL)}
								>
									<CloudDownload /> &nbsp;&nbsp; Download Attachments
								</Button>
							</>
						)}
					</Event>
					{/* Other events */}
					{state.updates
						.sort((a, b) => {
							if (a.createdAt && b.createdAt) {
								return a.createdAt > b.createdAt ? 1 : -1;
							}
							return -1;
						})
						.map(update => (
							<Event
								interval={
									update.createdAt &&
									friendlyFormatDate(update.createdAt.toDate())
								}
								key={update.id}
								title={update.title}
								subtitle={""}
							>
								{update.description}
								<br />
								{update.comments}

								{update.attachmentURL.length > 3 && (
									<>
										<br />
										<br />
										<Button
											variant="text"
											color="primary"
											onClick={() =>
												this.downloadAtt(litigationCase.attachmentURL)
											}
										>
											<CloudDownload /> &nbsp;&nbsp; Download Attachments
										</Button>
									</>
								)}
							</Event>
						))}
					{match.path.indexOf("admin") > -1 && profile && profile.admin && (
						<Event
							interval={friendlyFormatDate(new Date().getTime())}
							title={"Add Update"}
							subtitle={"Want to create a new update to the case?"}
						>
							{state.showUpdateForm ? (
								<div>
									<Grid container>
										<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
											<TextField
												fullWidth
												label="Update Title"
												value={state.title}
												onChange={evt => this.handleChange("title", evt)}
												id="outlined-dense-multiline"
												margin="dense"
												variant="outlined"
											/>
										</Grid>
									</Grid>
									<Grid container style={{ marginTop: 5 }}>
										<Grid item xs={12} sm={12} md={6} style={styles.inputs}>
											<TextField
												fullWidth
												multiline
												rows={4}
												label="Description"
												value={state.description}
												onChange={evt => this.handleChange("description", evt)}
												id="outlined-dense-multiline"
												margin="dense"
												variant="outlined"
											/>
										</Grid>
									</Grid>
									<Grid container style={{ marginTop: 5 }}>
										<Grid item xs={12} sm={12} md={6} style={styles.inputs}>
											<TextField
												fullWidth
												multiline
												rows={4}
												label="Notes"
												value={state.comments}
												onChange={evt => this.handleChange("comments", evt)}
												id="outlined-dense-multiline"
												margin="dense"
												variant="outlined"
											/>
										</Grid>
									</Grid>
									<Grid container>
										<Button
											variant={
												state.attachmentURL.length > 0 ? "text" : "contained"
											}
											onClick={() => this.fileUploaderRef.current.click()}
											color="primary"
										>
											{state.uploadingAttachment
												? "Uploading..."
												: "Upload Attachments"}
										</Button>
									</Grid>
									<Grid container style={{ marginTop: 25 }}>
										<Button
											variant="contained"
											color="primary"
											onClick={this.saveCaseUpdate}
										>
											{state.addingUpdates ? "Loading ..." : "Save Update"}
										</Button>
										<Button
											variant="text"
											color="primary"
											onClick={this.toggleUpdateForm}
										>
											Cancel
										</Button>
									</Grid>
								</div>
							) : (
								<Button
									variant="text"
									color="primary"
									onClick={this.toggleUpdateForm}
								>
									New Update
								</Button>
							)}
						</Event>
					)}
				</Timeline>

				<input
					type="file"
					accept="application/pdf,application/vnd.ms-excel,application/zip,application/x-zip,application/x-zip-compressed"
					ref={this.fileUploaderRef}
					onChange={evt => this.uploadAttachment(evt)}
					id="attachmentUploader"
					className="hidden"
				/>
			</div>
		);
	}
}

const styles = {
	inputs: { paddingLeft: 3, paddingRight: 3 }
};

const mapState = state => ({
	profile: state.profile,
	cases: state.litigationCases.cases
});

export default connect(mapState)(PreLitigationCaseView);
