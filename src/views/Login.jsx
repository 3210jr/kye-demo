// @ts-check
import React, { Component } from "react";
import { Grid, TextField, Button } from "@material-ui/core";

import * as logoImg from "../assets/mwema_logo.png";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			loading: false
		};

		this.updateForm = this.updateForm.bind(this);
		this.signIn = this.signIn.bind(this);
	}
	updateForm(field, value) {
		const updates = {};
		updates[field] = value;
		this.setState(updates);
	}
	signIn() {
		this.props.history.push("/dashboard");
	}
	render() {
		const { email, password, loading } = this.state;
		return (
			<div style={{ flexGrow: 1 }}>
				<Grid container style={{ justifyContent: "center", marginTop: "15vh" }}>
					<Grid item sm={8} md={4} lg={4} xs={11}>
						<div className="center">
							<div style={{ textAlign: "center" }}>
								<img alt="" style={{ width: "12em" }} src={logoImg} />
							</div>
						</div>
						<TextField
							label="Email"
							className="wide"
							value={email}
							onChange={e => this.updateForm("email", e.target.value)}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							label="Password"
							className="wide"
							value={password}
							onChange={e => this.updateForm("password", e.target.value)}
							margin="normal"
							variant="outlined"
						/>

						<div>
							<Button
								className="wide"
								color="primary"
								size="large"
								disabled={loading}
								variant="contained"
								onClick={this.signIn}
							>
								{loading ? "Loading ..." : "Sign In"}
							</Button>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}
