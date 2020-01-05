import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

import styles from "./styles";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";
import Note from "./components/Note";

const IDAnalysis = ({ identifications }) => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>Document Checked</Text>
            </View>
        </View>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Type of Document Provided
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Country of Issue
                    </Text>
                </View>

                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Date of Check
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>Result</Text>
                </View>
            </View>

            {identifications.map((identification, index) => (
                <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{identification.documentType}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{identification.countryOfIssue}</Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{identification.dateOfCheck}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{identification.result}</Text>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

const IDAnalysisReport = () => {
    const identifications = useSelector(
        state => state.orders.currentOrder["identification"]
    );

    if (identifications=== null || identifications === undefined) {
        return null;
    }

    return (
        // <Document style={{ height: "400px" }}>
        <Page style={styles.body}>
            <ReportIntro />
            <CheckStatus statuses={[]} />
            <Observations />
            <IDAnalysis identifications={[identifications]} />
            <Note />
            <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                }
                fixed
            />
        </Page>
    );
};

export default IDAnalysisReport;
