// @ts-check
import React, { Component } from "react";
import {
	Grid,
	TextField,
	Typography,
	Button,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default class Help extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			message: ""
		};

		this.updateForm = this.updateForm.bind(this);
	}
	updateForm(field, value) {
		this.setState(prevState => (prevState[field] = value));
	}
	render() {
		const { classes } = this.props;
		const { email, message } = this.state;
		return (
			<div>
				<Grid container>
					<Grid item xs={12} lg={9}>
						<Typography component="h3" variant="h5">
							Please contact us for any questions, comments, and/or suggestions.
						</Typography>
						<TextField
							label="Subject"
							className="wide"
							value={email}
							onChange={e => this.updateForm("email", e.target.value)}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							label="Your message"
							className="wide"
							value={message}
							onChange={e => this.updateForm("message", e.target.value)}
							margin="normal"
							variant="outlined"
							multiline
							rows="4"
							rowsMax="4"
						/>
						<Button variant="contained" color="primary">
							Send your message!
						</Button>
					</Grid>

					<Grid style={{ marginTop: 40, marginBottom: 40 }} item xs={12} lg={9}>
						<Typography component="h4" color="textSecondary" variant="h6">
							Be sure to read through our frequently asked questions to clarify any
							other doubts you might have!
						</Typography>
						<ExpansionPanels />
					</Grid>
				</Grid>
			</div>
		);
	}
}

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: 10
	},
	heading: {
		fontSize: theme.typography.pxToRem(20),
		flexBasis: "66.66%",
		flexShrink: 0
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	}
});

class ControlledExpansionPanels extends React.Component {
	state = {
		expanded: null
	};

	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false
		});
	};

	render() {
		const { classes } = this.props;
		const { expanded } = this.state;

		return (
			<div className={classes.root}>
				{faqs.map(faq => (
					<ExpansionPanel
						expanded={expanded === faq.id}
						key={faq.id}
						onChange={this.handleChange(faq.id)}
					>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>{faq.title}</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography>{faq.answer}</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				))}
			</div>
		);
	}
}

const answer =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, consectetur libero autem sint, quasi praesentium perspiciatis possimus iure labore assumenda unde voluptate explicabo non fuga quo qui! Ipsam, atque quo.";
const faqs = [
	{
		title: "How is my company's data secured?",
		id: "nviusehr30q",
		answer
	},
	{
		title: "Do you offer international criminal verification?",
		id: "nvius32r30q",
		answer
	},
	{
		title: "Do you track individuals across their carreers?",
		id: "n9susehr30q",
		answer
	}
];

ControlledExpansionPanels.propTypes = {
	classes: PropTypes.object.isRequired
};

const ExpansionPanels = withStyles(styles)(ControlledExpansionPanels);
