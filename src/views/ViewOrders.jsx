// @ts-check
import React from "react";
import {renderToString} from 'react-dom/server'
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles,makeStyles } from "@material-ui/core/styles";
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
	TableRow,
	Collapse,
	Modal,
} from "@material-ui/core";
import { upperFirst, find } from "lodash";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { connect } from "react-redux";
import { fullFormatDate } from "../utils";
import {
	CloudDownload,
	Delete as DeleteIcon,
	FilterList as FilterListIcon
} from "@material-ui/icons";


//	packages for generating PDF to replace previous modules for working with pdf


import ReportGenerated from "./ClientReport";

import ReactToPrint from "react-to-print";
import { ExtendedTableHead } from "../components/Table";

import EmploymentHistoryReport from "./client_reports/EmploymentHistory";

// new report styling and everything
import { PDFViewer } from '@react-pdf/renderer';

import NewReport from './new_report/Report'

// const useStyles = makeStyles(theme => ({
// 	modal: {

// 	},

//   }));


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
	// TODO: Fix sorting for string values ... maybe a sort and optional reverse() for specific rows
	return order === "desc"
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}

const rows = [
	{ id: "id", numeric: true, disablePadding: false, label: "Reference ID" },
	{ id: "fullName", numeric: false, disablePadding: true, label: "Full Name" },
	{
		id: "deliveryDate",
		numeric: true,
		disablePadding: false,
		label: "Delivery Date"
	},
	{
		id: "createdAt",
		numeric: false,
		disablePadding: false,
		label: "Placement Date"
	},
	{ id: "status", numeric: true, disablePadding: false, label: "Status" },
	{ id: "actions", numeric: false, disablePadding: false, label: "Actions" }
];

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
	constructor(props) {
		super(props);

		this.state = {
			order: "asc",
			orderBy: "name",
			selected: [],
			selectedRowId: "",
			page: 0,
			rowsPerPage: 10
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

	selectRow = (id) => {
		const { selectedRowId } = this.state;
		let rowId = id
		if (selectedRowId === id) {
			rowId = ""
		}
		window.scrollTo(0, 0)
		this.setState({ selectedRowId: rowId });
	}

	closeSummary = () => {
		this.setState({ selectedRowId: "" })
	}

	handlePrint = item => {
		console.log(item);
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	render() {
		const { classes, myOrders } = this.props;
		const { order, orderBy, selected, rowsPerPage, page, selectedRowId } = this.state;
		var reportsReferences = []; //references
		console.log(myOrders);
		const selectedOrder = find(myOrders, ["id", selectedRowId]);
		const emptyRows =
			rowsPerPage - Math.min(rowsPerPage, myOrders.length - page * rowsPerPage);
		return (
			<React.Fragment>
				{
					selectedRowId.length > 0 && selectedOrder && (
						<KYEOrderSummary closeSummary={this.closeSummary} order={selectedOrder} />
					)
				}

				<Paper className={classes.root}>
					<div className={classes.tableWrapper}>
						<Table className={classes.table} aria-labelledby="tableTitle">
							<ExtendedTableHead
								numSelected={selected.length}
								rows={rows}
								order={order}
								orderBy={orderBy}
								onRequestSort={this.handleRequestSort}
								rowCount={myOrders.length}
							/>
							<TableBody>
								{stableSort(myOrders, getSorting(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((n, index) => {
										const isSelected = this.isSelected(n.id);
										if (n.orderType === "kyc") {
											return <KYCOrderItem order={n} index={index} />;
										}
										return (
											<TableRow
												hover
												// onClick={event => this.handleClick(event, n.id)}
												role="checkbox"
												aria-checked={isSelected}
												className="pointer"
												tabIndex={-1}
												onClick={() => this.selectRow(n.id)}
												key={n.id}
											>
												<TableCell align="left">{n.referenceNumber}</TableCell>
												<TableCell component="th" scope="row" padding="default">
													{`${n.firstName} ${n.middleName} ${n.lastName}`}
												</TableCell>
												<TableCell align="left"></TableCell>
												<TableCell align="left">
													{n.createdAt && fullFormatDate(n.createdAt.toDate())}
												</TableCell>
												<TableCell align="left">{upperFirst(n.status)}</TableCell>
												<TableCell align="left">
													{n.status === "completed" ? (
														<ReactToPrint
															trigger={() => (
																<CloudDownload
																	color="default"
																	className="pointer"
																/>
															)}
															content={() => reportsReferences[index]}
														/>
													) : (
															<CloudDownload color="disabled" className="pointer" />
														)}

													<ReportGenerated
														order={n}
														person={n.firstName + " " + n.lastName} //NB : this is test prop ony
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
			</React.Fragment>
		);
	}
}

function isInvestigationComplete(order = {}, investigation) {
	return Object.keys(order[investigation]).length > 0
}

function KYEOrderSummary({ order, closeSummary }) {
	// const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [pdfSrc,setPdfSrc]=React.useState('')
	let myRef = React.createRef();

	const handleOpen = () => {
		setOpen(true);
	 	
	}
	
	  const handleClose = () => {
		setOpen(false);
	  };
	const generateReport=()=>{

	}
	console.log("Show the order from here",order)
	return (
		<Paper>
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
				style={{
					// width:"800px",
					display: 'flex',
	  				alignItems: 'center',
	  				justifyContent: 'center',
					backgroundColor:"rgba(0,0,0,0.3)",
					
				}}
			>
				<div style={{backgroundColor:"white",minWidth:600,minHeight:"80vh",maxWidth:800,marginLeft:"auto",marginRight:"auto"}}>
					<PDFViewer style={{ width:"100%"}} height="400">
						<NewReport />
					</PDFViewer>
				</div>
			</Modal>
 

			<div style={{ position: "relative" }}>
				<div className="pointer" onClick={closeSummary} style={{ position: "absolute", right: 10, top: 10, padding:5 }}>
					X
			</div>
			</div>
			<div style={{ padding: 15 }}>
				<div style={{ fontSize: 22, marginBottom: 12, marginTop: 12 }}>
					{order.firstName} {order.middleName} {order.lastName} - {order.organizationName}
				</div>

				<div style={{ flexDirection: "row", display: "flex", fontSize: "1.2em", marginBottom: 10, paddingBottom: 5, borderBottom: "2px solid #ccc" }}>
					<div style={{ flex: 1 }}>
						Screening Type
					</div>
					<div style={{ flex: 1 }}>
						Status
					</div>
					<div style={{ flex: 1 }}>
						Report
					</div>
				</div>

				{
					order.screeningTypes.map(type => {
						const complete = isInvestigationComplete(order, type)
						return (
							<div key={type} style={{ flexDirection: "row", display: "flex", marginBottom: 5, marginTop: 5 }}>
								<div style={{ flex: 1, fontSize: "1.2em" }}>
									{type.split("-").map(s => upperFirst(s)).join(" ")}
								</div>
								<div style={{ flex: 1 }}>
									<div>
										<div style={{ backgroundColor: complete ? "#505db3" : "#ccc", height: 15, width: "80%", borderRadius: 10 }}></div>
									</div>
								</div>
								<div style={{ flex: 1 }}>
									{complete ? 
										<CloudDownload
										onClick={handleOpen}
										color="default"
										className="pointer"
									/> : <CloudDownload
											color="disabled"
											disabled
											className="pointer"
										/>}
								</div>
							</div>
						)
					})
				}
			</div>
			<div style={{display:"hidden",backgroundColor:"white",width:"793.706667px",height:"auto",padding:"30px"}} ref={myRef} id="report">
				<EmploymentHistoryReport/>
			</div>
		</Paper>
	)
}


const collapseComponent = (props) => (
	<td colSpan={3}> {/* put the number of col of your table in this field */}
		<div className={props.className}>
			{props.children}
		</div>
	</td>
)

function KYCOrderItem({ order, index }) {
	var reportsReferences = []; //references
	return (
		<TableRow
			hover
			// onClick={event => this.handleClick(event, n.id)}
			role="checkbox"
			tabIndex={-1}
			key={order.id}
		// selected={isSelected}
		>
			<TableCell align="left">{order.referenceNumber}</TableCell>
			<TableCell component="th" scope="row" padding="default">
				{order.customerName}
			</TableCell>
			<TableCell align="left"></TableCell>
			<TableCell align="left">
				{order.createdAt && fullFormatDate(order.createdAt.toDate())}
			</TableCell>
			<TableCell align="left">{upperFirst(order.status)}</TableCell>
			<TableCell align="left">
				{order.status === "completed" ? (
					<ReactToPrint
						trigger={() => (
							<CloudDownload color="default" className="pointer" />
						)}
						content={() => reportsReferences[index]}
					/>
				) : (
						<CloudDownload color="disabled" className="pointer" />
					)}

				<ReportGenerated
					order={order}
					person={order.firstName + " " + order.lastName} //NB : this is test prop ony
					reportOwner={order}
					ref={el => (reportsReferences[index] = el)}
				/>
			</TableCell>
		</TableRow>
	);
}

ViewOrders.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapState = state => ({
	profile: state.profile,
	// FIXME: This only loads the current users orders ... in our case, the user is also admin and its the only reason it "works" for the admin too
	myOrders: state.orders.myOrders.map(order => {
		return {
			...order,
			fullName: `${order.firstName} ${order.middleName} ${order.lastName}`
		};
	})
});

export default connect(mapState)(withStyles(styles)(ViewOrders));
