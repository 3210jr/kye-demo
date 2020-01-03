import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

import { useSelector } from "react-redux";
import styles from "./styles";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";

const GapAnalysis = ({ gaps }) => {
    console.log("The  gaps : ", gaps);
    return (
        <View style={styles.section} break>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.subtitle}>Employment Gaps</Text>
                </View>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.bold]}>
                            Period
                        </Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.bold]}>
                            Comments
                        </Text>
                    </View>
                </View>

                {gaps.map((gap, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                {gap.period}
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                {gap.comments}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};
const GapAnalysisReport = ({  }) => {
    let gaps = useSelector(
        state => state.orders.currentOrder["gaps-reports"]
    );
    gaps=Object.values(gaps)

    return (
        // <Document style={{ height: "400px" }}>
        <Page style={styles.body}>
            <ReportIntro />
            <CheckStatus statuses={["Gap Analysis"]} />
            <Observations />
            <GapAnalysis gaps={gaps} />
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

export default GapAnalysisReport;
