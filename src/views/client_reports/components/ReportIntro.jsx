import React from "react";
import { Text, View, Image } from "@react-pdf/renderer";

import { useSelector } from "react-redux";
import { getLocalDate } from "../../../utils/index";
import _ from "lodash";
import styles from "../styles";
import * as logoImg from "../../../assets/mwema_logo.png";

const ReportIntro = () => {
    const currentOrder = useSelector(state => state.orders.currentOrder);
    const {
        firstName,
        middleName,
        lastName,
        address,
        dateOfBirth,
        organizationName,
        referenceNumber,
        createdAt,
        updatedAt,
        country,
        box,
        region
    } = currentOrder;
    return (
        <View style={styles.section}>
            <View style={{ flexDirection: "row-reverse" }}>
                <Image style={styles.image} src={logoImg} />
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Candidate Details</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, {}]}>
                            <Text style={[styles.tableCell, styles.bold]}>
                                Candidate Full Name
                            </Text>
                        </View>

                        <View style={styles.tableColOneThird}>
                            <Text style={[styles.tableCell]}>
                                {firstName + " " + middleName + " " + lastName}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.bold]}>
                                Date of Birth
                            </Text>
                        </View>
                        <View style={styles.tableColOneThird}>
                            <Text style={styles.tableCell}>
                                {getLocalDate(dateOfBirth.seconds)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.bold]}>
                                Address
                            </Text>
                        </View>
                        <View style={styles.tableColOneThird}>
                            <Text style={styles.tableCell}>
                                {`${
                                    box && box.length > 0 ? box + " " : ""
                                }${_.upperFirst(region)}, ${country
                                    .split(" ")
                                    .map(c => _.upperFirst(c))
                                    .join(" ")}`}
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
                            <Text style={[styles.tableCell, styles.bold]}>
                                Report prepared for
                            </Text>
                        </View>

                        <View style={styles.tableColOneThird}>
                            <Text style={styles.tableCell}>
                                {organizationName}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.bold]}>
                                MWEMA Reference Number
                            </Text>
                        </View>
                        <View style={styles.tableColOneThird}>
                            <Text style={styles.tableCell}>
                                {referenceNumber}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.bold]}>
                                Date Submitted
                            </Text>
                        </View>
                        <View style={styles.tableColOneThird}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {getLocalDate(createdAt.seconds)}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text
                                        style={[styles.tableCell, styles.bold]}
                                    >
                                        Date Completed
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {getLocalDate(updatedAt.seconds)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ReportIntro;
