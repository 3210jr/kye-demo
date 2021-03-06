// @ts-check
import React, { Suspense } from "react";
import { renderToString } from "react-dom/server";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
    Button,
    LinearProgress,
    Grid
} from "@material-ui/core";
import { upperFirst, find } from "lodash";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { saveAs } from "file-saver";
import { fullFormatDate, reverseFileName, isValidUUID } from "../utils";
import {
    CloudDownload,
    Delete as DeleteIcon,
    FilterList as FilterListIcon
} from "@material-ui/icons";

import store from "../store";
//	packages for generating PDF to replace previous modules for working with pdf

import { ExtendedTableHead } from "../components/Table";

// new report styling and everything
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

import NewReport from "./client_reports/Report";
import JSZip from "jszip";
import firebase from "firebase";
// const NewReport=React.lazy(() => import('./client_reports/Report'));

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
    {
        id: "fullName",
        numeric: false,
        disablePadding: true,
        label: "Full Name"
    },
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

    selectRow = id => {
        const { selectedRowId } = this.state;
        const { myOrders, history, match } = this.props;
        const row = find(myOrders, ["id", id]);
        if (row && row.status === "changes requested") {
            return history.push(`${match.url}/edit-order/${id}`);
        }
        let rowId = id;
        if (selectedRowId === id) {
            rowId = "";
        }
        window.scrollTo(0, 0);
        this.setState({ selectedRowId: rowId });
    };

    closeSummary = () => {
        this.setState({ selectedRowId: "" });
    };

    handlePrint = item => {
        // handlePrint()
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
        const {
            order,
            orderBy,
            selected,
            rowsPerPage,
            page,
            selectedRowId
        } = this.state;

        console.log(this.props);

        const selectedOrder = find(myOrders, ["id", selectedRowId]);
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, myOrders.length - page * rowsPerPage);
        return (
            <React.Fragment>
                {selectedRowId.length > 0 && selectedOrder && (
                    <KYEOrderSummary
                        closeSummary={this.closeSummary}
                        order={selectedOrder}
                    />
                )}

                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                        >
                            <ExtendedTableHead
                                numSelected={selected.length}
                                rows={rows}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                                rowCount={myOrders.length}
                            />
                            <TableBody>
                                {stableSort(
                                    myOrders,
                                    getSorting(order, orderBy)
                                )
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((n, index) => {
                                        const isSelected = this.isSelected(
                                            n.id
                                        );
                                        if (n.orderType === "kyc") {
                                            return (
                                                <KYCOrderItem
                                                    order={n}
                                                    index={index}
                                                />
                                            );
                                        }
                                        return (
                                            <TableRow
                                                hover
                                                // onClick={event => this.handleClick(event, n.id)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                className="pointer"
                                                tabIndex={-1}
                                                onClick={() =>
                                                    this.selectRow(n.id)
                                                }
                                                key={n.id}
                                            >
                                                <TableCell align="left">
                                                    {n.referenceNumber}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="default"
                                                >
                                                    {`${n.firstName} ${n.middleName} ${n.lastName}`}
                                                </TableCell>
                                                <TableCell align="left"></TableCell>
                                                <TableCell align="left">
                                                    {n.createdAt &&
                                                        fullFormatDate(
                                                            n.createdAt.toDate()
                                                        )}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {upperFirst(n.status)}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {n.status ===
                                                    "completed" ? (
                                                        <CloudDownload
                                                            color="default"
                                                            onClick={() => this.handlePrint(n)}
                                                            className="pointer"
                                                        />
                                                    ) : (
                                                        <CloudDownload
                                                            color="disabled"
                                                            className="pointer"
                                                        />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{ height: 49 * emptyRows }}
                                    >
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
    return Object.keys(order[investigation]).length > 0;
}

function KYEOrderSummary({ order, closeSummary }) {
    // const LazyReport = React.lazy(() => import("./client_reports/Report"));

    const [open, setOpen] = React.useState(false);
    const [screeningType, setScreeningType] = React.useState("");

    const getReportName = () => {
        if (screeningType && order) {
            const type = screeningType
                .split("-")
                .map(s => upperFirst(s))
                .join(" ");
            const name = upperFirst(
                `${order.firstName} ${order.middleName} ${order.lastName}`
            );
            return name + " - " + type + ".pdf";
        }
    };

    const handleOpen = (type, order) => {
        store.dispatch.orders.setCurrentOrder(order);
        setScreeningType(type);
        setOpen(true);
    };

    const downloadZippedReport = async (event, blob) => {
        // TODO: account for multiple and single type entries
        event.preventDefault();
        const zip = new JSZip(); // initialize the zip folder
        const reportName = getReportName(); // get the report name
        zip.file(reportName, blob); // create zip folder with the correct name

        const docs = zip.folder("Supporting Documents")

        const { supportingDocsURL } = order[screeningType];

        if (Object.keys(order[screeningType]).length > 3 && supportingDocsURL) {
            // this report does not contain multiple layers of reports (no "add another report")
            const fileName = reverseFileName(
                firebase.storage().refFromURL(supportingDocsURL).name
            );
            const supportingDocument = await axios.get(supportingDocsURL, {
                responseType: "blob"
            });
            docs.file(fileName, supportingDocument.data);
        } else {
            // this report contains multiple layers of reports
            const fileURLs = Object.keys(order[screeningType])
                .map(key => {
                    if (isValidUUID(key)) {
                        return order[screeningType][key].supportingDocsURL;
                    }
                    return null;
                })
                .filter(key => key !== null);

            // console.log("Files: ", fileURLs);

            const requests = fileURLs.map(url => {
                const fileName = reverseFileName(
                    firebase.storage().refFromURL(url).name
                );
                // console.log("FileNAe:", fileName, url);
                return axios
                    .get(url, {
                        responseType: "blob"
                    })
                    .then(res => docs.file(fileName, res.data));
            });

            // console.log("Requests: ", requests);

            await Promise.all(requests);
        }
        console.log(zip.files);
        zip.generateAsync({ type: "blob" }).then(function(content) {
            saveAs(content, `${order.firstName}-${screeningType}.zip`);
        });
    };
    const handleClose = () => {
        setOpen(false);
    };
    const generateReport = () => {};
    return (
        <Paper>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
                disableAutoFocus={true}
                style={{
                    // width:"800px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.7)"
                }}
            >
                <div
                    style={{
                        minWidth: 800,
                        height: "80%",
                        maxWidth: 900,
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <PDFDownloadLink
                        document={<NewReport screeningType={screeningType} />}
                        fileName={getReportName()}
                        style={{ textDecoration: "none" }}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? (
                                <LinearProgress />
                            ) : (
                                <Grid
                                    container
                                    // direction="row-reverse"
                                    // justify="center"
                                    alignItems="baseline"
                                    style={{
                                        // paddingLeft: 8,
                                        padding: 20,
                                        backgroundColor: "#323639"
                                    }}
                                >
                                    <Grid item xs={9}>
                                        <Typography
                                            variant="h5"
                                            component="h5"
                                            style={{ color: "white" }}
                                        >
                                            {getReportName()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={evt =>
                                                downloadZippedReport(evt, blob)
                                            }
                                            fullWidth
                                            style={{ height: "100%" }}
                                        >
                                            Download Report
                                        </Button>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </PDFDownloadLink>
                    <PDFViewer
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none"
                        }}
                    >
                        <NewReport screeningType={screeningType} />
                    </PDFViewer>
                </div>
            </Modal>

            <div style={{ position: "relative" }}>
                <div
                    className="pointer"
                    onClick={closeSummary}
                    style={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                        padding: 5
                    }}
                >
                    X
                </div>
            </div>
            <div style={{ padding: 15 }}>
                <div style={{ fontSize: 22, marginBottom: 12, marginTop: 12 }}>
                    {order.firstName} {order.middleName} {order.lastName} -{" "}
                    {order.organizationName}
                </div>

                <div
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        fontSize: "1.2em",
                        marginBottom: 10,
                        paddingBottom: 5,
                        borderBottom: "2px solid #ccc"
                    }}
                >
                    <div style={{ flex: 1 }}>Screening Type</div>
                    <div style={{ flex: 1 }}>Status</div>
                    <div style={{ flex: 1 }}>Report</div>
                </div>

                {order.screeningTypes.map(type => {
                    const complete = isInvestigationComplete(order, type);
                    return (
                        <div
                            key={type}
                            style={{
                                flexDirection: "row",
                                display: "flex",
                                marginBottom: 5,
                                marginTop: 5
                            }}
                        >
                            <div style={{ flex: 1, fontSize: "1.2em" }}>
                                {type
                                    .split("-")
                                    .map(s => upperFirst(s))
                                    .join(" ")}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div>
                                    <div
                                        style={{
                                            backgroundColor: complete
                                                ? "#505db3"
                                                : "#ccc",
                                            height: 15,
                                            width: "80%",
                                            borderRadius: 10
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                {complete ? (
                                    <CloudDownload
                                        onClick={() => {
                                            handleOpen(type, order);
                                        }}
                                        color="default"
                                        className="pointer"
                                    />
                                ) : (
                                    <CloudDownload
                                        color="disabled"
                                        disabled
                                        className="pointer"
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Paper>
    );
}

const collapseComponent = props => (
    <td colSpan={3}>
        {" "}
        {/* put the number of col of your table in this field */}
        <div className={props.className}>{props.children}</div>
    </td>
);

function KYCOrderItem({ order, index }) {
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
                    <CloudDownload color="default" className="pointer" />
                ) : (
                    <CloudDownload color="disabled" className="pointer" />
                )}
            </TableCell>
        </TableRow>
    );
}

ViewOrders.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapState = (state, props) => ({
    profile: state.profile,
    // FIXME: This only loads the current users orders ... in our case, the user is also admin and its the only reason it "works" for the admin too
    myOrders: state.orders.myOrders.map(order => {
        return {
            ...order,
            fullName: `${order.firstName} ${order.middleName} ${order.lastName}`
        };
    }),
    ...props
});

export default connect(mapState)(withStyles(styles)(ViewOrders));
