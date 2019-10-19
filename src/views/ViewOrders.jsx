// @ts-check
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
	Paper,
	IconButton,
	Tooltip,
	Toolbar,
	Typography,
	Table,
	TableSortLabel,
	TablePagination,
	TableHead,
	TableCell,
	TableBody,
	TableRow
} from "@material-ui/core";
import { upperFirst } from "lodash";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { connect } from "react-redux";
import { fullFormatDate } from "../utils";
import {
	CloudDownload,
	Delete as DeleteIcon,
	FilterList as FilterListIcon
} from "@material-ui/icons";

import ReportGenerated from './ClientReport'

import ReactToPrint from 'react-to-print';


function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
	{ id: "order", numeric: true, disablePadding: false, label: "Reference ID" },
	{ id: "name", numeric: false, disablePadding: true, label: "Full Name" },
	{ id: "deliveryDate", numeric: true, disablePadding: false, label: "Delivery Date" },
	{ id: "placementDate", numeric: true, disablePadding: false, label: "Placement Date" },
	{ id: "status", numeric: true, disablePadding: false, label: "Status" },
	{ id: "actions", numeric: false, disablePadding: false, label: "Actions" }
];

class EnhancedTableHead extends React.Component {

	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { order, orderBy, rowCount } = this.props;

		return (
			<TableHead>
				<TableRow>
					{rows.map(
						row => (
							<TableCell
								key={row.id}
								align="left" //{row.numeric ? "right" : "left"}
								padding="default"
								sortDirection={orderBy === row.id ? order : false}
							>
								<Tooltip
									title="Sort"
									placement={row.numeric ? "bottom-end" : "bottom-start"}
									enterDelay={300}
								>
									<TableSortLabel
										active={orderBy === row.id}
										direction={order}
										onClick={this.createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						),
						this
					)}
				</TableRow>
			</TableHead>
		);
	}
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 1020
	},
	tableWrapper: {
		overflowX: "auto"
	}
});

class ViewOrders extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			order: "asc",
			orderBy: "name",
			selected: [],
			page: 0,
			rowsPerPage: 5,
			
		};
	}
	

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = "desc";

		if (this.state.orderBy === property && this.state.order === "desc") {
			order = "asc";
		}

		this.setState({ order, orderBy });
	};

	// handleClick = (event, id) => {
	// 	const { selected } = this.state;
	// 	const selectedIndex = selected.indexOf(id);
	// 	let newSelected = [];

	// 	if (selectedIndex === -1) {
	// 		newSelected = newSelected.concat(selected, id);
	// 	} else if (selectedIndex === 0) {
	// 		newSelected = newSelected.concat(selected.slice(1));
	// 	} else if (selectedIndex === selected.length - 1) {
	// 		newSelected = newSelected.concat(selected.slice(0, -1));
	// 	} else if (selectedIndex > 0) {
	// 		newSelected = newSelected.concat(
	// 			selected.slice(0, selectedIndex),
	// 			selected.slice(selectedIndex + 1)
	// 		);
	// 	}

	// 	this.setState({ selected: newSelected });
	// };

	handlePrint=(item)=>{
		console.log(item)

	}	

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	render() {
		const { classes, myOrders } = this.props;
		const { order, orderBy, selected, rowsPerPage, page } = this.state;
		var reportsReferences=[]	//references
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, myOrders.length - page * rowsPerPage);
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onRequestSort={this.handleRequestSort}
							rowCount={myOrders.length}
						/>
						<TableBody>
							{stableSort(myOrders, getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n,index) => {
									const isSelected = this.isSelected(n.id);
									return (
										<TableRow
											hover
											// onClick={event => this.handleClick(event, n.id)}
											role="checkbox"
											aria-checked={isSelected}
											tabIndex={-1}
											key={n.id}
											// selected={isSelected}
										>
											<TableCell align="left">{n.referenceNumber}</TableCell>
											<TableCell component="th" scope="row" padding="default">
												{`${n.firstName} ${n.middleName} ${n.lastName}`}
											</TableCell>
											<TableCell align="left"></TableCell>
											<TableCell align="left">
												{n.createdAt && fullFormatDate(n.createdAt.toDate())}
											</TableCell>
											<TableCell align="left">
												{upperFirst(n.status)}
											</TableCell>
											<TableCell align="center">
												<ReactToPrint
												trigger={() => (
													<CloudDownload
														onClick={()=>{
															this.handlePrint(index)

														}}
														color={
															n.status === "completed"
																? "default"
																: "disabled"
														}
														className="pointer"
													/>

												)}
												content={() => reportsReferences[index]}
												/>
												<ReportGenerated 
													order={n}
													person={n.firstName+" "+n.lastName}	//NB : this is test prop ony
													reportOwner={n}
													ref={el => (reportsReferences[index] = el)}
												 />
												
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={myOrders.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						"aria-label": "Previous Page"
					}}
					nextIconButtonProps={{
						"aria-label": "Next Page"
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</Paper>
		);
	}
}

ViewOrders.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapState = state => ({
	profile: state.profile,
	myOrders: state.orders.myOrders
});

export default connect(mapState)(withStyles(styles)(ViewOrders));
