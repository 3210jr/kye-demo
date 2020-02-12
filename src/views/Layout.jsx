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
	Menu as MenuIcon,
	HelpOutline
} from "@material-ui/icons";
import {layoutStyle as styles} from "./Styles"

class Layout extends Component {
	state = {
		open: true
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	toggleDrawerState = () => {
		this.setState({ open: !this.state.open })
	}

	render() {
		const { classes, theme, drawerItems, history, children, title } = this.props;
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
