// @ts-check
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { upperFirst } from "lodash";
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
import { uploadFile, createOrder } from "../utils";

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
			firstName: "",
			lastName: "",
			middleName: "",
			dateOfBirth: 1,
			monthOfBirth: "january",
			yearOfBirth: 1990,
			address: "",
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
		const { location } = this.props;
		const routeState = !!location.state ? location.state : {};
		console.log("Route State: ", routeState);

		this.setState({
			firstName: routeState.firstName || "",
			lastName: routeState.lastName || "",
			middleName: routeState.middleName || "",
			dateOfBirth: routeState.dateOfBirth || 1,
			address: routeState.address || "",
			gender: routeState.gender || ""
		});
	}
	uploadZippedFolder = evt => {
		const file = evt.target.files[0];
		this.setState({ uploadingAssets: true });
		uploadFile(file, "order-assets")
			.then(res => {
				res.ref
					.getDownloadURL()
					.then(url => this.setState({ uploadingAssets: false, assetsURL: url }));
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
		this.setState(prevState => ({ openMonthPicker: !prevState.openMonthPicker }));
	};
	createOrder = () => {
		const {
			firstName,
			lastName,
			middleName,
			dateOfBirth,
			monthOfBirth,
			yearOfBirth,
			address,
			gender,
			screeningTypes,
			assetsURL,
			loading,
			uploadingAssets
		} = this.state;
		const { profile, history } = this.props;
		console.log(this.state);
		if (loading || uploadingAssets) {
			alert("Please wait while loading");
			return;
		}

		if (assetsURL.length < 5) {
			alert("Please upload the zipped folder with all required documents");
			return;
		}

		this.setState({ loading: true });
		createOrder({
			firstName,
			lastName,
			middleName,
			dateOfBirth: new Date(`${dateOfBirth}/${monthOfBirth}/${yearOfBirth}`),
			address,
			gender,
			screeningTypes,
			assetsURL,
			organizationId: profile.organizationId,
			organizationName: profile.organizationName
		})
			.then(res => {
				this.setState({ loading: false });
				history.push("/dashboard/my-orders");
			})
			.catch(error => {
				alert("There was an error creating a new order!");
				console.log("Error: ", error);
				this.setState({ loading: false });
			});
	};
	render() {
		const { classes, history } = this.props;
		const {
			open,
			openMonthPicker,
			firstName,
			lastName,
			middleName,
			dateOfBirth,
			monthOfBirth,
			yearOfBirth,
			address,
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
							Candidate Details
						</Typography>

						<form className={classes.container} noValidate autoComplete="off">
							<Grid container spacing={24}>
								<Grid item xs={12} md={6}>
									<TextField
										id="first-name"
										label="First Name"
										className={classes.textField}
										value={firstName}
										onChange={evt => this.handleChange("firstName", evt)}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										id="middle-name"
										label="Middle Name"
										className={classes.textField}
										value={middleName}
										onChange={evt => this.handleChange("middleName", evt)}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										id="last-name"
										label="Last Name"
										className={classes.textField}
										value={lastName}
										onChange={evt => this.handleChange("lastName", evt)}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Grid container spacing={24}>
										<Grid item xs={12} md={4}>
											<TextField
												id="dateOfBirth"
												label="Date of Birth"
												className={classes.textField}
												value={dateOfBirth}
												onChange={evt =>
													this.handleChange("dateOfBirth", evt)
												}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<FormControl className={classes.formControl}>
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
											</FormControl>
											{/* <TextField
												id="monthOfBirth"
												label="Month of Birth"
												className={classes.textField}
												value={monthOfBirth}
												// onChange={this.handleChange("name")}
												margin="normal"
											/> */}
										</Grid>
										<Grid item xs={12} md={4}>
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
										</Grid>
									</Grid>
								</Grid>
								{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid item xs={12} md={6}>
										<DatePicker
											format="MMMM do yyyy"
											margin="normal"
											id="dob"
											label="Date of Birth"
											className={classes.textField}
											value={dateOfBirth}
											onChange={evt => this.handleChange("dateOfBirth", evt)}
										/>
									</Grid>
								</MuiPickersUtilsProvider> */}
								<Grid item xs={12} md={6}>
									<TextField
										id="last-name"
										label="Address"
										className={classes.textField}
										value={address}
										onChange={evt => this.handleChange("address", evt)}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
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
											checked={screeningTypes.includes("employment-history")}
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
								{uploadingAssets ? "Uploading Assets ..." : "Zipped and PDF Only"}
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
						{uploadingAssets || loading ? "Uploading files ... " : "Confirm Order"}
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
		);
	}
}

NewOrder.propTypes = {
	classes: PropTypes.object.isRequired
};

// export const AppRoute = withStyles(styles)connect(mapState)(({ ...rest }) => <NewOrder {...rest} />);

const mapState = state => ({
	profile: state.profile
});

export default connect(mapState)(withStyles(styles)(NewOrder));
