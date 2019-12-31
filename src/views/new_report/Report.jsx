import React from "react";
import {
    Page,
    Text,
    View,
    Image,
    Document,
    StyleSheet,
    Font
} from "@react-pdf/renderer";

import * as logoImg from "../../assets/mwema_logo.png";

const CheckStatus = () => (
    <View style={styles.section}>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
                <Text style={styles.subtitle}>
                    Background Check Included in this Report
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>Status</Text>
            </View>
        </View>

        <View style={[{ flexDirection: "row" }, styles.bodyPrimaryBackground]}>
            <View style={{ flex: 3 }}>
                <Text style={styles.text}>Institution name</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "#00ff00" }}></View>
            </View>
        </View>
    </View>
);

const Observations = () => (
    <View style={styles.section}>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>Observations</Text>
            </View>
        </View>

        <View>
            <View
                style={[
                    styles.bodyPrimaryBackground,
                    styles.nonTableContentPadding
                ]}
            >
                <Text style={styles.text}>{"Lorem ipsum"}</Text>
            </View>
        </View>
    </View>
);

const AcademicAnalysisSummary = () => (
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

const AcademicAnalysis = () => (
    <View style={styles.section} break >
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
                <View style={[styles.tableCol,styles.innerTableContentPadding]}>
                    <View style={styles.table}>
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
const Quixote = () => (
    <Document style={{ height: "400px" }}>
        <Page style={styles.body}>
            <Text style={styles.header} fixed></Text>

            <View style={{ flexDirection: "row-reverse" }}>
                <Image style={styles.image} src={logoImg} />
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Candidate Details</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                Candidate Full Name
                            </Text>
                        </View>

                        <View style={styles.tableColOneThird}>
                            <Text style={styles.tableCell}>Type</Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Date of Birth</Text>
                        </View>
                        <View style={styles.tableColOneThird}>
                            <Text style={styles.tableCell}>
                                {"Lorem ipsum"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Adress</Text>
                        </View>
                        <View style={styles.tableColOneThird}>
                            <Text style={styles.tableCell}>
                                {"Lorem ipsum"}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* report details section */}

            <View style={styles.section}>
                <Text style={styles.subtitle}>Report details</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                Report prepared for
                            </Text>
                        </View>

                        <View style={styles.tableColOneThird}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                MWEMA Reference Number
                            </Text>
                        </View>
                        <View style={styles.tableColOneThird}>
                            <Text style={styles.tableCell}>
                                {"Lorem ipsum"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Date Submitted</Text>
                        </View>
                        <View style={styles.tableColOneThird}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}></Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        Date Completed
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <CheckStatus />
            <Observations />
            <AcademicAnalysisSummary />
            <AcademicAnalysis />
            <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                }
                fixed
            />
        </Page>
    </Document>
);

//   Font.register({
//     family: 'Oswald',
//     src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
//   });

const styles = StyleSheet.create({
    body: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 15
    },
    section: {
        marginVertical: 15
    },

    title: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Oswald"
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 8
        //   fontFamily: 'Oswald'
    },
    text: {
        // margin: 12,
        fontSize: 14,
        // textAlign: "justify",
        fontFamily: "Times-Roman"
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 15,
        width: 248,
        height: 95
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey"
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey"
    },

    //table styling
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    innerTableContentPadding:{
        padding:15
    },
    tableRow: {
        // margin: "auto",
        flex: 1,
        flexDirection: "row",
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRight: 0,
        borderBottomWidth: 1
        // backgroundColor:"red"
    },

    tableCol: {
        flex: 1,
        // width:"50",
        // borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0
    },
    tableColOneThird: {
        flex: 2,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    },
    nonTableContentPadding: {
        padding: 15
    },
    bodyPrimaryBackground: {
        backgroundColor: "#F3F3F3"
    },
    bodyWhiteBackground: {
        backgroundColor: "#FFFFFF"
    }
});

export default Quixote;
