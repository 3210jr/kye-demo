// @ts-check

//codes in this file are to be moved to different files in later commits
import React from "react";
import {
	Grid,
	TableRow,
	TableCell,
	TableBody,
	Table,
    Typography,
} from "@material-ui/core";

import * as logoImg from "../../../assets/mwema_logo.png";
import "../../ClientReport.css";

const borders = {
	left: {
		borderLeft: "1px solid #ececec"
	},
	right: {
		borderRight: "1px solid #ececec"
	},
	left_right: {
		borderLeft: "1px solid #ececec",
		borderRight: "1px solid #ececec"
	},
	top: {
		borderTop: "1px solid #ececec"
	}
};

const headers = {
	marginTopBottom: {
		marginTop: "20px",
		marginBottom: "20px"
	}
};

const Logo = () => (
	<div className="center">
		<div style={{ textAlign: "right" }}>
			<img alt="" style={{}} src={logoImg} />
		</div>
	</div>
);

const LogoSection=({})=>{
    return(
        <div>
            <Logo/>
        </div>

    )
}
const CandidateHeaderDetails = ({ }) => {
	return (
		<div>
            <SectionHeader label="Candidate Details"/>
			<Grid container style={{ marginBottom: "1em" }}>
				<Table>
					<TableBody>

						<TableRow>
							<TableCell colSpan={4}>
								<FieldsTitle label="Candidate Full Name" />
							</TableCell>
							<TableCell  colSpan={6}>{" "}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell colSpan={4} >
								<FieldsTitle label="Date Of Birth" />
							</TableCell>
							<TableCell  colSpan={6}>{" "}</TableCell>
						</TableRow>

                        <TableRow>
							<TableCell colSpan={4}>
								<FieldsTitle label="Address" />
							</TableCell>
							<TableCell colSpan={6}>{" "}</TableCell>
						</TableRow>


					</TableBody>
				</Table>
			</Grid>
		</div>
	);
};


const ReportsHeaderDetails = ({ }) => {
	return (
		<div>
            <SectionHeader label="Report Details"/>
			<Grid container style={{ marginBottom: "1em" }}>
				<Table>
					<TableBody>

						<TableRow>
							<TableCell colSpan={4}>
								<FieldsTitle label="Report Prepared For" />
							</TableCell>
							<TableCell  colSpan={6}>{" "}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell colSpan={4} >
								<FieldsTitle label="MWEMA Reference Number" />
							</TableCell>
							<TableCell  colSpan={6}>{" "}</TableCell>
						</TableRow>

                        <TableRow>
							<TableCell colSpan={4}>
								<FieldsTitle label="Date Submitted" />
							</TableCell>
							<TableCell colSpan={2}>{" "}</TableCell>
                            <TableCell colSpan={2}>
                                <FieldsTitle label="Date Completed" />
                            </TableCell>
                            <TableCell colSpan={2}>{" "}</TableCell>
						</TableRow>


					</TableBody>
				</Table>
			</Grid>
		</div>
	);
};


const FieldsTitle = ({ label }) => (
	<Typography variant="subtitle2">{label}</Typography>
);

const SectionHeader = ({ label }) => (
	<Typography variant="h5" align="left" style={headers.marginTopBottom}>
		{label}
	</Typography>
);
const TableHeaderText = ({ label }) => (
	<Typography variant="h6" align="left">
		{label}
	</Typography>
);

const ReportIntro= ({  }) => (
    <>  
        <LogoSection/>
        <CandidateHeaderDetails/>
        <ReportsHeaderDetails/>
    </>
);





export default ReportIntro;
