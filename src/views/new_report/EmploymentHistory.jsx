import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

import styles from "./styles";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";
import AdditionInformation from './components/AdditionInformation'

const JobRoleConfirmation = () => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>Job Role Confirmation</Text>
            </View>
        </View>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Organisation</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Position Held</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                </View>
                <View style={styles.tableCol}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Candidate</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Reference</Text>
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
                    </View>
                </View>
            </View>
        </View>
    </View>
);

const EmploymentDateConfirmation = () => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>
                    Confirmation of Employment Date
                </Text>
            </View>
        </View>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Organisation</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Employment Start Date</Text>
                </View>

                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Employment Start Date</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                </View>

                <View style={styles.tableCol}>
                    <View style={styles.tableRow}>
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
                        </View>
                    </View>
                </View>

                <View style={styles.tableCol}>
                    <View style={styles.tableRow}>
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
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>
);

const EmploymentHistoryAnalysisSummary = () => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>
                    Employment history references included Within this Report
                </Text>
            </View>
        </View>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableColOneThird}>
                    <Text style={styles.tableCell}>
                        Employment history references included Within this
                        Report
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Reference Method</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Date Produced</Text>
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

const EmploymentHistoryAnalysis = () => (
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
const EmploymentHistoryReport = () => (
    // <Document style={{ height: "400px" }}>
    <Page style={styles.body}>
        <ReportIntro />
        <CheckStatus />
        <Observations />
        <EmploymentHistoryAnalysisSummary />
        <JobRoleConfirmation />
        <EmploymentDateConfirmation />
        <AdditionInformation/>
        <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
            }
            fixed
        />
    </Page>
);

export default EmploymentHistoryReport;
