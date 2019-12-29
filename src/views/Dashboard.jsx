// @ts-check
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import firebase from "firebase";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
	ListItem,
	List,
	Toolbar,
	AppBar,
	Drawer,
	CssBaseline,
	Typography,
	Divider,
	IconButton,
	ListItemText,
	ListItemIcon
} from "@material-ui/core";
import {
	Mail as MailIcon,
	MoveToInbox,
	ChevronRight,
	AccountCircle,
	ExitToApp,
	Dashboard as DashboardIcon,
	Gavel,
	Create,
	ImportExport,
	ViewCarousel,
	SupervisedUserCircle,
	HowToReg,
	HelpOutline
} from "@material-ui/icons";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import OverviewCard from "../components/OverviewCard";
import NotificationsCard from "../components/NotificationsCard";
import OrdersTable from "../components/OrdersTable";
import QuickOrderCard from "../components/QuickOrderCard";

import NewOrder from "./NewOrder";
import ViewOrders from "./ViewOrders";
import PreLitigation from "./pre-litigation"
import CompanyStaff from "./CompanyStaff";
import Help from "./Help";
import Report from './client_reports/AcademicQualification'

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: "flex"
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	// appBarShift: {
	// 	marginLeft: drawerWidth,
	// 	width: `calc(100% - ${drawerWidth}px)`,
	// 	transition: theme.transitions.create(["width", "margin"], {
	// 		easing: theme.transitions.easing.sharp,
	// 		duration: theme.transitions.duration.enteringScreen
	// 	})
	// },
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	},
	hide: {
		display: "none"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap"
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: "hidden",
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing.unit * 9 + 1
		}
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	}
});

const drawerItems = [
	{
		text: "Dashboard",
		icons: <DashboardIcon />,
		path: "/dashboard/"
	},
	{
		text: "New Order",
		icons: <Create />,
		path: "/dashboard/new-order"
	},
	{
		text: "Import Orders",
		icons: <ImportExport />,
		path: "/dashboard/"
	},
	{
		text: "View Orders",
		icons: <ViewCarousel />,
		path: "/dashboard/my-orders"
	},
	{
		text: "Pre Litigation",
		icons: <Gavel />,
		path: "/dashboard/pre-litigation"
	},
	{
		text: "Company Users",
		icons: <SupervisedUserCircle />,
		path: "/dashboard/company-users"
	},
	{
		text: "References",
		icons: <HowToReg />,
		path: "/dashboard/"
	}
];

class Dashboard extends Component {
	state = {
		open: true
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	signOut = () => {
		if (window.confirm("Are you sure you want to sign out?")) {
			firebase.auth().signOut();
		}
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	toggleDrawerState = () => {
		this.setState({ open: !this.state.open })
	}

	render() {
		const { classes, theme, match, history } = this.props;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(classes.appBar)}
				>
					<Toolbar className="" disableGutters={true}>
						<IconButton
							aria-label="Open drawer"
							onClick={this.toggleDrawerState}
							className={classNames(classes.menuButton)}
						>
							<MenuIcon style={{ color: "white" }} />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.grow} noWrap>
							MA Verification System
						</Typography>
						<IconButton
							aria-owns={"menu-appbar"}
							aria-haspopup="true"
							onClick={() => this.signOut}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<IconButton
							aria-owns={"menu-appbar"}
							aria-haspopup="true"
							onClick={this.signOut}
							color="inherit"
						>
							<ExitToApp />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: this.state.open,
						[classes.drawerClose]: !this.state.open
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open
						})
					}}
					open={this.state.open}
				>
					<List style={{ marginTop: 20 }}>
						{drawerItems.map((item, index) => (
							<ListItem
								onClick={() => history.push(item.path)}
								button
								key={item.text}
							>
								<ListItemIcon>{item.icons}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						<ListItem onClick={() => history.push("help")} button>
							<ListItemIcon>
								<HelpOutline />
							</ListItemIcon>
							<ListItemText primary="Help" />
						</ListItem>
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Switch>
						<Route path={match.url} exact component={ClientDashboard} />
						<Route path={`${match.url}/new-order`} component={NewOrder} />
						<Route path={`${match.url}/my-orders`} component={ViewOrders} />
						<Route path={`${match.url}/company-users`} component={CompanyStaff} />
						<Route path={`${match.url}/help`} component={Help} />
						<Route path={`${match.url}/pre-litigation`} component={PreLitigation} />
						<Route path={`${match.url}/report`} component={Report} />
					</Switch>
				</main>
			</div>
		);
	}
}

function ClientDashboard(props) {
	return (
		<div>
			<Grid container style={{ marginBottom: "1em" }}>
				<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
					<OverviewCard bgColor="#311b92" title="Candidates" count={43} />
				</Grid>
				<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
					<OverviewCard bgColor="#ffc400" title="Pending" count={3} />
				</Grid>
				<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
					<OverviewCard bgColor="#2e7d32" title="Completed" count={12} />
				</Grid>
				<Grid item sm={6} md={3}>
					<OverviewCard bgColor="#d84315" title="Declined" count={4} />
				</Grid>
			</Grid>
			{/* <Grid container style={{ marginBottom: "1em" }}>
				<Grid style={{ paddingRight: "1em" }} item sm md={6}>
					<NotificationsCard />
				</Grid>
				<Grid item sm md={6}>
					<QuickOrderCard history={props.history} />
				</Grid>
			</Grid> */}
			<Grid container style={{ marginBottom: "1em" }}>
				<Grid item sm>
					<ViewOrders />
				</Grid>
			</Grid>
		</div>
	);
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Dashboard);
