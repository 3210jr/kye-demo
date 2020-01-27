// @ts-check
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
import { upperFirst } from "lodash";
import { fullFormatDate } from "../../../utils";

const columns = [
    { id: "referenceNumber", label: "Reference #", minWidth: 100 },
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
    },
    {
        id: "status",
        label: "Status",
        minWidth: 120
    }
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

function AdminOrdersTable({ orders, history }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function openOrder(orderId) {
        // alert("");
        history.push(`/admin/orders/${orderId}`);
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
                        {orders
                            // .sort((prev, cur) => prev.ref - cur.ref)
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(row => (
                                <TableRow
                                    hover
                                    onClick={() => openOrder(row.id)}
                                    role="checkbox"
                                    className="pointer"
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    <TableCell align="left">
                                        {row.referenceNumber}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        padding="default"
                                    >
                                        {row.orderType === "kyc"
                                            ? row.customerName
                                            : `${row.firstName} ${row.middleName} ${row.lastName}`}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.organizationName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.createdAt &&
                                            fullFormatDate(
                                                row.createdAt.toDate()
                                            )}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.deliveryDate &&
                                            fullFormatDate(
                                                row.deliveryDate.toDate()
                                            )}
                                    </TableCell>
                                    <TableCell align="left">
                                        {upperFirst(row.status)}
                                    </TableCell>
                                    {/* {columns.map(column => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{value}
											</TableCell>
										);
									})} */}
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

AdminOrdersTable.propTypes = {
    orders: PropTypes.object.isRequired
};

const mapState = state => ({
    profile: state.profile,
    orders: state.orders.orders
});

export default connect(mapState)(AdminOrdersTable);
