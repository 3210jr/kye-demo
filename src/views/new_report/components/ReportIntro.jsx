import React from "react";
import { Text, View, Image } from "@react-pdf/renderer";

import styles from "../styles";
import * as logoImg from "../../../assets/mwema_logo.png";

const ReportIntro = () => (
    <View style={styles.section} >
        <View style={{ flexDirection: "row-reverse" }}>
            <Image style={styles.image} src={logoImg} />
        </View>

        <View style={styles.section}>
            <Text style={styles.subtitle}>Candidate Details</Text>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol,{backgroundColor:"blue",textAlign:"left"}]}>
                        <Text style={[styles.tableCell,{backgroundColor:"red",alignSelf:"flex-start"}]}>
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
                        <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
                    </View>
                </View>

                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Adress</Text>
                    </View>
                    <View style={styles.tableColOneThird}>
                        <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
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
                        <Text style={styles.tableCell}>{"Lorem ipsum"}</Text>
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
    </View>
);

export default ReportIntro;
