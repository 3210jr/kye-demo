// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, TableRow, TableHead, TableCell, TableBody, Table } from "@material-ui/core";
import { camelCase, values, snakeCase } from "lodash";

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto"
	},
	table: {
		minWidth: 700
	}
});

function createData(titles, rows) {
	const record = {};
	titles.map((title, index) => {
		record[camelCase(title)] = rows[index];
	});
	return record;
}

// createData("Gingerbread", 356, 16.0, 49, 3.9)

function SimpleTable(props) {
	const { classes, titles, data = [] } = props;
	const rows = data.map(d => createData(titles, d));
	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{titles.map((title, index) =>
							index > 0 ? (
								<TableCell key={snakeCase(title)} align="right">
									{title}
								</TableCell>
							) : (
								<TableCell key={snakeCase(title)}>{title}</TableCell>
							)
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index}>
							{values(row).map((cell, cellIndex) =>
								cellIndex > 0 ? (
									<TableCell key={cellIndex} align="right">
										{cell}
									</TableCell>
								) : (
									<TableCell component="th" scope="row">
										{cell}
									</TableCell>
								)
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

SimpleTable.propTypes = {
	classes: PropTypes.object.isRequired,
	titles: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired
};

export default withStyles(styles)(SimpleTable);
