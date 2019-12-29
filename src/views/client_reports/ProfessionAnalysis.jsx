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

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/ChecksStatus";
import Observations from "./components/Observations";

const ProfessionAnalysis = ({ data }) => {
    return (
        <Grid container style={{ marginBottom: "1em" }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={6}>
                        <FieldsTitle label="Qualification" />
                        </TableCell>
                        <TableCell colSpan={6}>
                            <FieldsTitle label={"Lorem ipsum"} />
                        </TableCell>
                    </TableRow>

                    <TableRow style={{}}>
                        <TableCell colSpan={6}>
                            <FieldsTitle label="Did candidate study at this establishment?" />
                        </TableCell>
                        <TableCell colSpan={6}>
                            <FieldsTitle label={"Lorem ipsum"} />
                        </TableCell>
                    </TableRow>

                    <TableRow style={{ padding: 30 }}>
                        <TableCell colSpan={12}>
                            <Table style={{ margin: "0 auto;" }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={4}></TableCell>
                                        <TableCell colSpan={4}>
                                            <FieldsTitle label="Candidate" />
                                        </TableCell>

                                        <TableCell colSpan={4}>
                                            <FieldsTitle label="Referee" />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <FieldsTitle label="Membership no." />
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            {"Lorem ipsum"}
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            {"Lorem ipsum"}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <FieldsTitle label="Membership Current" />
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            {"Lorem ipsum"}
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            {"Lorem ipsum"}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <FieldsTitle label="Membership Type" />
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            {"Lorem ipsum"}
                                        </TableCell>
                                        <TableCell colSpan={4}>
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
    );
};

const ProfessionAnalysisSummary = ({ data }) => {
    return (
        <Grid container style={{ marginBottom: 14 }}>
            <Grid container item style={{ marginBottom: "1em" }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <FieldsTitle label="Establish Name" />
                            </TableCell>
                            <TableCell colSpan={3}>
                                <FieldsTitle label="Reference Method" />
                            </TableCell>
                            <TableCell colSpan={3}>
                                <FieldsTitle label="Date Supplied" />
                            </TableCell>
                        </TableRow>

                        {data.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell colSpan={6}>
                                        {"Lorem ipsum"}
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        {"Lorem ipsum"}
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        {"Lorem ipsum"}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};

const ProfessionAnalysisReport = () => {
    const analysisData = [
        {
            name:
                "Qualification check: British Occupational Hygiene Society (BOHS)",
            referenceMethod: "Letter",
            date: "5 Oct 2018",
            color: "#00ff00"
        }
    ];

    const observationsData = ["No irregularity noted"];

    const additionInfoData = ["Note Hello Hlorem upsms"];

    return (
        <>
            <ReportIntro />
            <CheckStatus data={analysisData} />
            <Observations data={observationsData} />
            <ProfessionAnalysisSummary data={additionInfoData} />
            <ProfessionAnalysis data={analysisData} />
        </>
    );
};

export default ProfessionAnalysisReport;
