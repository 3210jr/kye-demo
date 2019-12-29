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

import {
    FieldsTitle,
    SectionHeader,
    TableHeaderText
} from "./components/Headers";

// other reports
// for temporarily viewing only
import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/ChecksStatus";
import Observations from "./components/Observations";

import CVReport from "./CVAnalysis";
import EmploymentHistoryReport from "./EmploymentHistory";
import GapAnalysisReport from "./GapAnalysis";
import IDAnalysisReport from "./IDAnalysis";
import ProfessionAnalysisReport from "./ProfessionAnalysis";

const InstitutionDetailSummary = ({}) => {
    const institutions = [
        {
            name: "Qualification check: Australian Institute of Technology",
            referenceMethod: "Email",
            date: "1 Dec 2019"
        },
        {
            name: "University of Dar Es Salaam",
            referenceMethod: "Letter",
            date: "1 Dec 2019"
        }
    ];

    return (
        <Grid container style={{ marginTop: 15 }}>
            <Grid container style={{ marginBottom: "1em" }} className="primary-background">
                <Table className="border-top border-right border-left">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6} padding="checkbox">
                                <FieldsTitle label="Establish Name" />
                            </TableCell>
                            <TableCell
                                colSpan={3}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Reference Method" />
                            </TableCell>
                            <TableCell
                                colSpan={3}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Date Supplied" />
                            </TableCell>
                        </TableRow>
                        {institutions.map((institution, index) => {
                            return (
                                <TableRow>
                                    <TableCell colSpan={6} padding="checkbox">
                                        {institution.name}
                                    </TableCell>
                                    <TableCell
                                        colSpan={3}
                                        padding="checkbox"
                                        className="border-left"
                                    >
                                        {institution.referenceMethod}
                                    </TableCell>
                                    <TableCell
                                        colSpan={3}
                                        padding="checkbox"
                                        className="border-left"
                                    >
                                        {institution.date}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Grid>
            <Grid />
        </Grid>
    );
};

const InstitutionDetails = ({}) => {
    const data = [
        {
            name: "University of Portsmouth, United Kingdom",
            didCandidateStudyInThisInstitution: "Yes",
            details: {
                attendanceDateCandidate: "2009 - 2011",
                attendanceDateReferee: "Feb 2009 -Jan 2012",
                coursesCandidate:
                    "Occupational & Environmental Health & Safety Management",
                coursesReferee:
                    "Occupational & Environmental Health & Safety Management",
                qualificationCandidate: "MSc (Merit)",
                qualificationReferee: "MSc (Merit)"
            }
        }
    ];

    return (
        <>
            {data.map((institution, index) => {
                return (
                    <Grid container style={{ marginBottom: "1em" }} className="primary-background">
                        <Table className="border-top border-right border-left">
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={6} padding="checkbox">
                                        <FieldsTitle label="Qualification" />
                                    </TableCell>
                                    <TableCell
                                        colSpan={6}
                                        padding="checkbox"
                                        className="border-left"
                                    >
                                        <FieldsTitle label={institution.name} />
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{}}>
                                    <TableCell colSpan={6} padding="checkbox">
                                        <FieldsTitle label="Did candidate study at this establishment?" />
                                    </TableCell>
                                    <TableCell colSpan={6}
                                    padding="checkbox" className="border-left"
                                    >
                                        <FieldsTitle
                                            label={
                                                institution.didCandidateStudyInThisInstitution
                                            }
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{ padding: 30 }}>
                                    <TableCell colSpan={12} >
                                        <Table
                                            style={{ margin: "0 auto;" }}
                                            className="border-top border-right border-left"
                                        >
                                            <TableBody className="white-background">
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                    ></TableCell>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                        className="border-left"
                                                    >
                                                        <FieldsTitle label="Candidate" />
                                                    </TableCell>

                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                        className="border-left"
                                                    >
                                                        <FieldsTitle label="Referee" />
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                    >
                                                        <FieldsTitle label="Attendance Date" />
                                                    </TableCell>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                        className="border-left"
                                                    >
                                                        {
                                                            institution.details
                                                                .attendanceDateCandidate
                                                        }
                                                    </TableCell>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                        className="border-left"
                                                    >
                                                        {
                                                            institution.details
                                                                .attendanceDateReferee
                                                        }
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                    >
                                                        <FieldsTitle label="Name of course(s) studied" />
                                                    </TableCell>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                        className="border-left"
                                                    >
                                                        {
                                                            institution.details
                                                                .coursesCandidate
                                                        }
                                                    </TableCell>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                        className="border-left"
                                                    >
                                                        {
                                                            institution.details
                                                                .coursesReferee
                                                        }
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                    >
                                                        <FieldsTitle label="Qualification and grade awaded" />
                                                    </TableCell>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                        className="border-left"
                                                    >
                                                        {
                                                            institution.details
                                                                .qualificationCandidate
                                                        }
                                                    </TableCell>
                                                    <TableCell
                                                        colSpan={4}
                                                        padding="checkbox"
                                                        className="border-left"
                                                    >
                                                        {
                                                            institution.details
                                                                .qualificationReferee
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                );
            })}
        </>
    );
};

const AcademicQualificationReport = ({}) => {
    const institutions = [
        {
            name: "Qualification check: Australian Institute of Technology",
            color: "#ff8789"
        },
        { name: "University of Dar Es Salaam", color: "#00ff00" }
    ];

    const observations = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
        "Lorem ipsum "
    ];

    return (
        <>
            <ReportIntro />
            <CheckStatus data={institutions} />
            <Observations data={observations} />
            <InstitutionDetailSummary />
            <InstitutionDetails />
        </>
    );
};

const PageDivider = () => (
    <Divider
        orientation="vertical"
        style={{
            height: 40,
            backgroundColor: "#f6f6f6",
            marginLeft: -15,
            marginRight: -15,
            marginTop: 15,
            marginBottom: 15
        }}
    />
);
const AllReports = () => {
    return (
        <div style={{ backgroundColor: "white", padding: 15 }}>
            <AcademicQualificationReport />
            <PageDivider />
            <CVReport />
            <PageDivider />
            <EmploymentHistoryReport />
            <PageDivider />
            <GapAnalysisReport />
            <PageDivider />
            <IDAnalysisReport />
            <PageDivider />
            <ProfessionAnalysisReport />
        </div>
    );
};

export default AllReports;
