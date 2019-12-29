// @ts-check
import React from "react";
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

import ReportGenerated from "./ClientReport";

import ReactToPrint from "react-to-print";
import { ExtendedTableHead } from "../components/Table";


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

	const handleOpen = () => {
		setOpen(true);
	  };
	
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
				<div style={{backgroundColor:"white",minWidth:700,maxWidth:800,marginLeft:"auto",marginRight:"auto"}}>
					<embed  src="data:application/pdf;filename=generated.pdf;base64,JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA4MQo+PgpzdHJlYW0KMC41NyB3CjAgRwpCVAovRjEgNDAgVGYKNDYuMDAgVEwKMCBnCjk5LjIxIDc3MS4wMiBUZAooT2N0b255YW4gbG92ZXMganNQREYpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKNSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKNyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1PYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjggMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXIKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTAgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTEgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTIgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGRPYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjEzIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtUm9tYW4KL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtQm9sZEl0YWxpYwovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1phcGZEaW5nYmF0cwovU3VidHlwZSAvVHlwZTEKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1N5bWJvbAovU3VidHlwZSAvVHlwZTEKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQovRm9udCA8PAovRjEgNSAwIFIKL0YyIDYgMCBSCi9GMyA3IDAgUgovRjQgOCAwIFIKL0Y1IDkgMCBSCi9GNiAxMCAwIFIKL0Y3IDExIDAgUgovRjggMTIgMCBSCi9GOSAxMyAwIFIKL0YxMCAxNCAwIFIKL0YxMSAxNSAwIFIKL0YxMiAxNiAwIFIKL0YxMyAxNyAwIFIKL0YxNCAxOCAwIFIKPj4KL1hPYmplY3QgPDwKPj4KPj4KZW5kb2JqCjE5IDAgb2JqCjw8Ci9Qcm9kdWNlciAoanNQREYgMS41LjMpCi9DcmVhdGlvbkRhdGUgKEQ6MjAxOTEyMjkyMTM4MjYrMDMnMDAnKQo+PgplbmRvYmoKMjAgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDEgMCBSCi9PcGVuQWN0aW9uIFszIDAgUiAvRml0SCBudWxsXQovUGFnZUxheW91dCAvT25lQ29sdW1uCj4+CmVuZG9iagp4cmVmCjAgMjEKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMjU1IDAwMDAwIG4gCjAwMDAwMDIwNzIgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMTI0IDAwMDAwIG4gCjAwMDAwMDAzMTIgMDAwMDAgbiAKMDAwMDAwMDQzNyAwMDAwMCBuIAowMDAwMDAwNTY3IDAwMDAwIG4gCjAwMDAwMDA3MDAgMDAwMDAgbiAKMDAwMDAwMDgzNyAwMDAwMCBuIAowMDAwMDAwOTYwIDAwMDAwIG4gCjAwMDAwMDEwODkgMDAwMDAgbiAKMDAwMDAwMTIyMSAwMDAwMCBuIAowMDAwMDAxMzU3IDAwMDAwIG4gCjAwMDAwMDE0ODUgMDAwMDAgbiAKMDAwMDAwMTYxMiAwMDAwMCBuIAowMDAwMDAxNzQxIDAwMDAwIG4gCjAwMDAwMDE4NzQgMDAwMDAgbiAKMDAwMDAwMTk3NiAwMDAwMCBuIAowMDAwMDAyMzIwIDAwMDAwIG4gCjAwMDAwMDI0MDYgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAyMQovUm9vdCAyMCAwIFIKL0luZm8gMTkgMCBSCi9JRCBbIDwwQjZEOTExNzM5MTVEOTlDQUZBMzNFRkFFRUJGNERDRj4gPDBCNkQ5MTE3MzkxNUQ5OUNBRkEzM0VGQUVFQkY0RENGPiBdCj4+CnN0YXJ0eHJlZgoyNTEwCiUlRU9G" type="application/pdf" style={{overflow: "show", width: "100%", height: '80vh'}}></embed>
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
