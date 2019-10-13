// @ts-check
import React, {  useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upperFirst, clone } from "lodash";
import { Paper, Typography, Button, TextField, MenuItem,Grid } from "@material-ui/core";

function PoliceReports({ order }) {

	const [state, setstate] = useState({
		comments:"",
		criminalAnalysisScore:"",

	});

	function handleChange(field, value) {
		state[field] = value;
		return setstate(clone(state));
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Criminal check</Typography>

			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={12} sm={12} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						fullWidth
						label="Comments"
						value={state.comments}
						onChange={({ target }) => handleChange("comments", target.value)}
						id="outlined-dense-multiline"
						margin="dense"
						variant="outlined"
						multiline
						rowsMax="4"
					/>
				</Grid>						
			</Grid>

				<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={6} sm={6}>
					<p style={{paddingLeft:6}}>Criminal Analysis - System score</p>
				</Grid>

				
				<Grid item xs={6} sm={6} style={{paddingLeft:6}}>
			
					<TextField
						id="outlined-name"
						value={state.criminalAnalysisScore}
						onChange={({ target }) => handleChange("criminalAnalysisScore", target.value)}
						select
						style={{ margin: 3 }}
						className="wide"
						margin="normal"
						variant="outlined"
					>
						<MenuItem value="good">Good</MenuItem>
						<MenuItem value="normal">Normal</MenuItem>
						<MenuItem value="bad">Bad</MenuItem>
					</TextField>
				</Grid>		

										
			</Grid>


			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={2} sm={2} style={{paddingLeft:3,paddingRight:3}}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={()=>{
							console.log("Criminal check state",state)
						}}
						>
						Save
					</Button>
			
				</Grid>								
			</Grid>
			
		</Paper>
	);
}



export default PoliceReports
