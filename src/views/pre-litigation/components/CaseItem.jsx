// @ts-check
import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import { fullFormatDate } from "../../../utils";
import { upperFirst } from "lodash";
import { CloudDownload } from "@material-ui/icons";
import ReactToPrint from "react-to-print";

export default function CaseItem({ order, index }) {
	var reportsReferences = []; //references
	return (
		<TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
			<TableCell align="left">{order.referenceNumber}</TableCell>
			<TableCell component="th" scope="row" padding="default">
				{order.customerName}
			</TableCell>
			<TableCell align="left"></TableCell>
			<TableCell align="left">
				{order.createdAt && fullFormatDate(order.createdAt.toDate())}
			</TableCell>
			<TableCell align="left">{upperFirst(order.status)}</TableCell>
			<TableCell align="left">
				{order.status === "completed" ? (
					<ReactToPrint
						trigger={() => (
							<CloudDownload color="default" className="pointer" />
						)}
						content={() => reportsReferences[index]}
					/>
				) : (
					<CloudDownload color="disabled" className="pointer" />
				)}

				{/* <ReportGenerated
					order={order}
					person={order.firstName + " " + order.lastName} //NB : this is test prop ony
					reportOwner={order}
					ref={el => (reportsReferences[index] = el)}
				/> */}
			</TableCell>
		</TableRow>
	);
}
