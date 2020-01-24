import React from "react";
import { Page, Text, View } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import styles from "./styles";
import _ from "lodash";

//importing components
import ReportIntro from "./components/ReportIntro";
import CheckStatus from "./components/EducationStatus";
import Observations from "./components/Observations";

//importing other reports

const AcademicAnalysisSummary = ({ academicQualifications }) => (
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

            {academicQualifications.map((academicQualification, index) => (
                <View style={styles.tableRow} key={index}>
                    <View style={styles.tableColOneThird}>
                        <Text style={styles.tableCell}>
                            {academicQualification.establishmentName}
                        </Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {academicQualification.referenceMethod}
                        </Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {academicQualification.dateSupplied}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

const AcademicAnalysis = ({ academicQualifications }) => (
    <View style={styles.section} break>
        {academicQualifications.map((academicQualification, index) => (
            <View style={styles.table} key={index}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.bold]}>
                            Qualification
                        </Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {academicQualification.establishmentName}
                        </Text>
                    </View>
                </View>

                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.bold]}>
                            Did candidate study at this establishment?
                        </Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                            {
                                academicQualification.didCandidateStudyInTheEstablishment
                            }
                        </Text>
                    </View>
                </View>

                <View style={styles.tableRow}>
                    <View
                        style={[
                            styles.tableCol,
                            styles.innerTableContentPadding
                        ]}
                    >
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text
                                        style={[styles.tableCell, styles.bold]}
                                    >
                                        Candidate
                                    </Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text
                                        style={[styles.tableCell, styles.bold]}
                                    >
                                        Referee
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {"Attendence Date"}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {
                                            academicQualification.attendanceDateCandidate
                                        }
                                    </Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {
                                            academicQualification.attendanceDateReference
                                        }
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {"Name of course(s) studied"}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {
                                            academicQualification.nameOfCourseStudiedCandidate
                                        }
                                    </Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {
                                            academicQualification.nameOfCourseStudiedReference
                                        }
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {"Qualification and grade awarded"}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {
                                            academicQualification.qualificationAndGradedAwardedCandidate
                                        }
                                    </Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {
                                            academicQualification.qualificationAndGradedAwardedReference
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        ))}
    </View>
);
const AcademicAnalysisReport = () => {
    let academicReport = useSelector(
        state => state.orders.currentOrder["academic-qualifications"]
    );

    if (academicReport === null || academicReport === undefined) {
        return null;
    }
    const academicQualifications = Object.values(
        _.omit(academicReport, ["comments"])
    );
    return (
        <Page style={styles.body}>
            <ReportIntro />
            <CheckStatus academicQualifications={academicQualifications} />
            <Observations observations={academicReport.comments} />
            <AcademicAnalysisSummary
                academicQualifications={academicQualifications}
            />
            <AcademicAnalysis academicQualifications={academicQualifications} />
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
export default AcademicAnalysisReport;
