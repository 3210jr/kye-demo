// @ts-check
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
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
	Dashboard as DashboardIcon,
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
import CompanyStaff from "./CompanyStaff";
import Help from "./Help";

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
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
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
		open: false
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes, theme, match, history } = this.props;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: this.state.open
					})}
				>
					<Toolbar disableGutters={!this.state.open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, {
								[classes.hide]: this.state.open
							})}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.grow} noWrap>
							Mwema Advocates KYC
						</Typography>
						<IconButton
							aria-owns={"menu-appbar"}
							aria-haspopup="true"
							onClick={() => {}}
							color="inherit"
						>
							<AccountCircle />
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
					<div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
					<List>
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
					</Switch>
				</main>
			</div>
		);
	}
}

function ClientDashboard() {
	return (
		<div>
			<Grid container style={{ marginBottom: "1em" }}>
				<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
					<OverviewCard title="Candidates" count={43} />
				</Grid>
				<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
					<OverviewCard title="Pending" count={3} />
				</Grid>
				<Grid style={{ paddingRight: "1em" }} item sm={6} md={3}>
					<OverviewCard title="Completed" count={12} />
				</Grid>
				<Grid item sm={6} md={3}>
					<OverviewCard title="Declined" count={4} />
				</Grid>
			</Grid>
			<Grid container style={{ marginBottom: "1em" }}>
				<Grid style={{ paddingRight: "1em" }} item sm md={6}>
					<NotificationsCard />
				</Grid>
				<Grid item sm md={6}>
					<QuickOrderCard />
				</Grid>
			</Grid>
			<Grid container style={{ marginBottom: "1em" }}>
				<Grid item sm>
					<OrdersTable />
				</Grid>
			</Grid>
		</div>
	);
}

function MyOrdersView() {
	return (
		<>
			<Typography paragraph>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
				elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
				hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
				velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
				Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
				quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin
				fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
				lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at
				consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
				faucibus et molestie ac.
			</Typography>
			<Typography paragraph>
				Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget
				nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat
				ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
				volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at
				quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus
				viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
				Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et.
				Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod
				elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis.
				Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
			</Typography>
		</>
	);
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Dashboard);
