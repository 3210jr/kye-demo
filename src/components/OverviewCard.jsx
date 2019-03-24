// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { CardActions, Card, CardContent, Button, Typography, withStyles } from "@material-ui/core";

const styles = {
	card: {},
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

function OverviewCard(props) {
	const { classes, count, title } = props;
	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography variant="h2" align="right" component="h2">
					{count}
				</Typography>
				<Typography component="h3" variant="h5" color="textSecondary" align="right">{title}</Typography>
			</CardContent>
		</Card>
	);
}

OverviewCard.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired
};

export default withStyles(styles)(OverviewCard);
