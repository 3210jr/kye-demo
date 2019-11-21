// @ts-check
import React from "react";
import PropTypes from "prop-types";
import {
	Tooltip,
	TableSortLabel,
	TableHead,
	TableCell,
	TableRow
} from "@material-ui/core";

export class ExtendedTableHead extends React.Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { rows, order, orderBy, rowCount } = this.props;

		return (
			<TableHead>
				<TableRow>
					{rows.map(
						row => (
							<TableCell
								key={row.id}
								align="left" //{row.numeric ? "right" : "left"}
								padding="default"
								sortDirection={orderBy === row.id ? order : false}
							>
								<Tooltip
									title="Sort"
									placement={row.numeric ? "bottom-end" : "bottom-start"}
									enterDelay={300}
								>
									<TableSortLabel
										active={orderBy === row.id}
										direction={order}
										onClick={this.createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						),
						this
					)}
				</TableRow>
			</TableHead>
		);
	}
}

ExtendedTableHead.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};
