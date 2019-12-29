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
    Divider
} from "@material-ui/core";

import * as logoImg from "../../assets/mwema_logo.png";
import "../ClientReport.css";


// other reports
// for temporarily viewing only

import CVReport from './CVAnalysis'
import EmploymentHistoryReport from './EmploymentHistory'
import GapAnalysisReport from './GapAnalysis'
import IDAnalysisReport from './IDAnalysis'
import ProfessionAnalysisReport from './ProfessionAnalysis'



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


const AcademicCheckStatuses = ({ }) => {
    const institutions=[
        {name:"Qualification check: Australian Institute of Technology",color:"#ff8789"},
        {name:"University of Dar Es Salaam",color:"#00ff00"}
    ]

	return (
		<div>
            <Grid container style={{marginBottom:14}}>
                <Grid item xs={12} sm={12}>
                   <SectionHeader label="Report Details" />
                </Grid>
                <Grid item xs={10} sm={10}>
                   <FieldsTitle label="Background Check Included Within This Report" />
                </Grid>
                <Grid item xs={2} sm={2}>
                   <FieldsTitle label="Status"/>
                </Grid>
            </Grid>
                {institutions.map((institution,index)=>{
                     return(

                        <Grid container key={index} style={{ marginBottom: "1em" }}>
                            <Grid item xs={12} sm={10}>
                                <FieldsTitle label={institution.name} />
                            </Grid>
                            <Grid item xs={12} sm={2} style={{backgroundColor:institution.color}}>
                                
                            </Grid>
                        </Grid>
                        
                       
                     )
                })}
		</div>
	);
};


const Observations = ({ }) => {

    const data=[
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
        "Lorem ipsum "
    ]

	return (
        <>
            <Grid container style={{marginBottom:14}}>
                <Grid item xs={12} sm={12}>
                   <SectionHeader label="Report Details" />
                </Grid>
            </Grid>
                {data.map((text,index)=>{
                     return(
                        <Grid container key={index} style={{ marginBottom: "1em" }}>
                            <Grid item xs={12} sm={12}>
                             
                                <Typography variant="body1" component="body1">
                                  {index+1} . {text} 
                                </Typography>
                     
                            </Grid>
                        </Grid>                       
                     )
                })}
        </>
	);
};


const InstitutionDetailSummary = ({ }) => {

    const institutions=[
        {name:"Qualification check: Australian Institute of Technology",referenceMethod:"Email","date":"1 Dec 2019"},
        {name:"University of Dar Es Salaam",referenceMethod:"Letter","date":"1 Dec 2019"}
    ]

	return (
        <>
         <Grid container style={{ marginBottom: "1em" }}>
				<Table>
					<TableBody>

						<TableRow>
							<TableCell colSpan={6}>
								<TableHeaderText label="Establish Name" />
							</TableCell>
							<TableCell  colSpan={3}>
                                <TableHeaderText label="Reference Method" />
                            </TableCell>
                            <TableCell  colSpan={3}>
                                <TableHeaderText label="Date Supplied" />
                            </TableCell>
						</TableRow>
                        {institutions.map((institution,index)=>{
                            return(
                            <TableRow>
                                <TableCell  colSpan={6}>{institution.name}</TableCell>
							    <TableCell  colSpan={3}>{institution.referenceMethod}</TableCell>
                                <TableCell  colSpan={3}>{institution.date}</TableCell>
						    </TableRow>
                            )
                        })}
                      


					</TableBody>
				</Table>
			</Grid>
        </>
    );
    

};

const InstitutionDetails = ({ }) => {

    const data=[
        {
            name:"University of Portsmouth, United Kingdom",
            didCandidateStudyInThisInstitution:"Yes",
            details:{
                attendanceDateCandidate:"2009 - 2011",
                attendanceDateReferee:"Feb 2009 -Jan 2012",
                coursesCandidate:"Occupational & Environmental Health & Safety Management",
                coursesReferee:"Occupational & Environmental Health & Safety Management",
                qualificationCandidate:"MSc (Merit)",
                qualificationReferee:"MSc (Merit)"

            }
        }
    ]

	return (
        <>
        {data.map((institution,index)=>{
            return(
                <Grid container style={{ marginBottom: "1em" }}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={6}>
								<TableHeaderText label="Qualification" />
							</TableCell>
							<TableCell  colSpan={6}>
                                <TableHeaderText label={institution.name} />
                            </TableCell>
						</TableRow>

                        <TableRow style={{}}>
							<TableCell colSpan={6}>
								<TableHeaderText label="Did candidate study at this establishment?" />
							</TableCell>
							<TableCell  colSpan={6}>
                                <TableHeaderText label={institution.didCandidateStudyInThisInstitution} />
                            </TableCell>
						</TableRow>


                        <TableRow style={{padding:30}}>

                            <TableCell colSpan={12}>
                                <Table style={{margin:"0 auto;"}}>
                                    <TableBody>
                                    
                                        <TableRow>
                                            <TableCell colSpan={4}>

                                            </TableCell>
                                            <TableCell  colSpan={4}>
                                                <TableHeaderText label="Candidate" />
                                            </TableCell>

                                            <TableCell  colSpan={4}>
                                                <TableHeaderText label="Referee" />
                                            </TableCell>

                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <TableHeaderText label="Attendance Date" />
                                            </TableCell>
                                            <TableCell  colSpan={4}>
                                                {institution.details.attendanceDateCandidate}
                                            </TableCell>
                                            <TableCell  colSpan={4}>
                                                {institution.details.attendanceDateReferee}
                                            </TableCell>
                                        </TableRow>
                                        
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <TableHeaderText label="Name of course(s) studied" />
                                            </TableCell>
                                            <TableCell  colSpan={4}>
                                                {institution.details.coursesCandidate}
                                            </TableCell>
                                            <TableCell  colSpan={4}>
                                                {institution.details.coursesReferee}
                                            </TableCell>
                                        </TableRow>
                                        
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <TableHeaderText label="Qualification and grade awaded" />
                                            </TableCell>
                                            <TableCell  colSpan={4}>
                                                {institution.details.qualificationCandidate}
                                            </TableCell>
                                            <TableCell  colSpan={4}>
                                                {institution.details.qualificationReferee}
                                            </TableCell>
                                        </TableRow>
                                        
                                    </TableBody>
                                </Table>
                            </TableCell>

                        </TableRow>

					</TableBody>
				</Table>
			</Grid>
            )
        })}
        
        </>
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

const AcademicQualificationReport = ({  }) => (
    <>  
    <LogoSection/>
    <CandidateHeaderDetails/>
    <ReportsHeaderDetails/>
    <AcademicCheckStatuses/>
    <Observations/>
    <InstitutionDetailSummary/>
    <InstitutionDetails/>
</>
);


const PageDivider=()=>(
    <Divider orientation="vertical" style={{height:40,backgroundColor:"#f6f6f6",marginLeft:-15,marginRight:-15,marginTop:15,marginBottom:15}}/>
)
const AllReports=()=>{

    return(
        <div style={{backgroundColor:"white",padding:15}}>
            <AcademicQualificationReport/>
            <PageDivider/>
            <CVReport/>
            <PageDivider/>
            <EmploymentHistoryReport/>
            <PageDivider/>
            <GapAnalysisReport/>
            <PageDivider/>
            <IDAnalysisReport/>
            <PageDivider/>
            <ProfessionAnalysisReport/>
        </div>
    )
}


export default AllReports;
