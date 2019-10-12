// @ts-check
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upperFirst, clone } from "lodash";
import { Paper, Typography, Button, TextField, MenuItem,Grid,Select,FormControl,InputLabel } from "@material-ui/core";
import { acceptOrder, rejectOrder, requestOrderChanges, completeOrder } from "../../utils";

// const useStyles = makeStyles(theme => ({
// 	container: {
// 	  display: 'flex',
// 	  flexWrap: 'wrap',
// 	},
// 	textField: {
// 	  marginLeft: theme.spacing(1),
// 	  marginRight: theme.spacing(1),
// 	},
// 	dense: {
// 	  marginTop: theme.spacing(2),
// 	},
// 	menu: {
// 	  width: 200,
// 	},
//   }));

class OrderView extends Component {
	state = {
		loading: false
	};
	acceptOrder = () => {
		const { match } = this.props;
		const { orderId } = match.params;
		if (window.confirm("Are you sure you want to CONFIRM this order?")) {
			acceptOrder(orderId);
		}
	};

	rejectOrder = () => {
		const { match } = this.props;
		const { orderId } = match.params;
		if (window.confirm("Are you sure you want to REJECT this order?")) {
			rejectOrder(orderId);
		}
	};

	completeOrder = () => {
		const { match } = this.props;
		const { orderId } = match.params;
		if (window.confirm("Are you sure you want to COMPLETE this order?")) {
			// rejectOrder(orderId);
			alert("Feature coming soon");
		}
	};

	requestChanges = orderId => {
		//
	};
	render() {
		const state = this.state;
		const { orders, match } = this.props;
		const { orderId } = match.params;
		const order = orders.find(order => order.id === orderId);
		console.log(order);
		if (!order) {
			return <div />;
		}
		return (
			<div>
				<Paper style={{ padding: "1em" }}>
					<div className="flex justify-space-between">
						<Typography variant="h6">{order.organizationName}</Typography>

						{order.status === "pending" ? (
							<div>
								<Button
									variant="contained"
									color="primary"
									style={{ marginRight: 5 }}
									onClick={this.acceptOrder}
									// className=""
								>
									Accept Order
								</Button>
								<Button
									variant="contained"
									color="primary"
									style={{ marginRight: 5 }}
									onClick={this.rejectOrder}
									// className=""
								>
									Decline Order
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={this.requestChanges}
									// className=""
								>
									Request Changes
								</Button>
							</div>
						) : order.status === "in progress" ? (
							<div>
								<Button
									variant="contained"
									color="primary"
									style={{ marginRight: 5 }}
									onClick={this.completeOrder}
									// className=""
								>
									Complete Order
								</Button>
							</div>
						) : (
							<div />
						)}
					</div>

					<div style={{ marginTop: 10 }}>
						<p>First Name: {order.firstName}</p>
						<p>Middle Name: {order.middleName}</p>
						<p>Last Name: {order.lastName}</p>
						<p>Address: {order.address}</p>

						<p>
							Screening Types <br />
							{order.screeningTypes.map(el => upperFirst(el)).join(", ")}
						</p>

						<a
							href={order.assetsURL}
							rel="noopener noreferrer"
							className="no-text-decoration"
							target="_blank"
						>
							<Button
								variant="contained"
								color="primary"
								// onClick={this.downloadAttachments}
								// className=""
							>
								Download Attachments
							</Button>
						</a>
					</div>
				</Paper>

				{/* {order.screeningTypes.map(type => ( */}
				{order.screeningTypes.includes("identification") && <IdentityCheck order={order} />}
				{order.screeningTypes.includes("employment-history") && (
					<EmploymentHistory order={order} />
				)}
				
				{/* {order.screeningTypes.includes("police-reports") && <PoliceReports order={order} />} */}

				

				{/* always visible till when ur complete */}
				{/* for police reports and academic reports */}
				{true && <AcademicReports order={order} />}
				{true && <PoliceReports order={order} />}
				{true && <GapsReports order={order} />}
				
				{/* ))} */}
			</div>
		);
	}
}

function AcademicReports({ order }) {
	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Academic Qualification</Typography>
			
			{/* first row  */}
			<Grid container spacing={3} style={{marginTop:5}}>
					<Grid item xs={3} style={{paddingLeft:3,paddingRight:3}}>
						<TextField
							id="outlined-name"
							label="Establish Name"
							fullWidth
							onChange={()=>{
							}}
							margin="normal"
							variant="outlined"
							style={{ margin: 3 }}
						/>	
					</Grid>

					<Grid item xs={3} style={{paddingLeft:3,paddingRight:3}}>
						<TextField
							id="outlined-name"
							label="Reference Method"
							fullWidth
							onChange={()=>{
							}}
							margin="normal"
							variant="outlined"
							style={{ margin: 3 }}
						/>	
					</Grid>

					<Grid item xs={3} style={{paddingLeft:3,paddingRight:3}}>
						<TextField
							id="outlined-name"
							label="Date Supplied"
							fullWidth
							onChange={()=>{
							}}
							margin="normal"
							variant="outlined"
							style={{ margin: 3 }}
						/>	
					</Grid>

					<Grid item xs={3} style={{paddingLeft:3,paddingRight:3}}>
						<FormControl 
							fullWidth
							variant="outlined"
						>
							<InputLabel htmlFor="select-edu">Did candidate study at this Establishment? </InputLabel>
							<Select
							variant="outlined"
							onChange={()=>{

							}}
							inputProps={{
								name: 'select-edu',
								id: 'select-edu',
							}}
							>
								<MenuItem value="">To be filled</MenuItem>
								<MenuItem value="">Other</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				
			
			</Grid>
			{/* first row ends */}

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
						fullWidth
						onChange={()=>{

						}}
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						fullWidth
						onChange={()=>{

						}}
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
						fullWidth
						onChange={()=>{

						}}
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						fullWidth
						onChange={()=>{

						}}
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
						fullWidth
						onChange={()=>{

						}}
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						fullWidth
						onChange={()=>{

						}}
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>
				</Grid>	
			
			</Grid>


			<Grid container spacing={3} style={{marginTop:10}}>
				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
				<p>Qualification check - System score</p>					
				</Grid>

				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
					<Select

						variant="outlined"
						onChange={()=>{
						}}
						inputProps={{
							name: 'edu-score',
							id: 'edu-score',
						}}
						fullWidth
						>
							<MenuItem value="">Good</MenuItem>
							<MenuItem value="">Normal</MenuItem>
							<MenuItem value="">Bad</MenuItem>
						</Select>
				
				</Grid>	
				
				<Grid item xs={4} style={{paddingLeft:3,paddingRight:3}}>
		
				</Grid>

			
			</Grid>

			{/* education details headers ends */}

			
		</Paper>
	);
}


function PoliceReports({ order }) {
	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Police Reports</Typography>
			
		</Paper>
	);
}

function GapsReports({ order }) {
	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Gap Analysis</Typography>
			
		</Paper>
	);
}





// 	this codes to be moved to separate js file
//	EmploymentHistory component
function EmploymentHistory({ order }) {
	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Employment History and References</Typography>

			{/* first row */}

			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs style={{paddingLeft:3,paddingRight:3}}> 
				<TextField
					id="outlined-name"
					label="Organization"
					fullWidth
					onChange={()=>{

					}}
					margin="normal"
					variant="outlined"
					style={{ margin: 3 }}
				/>
				</Grid>
				<Grid item xs style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						label="Reference method"
						fullWidth
						onChange={()=>{

						}}
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>	
					
				</Grid>
				<Grid item xs style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						label="Date Produced"
						fullWidth
						onChange={()=>{

						}}
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>	
					

				</Grid>
			</Grid>

		
			{/* second row */}

			<p style={{paddingLeft:6}}>Position held</p>
			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs style={{paddingLeft:3,paddingRight:3}}> 
				<TextField
					id="outlined-name"
					label="Candidate"
					fullWidth
					onChange={()=>{

					}}
					margin="normal"
					variant="outlined"
					style={{ margin: 3 }}
				/>
				</Grid>
				<Grid item xs style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						id="outlined-name"
						label="Referee"
						fullWidth
						onChange={()=>{

						}}
						margin="normal"
						variant="outlined"
						style={{ margin: 3 }}
					/>	
					

				</Grid>
				

				
			</Grid>
			{/* second row ends */}

			{/* third row */}
			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs style={{paddingLeft:3,paddingRight:3}}> 
					<Grid item xs={4}>
						<p style={{paddingLeft:6}}>Employment Start Date</p>
					</Grid>
					<Grid container>
						<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
							<TextField
								id="outlined-name"
								label="Candidate"
								fullWidth
								onChange={()=>{

								}}
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>	

						</Grid>
						
						<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
							<TextField
								id="outlined-name"
								label="Referee"
								fullWidth
								onChange={()=>{

								}}
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>	

						</Grid>
					</Grid>
				</Grid>


				<Grid item xs style={{paddingLeft:3,paddingRight:3}}> 
					<Grid item xs={4}>
						<p style={{paddingLeft:6}}>Employment End Date</p>
					</Grid>
					<Grid container>
						<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
							<TextField
								id="outlined-name"
								label="Candidate"
								fullWidth
								onChange={()=>{

								}}
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>	

						</Grid>
						
						<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
							<TextField
								id="outlined-name"
								label="Referee"
								fullWidth
								onChange={()=>{

								}}
								margin="normal"
								variant="outlined"
								style={{ margin: 3 }}
							/>	

						</Grid>
					</Grid>
				</Grid>
			
			{/* third row ends */}

			
			{/* forth row */}
			
			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={6} sm={6}>
					<p style={{paddingLeft:6}}>Employment history and references - System score</p>
				</Grid>
				<Grid item xs={6} sm={6} style={{paddingLeft:6}}>
				<Select
					fullWidth
					native
					// value={state.age}
					onChange={()=>{

					}}
					inputProps={{
						id: 'outlined-age-native-simple',
					}}
				>
						<option value="" />
						<option value={10}>Good</option>
						<option value={20}>Other</option>
						<option value={30}>Other</option>
				</Select>
				</Grid>		

										
				</Grid>
			</Grid>

			{/* forth row ends */}
			
				

			{/* comments section */}
			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={12} sm={12} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						fullWidth
						label="Comments"
						id="outlined-dense-multiline"
						margin="dense"
						variant="outlined"
						multiline
						rowsMax="4"
					/>
				</Grid>
				
											
			</Grid>
			
			{/* comments section ends */}

			{/* Addition information section */}
			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={12} sm={12} style={{paddingLeft:3,paddingRight:3}}>
					<TextField
						fullWidth
						label="Additional information"
						id="outlined-dense-multiline"
						margin="dense"
						variant="outlined"
						multiline
						rowsMax="4"
					/>
				</Grid>
				
											
			</Grid>
			
			{/* Addition information ends */}

			{/* save button section */}
			
			<Grid container spacing={3} style={{marginTop:5}}>
				<Grid item xs={2} sm={2} style={{paddingLeft:3,paddingRight:3}}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={()=>{

						}}
						>
						Save
					</Button>
			
				</Grid>								
			</Grid>

			{/* save button section ends */}



			

		</Paper>
	);
}

function IdentityCheck({ order }) {
	const [state, setstate] = useState({
		documentType: "",
		countryOfIssue: "",
		dateOfCheck: "",
		result: "",
		dateOfBirthConsisntency: "no",
		passportScore: "risk", // risk, medium, good
		comments: ""
	});

	function handleChange(field, value) {
		state[field] = value;
		return setstate(clone(state));
	}

	function updateIdentityCheck() {
		return;
	}

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Identification Check</Typography>

			<div className="flex-row" style={{ marginTop: 5 }}>
				<div style={{ flex: 1, display: "flex" }}>
					<TextField
						id="outlined-name"
						label="Document Type"
						style={{ margin: 3 }}
						className="wide"
						value={state.documentType}
						onChange={({ target }) => handleChange("documentType", target.value)}
						margin="normal"
						variant="outlined"
					/>
				</div>
				<div style={{ flex: 1, display: "flex" }}>
					<TextField
						id="outlined-name"
						label="Country of issue"
						style={{ margin: 3 }}
						className="wide"
						value={state.countryOfIssue}
						onChange={({ target }) => handleChange("countryOfIssue", target.value)}
						margin="normal"
						variant="outlined"
					/>
				</div>
				<div style={{ flex: 1, display: "flex" }}>
					<TextField
						id="outlined-name"
						label="Date of Check"
						style={{ margin: 3 }}
						className="wide"
						value={state.dateOfCheck}
						onChange={({ target }) => handleChange("dateOfCheck", target.value)}
						margin="normal"
						variant="outlined"
					/>
				</div>
				<div style={{ flex: 1, display: "flex" }}>
					<TextField
						id="outlined-name"
						label="Result"
						style={{ margin: 3 }}
						className="wide"
						value={state.result}
						onChange={({ target }) => handleChange("result", target.value)}
						margin="normal"
						variant="outlined"
					/>
				</div>
			</div>

			<div className="flex-row" style={{ marginTop: 20 }}>
				<div style={{ flex: 1 }}>
					<TextField
						id="outlined-name"
						label="Appearence on Document Matches Age?"
						select
						style={{ margin: 3 }}
						className="wide"
						value={state.dateOfBirthConsisntency}
						onChange={({ target }) =>
							handleChange("dateOfBirthConsisntency", target.value)
						}
						margin="normal"
						variant="outlined"
					>
						<MenuItem value="yes">Yes</MenuItem>
						<MenuItem value="no">No</MenuItem>
					</TextField>
				</div>
				<div style={{ flex: 1, paddingLeft: 10 }}>
					<TextField
						id="outlined-name"
						label="Passport Check - System Score"
						select
						style={{ margin: 3 }}
						className="wide"
						value={state.passportScore}
						onChange={({ target }) => handleChange("passportScore", target.value)}
						margin="normal"
						variant="outlined"
					>
						<MenuItem value="risk">Risk</MenuItem>
						<MenuItem value="medium">Medium</MenuItem>
						<MenuItem value="good">Good</MenuItem>
					</TextField>
				</div>
				<div style={{ flex: 1 }} />
			</div>

			<div className="flex-row" style={{ marginTop: 10 }}>
				<TextField
					id="outlined-name"
					label="Comments"
					multiline
					// style={{ margin: 3 }}
					className="wide"
					value={state.comments}
					onChange={({ target }) => handleChange("comments", target.value)}
					margin="normal"
					variant="outlined"
				/>
			</div>

			<div className="flex-row" style={{ marginTop: 10 }}>
				<Button
					variant="contained"
					color="primary"
					onClick={updateIdentityCheck}
					// className=""
				>
					Publish Identity Verification Check
				</Button>
			</div>
		</Paper>
	);
}

OrderView.propTypes = {
	orders: PropTypes.instanceOf(Object).isRequired
};

const mapState = state => ({
	profile: state.profile,
	orders: state.orders.orders
});

export default connect(mapState)(OrderView);
