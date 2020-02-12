// @ts-check
import React, { Component, useState } from "react";
import { Provider, connect, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import OverviewCard from "../../components/OverviewCard";
import {
    Grid,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table,
    Fab,
    Typography,
    Paper,
    FormControlLabel,
    FormControl,
    FormLabel,
    Switch as SwitchButton,
    FormGroup,
    Button,
    FormHelperText,
    TextField,
    TablePagination
} from "@material-ui/core";

import { AdminRoute } from "../../ExtendedRoutes";
import Layout from "../Layout";
import CompanyView from "./CompanyView";
import OrderView from "./OrderView";

import {
    Mail as MailIcon,
    MoveToInbox,
    Dashboard as DashboardIcon,
    Create,
    FormatAlignJustify,
    AccountBalance,
    ViewCarousel,
    SupervisedUserCircle,
    HowToReg,
    Close,
    HelpOutline,
    Gavel
} from "@material-ui/icons";
import AdminOrdersTable from "./components/AdminOrdersTable";
import CompanyForm from "./components/CompanyForm";
import CompanyStaff from "../CompanyStaff";
import Reports from "./Reports";
import PreLitigation from "./Prelitigation";

const drawerItems = [
    {
        text: "Dashboard",
        icons: <DashboardIcon />,
        path: "/admin/"
    },
    {
        text: "New Order",
        icons: <Create />,
        path: "/dashboard/new-order"
    },
    {
        text: "Companies",
        icons: <AccountBalance />,
        path: "/admin/companies/"
    },
    {
        text: "View Orders",
        icons: <ViewCarousel />,
        path: "/admin/orders"
    },
    {
        text: "Pre Litigation",
        icons: <Gavel />,
        path: "/admin/pre-litigation"
    },
    {
        text: "Mwema Users",
        icons: <SupervisedUserCircle />,
        path: "/admin/mwema-users"
    },
    // {
    // 	text: "References",
    // 	icons: <HowToReg />,
    // 	path: "/admin/"
    // },
    {
        text: "Reports",
        icons: <FormatAlignJustify />,
        path: "/admin/reports"
    }
];

class Admin extends Component {
    render() {
        const { match, history } = this.props;
        return (
            <div className="App">
                <Layout
                    history={history}
                    drawerItems={drawerItems}
                    title={"MA Verification System Admin"}
                >
                    <Switch>
                        <AdminRoute
                            path={`${match.path}`}
                            exact
                            component={Dashboard}
                        />
                        <AdminRoute
                            path={`${match.path}companies/`}
                            exact
                            component={Companies}
                        />
                        <AdminRoute
                            path={`${match.path}companies/:companyId`}
                            exact
                            component={CompanyView}
                        />
                        <AdminRoute
                            path={`${match.path}mwema-users`}
                            exact
                            component={CompanyStaff}
                        />
                        <AdminRoute
                            path={`${match.path}reports`}
                            exact
                            component={Reports}
                        />
                        <AdminRoute
                            path={`${match.path}orders`}
                            exact
                            component={OrdersView}
                        />
                        <AdminRoute
                            path={`${match.path}pre-litigation`}
                            component={PreLitigation}
                        />
                        <AdminRoute
                            path={`${match.path}orders/:orderId`}
                            exact
                            component={OrderView}
                        />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const OrdersView = ({ history }) => {
    return (
        <div>
            <Grid container>
                <AdminOrdersTable history={history} />
            </Grid>
        </div>
    );
};

const Dashboard = ({ history }) => {
    const organizations = useSelector(
        state => state.organizations.organizations
    );
    const orders = useSelector(state => state.orders.orders);
    const uncofirmedOrders = orders.filter(order => order.status === "pending");
    const inProgress = orders.filter(order => order.status === "in progress");
    const declined = orders.filter(order => order.status === "rejected");
    return (
        <div>
            <Grid container style={{ marginBottom: "1em" }}>
                <Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
                    <OverviewCard
                        bgColor="#fff"
                        whiteText={false}
                        title="Organizations"
                        count={organizations.length}
                    />
                </Grid>
                <Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
                    <OverviewCard
                        bgColor="#fff"
                        whiteText={false}
                        title="Unconfirmed"
                        count={uncofirmedOrders.length}
                    />
                </Grid>
                <Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
                    <OverviewCard
                        bgColor="#fff"
                        whiteText={false}
                        title="In Progress"
                        count={inProgress.length}
                    />
                </Grid>
                <Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
                    <OverviewCard
                        bgColor="#fff"
                        whiteText={false}
                        title="Declined"
                        count={declined.length}
                    />
                </Grid>
            </Grid>

            <Grid container>
                <AdminOrdersTable history={history} />
            </Grid>
        </div>
    );
};

const Companies = ({ history }) => {
    const [registerCompany, toggleRegisterCompany] = useState(false);
    return (
        <div>
            <Grid container style={{ marginBottom: "1em" }}>
                <AdminCompaniesTableContainer history={history} />
            </Grid>

            {registerCompany && (
                <CompanyForm
                    closeForm={() => toggleRegisterCompany(!registerCompany)}
                    title="Register Company"
                />
            )}
            <Fab
                aria-label="Register Company"
                style={{ position: "fixed", right: 20, bottom: 20 }}
                color="primary"
                className="primary"
                onClick={() => toggleRegisterCompany(!registerCompany)}
            >
                {registerCompany ? <Close /> : <Create />}
            </Fab>
        </div>
    );
};

const columns = [
    { id: "name", label: "Name", minWidth: 150 },
    { id: "address", label: "Address", minWidth: 200 },
    {
        id: "country",
        label: "Country",
        minWidth: 100
    },
    {
        id: "email",
        label: "Contact Email",
        minWidth: 100
    },
    {
        id: "telephone",
        label: "Telephone",
        minWidth: 100
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
        id: "ncuo83kmw4yr089f",
        name: "Tanzania Tobacco",
        address: "Plot 43 Kijitonyama Peninsula, Masaki, Dar Es Salaam",
        country: "Tanzania",
        email: "one@email.com",
        telephone: "+255 716 234 360"
    },
    {
        id: "ncuo8evn9832r089f",
        name: "Bank Of Emergency",
        address: "Your Company Here",
        country: "Tanzania",
        email: "user@email.com",
        telephone: "+255 716 234 360"
    },
    {
        id: "ncj93inw4yr089f",
        name: "Flying Doctors",
        address: "Your Company Here",
        country: "Tanzania",
        email: "info@email.com",
        telephone: "+255 716 234 360"
    },
    {
        id: "ncuo8eaivniejk49f",
        name: "International Oil Co.",
        address: "Your Company Here",
        country: "Tanzania",
        email: "companya@email.com",
        telephone: "+255 716 234 360"
    },
    {
        id: "nccn3984whfni089f",
        name: "Facebook Inc.",
        address: "Your Company Here",
        country: "Tanzania",
        email: "companya@email.com",
        telephone: "+255 716 234 360"
    }
];

function AdminCompaniesTable({ history, profile, organizations }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function openCompany(id) {
        history.push(`/admin/companies/${id}`);
    }

    console.log("Organizations: ", organizations);

    return (
        <Paper className="wide">
            <div style={{ marginTop: "1em", marginLeft: "1em" }}>
                <Typography variant="h6" id="tableTitle">
                    Companies
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
                        {organizations
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(row => (
                                <TableRow
                                    hover
                                    onClick={() => openCompany(row.id)}
                                    role="checkbox"
                                    className="pointer"
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
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

const mapState = (state, ...rest) => ({
    profile: state.profile,
    organizations: state.organizations.organizations,
    ...rest
});

const AdminCompaniesTableContainer = connect(mapState)(AdminCompaniesTable);

export default Admin;
