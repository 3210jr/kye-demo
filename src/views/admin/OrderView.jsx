// @ts-check
import React, {
	Component,
	useState,
	useEffect,
	createRef,
	Fragment
} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { storage } from "firebase";
import { upperFirst, clone, map, omit, padStart } from "lodash";
import uuidV1 from "uuid/v1";
import {
	Paper,
	Typography,
	Button,
	Grid,
	TextField,
	MenuItem
} from "@material-ui/core";
import {
	acceptOrder,
	rejectOrder,
	requestOrderChanges,
	completeOrder,
	persistOrderResults,
	uploadFile
} from "../../utils";

//	importing custom components
import AcademicReports from "./components/OrderView/AcademicQualification";
import PoliceReports from "./components/OrderView/CriminalCheck";
import GapsReports from "./components/OrderView/GapsCheck";
import EmploymentHistoryReports from "./components/OrderView/EmploymentCheck";
import IdentityCheckReports from "./components/OrderView/IdentityCheck";
import CivilLitigation from "./components/OrderView/CivilLitigation";
import SocialMediaSearch from "./components/OrderView/SocialMediaSearch";
import {
	countries,
	KYC_COMPANY_DB_NAME,
	KYC_SHAREHOLDER_ANALYSIS_DB_NAME,
	KYC_ADDITIONAL_INFORMATION_DB_NAME
} from "../../constants";

class OrderView extends Component {
	state = {
		loading: false
	};
	acceptOrder = () => {
		const { match } = this.props;
		const { orderId } = match.params;
		if (window.confirm("Are you sure you want to CONFIRM this order?")) {
			acceptOrder(orderId);
		}
	};

	rejectOrder = () => {
		const { match } = this.props;
		const { orderId } = match.params;
		if (window.confirm("Are you sure you want to REJECT this order?")) {
			rejectOrder(orderId);
		}
	};

	downloadAttachments = () => {
		const { orders, match } = this.props;
		const { orderId } = match.params;
		const order = orders.find(order => order.id === orderId);
		// download the attachment
		storage()
			.refFromURL(order.attachmentURL)
			.getDownloadURL()
			.then(url => window.open(url, "_blank"))
			.catch(error => {
				alert("Error downloading attachments.");
				console.log("Error downloading attachment: ", error);
			});
	};

	completeOrder = () => {
		const { match } = this.props;
		const { orderId } = match.params;
		if (window.confirm("Are you sure you want to COMPLETE this order?")) {
			completeOrder(orderId);
		}
	};

	generateAddress = ({ country, region, district, box }) => {
		return `${
			country
				? country
						.split(" ")
						.map(c => upperFirst(c))
						.join(" ") + ", "
				: ""
		}${region ? region + ", " : ""}${district ? district + ", " : ""}${
			box ? "P.O.Box " + box : ""
		}`;
	};

	isReadyToComplete = () => {
		const { orders, match } = this.props;
		const { orderId } = match.params;

		const order = orders.find(order => order.id === orderId);
		let complete = true;
		if (order) {
			order.screeningTypes.forEach(type => {
				if (!order[type] || Object.keys(order[type]).length === 0) {
					complete = false;
				}
			});
		}

		console.log("Completed: ", complete)
		return complete
	}

	requestChanges = orderId => {
		//
	};
	render() {
		const state = this.state;
		const { orders, match } = this.props;
		const { orderId } = match.params;
		const order = orders.find(order => order.id === orderId);
		console.log(order);
		if (!order) {
			return <div />;
		}
		const { orderType, status } = order;
		return (
			<div>
				<Paper style={{ padding: "1em" }}>
					<div className="flex justify-space-between">
						<Typography variant="h6">{order.organizationName}</Typography>

						{order.status === "pending" ? (
							<div>
								<Button
									variant="contained"
									color="primary"
									style={{ marginRight: 5 }}
									onClick={this.acceptOrder}
									// className=""
								>
									Accept Order
								</Button>
								<Button
									variant="contained"
									color="primary"
									style={{ marginRight: 5 }}
									onClick={this.rejectOrder}
									// className=""
								>
									Decline Order
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={this.requestChanges}
									// className=""
								>
									Request Changes
								</Button>
							</div>
						) : order.status === "in progress" ? (
							<div>
								<Button
									variant="contained"
									color="primary"
									style={{ marginRight: 5 }}
									onClick={this.completeOrder}
									disabled={!this.isReadyToComplete()}
									// className=""
								>
									Complete Order
								</Button>
							</div>
						) : (
							<div />
						)}
					</div>

					<div style={{ marginTop: 10 }}>
						{orderType === "kye" ? (
							<>
								<p>First Name: {order.firstName}</p>
								<p>Middle Name: {order.middleName}</p>
								<p>Last Name: {order.lastName}</p>
								<p>Telephone: {order.telephone}</p>
								<p>Address: {this.generateAddress(order)}</p>
								<p>
									Screening Types <br />
									{order.screeningTypes.map(el => upperFirst(el)).join(", ")}
								</p>
							</>
						) : (
							<>
								<p>Entity under Investigation: {order.customerName}</p>
								<p>Registration No: {order.registrationNumber}</p>
								<p>Tin No: {order.tinNumber}</p>
								<p>Address: {this.generateAddress(order)}</p>
							</>
						)}

						<a
							href={order.assetsURL}
							rel="noopener noreferrer"
							className="no-text-decoration"
							target="_blank"
						>
							<Button
								variant="contained"
								color="primary"
								onClick={this.downloadAttachments}
								// className=""
							>
								Download Attachments
							</Button>
						</a>
					</div>
				</Paper>

				{/* true condition for developments only */}
				{/* to be replaces */}

				{order.status !== "pending" &&
					order.status !== "rejected" &&
					(order.orderType === "kyc" ? (
						<KYCReportsCollection
							downloadAttachment={this.downloadAttachments}
							order={order}
						/>
					) : (
						<KYEReportsCollection order={order} />
					))}

				{/* ))} */}
			</div>
		);
	}
}

function KYCReportsCollection({ order, downloadAttachment }) {
	return (
		<>
			<CompanyAnalysis order={order} />
			<StakeholdersAnalysis order={order} />
			<KYCAddidionalInformation
				downloadAttachment={downloadAttachment}
				order={order}
			/>
		</>
	);
}

function KYCAddidionalInformation({ order, downloadAttachment }) {
	const fileUploaderRef = createRef();
	const [state, setstate] = useState({
		remarksAndAnomalies: "",
		complianceNotes: "",
		loading: false,
		uploadingAttachment: false,
		attachmentsURL: ""
	});

	useEffect(() => {
		const persistedOrder = order[KYC_ADDITIONAL_INFORMATION_DB_NAME];
		const initialState = { ...state, ...persistedOrder };
		setstate(initialState);
	}, []);

	function saveAdditionalInformation() {
		if (state.loading || state.uploadingAttachment) {
			return alert("Please wait while loading ...");
		}
		setstate({ ...state, loading: true });
		const results = omit(state, ["loading", "uploadingAttachment"]);
		persistOrderResults(order.id, KYC_ADDITIONAL_INFORMATION_DB_NAME, results)
			.then(res => {
				alert("Additional Information Saved!");
				setstate({ ...state, loading: false });
			})
			.catch(error => {
				alert("There was an error saving the company analysis");
				setstate({ ...state, loading: false });
				console.log("Error: ", error);
			});
	}

	function handleChange(field, value) {
		state[field] = value;
		return setstate(clone(state));
	}

	function uploadAttachment(evt) {
		if (state.uploadingAttachment) return;
		const file = evt.target.files[0];

		setstate({ ...state, uploadingAttachment: true });
		uploadFile(file, "supporting-documents")
			.then(res => {
				res.ref.getDownloadURL().then(url =>
					setstate({
						...state,
						uploadingAttachment: false,
						attachmentsURL: url
					})
				);
			})
			.catch(error => {
				alert("There was an error uploading your assets, please try again");
				console.log(error);
				setstate({ uploadingAttachment: false });
			});
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Additional Information</Typography>

			<Grid container style={{ marginTop: 5 }}>
				<Grid item xs={12} sm={12} md={6} style={styles.inputs}>
					<TextField
						fullWidth
						label="Remarks and Anomalies"
						value={state.remarksAndAnomalies}
						onChange={({ target }) =>
							handleChange("remarksAndAnomalies", target.value)
						}
						id=""
						margin="dense"
						multiline
						rows={5}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6} style={styles.inputs}>
					<TextField
						fullWidth
						label="Compliance Notes"
						value={state.complianceNotes}
						onChange={({ target }) =>
							handleChange("complianceNotes", target.value)
						}
						id=""
						margin="dense"
						multiline
						rows={5}
						variant="outlined"
					/>
				</Grid>
			</Grid>

			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs={12} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<p style={{ fontSize: 18 }}>
						Attach any supporting documents such as an in depth report,
						certificates, scanned Identification, statements, etc.
					</p>
				</Grid>
				<Grid item xs={2} sm={2} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Button
						fullWidth
						variant="contained"
						color="default"
						onClick={() => fileUploaderRef.current.click()}
					>
						{state.uploadingAttachment
							? "Uploading..."
							: state.attachmentsURL && state.attachmentsURL.length > 0
							? "Update Supporting Documents"
							: "Upload Supporting Documents"}
					</Button>
				</Grid>

				<Grid item xs={2} sm={2} style={{ paddingLeft: 3, paddingRight: 3 }}>
					{state.attachmentsURL && state.attachmentsURL.length > 3 && (
						<Button onClick={() => downloadAttachment(state)} color="primary">
							Download Supporting Documents
						</Button>
					)}
				</Grid>
			</Grid>

			<Grid container spacing={3} style={{ marginTop: 10 }}>
				<Grid item xs={2} sm={2} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						disabled={state.uploadingAttachment}
						onClick={saveAdditionalInformation}
					>
						{state.loading ? "Loading" : "Save"}
					</Button>
				</Grid>
			</Grid>

			<input
				type="file"
				accept="application/pdf,application/vnd.ms-excel,application/zip,application/x-zip,application/x-zip-compressed"
				ref={fileUploaderRef}
				onChange={uploadAttachment}
				id="attachmentUploader"
				className="hidden"
			/>
		</Paper>
	);
}

function StakeholdersAnalysis({ order }) {
	const shareholderItem = {
		fullName: "",
		telephone: "",
		telephoneCode: "+255",
		nationality: "tanzania",
		idType: "",
		idNumber: "",
		idExpiry: ""
	};
	const directorItem = {
		fullName: "",
		telephone: "",
		telephoneCode: "+255",
		nationality: "tanzania",
		idType: "",
		idNumber: "",
		idExpiry: ""
	};
	const [state, setstate] = useState({
		shareholders: {
			[uuidV1()]: shareholderItem
		},
		directors: {
			[uuidV1()]: directorItem
		},
		loading: false
	});

	useEffect(() => {
		const persistedOrder = order[KYC_SHAREHOLDER_ANALYSIS_DB_NAME];
		const initialState = { ...state, ...persistedOrder };
		setstate(initialState);
	}, []);

	function updateEmbeddedField(container, key, field, evt) {
		const stateClone = clone(state);
		stateClone[container][key][field] = evt.target.value;
		setstate(stateClone);
	}

	function addShareholder() {
		setstate({
			...state,
			shareholders: { ...state.shareholders, [uuidV1()]: shareholderItem }
		});
	}

	function addDirector() {
		setstate({
			...state,
			directors: { ...state.directors, [uuidV1()]: directorItem }
		});
	}

	function removeEmbeded(type, id) {
		const stateClone = clone(state);
		delete stateClone[type][id];
		setstate(stateClone);
	}

	function handleChange(field, value) {
		state[field] = value;
		return setstate(clone(state));
	}

	function saveStakeholderAnalysis() {
		if (state.loading) {
			return alert("Please wait while loading ...");
		}
		setstate({ ...state, loading: true });
		const results = omit(state, ["loading"]);
		persistOrderResults(order.id, KYC_SHAREHOLDER_ANALYSIS_DB_NAME, results)
			.then(res => {
				alert("Shareholder Analysis Saved!");
				setstate({ ...state, loading: false });
			})
			.catch(error => {
				alert("There was an error saving the company analysis");
				setstate({ ...state, loading: false });
				console.log("Error: ", error);
			});
	}

	function formatCountry(country) {
		return country
			.split(" ")
			.map(c => upperFirst(c))
			.join(" ");
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Stakeholder Analysis</Typography>

			<br />
			<Typography style={{ fontSize: 18 }} component="p">
				Shareholders &nbsp;{" "}
				<Button onClick={addShareholder} size="small" color="primary">
					+ Add Shareholder
				</Button>
			</Typography>

			{map(state.shareholders, (holder, key) => (
				<div style={{ marginBottom: 5 }} key={key}>
					<Grid container style={{ marginTop: 5 }}>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="Full Name"
								value={holder.fullName}
								onChange={evt =>
									updateEmbeddedField("shareholders", key, "fullName", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={4} md={2} lg={1} style={styles.inputs}>
							<TextField
								id="telephoneCode"
								label="Tel. Code"
								// className={classes.textField}
								variant="outlined"
								value={holder.telephoneCode}
								fullWidth
								onChange={evt =>
									updateEmbeddedField("shareholders", key, "telephoneCode", evt)
								}
								margin="dense"
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="Telephone Number"
								value={holder.telephone}
								onChange={evt =>
									updateEmbeddedField("shareholders", key, "telephone", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="Nationality"
								value={holder.nationality}
								onChange={evt =>
									updateEmbeddedField("shareholders", key, "nationality", evt)
								}
								id=""
								margin="dense"
								select
								variant="outlined"
							>
								{countries.map(country => (
									<MenuItem key={`${key}___${country}`} value={country}>
										{formatCountry(country)}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid key={key} container style={{ marginTop: 5 }}>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="Id Type"
								select
								value={holder.idType}
								onChange={evt =>
									updateEmbeddedField("shareholders", key, "idType", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							>
								<MenuItem value={"national-identification"}>
									National Identification (NIDA)
								</MenuItem>
								<MenuItem value={"passport"}>Passport</MenuItem>
								<MenuItem value={"voter-id"}>Voters ID</MenuItem>
								<MenuItem value={"birth-certificate"}>
									Birth Certificate
								</MenuItem>
								<MenuItem value={"drivers-license"}>Drivers License</MenuItem>
								<MenuItem value={"school-id"}>School ID</MenuItem>
								<MenuItem value={"social-security"}>
									Social Security Number
								</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="ID Number"
								value={holder.idNumber}
								onChange={evt =>
									updateEmbeddedField("shareholders", key, "idNumber", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="ID Expiry Date"
								type="date"
								value={holder.idExpiry}
								onChange={evt =>
									updateEmbeddedField("shareholders", key, "idExpiry", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
						{Object.keys(state.shareholders).length > 1 && (
							<div
								style={{
									display: "flex",
									height: "100%",
									alignItems: "center"
								}}
							>
								<Button
									onClick={() => removeEmbeded("shareholders", key)}
									size="small"
									color="secondary"
								>
									- Remove
								</Button>
							</div>
						)}
					</Grid>
				</div>
			))}

			<br />
			<br />
			<Typography style={{ fontSize: 18 }} component="p">
				Directors &nbsp;{" "}
				<Button onClick={addDirector} size="small" color="primary">
					+ Add Director
				</Button>
			</Typography>

			{map(state.directors, (director, key) => (
				<div style={{ marginBottom: 5 }} key={key}>
					<Grid container style={{ marginTop: 5 }}>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="Full Name"
								value={director.fullName}
								onChange={evt =>
									updateEmbeddedField("directors", key, "fullName", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={4} md={2} lg={1} style={styles.inputs}>
							<TextField
								id="telephoneCode"
								label="Tel. Code"
								// className={classes.textField}
								variant="outlined"
								value={director.telephoneCode}
								fullWidth
								onChange={evt =>
									updateEmbeddedField("directors", key, "telephoneCode", evt)
								}
								margin="dense"
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="Telephone Number"
								value={director.telephone}
								onChange={evt =>
									updateEmbeddedField("directors", key, "telephone", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="Nationality"
								value={director.nationality}
								onChange={evt =>
									updateEmbeddedField("directors", key, "nationality", evt)
								}
								id=""
								margin="dense"
								select
								variant="outlined"
							>
								{countries.map(country => (
									<MenuItem key={`${key}___${country}`} value={country}>
										{formatCountry(country)}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid key={key} container style={{ marginTop: 5 }}>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="Id Type"
								select
								value={director.idType}
								onChange={evt =>
									updateEmbeddedField("directors", key, "idType", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							>
								<MenuItem value={"national-identification"}>
									National Identification (NIDA)
								</MenuItem>
								<MenuItem value={"passport"}>Passport</MenuItem>
								<MenuItem value={"voter-id"}>Voters ID</MenuItem>
								<MenuItem value={"birth-certificate"}>
									Birth Certificate
								</MenuItem>
								<MenuItem value={"drivers-license"}>Drivers License</MenuItem>
								<MenuItem value={"school-id"}>School ID</MenuItem>
								<MenuItem value={"social-security"}>
									Social Security Number
								</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="ID Number"
								value={director.idNumber}
								onChange={evt =>
									updateEmbeddedField("directors", key, "idNumber", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
							<TextField
								fullWidth
								label="ID Expiry Date"
								type="date"
								value={director.idExpiry}
								onChange={evt =>
									updateEmbeddedField("directors", key, "idExpiry", evt)
								}
								id=""
								margin="dense"
								variant="outlined"
							/>
						</Grid>
					</Grid>
					{/* <Grid item xs={12} sm={12} md={3} style={styles.inputs}>
						{Object.keys(state.directors).length > 1 && (
							<div
								style={{
									display: "flex",
									height: "100%",
									alignItems: "center"
								}}
							>
								<Button
									onClick={() => removeEmbeded("directors", key)}
									size="small"
									color="secondary"
								>
									- Remove
								</Button>
							</div>
						)}
					</Grid> */}
					<Grid item xs={12} sm={12} md={3} style={styles.inputs}>
						{Object.keys(state.directors).length > 1 && (
							<div
								style={{
									display: "flex",
									height: "100%",
									alignItems: "center"
								}}
							>
								<Button
									onClick={() => removeEmbeded("directors", key)}
									size="small"
									color="secondary"
								>
									- Remove
								</Button>
							</div>
						)}
					</Grid>
				</div>
			))}

			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs={2} sm={2} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={saveStakeholderAnalysis}
					>
						{state.loading ? "Loading" : "Save"}
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}

function CompanyAnalysis({ order }) {
	const [state, setstate] = useState({
		companyName: "",
		registrationNumber: "",
		annualReturns: "",
		incorporationDate: new Date().getTime(),
		placeOfBusiness: "",
		shareCapital: 0,
		registeredCharges: 0,
		chargeEntityNames: "",
		overallRating: "good",
		loading: false
	});

	useEffect(() => {
		const persistedOrder = order[KYC_COMPANY_DB_NAME];
		if (persistedOrder) {
			persistedOrder["incorporationDate"] = new Date(
				persistedOrder["incorporationDate"]
			).getTime();
		}

		const initialState = { ...state, ...persistedOrder };
		setstate(initialState);
	}, []);

	function handleChange(field, value) {
		state[field] = value;
		return setstate(clone(state));
	}

	function formatIncDate(date) {
		const dateObj = new Date(date);

		const strDate = `${dateObj.getFullYear()}-${padStart(
			(dateObj.getMonth() + 1).toString(),
			2,
			"0"
		)}-${padStart(dateObj.getDate().toString(), 2, "0")}`;
		return strDate;
	}

	function saveCompanyAnalysis() {
		if (state.loading) {
			return alert("Please wait while loading ...");
		}
		setstate({ ...state, loading: true });
		const results = omit(state, ["loading"]);
		// results.incorporationDate = new Date(state.incorporationDate).getTime();
		persistOrderResults(order.id, KYC_COMPANY_DB_NAME, results)
			.then(res => {
				alert("Company Analysis Saved!");
				setstate({ ...state, loading: false });
			})
			.catch(error => {
				alert("There was an error saving the company analysis");
				setstate({ ...state, loading: false });
				console.log("Error: ", error);
			});
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Company Analysis</Typography>

			<Grid container style={{ marginTop: 5 }}>
				<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
					<TextField
						fullWidth
						label="Company Name"
						value={state.companyName}
						onChange={({ target }) => handleChange("companyName", target.value)}
						id=""
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
						id=""
						margin="dense"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
					<TextField
						fullWidth
						label="Incorporation Date"
						value={formatIncDate(state.incorporationDate)}
						onChange={({ target }) =>
							handleChange(
								"incorporationDate",
								new Date(target.value).getTime()
							)
						}
						id=""
						margin="dense"
						type="date"
						variant="outlined"
					/>
				</Grid>
			</Grid>

			<Grid container style={{ marginTop: 5 }}>
				<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
					<TextField
						fullWidth
						label="Share Capital"
						value={state.shareCapital}
						onChange={({ target }) =>
							handleChange("shareCapital", target.value)
						}
						id=""
						margin="dense"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
					<TextField
						fullWidth
						label="Anual Returns Filed"
						value={state.annualReturns}
						onChange={({ target }) =>
							handleChange("annualReturns", target.value)
						}
						id=""
						margin="dense"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
					<TextField
						fullWidth
						label="Principle place of Business"
						value={state.placeOfBusiness}
						onChange={({ target }) =>
							handleChange("placeOfBusiness", target.value)
						}
						id=""
						margin="dense"
						variant="outlined"
					/>
				</Grid>
			</Grid>

			<Grid container style={{ marginTop: 5 }}>
				<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
					<TextField
						fullWidth
						label="Registered Charges"
						type="number"
						value={state.registeredCharges}
						onChange={({ target }) =>
							handleChange("registeredCharges", target.value)
						}
						id=""
						margin="dense"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
					<TextField
						fullWidth
						label="Entity Names"
						value={state.chargeEntityNames}
						onChange={({ target }) =>
							handleChange("chargeEntityNames", target.value)
						}
						id=""
						margin="dense"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4} style={styles.inputs}>
					<TextField
						fullWidth
						label="Track Record / Overall performance"
						value={state.overallRating}
						onChange={({ target }) =>
							handleChange("overallRating", target.value)
						}
						id=""
						margin="dense"
						select
						variant="outlined"
					>
						<MenuItem value="good">Good</MenuItem>
						<MenuItem value="normal">Normal</MenuItem>
						<MenuItem value="bad">Bad</MenuItem>
					</TextField>
				</Grid>
			</Grid>

			<Grid container style={{ marginTop: 5 }}>
				<Grid item xs={2} sm={2} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={saveCompanyAnalysis}
					>
						{state.loading ? "Loading" : "Save"}
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}

function KYEReportsCollection({ order }) {
	return (
		<>
			{order.screeningTypes.includes("police-reports") && (
				<PoliceReports type="police-reports" order={order} />
			)}
			{order.screeningTypes.includes("gaps-reports") && (
				<GapsReports type="gaps-reports" order={order} />
			)}
			{order.screeningTypes.includes("identification") && (
				<IdentityCheckReports type="identification" order={order} />
			)}
			{order.screeningTypes.includes("civil-litigation") && (
				<CivilLitigation type="civil-litigation" order={order} />
			)}
			{order.screeningTypes.includes("employment-history") && (
				<EmploymentHistoryReports type="employment-history" order={order} />
			)}
			{order.screeningTypes.includes("academic-qualifications") && (
				<AcademicReports type="academic-qualifications" order={order} />
			)}
			{order.screeningTypes.includes("social-media") && (
				<SocialMediaSearch type="social-media" order={order} />
			)}
		</>
	);
}

const styles = {
	inputs: { paddingLeft: 3, paddingRight: 3 }
};

OrderView.propTypes = {
	orders: PropTypes.instanceOf(Object).isRequired
};

const mapState = state => ({
	profile: state.profile,
	orders: state.orders.orders
});

export default connect(mapState)(OrderView);
