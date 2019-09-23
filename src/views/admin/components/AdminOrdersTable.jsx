// @ts-check
import React, { useState } from "react";
import {
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Table,
	Typography,
	Paper,
	TablePagination
} from "@material-ui/core";

const columns = [
	{ id: "ref", label: "Ref#", minWidth: 100 },
	{ id: "fullName", label: "Full Name", minWidth: 100 },
	{
		id: "company",
		label: "Company",
		minWidth: 120
	},
	{
		id: "orderDate",
		label: "Placement Date",
		minWidth: 120
	},
	{
		id: "deliveryDate",
		label: "Delivery Date",
		minWidth: 120
		// align: "right",
		// format: value => value.toFixed(2)
	}
	// {
	// 	id: "actions",
	// 	label: "Actions",
	// 	minWidth: 120
	// }
];

const rows = [
	{
		_id: "ncuo83kmw4yr089f",
		ref: "129",
		fullName: "James Jacob",
		company: "Your Company Here",
		orderDate: "12 Sept 2019",
		deliveryDate: "16 Sept 2019",
		actions: "20"
	},
	{
		_id: "ncuo8evn9832r089f",
		ref: "243",
		fullName: "James Jacob",
		company: "Your Company Here",
		orderDate: "12 Sept 2019",
		deliveryDate: "16 Sept 2019",
		actions: "20"
	},
	{
		_id: "ncj93inw4yr089f",
		ref: "642",
		fullName: "James Jacob",
		company: "Your Company Here",
		orderDate: "12 Sept 2019",
		deliveryDate: "16 Sept 2019",
		actions: "20"
	},
	{
		_id: "ncuo8eaivniejk49f",
		ref: "436",
		fullName: "James Jacob",
		company: "Your Company Here",
		orderDate: "12 Sept 2019",
		deliveryDate: "16 Sept 2019",
		actions: "20"
	},
	{
		_id: "nccn3984whfni089f",
		ref: "346",
		fullName: "James Jacob",
		company: "Your Company Here",
		orderDate: "12 Sept 2019",
		deliveryDate: "16 Sept 2019",
		actions: "20"
	}
];

export default function AdminOrdersTable() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}

	function openOrder() {
		// alert("");
	}

	return (
		<Paper className="wide">
			<div style={{ marginTop: "1em", marginLeft: "1em" }}>
				<Typography variant="h6" id="tableTitle">
					Recent Orders
				</Typography>
			</div>
			<div className="">
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(row => (
								<TableRow
									hover
									onClick={openOrder}
									role="checkbox"
									className="pointer"
									tabIndex={-1}
									key={row._id}
								>
									{columns.map(column => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{value}
											</TableCell>
										);
									})}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					"aria-label": "previous page"
				}}
				nextIconButtonProps={{
					"aria-label": "next page"
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
