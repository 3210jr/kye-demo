import React from "react";
import { Page, Text, View } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

import styles from "./styles";
import _ from "lodash";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";
import Note from "./components/Note";

const LitigationAnalysis = ({ litigations }) => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>Litigation Check Results</Text>
            </View>
        </View>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Details of Litigation
                    </Text>
                </View>

                <View style={[styles.tableColOneThird]}>
                    <Text style={[styles.tableCell, styles.bold]}>Result</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Date produced
                    </Text>
                </View>

                <View style={[styles.tableColOneThird]}>
                    <Text style={[styles.tableCell]}>{litigations.date}</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Nature of case
                    </Text>
                </View>

                <View style={[styles.tableCol]}>
                    <Text style={[styles.tableCell]}>
                        {_.upperFirst(litigations.caseNature)}
                    </Text>
                </View>

                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Case Number: {litigations.caseNumber}
                    </Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Parties Involved
                    </Text>
                </View>

                <View style={[styles.tableColOneThird]}>
                    <Text style={[styles.tableCell]}>
                        {litigations.partiesInvolved}
                    </Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Rulling comments
                    </Text>
                </View>

                <View style={[styles.tableColOneThird]}>
                    <Text style={[styles.tableCell]}>
                        {litigations.rullingComments}
                    </Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Comments and Findings
                    </Text>
                </View>

                <View style={[styles.tableColOneThird]}>
                    <Text style={[styles.tableCell]}>
                        {litigations.comments}
                    </Text>
                </View>
            </View>
        </View>
    </View>
);

const LitigationReport = () => {
    const litigations = useSelector(
        state => state.orders.currentOrder["civil-litigation"]
    );

    if (litigations === null || litigations === undefined) {
        return null;
    }

    return (
        // <Document style={{ height: "400px" }}>
        <Page style={styles.body}>
            <ReportIntro />
            <CheckStatus
                score={litigations.score}
                statuses={litigations.score}
            />
            {/* <Observations /> */}
            <LitigationAnalysis litigations={litigations} />
            {/* <Note /> */}
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

export default LitigationReport;
