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
import { fullFormatDate } from "../../utils";
import {
	CloudDownload,
	Delete as DeleteIcon,
	FilterList as FilterListIcon
} from "@material-ui/icons";

// import ReportGenerated from "./ClientReport";

import ReactToPrint from "react-to-print";
import CaseItem from "./components/CaseItem";
import { ExtendedTableHead } from "../../components/Table";

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
	return order === "desc"
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}

const rows = [
	{ id: "id", numeric: true, disablePadding: false, label: "Reference ID" },
	{ id: "customerName", numeric: false, disablePadding: true, label: "Customer Name" },
	{
		id: "deliveryDate",
		numeric: true,
		disablePadding: false,
		label: "Delivery Date"
	},
	{
		id: "createdAt",
		numeric: true,
		disablePadding: false,
		label: "Placement Date"
	},
	{ id: "status", numeric: true, disablePadding: false, label: "Status" },
	{ id: "actions", numeric: false, disablePadding: false, label: "Actions" }
];

class CasesList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			order: "asc",
			orderBy: "name",
			selected: [],
			page: 0,
			rowsPerPage: 5
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

	handlePrint = item => {
		// console.log(item);
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	render() {
        const { classes, cases, onClickCase = () => {} } = this.props;
		const { order, orderBy, selected, rowsPerPage, page } = this.state;
		var reportsReferences = []; //references
		const emptyRows =
			rowsPerPage - Math.min(rowsPerPage, cases.length - page * rowsPerPage);
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<ExtendedTableHead
							numSelected={selected.length}
                            order={order}
                            rows={rows}
							orderBy={orderBy}
							onRequestSort={this.handleRequestSort}
							rowCount={cases.length}
						/>
						<TableBody>
							{stableSort(cases, getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n, index) => {
									const isSelected = this.isSelected(n.id);
									if (n.orderType === "kyc") {
										return <CaseItem order={n} index={index} />;
									}
									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isSelected}
                                            tabIndex={-1}
                                            onClick={() => onClickCase(n.id)}
											key={n.id}
										>
											<TableCell align="left">{n.referenceNumber}</TableCell>
											<TableCell component="th" scope="row" padding="default">
												{n.customerName}
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

												{/* <ReportGenerated
													order={n}
													person={n.firstName + " " + n.lastName} //NB : this is test prop ony
													reportOwner={n}
													ref={el => (reportsReferences[index] = el)}
												/> */}
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
					count={cases.length}
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

CasesList.propTypes = {
	classes: PropTypes.object.isRequired
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

const mapState = state => ({
	profile: state.profile,
	cases: state.litigationCases.cases
});

export default connect(mapState)(withStyles(styles)(CasesList));
