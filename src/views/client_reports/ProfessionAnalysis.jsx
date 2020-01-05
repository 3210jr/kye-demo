import React from "react";
import { Page, Text, View } from "@react-pdf/renderer";

import styles from "./styles";

//importing components
import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";

//importing other reports

const ProfessionAnalysisSummary = () => (
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
                    <Text style={[styles.tableCell, styles.bold]}>
                        Establish Name
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Reference Method
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Date Supplied
                    </Text>
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

const ProfessionAnalysis = () => (
    <View style={styles.section} break>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.bold]}>Qualification</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.bold]}>
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
                            <Text style={[styles.tableCell, styles.bold]}>Candidate</Text>
                            </View>

                            <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.bold]}>Referee</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    Membership no.
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

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    Membership Current
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

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    Membership Type
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
const ProfessionAnalysisReport = () => (
    <Page style={styles.body}>
        <ReportIntro />
        <CheckStatus />
        <Observations />
        <ProfessionAnalysisSummary />
        <ProfessionAnalysis />
        <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
            }
            fixed
        />
    </Page>
);

export default ProfessionAnalysisReport;
