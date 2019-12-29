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
import AdditionInformation from "./components/AdditionInformation";

const GapAnalysis = ({ data }) => {
    return (
        <Grid container item style={{ marginBottom: 14 }}>
            <Grid item xs={12} sm={12}>
                <SectionHeader label="Gap Analysis Check" />
            </Grid>
            <Grid item xs={12} sm={12}>
                <SectionHeader label="Employment Gaps" />
            </Grid>

            <Grid
                container
                style={{ marginBottom: "1em" }}
                className="primary-background"
            >
                <Table className="border-top border-right border-left">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6} padding="checkbox">
                                <FieldsTitle label="Period" />
                            </TableCell>
                            <TableCell
                                colSpan={6}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Comments" />
                            </TableCell>
                        </TableRow>
                        {data.map((item, index) => {
                            return (
                                <TableRow key={index}>
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
                            );
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};

const GapAnalysisReport = () => {
    const analysisData = [
        {
            name: "Gap Analysis",
            color: "#00ff00"
        }
    ];

    const observationsData = [
        "Gap mentioned investigated and candidate confirmed that he was looking for job opportunity during the period."
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
            <GapAnalysis data={additionInfoData} />
        </>
    );
};

export default GapAnalysisReport;
