import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { useSelector, useStore } from "react-redux";
import _ from "lodash";

import styles from "./styles";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";
import Note from "./components/Note";

const IDAnalysis = ({ identification }) => (
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

            {identification.map((id, index) => (
                <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {_.upperFirst(id.documentType)}
                        </Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {id.countryOfIssue &&
                                id.countryOfIssue
                                    .split(" ")
                                    .map(word => _.upperFirst(word))
                                    .join(" ")}
                        </Text>
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{id.dateOfCheck}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{id.result}</Text>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

const IDAnalysisReport = () => {
    const order = useSelector(state => state.orders.currentOrder);
    // const identification = useSelector(
    //     state => state.orders.currentOrder["identification"]
    // );
    const { identification, address } = order;
    // console.log(order)

    if (identification === null || identification === undefined) {
        return null;
    }

    // console.log("ID: ", identification)

    return (
        // <Document style={{ height: "400px" }}>
        <Page style={styles.body}>
            <ReportIntro />
            <CheckStatus score={identification.identityScore} />
            <IDAnalysis identification={[identification]} />
            <Observations observations={identification.comments} />
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

export default IDAnalysisReport;
