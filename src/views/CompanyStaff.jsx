// @ts-check
import React, { Component } from "react";
import { Grid, Typography, Fab, TextField, Button, Paper } from "@material-ui/core";
import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";
import SimpleTable from "../components/SimpleTable";

export default class CompanyStaff extends Component {
	constructor(props) {
		super(props);

		this.state = {
			addStaffForm: false,
			fullName: "",
			email: "",
			password: "",
			telephone: "+255"
		};

		this.toggleRegistrationForm = this.toggleRegistrationForm.bind(this);
	}
	toggleRegistrationForm() {
		this.setState(prevState => ({ addStaffForm: !prevState.addStaffForm }));
	}
	render() {
		const { fullName, email, password, telephone, addStaffForm } = this.state;
		return (
			<div>
				<Grid container>
					<Grid item xs={12} md={10}>
						<Typography variant="h4" component="h5">
							Company Staff
						</Typography>

						<div style={{ height: 10 }} />

						<SimpleTable titles={["Full Name", "Telephone", "Email"]} data={userData} />
					</Grid>

					{addStaffForm && (
						<Grid item xs={12} md={10} style={{ marginTop: "2em" }}>
							<Paper style={{ padding: 15 }}>
								<Typography variant="h6" component="h6">
									New user registration
								</Typography>
								<Grid container spacing={24}>
									<Grid item xs={12} md={4}>
										<TextField
											id="full-name"
											label="First Name"
											className="wide"
											variant="outlined"
											value={fullName}
											// onChange={this.handleChange("name")}
											margin="normal"
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<TextField
											id="email"
											label="Email"
											className="wide"
											variant="outlined"
											value={email}
											// onChange={this.handleChange("name")}
											margin="normal"
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<TextField
											id="telephone"
											label="Telephone"
											className="wide"
											variant="outlined"
											value={telephone}
											// onChange={this.handleChange("name")}
											margin="normal"
										/>
									</Grid>
								</Grid>
								<div style={{ textAlign: "right" }}>
									<Button variant="contained" color="primary">
										Register new user
									</Button>
								</div>
							</Paper>
						</Grid>
					)}
				</Grid>
				<Fab
					style={{ position: "fixed", bottom: 35, right: 35 }}
					color="primary"
					aria-label="Add"
					onClick={this.toggleRegistrationForm}
				>
					{ addStaffForm ? <CloseIcon /> : <AddIcon /> }
				</Fab>
			</div>
		);
	}
}

const userData = [
	["Ally Jr Salim", "+255 766 439 764", "ally@inspiredideas.io"],
	["Edgar Mboki", "+255 686 349 661", "ally@inspiredideas.io"],
	["Fred Taton", "+255 754 640 731", "ally@inspiredideas.io"]
];
