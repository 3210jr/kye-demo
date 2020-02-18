// @ts-check

//codes in this file are to be moved to different files in later commits
import React from "react";
import {
	Grid,
	TableRow,
	TableCell,
	TableBody,
	Table,
	Typography
} from "@material-ui/core";
import _, { map } from "lodash";

import * as logoImg from "../assets/mwema_logo.png";
import "./ClientReport.css";

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
		marginTop: "40px",
		marginBottom: "40px"
	}
};

const Logo = () => (
	<div className="center">
		<div style={{ textAlign: "center" }}>
			<img alt="" style={{}} src={logoImg} />
		</div>
	</div>
);
const ReportsHeader = ({ person, referenceNumber }) => {
	return (
		<div>
			<Grid container style={{ marginBottom: "1em" }}>
				<Table>
					<TableBody>
						<TableRow style={{}}>
							<TableCell style={borders.left}>
								<FieldsTitle label="Subject Name" />
							</TableCell>
							<TableCell style={borders.left}>{person}</TableCell>
							<TableCell style={borders.left_right} rowSpan={2}>
								<Logo />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={borders.left}>
								<FieldsTitle label="Ref No" />
							</TableCell>
							<TableCell style={borders.left}>{referenceNumber}</TableCell>
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
	<Typography variant="h5" align="center" style={headers.marginTopBottom}>
		{label}
	</Typography>
);
const TableHeaderText = ({ label }) => (
	<Typography variant="h6" align="center">
		{label}
	</Typography>
);

const FirstPage = ({ person }) => {
	if (person.identification === null || person.identification === undefined)
		return null;
	return (
		<div className="page">
			<ReportsHeader
				person={
					person.firstName + " " + person.middleName + " " + person.lastName
				}
				referenceNumber={person.referenceNumber}
			/>

			<SectionHeader label="Identity verification Report" />
			<Grid container style={{ marginBottom: "1em" }}>
				<Table>
					<TableBody style={borders.top}>
						<TableRow>
							<TableCell colSpan={4} style={borders.left_right}>
								<TableHeaderText label="Report Details" />
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell style={borders.left}>
								<FieldsTitle label="Document Type" />
							</TableCell>
							<TableCell style={borders.left}>
								{_.upperFirst(person.identification.documentType)}
							</TableCell>
							<TableCell style={borders.left}>
								<FieldsTitle label="Country of Issue" />
							</TableCell>
							<TableCell style={borders.left_right}>
								{person.identification.countryOfIssue.split(" ").map(word => _.upperFirst(word)).join(" ")}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell style={borders.left}>
								<FieldsTitle label="Date of Check" />
							</TableCell>
							<TableCell style={borders.left}>
								{person.identification.dateOfCheck}
							</TableCell>
							<TableCell style={borders.left}>
								<FieldsTitle label="Date of Birth Consisteny" />
							</TableCell>
							<TableCell style={borders.left_right}>
								{person.identification.dateOfBirthConsisntency}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell style={borders.left}>
								<FieldsTitle label="Score" />
							</TableCell>
							<TableCell style={borders.left_right} colSpan={3}>
								{person.identification.passportScore}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell style={borders.left}>
								<FieldsTitle label="Verifier's Comments" />
							</TableCell>
							<TableCell style={borders.left_right} colSpan={3}>
								{person.identification.comments}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Grid>

			{/* <Grid container>
				<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
				<Table >
				<TableBody style={borders.top}>
					<TableRow>
					<TableCell colSpan={2} style={borders.left_right}>
						<TableHeaderText label="Candidate Details"/>
					</TableCell>
					</TableRow>
					<TableRow>
					<TableCell style={borders.left}>
						<FieldsTitle label="Name of subject" />
					</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>
						<FieldsTitle label="Employment ID" />
					</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>
						<FieldsTitle label="Process Name" />
					</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>
				</TableBody>
				</Table>

				</Grid>
				<Grid item xs={6} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Table>
						<TableBody style={borders.top}>
							<TableRow>
								<TableCell colSpan={2} style={borders.left_right}>
									<TableHeaderText label="Client Details" />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Name of Organization" />
								</TableCell>
								<TableCell style={borders.left_right}>
									{order.organizationName}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Process Name" />
								</TableCell>
								<TableCell style={borders.left_right}>
									{"Lorem ipsum"}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Grid>
			</Grid>

			<Grid
				container
				style={{
					paddingLeft: 3,
					paddingRight: 3,
					marginTop: 5,
					marginBottom: 5
				}}
			>
				<Grid item xs={12}>
					<Table>
						<TableBody style={borders.top}>
							<TableRow>
								<TableCell style={borders.left_right}>
									<FieldsTitle label="All Check are clear" />
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Grid>
			</Grid>
 */}

			{/* <Grid container>
				<Grid item xs={12} style={{paddingLeft:3,paddingRight:3}}>
				<Table >
				<TableBody style={borders.top}>
					<TableRow>
					<TableCell colSpan={6} style={borders.left_right}>
						<TableHeaderText label="Severity Legend"/>
					</TableCell>
					</TableRow>
					<TableRow>
					<TableCell style={borders.left}>Discrepant</TableCell>
					<TableCell style={borders.left}>Minor Discrepant</TableCell>
					<TableCell style={borders.left}>Attention Required</TableCell>
					<TableCell style={borders.left}>Insufficient</TableCell> 
					<TableCell style={borders.left}>No response received</TableCell> 
					<TableCell style={borders.left_right}>Clear</TableCell>
					</TableRow>



					<TableRow>
					<TableCell 	style={borders.left}></TableCell>
					<TableCell 	style={borders.left}></TableCell>
					<TableCell	style={borders.left}></TableCell>
					<TableCell	style={borders.left}></TableCell>
					<TableCell	style={borders.left}></TableCell>
					<TableCell 	style={borders.left_right}></TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>


				</TableBody>
				</Table>

				</Grid> */}
			{/* </Grid> */}
		</div>
	);
};

const SecondPage = ({ person }) => {
	return (
		<div className="page">
			<ReportsHeader
				person={
					person.firstName + " " + person.middleName + " " + person.lastName
				}
				referenceNumber={person.referenceNumber}
			/>

			<Grid container style={{ marginBottom: "1em" }}>
				<Table>
					<TableBody style={borders.top}>
						<TableRow>
							<TableCell colSpan={7} style={borders.left_right}>
								<TableHeaderText label="Executive Summary" />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={borders.left}>
								<FieldsTitle label="S No" />
							</TableCell>
							<TableCell style={borders.left}>
								<FieldsTitle label="Check Name" />
							</TableCell>
							<TableCell style={borders.left}>
								<FieldsTitle label="Verified By/At" />
							</TableCell>
							<TableCell style={borders.left}>
								<FieldsTitle label="Check Status" />
							</TableCell>
							{/* <TableCell style={borders.left}>
				<FieldsTitle label="Check Severity" />
			</TableCell>
			<TableCell style={borders.left}>
				<FieldsTitle label="Page" />
			</TableCell> */}
							<TableCell style={borders.left_right}>
								<FieldsTitle label="Annexure" />
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell style={borders.left}>{"1"}</TableCell>
							<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
							<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
							<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
							{/* <TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell> */}
							<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell colSpan={7} style={borders.left_right}></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Grid>
		</div>
	);
};

const ThirdPage = ({ person }) => {
	if (
		person["academic-qualifications"] === null ||
		person["academic-qualifications"] === undefined
	)
		return null;

	return (
		<div className="page">
			<ReportsHeader
				person={
					person.firstName + " " + person.middleName + " " + person.lastName
				}
				referenceNumber={person.referenceNumber}
			/>

			{/* <SectionHeader label="Check 1"/> */}
			<SectionHeader label="Education Verification Report" />

			{map(person["academic-qualifications"], (value, key) => (
				<Grid key={key} container style={{ marginBottom: "1em" }}>
					<Table>
						<TableBody style={borders.top}>
							<TableRow>
								<TableCell style={borders.left}>
									<TableHeaderText label="Details of Education" />
								</TableCell>
								{/* <TableCell style={borders.left}>
							<TableHeaderText label="Antecedents Started"/>
						</TableCell> */}
								<TableCell style={borders.left_right}>
									<TableHeaderText label="Antecedents verified" />
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="College/Institute/University/Location" />
								</TableCell>
								{/* <TableCell style={borders.left}>{value.establishmentName}</TableCell> */}
								<TableCell style={borders.left_right}>
									{value.establishmentName}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Did candidate study in this establishment" />
								</TableCell>
								{/* <TableCell style={borders.left}>{"Lorem ipsum"}</TableCell> */}
								<TableCell style={borders.left_right}>
									{value.didCandidateStudyInTheEstablishment}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Roll No / Registration No/ Enrollment No." />
								</TableCell>
								{/* <TableCell style={borders.left}>{"Lorem ipsum"}</TableCell> */}
								<TableCell style={borders.left_right}>
									{"Lorem ipsum"}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Course Name / Qualification" />
								</TableCell>
								{/* <TableCell style={borders.left}>{"Lorem ipsum"}</TableCell> */}
								<TableCell style={borders.left_right}>
									{value.nameOfCourseStudiedCandidate}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Grade " />
								</TableCell>
								<TableCell colSpan={2} style={borders.left_right}>
									{value.qualificationAndGradedAwardedCandidate}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Year of Passing" />
								</TableCell>
								{/* <TableCell style={borders.left}>{"Lorem ipsum"}</TableCell> */}
								<TableCell style={borders.left_right}>
									{value.dateSupplied}
								</TableCell>
							</TableRow>

							{/* <TableRow>
						<TableCell style={borders.left}>
							<TableHeaderText label="Details "/>
						</TableCell>
						<TableCell colSpan={2} style={borders.left_right}>
							<TableHeaderText label="Antecedents Verified "/>
						</TableCell>
						</TableRow> */}

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Mode of verification " />
								</TableCell>
								<TableCell colSpan={2} style={borders.left_right}>
									{value.referenceMethod}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Verifier's Comments" />
								</TableCell>
								<TableCell colSpan={2} style={borders.left_right}>
									{}
								</TableCell>
							</TableRow>

							{/* <TableRow>
						<TableCell style={borders.left}>
							<FieldsTitle label="Final Disposition" />
						</TableCell>
						<TableCell colSpan={2} style={borders.left_right}>{qualificationAndGradedAwardedCandidate}</TableCell>
						</TableRow>

						<TableRow>
						<TableCell style={borders.left}>
							<FieldsTitle label="Check Severity " />
						</TableCell>
						<TableCell colSpan={2} style={borders.left_right}>{"Clear"}</TableCell>
						</TableRow> */}
						</TableBody>
					</Table>
				</Grid>
			))}

			{/* <SectionHeader label="End of Checks"/> */}
		</div>
	);
};

const EmploymentHistoryReportPage = ({ person }) => {
	if (
		person["employment-history"] === null ||
		person["employment-history"] === undefined
	)
		return null;

	return (
		<div className="page">
			<ReportsHeader
				person={
					person.firstName + " " + person.middleName + " " + person.lastName
				}
				referenceNumber={person.referenceNumber}
			/>

			{/* <SectionHeader label="Check 1"/> */}
			<SectionHeader label="Employment History Verification Report" />

			{map(person["employment-history"], (value, key) => (
				<Grid container key={key} style={{ marginBottom: "1em" }}>
					<Table>
						<TableBody style={borders.top}>
							<TableRow>
								<TableCell colSpan={4} style={borders.left_right}>
									<TableHeaderText label="Report Details" />
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Organization" />
								</TableCell>
								<TableCell style={borders.left}>{value.organization}</TableCell>
								<TableCell style={borders.left}>
									<FieldsTitle label="Position" />
								</TableCell>
								<TableCell style={borders.left_right}>
									{value.positionHeldCandidate}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Position" />
								</TableCell>
								<TableCell style={borders.left}>
									{value.positionHeldCandidate}
								</TableCell>
								<TableCell style={borders.left}>
									<FieldsTitle label="Referee" />
								</TableCell>
								<TableCell style={borders.left_right}>
									{value.positionHeldReferee}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Start date candidate" />
								</TableCell>
								<TableCell style={borders.left}>
									{value.employmentStartDateCandidate}
								</TableCell>
								<TableCell style={borders.left}>
									<FieldsTitle label="Start date Referee" />
								</TableCell>
								<TableCell style={borders.left_right}>
									{value.employmentStartDateReferee}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="End date candidate" />
								</TableCell>
								<TableCell style={borders.left}>
									{value.employmentEndDateCandidate}
								</TableCell>
								<TableCell style={borders.left}>
									<FieldsTitle label="End date Referee" />
								</TableCell>
								<TableCell style={borders.left_right}>
									{value.employmentEndDateReferee}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Score" />
								</TableCell>
								<TableCell style={borders.left_right} colSpan={3}>
									{value.employmentHistoryScore}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Verifier's Comments" />
								</TableCell>
								<TableCell style={borders.left_right} colSpan={3}>
									{value.comments}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Grid>
			))}

			{/* <SectionHeader label="End of Checks"/> */}
		</div>
	);
};

const GapsInEMploymentReportPage = ({ person }) => {
	if (person["gaps-reports"] === null || person["gaps-reports"] === undefined)
		return null;
	return (
		<div className="page">
			<ReportsHeader
				person={
					person.firstName + " " + person.middleName + " " + person.lastName
				}
				referenceNumber={person.referenceNumber}
			/>

			<SectionHeader label="Gaps verification Report" />

			{map(person["gaps-reports"], (value, key) => (
				<Grid container key={key} style={{ marginBottom: "1em" }}>
					<Table>
						<TableBody style={borders.top}>
							<TableRow>
								<TableCell colSpan={4} style={borders.left_right}>
									<TableHeaderText label="Report Details" />
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Period" />
								</TableCell>
								<TableCell style={borders.left_right}>{value.period}</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Score" />
								</TableCell>
								<TableCell style={borders.left_right} colSpan={3}>
									{value.gapInEmploymentHistoryScore}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="General Comments" />
								</TableCell>

								<TableCell style={borders.left_right} colSpan={3}>
									{value.gapInEmploymentHistoryScore}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell style={borders.left}>
									<FieldsTitle label="Verifier's Comments" />
								</TableCell>
								<TableCell style={borders.left_right} colSpan={3}>
									{value.comments}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Grid>
			))}
		</div>
	);
};

const PoliceReportPage = ({ person }) => {
	if (
		person["police-reports"] === null ||
		person["police-reports"] === undefined
	)
		return null;
	const details = person["police-reports"];
	return (
		<div className="page">
			<ReportsHeader
				person={
					person.firstName + " " + person.middleName + " " + person.lastName
				}
				referenceNumber={person.referenceNumber}
			/>

			<SectionHeader label="Police verification Report" />

			<Grid container style={{ marginBottom: "1em" }}>
				<Table>
					<TableBody style={borders.top}>
						<TableRow>
							<TableCell colSpan={4} style={borders.left_right}>
								<TableHeaderText label="Report Details" />
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell style={borders.left}>
								<FieldsTitle label="Score" />
							</TableCell>
							<TableCell style={borders.left_right}>
								{details.criminalAnalysisScore}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell style={borders.left}>
								<FieldsTitle label="Verifier's Comments" />
							</TableCell>
							<TableCell style={borders.left_right} colSpan={3}>
								{details.comments}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Grid>
		</div>
	);
};

const FourthPage = ({ person }) => {
	return (
		<div className="page">
			<ReportsHeader
				person={
					person.firstName + " " + person.middleName + " " + person.lastName
				}
				referenceNumber={person.referenceNumber}
			/>

			<SectionHeader label="Disclaimer & Limitations of Research" />
			<Grid container style={{ marginBottom: "1em" }}>
				<Typography variant="subtitle1">{"Disclaimer message"}</Typography>
			</Grid>
		</div>
	);
};

class ReportGenerated extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { reportOwner } = this.props;

		return (
			<div className="report_print_form ">
				<h2 id="page-one"></h2>
				<FirstPage person={reportOwner} />
				<h2 className="page-break"></h2>
				<ThirdPage person={reportOwner} />
				<h2 className="page-break"></h2>
				<EmploymentHistoryReportPage person={reportOwner} />
				<h2 className="page-break"></h2>
				<GapsInEMploymentReportPage person={reportOwner} />
				<h2 className="page-break"></h2>
				<PoliceReportPage person={reportOwner} />
				<h2 className="page-break"></h2>
				<SecondPage person={reportOwner} />
				<h2 className="page-break"></h2>
				<FourthPage person={reportOwner} />
			</div>
		);
	}
}

export default ReportGenerated;
