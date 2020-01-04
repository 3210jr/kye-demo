import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

import { useSelector } from "react-redux";
import styles from "./styles";

import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/CheckStatus";
import Observations from "./components/Observations";
import AdditionInformation from "./components/AdditionInformation";

const JobRoleConfirmation = ({ employmentHistories }) => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.tableCell, styles.bold]}>
                    Job Role Confirmation
                </Text>
            </View>
        </View>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Organisation
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Position Held
                    </Text>
                </View>
            </View>

            {employmentHistories.map((employmentHistory, index) => (
                <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{employmentHistory.organization}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={[styles.tableCell, styles.bold]}>
                                    Candidate
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={[styles.tableCell, styles.bold]}>
                                    Reference
                                </Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {employmentHistory.positionHeldCandidate}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {employmentHistory.positionHeldReferee}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

const EmploymentDateConfirmation = ({ employmentHistories }) => (
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
                    <Text style={[styles.tableCell, styles.bold]}>
                        Organisation
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Employment Start Date
                    </Text>
                </View>

                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Employment Start Date
                    </Text>
                </View>
            </View>
            {employmentHistories.map((employmentHistory, index) => (
                <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {employmentHistory.organization}
                        </Text>
                    </View>

                    <View style={styles.tableCol}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {
                                            employmentHistory.employmentStartDateCandidate
                                        }
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {
                                            employmentHistory.employmentStartDateReferee
                                        }
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
                                        {
                                            employmentHistory.employmentEndDateCandidate
                                        }
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {
                                            employmentHistory.employmentEndDateReferee
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

const EmploymentHistoryAnalysisSummary = ({ employmentHistories }) => (
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
                    <Text style={[styles.tableCell, styles.bold]}>
                        Organisation
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Reference Method
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.bold]}>
                        Date Produced
                    </Text>
                </View>
            </View>
            {employmentHistories.map((employmentHistory, index) => (
                <View style={styles.tableRow} key={index}>
                    <View style={styles.tableColOneThird}>
                        <Text style={styles.tableCell}>
                            {employmentHistory.organization}
                        </Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {employmentHistory.referenceMethod}
                        </Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {employmentHistory.dateProduced}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

const EmploymentHistoryReport = () => {
    let employmentHistories = useSelector(
        state => state.orders.currentOrder["employment-history"]
    );

    if (
        employmentHistories === null ||
        employmentHistories === undefined
    ) {
        return null;
    }
    employmentHistories = Object.values(employmentHistories);

    return (
        <Page style={styles.body}>
            <ReportIntro />
            <CheckStatus statuses={["Hello"]} />
            <Observations observations={[]} />
            <EmploymentHistoryAnalysisSummary
                employmentHistories={employmentHistories}
            />
            <JobRoleConfirmation employmentHistories={employmentHistories} />
            <EmploymentDateConfirmation
                employmentHistories={employmentHistories}
            />
            <AdditionInformation  infos={employmentHistories} />
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

export default EmploymentHistoryReport;
