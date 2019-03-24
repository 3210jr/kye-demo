// @ts-check
import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
	CardActions,
	Card,
	CardContent,
	Button,
	Typography,
	FormControl,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	ListItemIcon,
	Grid
} from "@material-ui/core";
import { FolderIcon, MailOutline, ArrowRight } from "@material-ui/icons";

const styles = theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		marginTop: 0,
		width: "100%"
	},
	card: {
		paddingRight: theme.spacing.unit,
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
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		width: "100%"
	}
});

function QuickOrderCard(props) {
	const { classes } = props;
	const [open, toggleGenderDropDown] = useState(false);
	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography variant="h5" component="h2">
					Quick Order
				</Typography>

				<Typography variant="subheading" component="h2">
					Candidate Details
				</Typography>
				<form className={classes.container} noValidate autoComplete="off">
					<Grid container>
						<Grid item style={{ padding: "0 0.5em 0 0" }} xs={12} md={6}>
							<TextField
								id="first-name"
								label="First Name"
								className={classes.textField}
								// value={this.state.name}
								// onChange={this.handleChange("name")}
								margin="normal"
							/>
						</Grid>
						<Grid item style={{ padding: "0 0 0.5em 0" }} xs={12} md={6}>
							<TextField
								id="last-name"
								label="Last Name"
								className={classes.textField}
								// value={this.state.name}
								// onChange={this.handleChange("name")}
								margin="normal"
							/>
						</Grid>
						<Grid item style={{ padding: "0 0.5em 0 0" }} xs={12} md={6}>
							<TextField
								id="first-name"
								label="Date of Birth"
								className={classes.textField}
								// value={this.state.name}
								// onChange={this.handleChange("name")}
								margin="normal"
							/>
						</Grid>
						<Grid item style={{ padding: "0 0 0.5em 0" }} xs={12} md={6}>
							<TextField
								id="last-name"
								label="Address"
								className={classes.textField}
								// value={this.state.name}
								// onChange={this.handleChange("name")}
								margin="normal"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="demo-controlled-open-select">
									Gender
								</InputLabel>
								<Select
									open={open}
									onClose={() => toggleGenderDropDown(false)}
									onOpen={() => toggleGenderDropDown(true)}
									value="female"
									onChange={() => {}}
									inputProps={{
										name: "gender",
										id: "demo-controlled-open-select"
									}}
								>
									<MenuItem value={"male"}>Male</MenuItem>
									<MenuItem value={"female"}>Female</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</form>
			</CardContent>
			<CardActions style={{ justifyContent: "flex-end" }}>
				<Button size="small">
					Continue <ArrowRight />{" "}
				</Button>
			</CardActions>
		</Card>
	);
}

QuickOrderCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuickOrderCard);
