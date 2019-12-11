// @ts-check
import React, { Component, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { upperFirst, omit } from "lodash";
import PropTypes from "prop-types";
import {
	Grid,
	Typography,
	FormControl,
	TextField,
	InputLabel,
	Button,
	Card,
	CardContent,
	Checkbox,
	FormControlLabel,
	Select,
	MenuItem
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { uploadFile, createOrder, createKYCOrder } from "../utils";
import { countryList } from "../constants/countries";

const months = [
	"january",
	"febuary",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december"
];

const styles = theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap",
		flex: 1
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		marginTop: 0,
		width: "100%"
	},
	cardSection: {
		paddingRight: theme.spacing.unit,
		width: "100%",
		marginBottom: 15
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)"
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	formControl: {
		margin: 0,
		minWidth: 120,
		width: "100%"
	}
});

class NewOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			openMonthPicker: false,
			orderType: "kyc", // "not-set", // kyc, kye, not-set
			firstName: "",
			lastName: "",
			middleName: "",
			telephone: "",
			telephoneCode: "+255",
			// nidaNumber: "",
			dateOfBirth: "",
			// monthOfBirth: "january",
			// yearOfBirth: 1990,
			// address: "",
			idType: "national-identification",
			idNumber: "",
			idExpiry: "",
			country: "tanzania",
			region: "",
			box: "",
			district: "",
			gender: "male",
			screeningTypes: [],
			assetsURL: "",
			uploadingAssets: false,
			loading: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.toggleGenderDropDown = this.toggleGenderDropDown.bind(this);
		this.fileUploaderRef = React.createRef();
	}
	componentDidMount() {
		// FIXME: No longer needed because we are not going to be routing to this page
		// with half entered details from another page
		const { location } = this.props;
		const routeState = !!location.state ? location.state : {};
		console.log("Route State: ", routeState);

		this.setState({
			firstName: routeState.firstName || "",
			lastName: routeState.lastName || "",
			middleName: routeState.middleName || "",
			dateOfBirth: routeState.dateOfBirth || 1,
			// address: routeState.address || "",
			gender: routeState.gender || ""
		});
	}
	uploadZippedFolder = evt => {
		const file = evt.target.files[0];
		this.setState({ uploadingAssets: true });
		uploadFile(file, "kye-order-assets")
			.then(res => {
				res.ref
					.getDownloadURL()
					.then(url =>
						this.setState({ uploadingAssets: false, assetsURL: url })
					);
			})
			.catch(error => {
				alert("There was an error uploading your assets, please try again");
				console.log(error);
				this.setState({ uploadingAssets: false });
			});
	};
	toggleScreeningType = type => {
		const { screeningTypes } = this.state;
		if (screeningTypes.includes(type)) {
			screeningTypes.splice(screeningTypes.indexOf(type), 1);
		} else {
			screeningTypes.push(type);
		}
		this.setState({ screeningTypes });
	};
	handleChange(field, evt) {
		// if (field === "dateOfBirth") {
		// 	return this.setState(prevState => (prevState[field] = evt));
		// }
		console.log(field, evt.target.value);
		const update = evt.target.value;
		this.setState(prevState => (prevState[field] = update));
	}
	toggleGenderDropDown() {
		this.setState(prevState => ({ open: !prevState.open }));
	}
	toggleMonthDropDown = () => {
		this.setState(prevState => ({
			openMonthPicker: !prevState.openMonthPicker
		}));
	};
	createOrder = () => {
		const {
			firstName,
			lastName,
			middleName,
			dateOfBirth,
			telephoneCode,
			// monthOfBirth,
			// yearOfBirth,
			// address,
			gender,
			screeningTypes,
			assetsURL,
			loading,
			telephone,
			idType,
			idNumber,
			country,
			region,
			box,
			district,
			idExpiry,
			uploadingAssets
		} = this.state;
		const { profile, history } = this.props;
		if (loading || uploadingAssets) {
			alert("Please wait while loading");
			return;
		}

		if (assetsURL.length < 5) {
			alert("Please upload the zipped folder with all required documents");
			return;
		}

		if (
			idNumber.length < 8 &&
			!window.confirm(
				"Are you sure you want to continue without entering a valid NIDA Number?"
			)
		) {
			return;
		}

		this.setState({ loading: true });
		createOrder({
			firstName,
			lastName,
			middleName,
			telephoneCode,
			telephone,
			dateOfBirth: new Date(dateOfBirth),
			// address,
			gender,
			screeningTypes,
			assetsURL,
			idType,
			idNumber,
			country,
			region,
			box,
			district,
			idExpiry,
			organizationId: profile.organizationId,
			organizationName: profile.organizationName
		})
			.then(res => {
				this.setState({ loading: false });
				if (profile.admin) {
					return history.push("/admin");
				}
				history.push("/dashboard/my-orders");
			})
			.catch(error => {
				alert("There was an error creating a new order!");
				console.log("Error: ", error);
				this.setState({ loading: false });
			});
	};
	render() {
		const { classes, history, profile } = this.props;
		const {
			orderType,
			open,
			openMonthPicker,
			firstName,
			lastName,
			middleName,
			telephoneCode,
			telephone,
			idType,
			idNumber,
			idExpiry,
			country,
			region,
			district,
			box,
			dateOfBirth,
			// monthOfBirth,
			// yearOfBirth,
			// address,
			gender,
			screeningTypes,
			uploadingAssets,
			loading
		} = this.state;
		return (
			<div>
				<Grid container style={{ marginBottom: 15 }}>
					<Typography variant="h4" color="textSecondary" component="h2">
						New Order:
					</Typography>
				</Grid>
				<Card className={classes.cardSection}>
					<CardContent>
						<Typography variant="h5" component="h4">
							Order Type
						</Typography>
						<Typography>
							Please choose they type of order/investigation you want to
							perform. We support customer and employee verificaion, profiling
							and vetting for all your needs.
						</Typography>
					</CardContent>
					<CardContent>
						<InputLabel
							id="order-type-picker-label"
							style={{ marginRight: 10 }}
						>
							Order Type:{" "}
						</InputLabel>

						<Select
							labelId="order-type-picker-label"
							id="order-type-picker"
							value={orderType}
							style={{ width: 200 }}
							onChange={evt => this.setState({ orderType: evt.target.value })}
						>
							<MenuItem value={"not-set"}>Choose order Type</MenuItem>
							<MenuItem value={"kye"}>Know Your Employee</MenuItem>
							<MenuItem value={"kyc"}>Know Your Customer</MenuItem>
						</Select>
					</CardContent>
				</Card>

				{orderType === "kyc" && (
					<KYCOrderForm classes={classes} profile={profile} history={history} />
				)}

				{orderType === "kye" && (
					<div>
						<Card className={classes.cardSection}>
							<CardContent>
								<Typography variant="h5" component="h4">
									Candidate Details
								</Typography>

								<form
									className={classes.container}
									noValidate
									autoComplete="off"
								>
									<Grid container spacing={24}>
										<Grid item xs={12} md={4}>
											<TextField
												id="first-name"
												label="First Name"
												className={classes.textField}
												value={firstName}
												onChange={evt => this.handleChange("firstName", evt)}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												id="middle-name"
												label="Middle Name"
												className={classes.textField}
												value={middleName}
												onChange={evt => this.handleChange("middleName", evt)}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												id="last-name"
												label="Last Name"
												className={classes.textField}
												value={lastName}
												onChange={evt => this.handleChange("lastName", evt)}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={4} md={2} lg={1}>
											<TextField
												id="telephoneCode"
												label="Tel. Code"
												className={classes.textField}
												value={telephoneCode}
												onChange={evt =>
													this.handleChange("telephoneCode", evt)
												}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={8} md={2} lg={3}>
											<TextField
												id="telephone"
												label="Telephone Number"
												className={classes.textField}
												value={telephone}
												onChange={evt => this.handleChange("telephone", evt)}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											{/* <Grid container> */}
											{/* <Grid item xs={12} md={4}> */}
											<TextField
												id="dateOfBirth"
												label="Date of Birth"
												type="date"
												className={classes.textField}
												value={dateOfBirth}
												onChange={evt => this.handleChange("dateOfBirth", evt)}
												margin="normal"
											/>
											{/* </Grid> */}
											{/* <Grid item xs={12} md={4}> */}
											{/* <FormControl className={classes.formControl}>
														<InputLabel htmlFor="month-of-year-selector">
															Month
														</InputLabel>
														<Select
															open={openMonthPicker}
															onClose={this.toggleMonthDropDown}
															onOpen={this.toggleMonthDropDown}
															value={monthOfBirth}
															onChange={evt =>
																this.handleChange("monthOfBirth", evt)
															}
															inputProps={{
																name: "monthOfBirth",
																id: "month-of-year-selector"
															}}
														>
															{months.map(month => (
																<MenuItem key={month} value={month}>
																	{upperFirst(month)}
																</MenuItem>
															))}
														</Select>
													</FormControl> */}
											{/* <TextField
												id="monthOfBirth"
												label="Month of Birth"
												className={classes.textField}
												value={monthOfBirth}
												// onChange={this.handleChange("name")}
												margin="normal"
											/> */}
											{/* </Grid> */}
											{/* <Grid item xs={12} md={4}>
													<TextField
														id="yearOfBirth"
														label="Year of Birth"
														className={classes.textField}
														value={yearOfBirth}
														onChange={evt =>
															this.handleChange("yearOfBirth", evt)
														}
														margin="normal"
													/>
												</Grid> */}
											{/* </Grid> */}
										</Grid>
										<Grid item xs={12} md={4}>
											<FormControl className={classes.formControl}>
												<InputLabel htmlFor="demo-controlled-open-select">
													Gender
												</InputLabel>
												<Select
													open={open}
													onClose={this.toggleGenderDropDown}
													onOpen={this.toggleGenderDropDown}
													value={gender}
													onChange={evt => this.handleChange("gender", evt)}
													inputProps={{
														name: "gender",
														id: "demo-controlled-open-select"
													}}
												>
													<MenuItem value={"male"}>Male</MenuItem>
													<MenuItem value={"female"}>Female</MenuItem>
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												onChange={evt => this.handleChange("idType", evt)}
												label="ID Type"
												value={idType}
												fullWidth
												select
											>
												<MenuItem value={"national-identification"}>
													National Identification (NIDA)
												</MenuItem>
												<MenuItem value={"passport"}>Passport</MenuItem>
												<MenuItem value={"voter-id"}>Voters ID</MenuItem>
												<MenuItem value={"birth-certificate"}>
													Birth Certificate
												</MenuItem>
												<MenuItem value={"drivers-license"}>
													Drivers License
												</MenuItem>
												<MenuItem value={"school-id"}>School ID</MenuItem>
												<MenuItem value={"social-security"}>
													Social Security Number
												</MenuItem>
											</TextField>
											{/* <FormControl className={classes.formControl}>
												<InputLabel htmlFor="demo-controlled-open-select">
													ID Type
												</InputLabel>
												<Select
													open={open}
													onClose={this.toggleGenderDropDown}
													onOpen={this.toggleGenderDropDown}
													value={gender}
													onChange={evt => this.handleChange("gender", evt)}
													inputProps={{
														name: "gender",
														id: "demo-controlled-open-select"
													}}
												>
													<MenuItem value={"national-identification"}>
														National Identification (NIDA)
													</MenuItem>
													<MenuItem value={"passport"}>Passport</MenuItem>
													<MenuItem value={"voter-id"}>Voters ID</MenuItem>
													<MenuItem value={"drivers-license"}>
														Drivers License
													</MenuItem>
													<MenuItem value={"school-id"}>School ID</MenuItem>
													<MenuItem value={"social-security"}>
														Social Security Number
													</MenuItem>
												</Select>
											</FormControl> */}
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												id="nida-number"
												label="Identification Number"
												className={classes.textField}
												value={idNumber}
												onChange={evt => this.handleChange("idNumber", evt)}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												id="id-expiry"
												label="Identification Expiry Date"
												className={classes.textField}
												type="date"
												value={idExpiry}
												onChange={evt => this.handleChange("idExpiry", evt)}
												margin="normal"
											/>
										</Grid>
										{/* <Grid item xs={12} md={4}>
											<TextField
												id="address"
												label="Address"
												className={classes.textField}
												value={address}
												onChange={evt => this.handleChange("address", evt)}
												margin="normal"
											/>
										</Grid> */}
										<Grid item xs={12} md={4}>
											<TextField
												onChange={evt => this.handleChange("country", evt)}
												label="Country"
												value={country}
												fullWidth
												select
											>
												{countryList.map(country => (
													<MenuItem key={country} value={country.toLowerCase()}>
														{country}
													</MenuItem>
												))}
											</TextField>
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												id="region"
												label="Region (optional)"
												className={classes.textField}
												value={region}
												onChange={evt => this.handleChange("region", evt)}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												id="district"
												label="District (optional)"
												className={classes.textField}
												value={district}
												onChange={evt => this.handleChange("district", evt)}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												id="pobox"
												label="P.O.Box (optional)"
												className={classes.textField}
												value={box}
												onChange={evt => this.handleChange("box", evt)}
												margin="normal"
											/>
										</Grid>
									</Grid>
								</form>
							</CardContent>
						</Card>
						<Card className={classes.cardSection}>
							<CardContent>
								<Typography variant="h5" component="h4">
									Screening Types
								</Typography>

								<Grid container spacing={24}>
									<Grid item xs={12} md={3}>
										<FormControlLabel
											control={
												<Checkbox
													checked={screeningTypes.includes("identification")}
													onChange={() =>
														this.toggleScreeningType("identification")
													}
													value="checkedB"
													color="primary"
												/>
											}
											label="Identification"
										/>
									</Grid>
									<Grid item xs={12} md={3}>
										<FormControlLabel
											control={
												<Checkbox
													checked={screeningTypes.includes(
														"employment-history"
													)}
													onChange={() =>
														this.toggleScreeningType("employment-history")
													}
													value="checkedB"
													color="primary"
												/>
											}
											label="Employment history & verification"
										/>
									</Grid>
									<Grid item xs={12} md={3}>
										<FormControlLabel
											control={
												<Checkbox
													checked={screeningTypes.includes(
														"academic-qualifications"
													)}
													onChange={evt =>
														this.toggleScreeningType("academic-qualifications")
													}
													value="checkedB"
													color="primary"
												/>
											}
											label="Academic Qualifications"
										/>
									</Grid>
									<Grid item xs={12} md={3}>
										<FormControlLabel
											control={
												<Checkbox
													checked={screeningTypes.includes("police-reports")}
													onChange={evt =>
														this.toggleScreeningType("police-reports")
													}
													value="checkedB"
													color="primary"
												/>
											}
											label="Police Reports"
										/>
									</Grid>

									<Grid item xs={12} md={3}>
										<FormControlLabel
											control={
												<Checkbox
													checked={screeningTypes.includes("gaps-reports")}
													onChange={evt =>
														this.toggleScreeningType("gaps-reports")
													}
													value="checkedB"
													color="primary"
												/>
											}
											label="Gaps Reports"
										/>
									</Grid>

									<Grid item xs={12} md={3}>
										<FormControlLabel
											control={
												<Checkbox
													checked={screeningTypes.includes("civil-litigation")}
													onChange={evt =>
														this.toggleScreeningType("civil-litigation")
													}
													value="litigation"
													color="primary"
												/>
											}
											label="Civil Litigation"
										/>
									</Grid>

									<Grid item xs={12} md={3}>
										<FormControlLabel
											control={
												<Checkbox
													checked={screeningTypes.includes("social-media")}
													onChange={evt =>
														this.toggleScreeningType("social-media")
													}
													value="social-media"
													color="primary"
												/>
											}
											label="Social Media"
										/>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
						<Card className={classes.cardSection}>
							<CardContent>
								<Typography variant="h5" component="h4">
									Supporting Documents
								</Typography>

								<Typography variant="h6" component="p">
									Please send us a copy of the following documents
								</Typography>

								<ol>
									<li>
										<Typography variant="body1" component="p">
											Applicant Signing of Consent forms
										</Typography>
									</li>
									<li>
										<Typography variant="body1" component="p">
											Proof of identity and address
										</Typography>
									</li>
									<li>
										<Typography variant="body1" component="p">
											Details of Education and employment
										</Typography>
									</li>
									<li>
										<Typography variant="body1" component="p">
											Professional Certificates
										</Typography>
									</li>
								</ol>

								<div>
									<Button
										variant="contained"
										color="primary"
										onClick={() => this.fileUploaderRef.current.click()}
										disabled={uploadingAssets}
										className={[classes.button, "primary"]}
									>
										{uploadingAssets
											? "Uploading Assets ..."
											: "Zipped and PDF Only"}
									</Button>
								</div>
							</CardContent>
						</Card>

						<div
							style={{
								display: "flex",
								flex: 1,
								alignItems: "flex-end",
								justifyContent: "flex-end"
							}}
						>
							<Button
								variant="contained"
								disabled={uploadingAssets || loading}
								color="primary"
								onClick={this.createOrder}
								className={[classes.button, "primary"]}
							>
								{uploadingAssets || loading
									? "Uploading files ... "
									: "Confirm Order"}
							</Button>
						</div>

						<input
							ref={this.fileUploaderRef}
							className="hidden"
							accept="application/pdf,application/vnd.ms-excel,application/zip,application/x-zip,application/x-zip-compressed"
							type="file"
							onChange={this.uploadZippedFolder}
						/>
					</div>
				)}
			</div>
		);
	}
}

const newOrderFileUploader = React.createRef();

function KYCOrderForm({ classes, profile, history }) {
	const [state, setstate] = useState({
		customerName: "",
		registeretedOrganization: true,
		registrationNumber: "",
		tinNumber: "",
		attachmentURL: "",
		address: "",
		country: "tanzania",
		region: "",
		box: "",
		district: "",
		uploadingAttachment: false,
		notes: "",
		loading: false
	});

	function updateText(field, evt) {
		return setstate({ ...state, [field]: evt.target.value });
	}

	// FIXME: Abstract out! Repeated way too much time!
	function uploadZippedFolder(evt) {
		const file = evt.target.files[0];
		setstate({ ...state, loading: true, uploadingAttachment: true });
		uploadFile(file, "kyc-order-assets")
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

	function createOrder() {
		if (state.uploadingAttachment || state.loading) return;
		const order = omit(state, ["uploadingAttachment", "loading"]);
		setstate({ ...state, loading: false });
		return createKYCOrder({
			...order,
			organizationId: profile.organizationId,
			organizationName: profile.organizationName
		})
			.then(res => {
				setstate({ ...state, loading: false });
				alert("New Order Created");
				if (profile.admin) {
					return history.push("/admin");
				}
				history.push("/dashboard/my-orders");
			})
			.catch(error => {
				console.log("Error: ", error);
				alert("Error creating new order");
				setstate({ ...state, loading: false });
			});
	}

	return (
		<div>
			<Card className={classes.cardSection}>
				<CardContent>
					<Typography variant="h5" component="h4">
						Customer Details
					</Typography>

					<form className={classes.container} noValidate autoComplete="off">
						<Grid container spacing={24}>
							<Grid item xs={12} md={4}>
								<TextField
									id="customer-name"
									label="Customer Name"
									className={classes.textField}
									value={state.customerName}
									onChange={evt => updateText("customerName", evt)}
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									id="registrations-number"
									label="Registration Number"
									className={classes.textField}
									value={state.registrationNumber}
									onChange={evt => updateText("registrationNumber", evt)}
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									id="tin-number"
									label="Tin Number"
									className={classes.textField}
									value={state.tinNumber}
									onChange={evt => updateText("tinNumber", evt)}
									margin="normal"
								/>
							</Grid>
							{/* <Grid item xs={12} md={4}>
								<TextField
									id="address"
									label="Address"
									className={classes.textField}
									value={state.address}
									onChange={evt => updateText("address", evt)}
									margin="normal"
								/>
							</Grid> */}
							<Grid item xs={12} md={4}>
								<TextField
									onChange={evt => updateText("country", evt)}
									label="Country"
									value={state.country}
									fullWidth
									select
								>
									{countryList.map(country => (
										<MenuItem key={country} value={country.toLowerCase()}>
											{country}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									id="region"
									label="Region (optional)"
									className={classes.textField}
									value={state.region}
									onChange={evt => updateText("region", evt)}
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									id="district"
									label="District (optional)"
									className={classes.textField}
									value={state.district}
									onChange={evt => updateText("district", evt)}
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									id="pobox"
									label="P.O.Box (optional)"
									className={classes.textField}
									value={state.box}
									onChange={evt => updateText("box", evt)}
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12} md={8}>
								<TextField
									id="notes"
									label="Notes"
									className={classes.textField}
									value={state.notes}
									onChange={evt => updateText("notes", evt)}
									margin="normal"
								/>
							</Grid>
						</Grid>
					</form>
				</CardContent>
			</Card>

			<Card className={classes.cardSection}>
				<CardContent>
					<Typography variant="h5" component="h4">
						Supporting Documents
					</Typography>

					<Typography variant="h6" component="p">
						Please send us a copy of any relevant supporting documents if
						available. This could include:
					</Typography>

					<ol>
						<li>
							<Typography variant="body1" component="p">
								Any agreements and contracts
							</Typography>
						</li>
						<li>
							<Typography variant="body1" component="p">
								Any certificates (BRELA, TRA, etc)
							</Typography>
						</li>
						<li>
							<Typography variant="body1" component="p">
								Memorandum & Articles of Associaion
							</Typography>
						</li>
					</ol>

					<div>
						<Button
							variant="contained"
							color="primary"
							onClick={() => newOrderFileUploader.current.click()}
							disabled={state.uploadingAttachment}
							className={[classes.button, "primary"]}
						>
							{state.uploadingAttachment
								? "Uploading Assets ..."
								: "Zipped and PDF Only"}
						</Button>
					</div>
				</CardContent>
			</Card>

			<div
				style={{
					display: "flex",
					flex: 1,
					alignItems: "flex-end",
					justifyContent: "flex-end"
				}}
			>
				<Button
					variant="contained"
					disabled={state.uploadingAttachment || state.loading}
					color="primary"
					onClick={createOrder}
					// className={[classes.button, "primary"]}
				>
					{state.uploadingAttachment || state.loading
						? "Uploading files ... "
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
		</div>
	);
}

NewOrder.propTypes = {
	classes: PropTypes.object.isRequired
};

// export const AppRoute = withStyles(styles)connect(mapState)(({ ...rest }) => <NewOrder {...rest} />);

const mapState = state => ({
	profile: state.profile
});

export default connect(mapState)(withStyles(styles)(NewOrder));
