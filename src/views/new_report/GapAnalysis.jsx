import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

import styles from "./styles";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";

const GapAnalysis = () => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>
                Employment Gaps
                </Text>
            </View>
        </View>
        <View style={styles.table}>
            <View style={styles.tableRow}>

                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Period</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Comments</Text>
                </View>
            </View>

            <View style={styles.tableRow}>

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


const GapAnalysisReport = () => (
    // <Document style={{ height: "400px" }}>
    <Page style={styles.body}>
        <ReportIntro />
        <CheckStatus />
        <Observations />
        <GapAnalysis/>
        <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
            }
            fixed
        />
    </Page>
);

export default GapAnalysisReport;
