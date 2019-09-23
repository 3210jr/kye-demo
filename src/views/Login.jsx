// @ts-check
import React, { Component } from "react";
import { Grid, TextField, Button } from "@material-ui/core";

import * as logoImg from "../assets/mwema_logo.png";
import firebase from "firebase";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			loading: true
		};

		this.updateForm = this.updateForm.bind(this);
		this.signIn = this.signIn.bind(this);
	}
	updateForm(field, value) {
		const updates = {};
		updates[field] = value;
		this.setState(updates);
	}
	componentDidMount() {
		this.authListener = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				// User exists
				firebase
					.firestore()
					.collection("profiles")
					.doc(user.uid)
					.get()
					.then(profile => {
						if (profile.exists) {
							// const prof = profile.data()
							this.props.history.push("/dashboard");
						}
					})
					.catch(error => {
						alert("error signing in");
						firebase.auth().signOut();
					});
			}
			this.setState({ loading: false });
		});
	}
	signIn() {
		const { email, password } = this.state;
		this.setState({ loading: true });
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(error => {
				console.log(error);
				this.setState({ loading: false });
				alert("Error signing in.");
			});
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

// FIXME: Fix correct routing, wait for profile respose & information before routing user
