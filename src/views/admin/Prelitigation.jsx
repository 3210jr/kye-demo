// @ts-check
import React, { Component, useState } from "react";
import { Provider, connect } from "react-redux";
import { clone, upperFirst, omit } from "lodash";
import { Switch, Route } from "react-router-dom";
import OverviewCard from "../../components/OverviewCard";
import {
	Grid,
	Fab,
	Typography,
	Paper,
	FormControlLabel,
	FormControl,
	TextField,
	InputLabel,
	Button,
	Switch as SwitchButton,
	MenuItem
} from "@material-ui/core";
import {
	Mail as MailIcon,
	MoveToInbox,
	Dashboard as DashboardIcon,
	ViewCarousel,
	Add as AddIcon,
	SupervisedUserCircle,
	HowToReg,
	Close,
	HelpOutline
} from "@material-ui/icons";
import CasesTable from "../pre-litigation/CasesTable";
import { caseTypes } from "../../constants";
import { uploadFile, createNewCase } from "../../utils";

import PreLitigationCaseView from "../pre-litigation/PreLitigationCaseView";

class PreLitigation extends Component {
	render() {
		const { match, history } = this.props;
		console.log("DAY!!", match);
		return (
			<div className="App">
				<Switch>
					<Route path={`${match.path}`} exact component={Dashboard} />
					<Route path={`${match.path}/new-case/`} exact component={NewCase} />
					<Route path={`${match.path}/case/:caseId`} exact component={PreLitigationCaseView} />
				</Switch>
			</div>
		);
	}
}

const mapState = state => ({
	profile: state.profile
});

const NewCase = connect(mapState)(function({ profile, history }) {
    console.log(profile)
	const [state, setstate] = useState({
		customerName: "",
		registrationNumber: "",
		address: "",
		telephone: "",
		description: "",
		caseType: "other",
		comments: "",
		attachmentURL: "",
		loading: false,
		uploadingAttachment: false
	});
	const newOrderFileUploader = React.createRef();

	function handleChange(field, value) {
		state[field] = value;
		return setstate(clone(state));
	}
	function submitCase(field, value) {
		if (state.uploadingAttachment || state.loading) return;
		if (!profile || !profile.admin) return;
        const caseObj = omit(state, ["uploadingAttachment", "loading"]);
        setstate({ ...state, loading: true });
		return createNewCase({
			...caseObj,
			organizationId: profile.organizationId,
			organizationName: profile.organizationName
		})
			.then(res => {
				setstate({ ...state, loading: false });
				alert("New Order Created");
				return history.goBack();
			})
			.catch(error => {
				console.log("Error: ", error);
				alert("Error creating new order");
				setstate({ ...state, loading: false });
			});
	}
	function uploadZippedFolder(evt) {
		const file = evt.target.files[0];
		setstate({ ...state, loading: true, uploadingAttachment: true });
		uploadFile(file, "pre-litgation-assets")
			.then(res => {
				res.ref.getDownloadURL().then(url =>
					setstate({
						...state,
						uploadingAttachment: false,
						attachmentURL: url
					})
				);
			})
			.catch(error => {
				alert("There was an error uploading your assets, please try again");
				console.log(error);
				setstate({ ...state, uploadingAttachment: false });
			});
	}
	return (
		<div>
			<Grid container style={{ marginBottom: 15 }}>
				<Typography variant="h4" color="textSecondary" component="h2">
					New Pre-litigation Case:
				</Typography>
			</Grid>

			<Paper style={{ padding: "1em", marginTop: 20 }}>
				<Typography variant="h6">Case Details</Typography>

				<br />
				<p style={{ fontSize: 18 }}>Customer Details</p>
				<Grid container spacing={2} style={{ marginTop: 5 }}>
					<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
						<TextField
							fullWidth
							label="Company Name"
							value={state.customerName}
							onChange={({ target }) =>
								handleChange("customerName", target.value)
							}
							id="outlined-dense-multiline"
							margin="dense"
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
						<TextField
							fullWidth
							label="Company Registration Number"
							value={state.registrationNumber}
							onChange={({ target }) =>
								handleChange("registrationNumber", target.value)
							}
							id="outlined-dense-multiline"
							margin="dense"
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
						<TextField
							fullWidth
							label="Telephone Number"
							value={state.telephone}
							onChange={({ target }) => handleChange("telephone", target.value)}
							id="outlined-dense-multiline"
							margin="dense"
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
						<TextField
							fullWidth
							label="Address"
							value={state.address}
							onChange={({ target }) => handleChange("address", target.value)}
							id="outlined-dense-multiline"
							margin="dense"
							variant="outlined"
						/>
					</Grid>
				</Grid>

				<br />
				<p style={{ fontSize: 18 }}>Case Specific Details</p>
				<Grid container spacing={2} style={{ marginTop: 5 }}>
					<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
						<TextField
							fullWidth
							label="Case Type"
							value={state.caseType}
							onChange={({ target }) => handleChange("caseType", target.value)}
							id="outlined-dense-multiline"
							margin="dense"
							select
							variant="outlined"
						>
							{caseTypes.map(type => (
								<MenuItem key={type} value={type}>
									{upperFirst(type)}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12} sm={12} style={styles.inputs}>
						<TextField
							fullWidth
							label="Case Description"
							value={state.description}
							onChange={({ target }) =>
								handleChange("description", target.value)
							}
							id="outlined-dense-multiline"
							margin="dense"
							multiline
							rows={4}
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} sm={12} style={styles.inputs}>
						<TextField
							fullWidth
							label="Comments"
							value={state.comments}
							onChange={({ target }) => handleChange("comments", target.value)}
							id="outlined-dense-multiline"
							margin="dense"
							multiline
							rows={4}
							variant="outlined"
						/>
					</Grid>
				</Grid>

				<div>
					<p>Attachments, if any.</p>
					<Button
						variant="contained"
						color="primary"
						onClick={() => newOrderFileUploader.current.click()}
						disabled={state.uploadingAttachment}
					>
						{state.uploadingAttachment
							? "Uploading Assets ..."
							: "Zipped and PDF Only"}
					</Button>
				</div>

				<div
					style={{
						display: "flex",
						flex: 1,
						alignItems: "flex-end",
						justifyContent: "flex-end",
						marginTop: 15
					}}
				>
					<Button
						variant="contained"
						disabled={state.uploadingAttachment || state.loading}
						color="primary"
						onClick={submitCase}
					>
						{state.uploadingAttachment || state.loading
							? "Loading ... "
							: "Confirm Order"}
					</Button>
				</div>

				<input
					ref={newOrderFileUploader}
					className="hidden"
					accept="application/pdf,application/vnd.ms-excel,application/zip,application/x-zip,application/x-zip-compressed"
					type="file"
					onChange={uploadZippedFolder}
				/>
			</Paper>
		</div>
	);
});

function Dashboard({ history }) {
	function openCaseCreate() {
		return history.push("/admin/pre-litigation/new-case/");
    }
    function openCase(caseId) {
        return history.push("/admin/pre-litigation/case/"+caseId);
    }
	return (
		<div>
			<Grid container style={{ marginBottom: "1em" }}>
				<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
					<OverviewCard
						whiteText={false}
						bgColor="#fff"
						title="Open"
						count={43}
					/>
				</Grid>
				<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
					<OverviewCard
						whiteText={false}
						bgColor="#fff"
						title="Pending"
						count={3}
					/>
				</Grid>
				<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
					<OverviewCard
						whiteText={false}
						bgColor="#fff"
						title="Declined"
						count={12}
					/>
				</Grid>
				<Grid item sm={6} md={3}>
					<OverviewCard
						whiteText={false}
						bgColor="#fff"
						title="Completed"
						count={4}
					/>
				</Grid>
			</Grid>

			<Grid container style={{ marginBottom: "1em" }}>
				<Grid item sm>
					<CasesTable onClickCase={openCase} />
				</Grid>
			</Grid>

			<Fab
				onClick={openCaseCreate}
				color="primary"
				style={{ position: "absolute", right: 20, bottom: 20 }}
				aria-label="add"
			>
				<AddIcon />
			</Fab>
		</div>
	);
}

const styles = {
	inputs: { paddingLeft: 3, paddingRight: 3 }
};

export default PreLitigation;
