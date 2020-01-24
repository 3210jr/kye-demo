import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

import { useSelector } from "react-redux";
import _ from "lodash";
import styles from "./styles";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";

const GapAnalysis = ({ gaps }) => {
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
                                {gap.from} - {gap.to}
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{gap.comments}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};
const GapAnalysisReport = ({}) => {
    const gapsReport = useSelector(
        state => state.orders.currentOrder["gaps-reports"]
    );
    if (gapsReport === null || gapsReport === undefined) {
        return null;
    }
    const gaps = Object.values(gapsReport);

    // calculate the "average" of the scores of the different reports
    const scores = gaps.map(g => g.gapInEmploymentHistoryScore);
    let scoresAvg = "risk";
    if (_.uniq(scores).length === 1 && scores.includes("good"))
        scoresAvg = "good";
    if (_.uniq(scores).length === 2 && scores.includes("good"))
        scoresAvg = "medium";

    return (
        // <Document style={{ height: "400px" }}>
        <Page style={styles.body}>
            <ReportIntro />
            <CheckStatus score={scoresAvg} statuses={["Gap Analysis"]} />
            <GapAnalysis gaps={gaps} />
            {/* Gaps Report doesnt have general observations */}
            {/* <Observations observations={gaps.generalComments} /> */}
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
