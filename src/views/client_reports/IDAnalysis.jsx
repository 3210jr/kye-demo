import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

import styles from "./styles";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";
import Note from "./components/Note";

const IDAnalysis = () => (
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

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                </View>

                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                </View>
            </View>
        </View>
    </View>
);

const IDAnalysisReport = () => (
    // <Document style={{ height: "400px" }}>
    <Page style={styles.body}>
        <ReportIntro />
        <CheckStatus />
        <Observations />
        <IDAnalysis />
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

export default IDAnalysisReport;
