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
import Note from "./components/Note";
import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/ChecksStatus";
import Observations from "./components/Observations";
import AdditionInformation from "./components/AdditionInformation";

const IDAnalysis = ({ data }) => {
    return (
        <Grid container item style={{ marginBottom: 14 }}>
            <Grid item xs={12} sm={12}>
                <SectionHeader label="Document Checked" />
            </Grid>

            <Grid
                container
                style={{ marginBottom: "1em" }}
                className="primary-background"
            >
                <Table className="border-top border-right border-left">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={3} padding="checkbox">
                                <FieldsTitle label="Type of Document Provided" />
                            </TableCell>
                            <TableCell
                                colSpan={3}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Country of Issue" />
                            </TableCell>
                            <TableCell
                                colSpan={3}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Date of Check" />
                            </TableCell>
                            <TableCell
                                colSpan={3}
                                padding="checkbox"
                                className="border-left"
                            >
                                <FieldsTitle label="Result" />
                            </TableCell>
                        </TableRow>
                        {data.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell colSpan={3} padding="checkbox">
                                        {"Lorem ipsum"}
                                    </TableCell>
                                    <TableCell
                                        colSpan={3}
                                        padding="checkbox"
                                        className="border-left"
                                    >
                                        {"Lorem ipsum"}
                                    </TableCell>
                                    <TableCell
                                        colSpan={3}
                                        padding="checkbox"
                                        className="border-left"
                                    >
                                        {"Lorem ipsum"}
                                    </TableCell>
                                    <TableCell
                                        colSpan={3}
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

const IDAnalysisReport = () => {
    const analysisData = [
        {
            name: "Passport Check",
            color: "#00ff00"
        }
    ];

    const observationsData = ["None"];

    const additionInfoData = ["Note Hello Hlorem upsms"];

    return (
        <>
            <ReportIntro />
            <Observations data={observationsData} />
            <CheckStatus data={analysisData} />
            <IDAnalysis data={additionInfoData} />
            <Note data={additionInfoData} />
        </>
    );
};

export default IDAnalysisReport;
