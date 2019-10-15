// @ts-check
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { upperFirst, clone } from "lodash";
import { Paper, Typography, Button, TextField, MenuItem,Grid,Select,FormControl,InputLabel } from "@material-ui/core";
import { acceptOrder, rejectOrder, requestOrderChanges, completeOrder } from "../../utils";

//	importing custom components
import AcademicReports from './components/OrderView/AcademicQualification'
import PoliceReports from './components/OrderView/CriminalCheck'
import GapsReports from './components/OrderView/GapsCheck'
import EmploymentHistoryReports from './components/OrderView/EmploymentCheck'
import IdentityCheckReports from './components/OrderView/IdentityCheck'

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

				{/* true condition for developments only */}
				{/* to be replaces */}
				{order.screeningTypes.includes("academic-qualifications") && <AcademicReports order={order} />}

				{order.screeningTypes.includes("police-reports") && <PoliceReports order={order} />}
				{order.screeningTypes.includes("employment-history") && (<EmploymentHistoryReports order={order} />)}
				{order.screeningTypes.includes("gaps-reports") && <GapsReports order={order} />}
				{order.screeningTypes.includes("identification") && <IdentityCheckReports order={order} />}
						

				
				
				
				{/* ))} */}
			</div>
		);
	}
}



OrderView.propTypes = {
	orders: PropTypes.instanceOf(Object).isRequired
};

const mapState = state => ({
	profile: state.profile,
	orders: state.orders.orders
});

export default connect(mapState)(OrderView);
