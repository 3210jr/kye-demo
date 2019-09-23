// @ts-check
import React from "react";
import {
	Grid,
	Typography,
	Paper,
	FormControlLabel,
	FormControl,
	FormLabel,
	Switch as SwitchButton,
	FormGroup,
	Button,
	FormHelperText,
	TextField,
	TablePagination
} from "@material-ui/core";



const CompanyForm = ({ title = "Company Details" }) => {
	function handleChange(name) {}
	return (
		<Grid container style={{ marginBottom: "1em" }}>
			<Paper className="wide" style={{ padding: "1em" }}>
				<Typography variant="h5" component="h3">
					{title}
				</Typography>
				<Typography component="p">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum vitae officia
					cum provident, commodi labore, mollitia, facere.
				</Typography>

				<form style={{ marginTop: "2em" }}>
					<Typography variant="h6" component="h5">
						Basic Information
					</Typography>
					<Grid container>
						<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
							<TextField
								id="company-name"
								label="Company Name"
								style={{ margin: 1 }}
								className="wide"
								autoFocus
								// value={values.name}
								onChange={handleChange("name")}
								margin="normal"
								variant="outlined"
							/>
						</Grid>
						<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
							<TextField
								id="company-email"
								label="Company Email"
								style={{ margin: 1 }}
								className="wide"
								// value={values.name}
								onChange={handleChange("name")}
								margin="normal"
								variant="outlined"
							/>
						</Grid>
						<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
							<TextField
								id="company-telephone"
								label="Company Telephone"
								style={{ margin: 1 }}
								className="wide"
								// value={values.name}
								onChange={handleChange("name")}
								margin="normal"
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
							<TextField
								id="company-fax"
								label="Company Fax"
								style={{ margin: 1 }}
								className="wide"
								// value={values.name}
								onChange={handleChange("fax")}
								margin="normal"
								variant="outlined"
							/>
						</Grid>
						<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
							<TextField
								id="company-address"
								label="Company Address"
								style={{ margin: 1 }}
								className="wide"
								// value={values.name}
								onChange={handleChange("address")}
								margin="normal"
								variant="outlined"
							/>
						</Grid>
						<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
							<TextField
								id="company-country"
								label="Company Country"
								style={{ margin: 1 }}
								className="wide"
								// value={values.name}
								onChange={handleChange("country")}
								margin="normal"
								variant="outlined"
							/>
						</Grid>
					</Grid>

					<div style={{ marginTop: 20 }}>
						<Typography variant="h6" component="h5">
							Screening Settings
						</Typography>
						<Grid container>
							<Grid item style={{ padding: "0.5em 0.5em 0.5em 0" }} xs={12} md={4}>
								<FormControl component="fieldset">
									<FormLabel component="legend">Basic Package</FormLabel>
									<FormGroup>
										<FormControlLabel
											control={
												<SwitchButton
													checked={false}
													onChange={handleChange("gilad")}
													value="gilad"
												/>
											}
											label="ID Document Check"
										/>
										<FormControlLabel
											control={
												<SwitchButton
													checked={true}
													onChange={handleChange("jason")}
													value="jason"
												/>
											}
											label="Employment History & References"
										/>
										<FormControlLabel
											control={
												<SwitchButton
													checked={false}
													onChange={handleChange("antoine")}
													value="antoine"
												/>
											}
											label="Gap Analysis"
										/>
										<FormControlLabel
											control={
												<SwitchButton
													checked={false}
													onChange={handleChange("antoine")}
													value="antoine"
												/>
											}
											label="Academic Qualifications"
										/>
										<FormControlLabel
											control={
												<SwitchButton
													checked={false}
													onChange={handleChange("antoine")}
													value="antoine"
												/>
											}
											label="Professional Qualifications"
										/>
										<FormControlLabel
											control={
												<SwitchButton
													checked={true}
													onChange={handleChange("antoine")}
													value="antoine"
												/>
											}
											label="CV Analysis"
										/>
									</FormGroup>
								</FormControl>
							</Grid>
							<Grid item style={{ padding: "0.5em 0.5em 0.5em 0" }} xs={12} md={4}>
								<FormControl component="fieldset">
									<FormLabel component="legend">Extended Package</FormLabel>
									<FormGroup>
										<FormControlLabel
											control={
												<SwitchButton
													checked={false}
													onChange={handleChange("gilad")}
													value="gilad"
												/>
											}
											label="Criminal Check"
										/>
										<FormControlLabel
											control={
												<SwitchButton
													checked={true}
													onChange={handleChange("jason")}
													value="jason"
												/>
											}
											label="Adverse Media Search"
										/>
										<FormControlLabel
											control={
												<SwitchButton
													checked={false}
													onChange={handleChange("antoine")}
													value="antoine"
												/>
											}
											label="Compliance Database"
										/>
									</FormGroup>
								</FormControl>
							</Grid>
						</Grid>
					</div>

					<div style={{ marginTop: 20 }}>
						<Typography variant="h6" component="h5">
							Basic Information
						</Typography>
						<Grid container>
							<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
								<FormControlLabel
									control={
										<SwitchButton
											checked={false}
											onChange={handleChange("gilad")}
											value="gilad"
										/>
									}
									label="Show Average Ratings"
								/>
							</Grid>
							<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
								<FormControlLabel
									control={
										<SwitchButton
											checked={false}
											onChange={handleChange("gilad")}
											value="gilad"
										/>
									}
									label="Show General Ratings"
								/>
							</Grid>
							<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
								<FormControlLabel
									control={
										<SwitchButton
											checked={true}
											onChange={handleChange("gilad")}
											value="gilad"
										/>
									}
									label="Allow Excel Export"
								/>
							</Grid>
							<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
								<FormControlLabel
									control={
										<SwitchButton
											checked={true}
											onChange={handleChange("gilad")}
											value="gilad"
										/>
									}
									label="Allow PDF Export"
								/>
							</Grid>
							<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
								<FormControlLabel
									control={
										<SwitchButton
											checked={false}
											onChange={handleChange("gilad")}
											value="gilad"
										/>
									}
									label="Show Statistics"
								/>
							</Grid>
							<Grid item style={{ padding: "0 0.5em 0.5em 0" }} xs={12} md={4}>
								<FormControlLabel
									control={
										<SwitchButton
											checked={false}
											onChange={handleChange("gilad")}
											value="gilad"
										/>
									}
									label="Show Biometrics Results"
								/>
							</Grid>
						</Grid>
					</div>

					<Button variant="contained" color="primary" style={{ marginTop: 10 }}>
						Register Company
					</Button>
				</form>
			</Paper>
		</Grid>
	);
};

export default CompanyForm;