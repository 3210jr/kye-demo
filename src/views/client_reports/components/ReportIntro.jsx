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

import {SectionHeader,TableHeaderText,FieldsTitle} from './Headers'
import * as logoImg from "../../../assets/mwema_logo.png";

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
			<Grid container style={{ marginBottom: "1em" }} className="primary-background">
				<Table className="border-top border-right border-left">
					<TableBody>

						<TableRow>
							<TableCell colSpan={1}  className="table-cell-padding" padding="checkbox">
								<FieldsTitle label="Candidate Full Name" />
							</TableCell>
							<TableCell  colSpan={2} className="border-left table-cell-padding" padding="checkbox">
                                <p>{"Lorem ipsum "}</p>
                            </TableCell>
						</TableRow>

						<TableRow>
							<TableCell colSpan={1} className="table-cell-padding" padding="checkbox">
								<FieldsTitle label="Date Of Birth" />
							</TableCell>
							<TableCell  colSpan={2} className="border-left table-cell-padding" padding="checkbox">
                                 <p>{"Lorem ipsum "}</p>
                            </TableCell>
						</TableRow>

                        <TableRow>
							<TableCell colSpan={1} padding="checkbox">
								<FieldsTitle label="Address" />
							</TableCell>
							<TableCell colSpan={2} className="border-left table-cell-padding" padding="checkbox">
                                <p>{"Lorem ipsum "}</p>
                            </TableCell>
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
			<Grid container style={{ marginBottom: "1em" }} className="primary-background">
				<Table className="border-top border-right border-left">
					<TableBody>

						<TableRow>
							<TableCell colSpan={4} padding="checkbox">
								<FieldsTitle label="Report Prepared For" />
							</TableCell>
							<TableCell  colSpan={6} className="border-left" padding="checkbox">{" "}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell colSpan={4} padding="checkbox">
								<FieldsTitle label="MWEMA Reference Number" />
							</TableCell>
							<TableCell  colSpan={6} className="border-left" padding="checkbox">{" "}</TableCell>
						</TableRow>

                        <TableRow>
							<TableCell colSpan={4} padding="checkbox">
								<FieldsTitle label="Date Submitted" />
							</TableCell>
							<TableCell colSpan={2} padding="checkbox" className="border-left" style={{width:"20%"}}>{" "}</TableCell>
                            <TableCell colSpan={2} padding="checkbox" className="border-left" style={{width:"20%"}}>
                                <FieldsTitle label="Date Completed" />
                            </TableCell>
                            <TableCell colSpan={2} padding="checkbox" className="border-left" style={{width:"20%"}}>{" "}</TableCell>
						</TableRow>


					</TableBody>
				</Table>
			</Grid>
		</div>
	);
};




const ReportIntro= ({  }) => (
    <>  
        <LogoSection/>
        <CandidateHeaderDetails/>
        <ReportsHeaderDetails/>
    </>
);





export default ReportIntro;
