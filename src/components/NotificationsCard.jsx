// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
	CardActions,
	Card,
	CardContent,
	Button,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemIcon
} from "@material-ui/core";
import { FolderIcon, MailOutline } from "@material-ui/icons";

const styles = {
	card: {
		minWidth: 275
	},
	listItem: {
		borderBottom: "1px solid #ccc",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#a9acb98a",
			color: "#fff"
		}
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)"
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
};

const notifications = [
	"Your Employee status order is completed",
	"Please review the documents submitted",
	"Receipt of your new order has been confirmed",
	"Mwema Advocates now supports complete employee management.",
	"Order #342 has been completed"
];

function NotificationsCard(props) {
	const { classes } = props;
	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography variant="h5" component="h2">
					Notifications
				</Typography>
				<List>
					{notifications.map((notif, index) => (
						<ListItem key={notif.split(" ")[0]} className={classes.listItem}>
							<ListItemIcon>
								<MailOutline />
							</ListItemIcon>
							<ListItemText
								primary={notif}
								secondary={false ? "Secondary text" : null}
							/>
						</ListItem>
					))}
				</List>
			</CardContent>
			<CardActions>{/* <Button size="small">Learn More</Button> */}</CardActions>
		</Card>
	);
}

NotificationsCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotificationsCard);
