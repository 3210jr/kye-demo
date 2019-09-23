// @ts-check
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
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
	Menu,
	ChevronLeft,
	SupervisedUserCircle,
	HowToReg,
	HelpOutline
} from "@material-ui/icons";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";

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

class Layout extends Component {
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
		const { classes, theme, drawerItems, history, children, title } = this.props;
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
							<Menu />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.grow} noWrap>
							{title}
						</Typography>
						{/* <IconButton
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
						</IconButton> */}
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
							{theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
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
					{children}
				</main>
			</div>
		);
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Layout);
