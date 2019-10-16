// @ts-check
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upperFirst, clone, omit } from "lodash";
import { Paper, Typography, Button, TextField, MenuItem,Grid } from "@material-ui/core";
import { persistOrderResults } from "../../../../utils";


function AcademicReports({ order, type, snackbar, toggleSnackBar }) {
	const [state, setState] = useState({
		establishmentName:"",
		referenceMethod:"",
		dateSupplied:"",
		didCandidateStudyInTheEstablishment:true,
		attendanceDateCandidate:"",
		attendanceDateReference:"",
		nameOfCourseStudiedCandidate:"",
		nameOfCourseStudiedReference:"",
		qualificationAndGradedAwardedCandidate:"",
		qualificationAndGradedAwardedReference:"",
		academicQualificationScore: "",
		loading: false
	});

	useEffect(() => {
		const initialState = { ...state, ...order[type] };
		setState(initialState);
	}, []);

	function handleChange(field, value) {
		state[field] = value;
		return setState(clone(state));
	}

	function saveAcademicReports() {
		const { loading } = state;
		const currentState = omit(state, ["loading"]);
		if (loading) return;
		const emptyFields = Object.keys(currentState).filter(
			key => state[key].length === 0
		);
		if (emptyFields.length > 0) {
			alert("Please fill in all the appropriate fields");
			return;
		}

		setState({ ...state, loading: true });

		persistOrderResults(order.id, type, { ...currentState })
			.then(res => {
				toggleSnackBar({ message: "Police Reports updated successfully!" });
			})
			.catch(error => {
				toggleSnackBar({
					message: "Error. There was an error updating the police report."
				});
				console.log("Error: ", error);
			})
			.finally(() => {
				setState({ ...state, loading: false });
			});
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Academic Qualification</Typography>
			<Grid
				justify="space-between" 
				container 
				spacing={24}
			>
				<Grid item>
				</Grid>

				<Grid item>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={()=>{
							console.log("Academic qualification state")
							console.log(state)
						}}
						>
						Save and Add another
					</Button>
				</Grid>
			</Grid>
			

			<Grid container spacing={3} style={{marginTop:5}}>
					<Grid item xs={3} style={{paddingLeft:3,paddingRight:3}}>
						<TextField
							id="outlined-name"
							label="Establish Name"
							value={state.establishmentName}
							onChange={({ target }) => handleChange("establishmentName", target.value)}
							fullWidth
							margin="normal"
							variant="outlined"
							style={{ margin: 3 }}
						/>	
					</Grid>

					<Grid item xs={3} style={{paddingLeft:3,paddingRight:3}}>
						<TextField
							id="outlined-name"
							label="Reference Method"
							value={state.referenceMethod}
							onChange={({ target }) => handleChange("referenceMethod", target.value)}
							fullWidth
							margin="normal"
							variant="outlined"
							style={{ margin: 3 }}
						/>	
					</Grid>

					<Grid item xs={3} style={{paddingLeft:3,paddingRight:3}}>
						<TextField
							id="outlined-name"
							label="Date Supplied"
							value={state.dateSupplied}
							onChange={({ target }) => handleChange("dateSupplied", target.value)}
							fullWidth
							margin="normal"
							variant="outlined"
							style={{ margin: 3 }}
						/>	
					</Grid>

					<Grid item xs={3} style={{paddingLeft:3,paddingRight:3}}>
						<TextField
							id="outlined-name"
							label="Did candidate study at this Establishment?"
							value={state.didCandidateStudyInTheEstablishment}
							onChange={({ target }) => handleChange("didCandidateStudyInTheEstablishment", target.value)}
							select
							style={{ margin: 3 }}
							className="wide"
							margin="normal"
							variant="outlined"
						>
							<MenuItem value="yes">Yes</MenuItem>
							<MenuItem value="no">No</MenuItem>
						</TextField>
					</Grid>
			</Grid>

			{/* education details headers */}
			<Grid container spacing={3} style={{marginTop:10}}>
				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<Typography variant="h6">Candidate</Typography>
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<Typography variant="h6">Reference</Typography>
				</Grid>	
			
			</Grid>

			{/* education details headers ends */}

			{/* education details headers contents */}
			<Grid container spacing={3} style={{marginTop:10}}>
				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
				<p>Attendance Date</p>					
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						value={state.attendanceDateCandidate}
						onChange={({ target }) => handleChange("attendanceDateCandidate", target.value)}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						value={state.attendanceDateReference}
						onChange={({ target }) => handleChange("attendanceDateReference", target.value)}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>	
			
			</Grid>


			<Grid container spacing={3} style={{marginTop:10}}>
				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
				<p>Name of course(s) studied</p>					
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						value={state.nameOfCourseStudiedCandidate}
						onChange={({ target }) => handleChange("nameOfCourseStudiedCandidate", target.value)}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						value={state.nameOfCourseStudiedReference}
						onChange={({ target }) => handleChange("nameOfCourseStudiedReference", target.value)}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>	
			
			</Grid>


			<Grid container spacing={3} style={{marginTop:10}}>
				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
				<p>Qualificication and grade awarded</p>					
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						value={state.qualificationAndGradedAwardedCandidate}
						onChange={({ target }) => handleChange("qualificationAndGradedAwardedCandidate", target.value)}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						value={state.qualificationAndGradedAwardedReference}
						onChange={({ target }) => handleChange("qualificationAndGradedAwardedReference", target.value)}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>	
			
			</Grid>


			<Grid container spacing={3} style={{marginTop:10}}>
				<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
				<p>Qualification check - System score</p>					
				</Grid>

				<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
							id="outlined-name"
							value={state.academicQualificationScore}
							onChange={({ target }) => handleChange("academicQualificationScore", target.value)}
							select
							style={{ margin: 3 }}
							className="wide"
							margin="normal"
							variant="outlined"
						>
							<MenuItem value="good">Good</MenuItem>
							<MenuItem value="other">Other</MenuItem>
							<MenuItem value="other">Other</MenuItem>
						</TextField>	
				</Grid>	
			
			</Grid>

			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={2} sm={2} style={{paddingLeft:3,paddingRight:3}}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={saveAcademicReports}
						>
						{state.loading ? "Loading ...":"Save"}
					</Button>
			
				</Grid>								
			</Grid>
			{/* education details headers ends */}

		</Paper>
	);
}


const mapState = state => ({
	snackbar: state.snackbar
});

const mapDispatch = ({ snackbar: { asyncToggleSnackBar } }) => ({
	toggleSnackBar: payload => asyncToggleSnackBar(payload)
});

export default connect(
	mapState,
	mapDispatch
)(AcademicReports);
