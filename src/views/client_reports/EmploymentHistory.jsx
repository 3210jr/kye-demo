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
import { FieldsTitle, SectionHeader } from "./components/Headers";
import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/ChecksStatus";
import Observations from "./components/Observations";
import AdditionInformation from "./components/AdditionInformation";

const EmploymentSummary = ({ data }) => {
    return (
        <Grid
            container
            style={{ marginBottom: 30 }}
            className="primary-background"
        >
            <Table className="border-top border-right border-left">
                <TableBody>
                    <TableRow>
                        <TableCell
                            colSpan={8}
                            padding="checkbox"
                            className="border-left"
                        >
                            <FieldsTitle label="Organisation" />
                        </TableCell>
                        <TableCell
                            colSpan={2}
                            padding="checkbox"
                            className="border-left"
                        >
                            <FieldsTitle label="Reference Method" />
                        </TableCell>
                        <TableCell
                            colSpan={2}
                            padding="checkbox"
                            className="border-left"
                        >
                            <FieldsTitle label="Date Produced" />
                        </TableCell>
                    </TableRow>
                    {data.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell
                                    colSpan={8}
                                    padding="checkbox"
                                    className="border-left"
                                >
                                    {item.name}
                                </TableCell>
                                <TableCell
                                    colSpan={2}
                                    padding="checkbox"
                                    className="border-left"
                                >
                                    {item.referenceMethod}
                                </TableCell>
                                <TableCell
                                    colSpan={2}
                                    padding="checkbox"
                                    className="border-left"
                                >
                                    {item.dataProduced}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Grid>
    );
};

const JobRoleConfimation = ({ data }) => {
    return (
        <Grid container style={{ marginBottom: "1em" }}>
            <Grid container item xs>
                <SectionHeader label="Job Role Confirmation" />
            </Grid>

            <Grid container item className="primary-background">
                <Table className="border-top border-right border-left">
                    <TableBody>
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Organisation" />
                            </TableCell>
                            <TableCell
                                colSpan={6}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Position Held" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell
                                colSpan={6}
                                padding="checkbox"
                                className="border-left"
                            >
                                {"Lorem ipsum"}
                            </TableCell>

                            <TableCell
                                colSpan={6}
                                padding="none"
                                className="border-left"
                            >
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                padding="checkbox"
                                            >
                                                <FieldsTitle label="Candidate" />
                                            </TableCell>
                                            <TableCell
                                                colSpan={6}
                                                padding="checkbox"
                                                className="border-left"
                                            >
                                                <FieldsTitle label="Referee" />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                padding="checkbox"
                                            >
                                                {}
                                            </TableCell>
                                            <TableCell
                                                colSpan={6}
                                                padding="checkbox"
                                                className="border-left"
                                            >
                                                {}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};

const EmploymentDateConfirmation = ({}) => {
    return (
        <Grid container style={{ marginBottom: "1em" }}>
            <Grid container item xs>
                <SectionHeader label="Confirmation of Employement Date" />
            </Grid>

            <Grid
                container
                item
                style={{ marginBottom: "1em" }}
                className="primary-background"
            >
                <Table className="border-top border-right border-left">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} padding="checkbox">
                                <FieldsTitle label="Organisation" />
                            </TableCell>
                            <TableCell
                                colSpan={4}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Employement Start Date" />
                            </TableCell>
                            <TableCell
                                colSpan={4}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Employment End Date" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={4}
                                padding="checkbox"
                            >{"Lorem ipsum"}</TableCell>
                            <TableCell
                                colSpan={4}
                                padding="none"
                                className="border-left"
                            >
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={6} padding="checkbox">
                                                <FieldsTitle label="Candidate" />
                                            </TableCell>
                                            <TableCell
                                                colSpan={6}
                                                padding="checkbox"
                                                className="border-left"
                                            >
                                                <FieldsTitle label="Referee" />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={6} padding="checkbox">
                                                {"Lorem ipsum"}
                                            </TableCell>
                                            <TableCell
                                                colSpan={6}
                                                padding="checkbox"
                                                className="border-left"
                                            >
                                                {"Lorem ipsum"}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableCell>

                            <TableCell
                                colSpan={4}
                                padding="none"
                                className="border-left"
                            >
                                <Table >
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={6} padding="checkbox">
                                                <FieldsTitle label="Candidate" />
                                            </TableCell>
                                            <TableCell
                                                colSpan={6}
                                                padding="checkbox"
                                                className="border-left"
                                            >
                                                <FieldsTitle label="Referee" />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={6} padding="checkbox">
                                                {"Lorem ipsum"}
                                            </TableCell>
                                            <TableCell
                                                colSpan={6}
                                                padding="checkbox"
                                                className="border-left"
                                            >
                                                {"Lorem ipsum"}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};

const EmploymentHistoryReport = () => {
    const analysisData = [
        {
            name:
                "Employment reference 1: Barrick Gold Mine – Bulyanhulu Gold Mine",
            color: "#00ff00",
            referenceMethod: "Email",
            dataProduced: "6 Oct 2019"
        },
        {
            name:
                "Employment reference 1: Barrick Gold Mine – Bulyanhulu Gold Mine",
            color: "#a22201",
            referenceMethod: "Email",
            dataProduced: "6 Oct 2019"
        }
    ];

    const observationsData = [
        "From the HR reference, Damian’s Title reads as Industrial Hygienist Coordinator while that on his CV is Health, Safety and Hygiene Coordinator."
    ];

    const additionInfoData = [
        "Overview of his performance: Damian has been a key person in the safety department and is among the dependable employees.",
        "Attendance & reliability: He is always on time and all his duties are world class. Loosing Damian will be a big blow to the company."
    ];

    return (
        <>
            <ReportIntro />
            <Observations data={observationsData} />
            <CheckStatus data={analysisData} />
            <EmploymentSummary data={analysisData} />
            <JobRoleConfimation data={[]} />
            <EmploymentDateConfirmation />
            <AdditionInformation data={additionInfoData} />
        </>
    );
};

export default EmploymentHistoryReport;
