import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

import { useSelector } from "react-redux";

import styles from "./styles";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";

const CVAnalysisSummary = () => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>
                    Qualification Check included Within this Report
                </Text>
            </View>
        </View>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableColOneThird}>
                    <Text style={styles.tableCell}>Establish Name</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Reference Method</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Date Supplied</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableColOneThird}>
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

const CVAnalysis = () => (
    <View style={styles.section} break>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Qualification</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                        Did candidate study at this establishment?
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View
                    style={[styles.tableCol, styles.innerTableContentPadding]}
                >
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Candidate</Text>
                            </View>

                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Referee</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {"Lorem ipsum"}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {"Lorem ipsum"}
                                </Text>
                            </View>

                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {"Lorem ipsum"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>
);
const CVAnalysisReport = () => {
    const polieReports = useSelector(
        state => state.orders.currentOrder["police-reports"]
    );

    return (
        // <Document style={{ height: "400px" }}>
        <Page style={styles.body}>
            <ReportIntro />
            <CheckStatus statuses={["Hello World"]}/>
            <Observations observations={[]}/>
            <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                }
                fixed
            />
        </Page>
        // </Document>
    );
};

export default CVAnalysisReport;
