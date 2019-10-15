// @ts-check
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upperFirst, clone } from "lodash";
import { Paper, Typography, Button, TextField, MenuItem,Grid } from "@material-ui/core";




function GapsReports({ order }) {
	const [state, setstate] = useState({
		period:"",
		comments:"",
		gapInEmploymentHistoryScore:"",
		generalComments:""

	});

	function handleChange(field, value) {
		state[field] = value;
		return setstate(clone(state));
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Gap Analysis</Typography>

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
							console.log("Gaps reports state")
							console.log(state)
						}}
						>
						Save and Add another
					</Button>
				</Grid>
			</Grid>

			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs style={{paddingLeft:3,paddingRight:3}}> 
					<TextField
						id="outlined-name"
						label="Period"
						value={state.period}
						onChange={({ target }) => handleChange("period", target.value)}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>
				<Grid item xs style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						label="Comments"
						value={state.comments}
						onChange={({ target }) => handleChange("comments", target.value)}
						fullWidth
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>	
					
				</Grid>
			</Grid>


			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={6} sm={6}>
					<p style={{paddingLeft:6}}>Gap in Employment History - System score</p>
				</Grid>

				
				<Grid item xs={6} sm={6} style={{paddingLeft:6}}>
			
					<TextField
						id="outlined-name"
						value={state.gapInEmploymentHistoryScore}
						onChange={({ target }) => handleChange("gapInEmploymentHistoryScore", target.value)}
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
				<Grid item xs={12} sm={12} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						fullWidth
						label="Comments"
						value={state.generalComments}
						onChange={({ target }) => handleChange("generalComments", target.value)}
						id="outlined-dense-multiline"
						margin="dense"
						variant="outlined"
						multiline
						rowsMax="4"
					/>
				</Grid>						
			</Grid>


			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={2} sm={2} style={{paddingLeft:3,paddingRight:3}}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={()=>{
							console.log("Gaps check state",state)
						}}
						>
						Save
					</Button>
			
				</Grid>								
			</Grid>
			
		</Paper>
	);
}




export default GapsReports