// @ts-check
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
			firstName: "",
			lastName: "",
			middleName: "",
			dateOfBirth: new Date("1990-08-18"),
			address: "",
			gender: "male"
		};
		this.handleChange = this.handleChange.bind(this);
		this.toggleGenderDropDown = this.toggleGenderDropDown.bind(this);
	}
	componentDidMount() {
		const { location } = this.props;
		const routeState = !!location.state ? location.state : {};

		this.setState({
			firstName: routeState.firstName || "",
			lastName: routeState.lastName || "",
			middleName: routeState.middleName || "",
			dateOfBirth: routeState.dateOfBirth || new Date("1990-08-18"),
			address: routeState.address || "",
			gender: routeState.gender || ""
		});
	}
	handleChange(field, evt) {
		if (field === "dateOfBirth") {
			return this.setState(prevState => (prevState[field] = evt));
		}
		this.setState(prevState => (prevState[field] = evt.target.value));
	}
	toggleGenderDropDown() {
		this.setState(prevState => ({ open: !prevState.open }));
	}
	render() {
		const { classes, history } = this.props;
		const { open, firstName, lastName, middleName, dateOfBirth, address, gender } = this.state;
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
										// onChange={this.handleChange("name")}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										id="middle-name"
										label="Middle Name"
										className={classes.textField}
										value={middleName}
										// onChange={this.handleChange("name")}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										id="last-name"
										label="Last Name"
										className={classes.textField}
										value={lastName}
										// onChange={this.handleChange("name")}
										margin="normal"
									/>
								</Grid>
								{/* <Grid item xs={12} md={6}>
									<TextField
										id="first-name"
										label="Date of Birth"
										className={classes.textField}
										value={dateOfBirth}
										// onChange={this.handleChange("name")}
										margin="normal"
									/>
								</Grid> */}
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
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
								</MuiPickersUtilsProvider>
								<Grid item xs={12} md={6}>
									<TextField
										id="last-name"
										label="Address"
										className={classes.textField}
										value={address}
										// onChange={this.handleChange("name")}
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
											checked={this.state.checkedB}
											onChange={() => this.handleChange()}
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
											checked={this.state.checkedB}
											onChange={() => this.handleChange()}
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
											checked={this.state.checkedB}
											onChange={() => this.handleChange()}
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
											checked={this.state.checkedB}
											onChange={() => this.handleChange()}
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
							<Button variant="contained" color="primary" className={classes.button}>
								Upload a zip folder
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
					<Button variant="contained" color="primary" className={classes.button}>
						Confirm Order
					</Button>
				</div>
			</div>
		);
	}
}

NewOrder.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewOrder);
