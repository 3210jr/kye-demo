import React from "react";
import { Text, View } from "@react-pdf/renderer";
import _ from "lodash";
import styles from "../styles";

const CheckStatus = ({ academicQualifications }) => (
    <View style={styles.section}>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
                <Text style={styles.subtitle}>
                    Background Check Included in this Report
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>Status :</Text>
            </View>
        </View>

        {academicQualifications.map((academicQualification, index) => (
            <View
                style={[
                    {
                        flexDirection: "row",
                        marginVertical: 8,
                        paddingVertical: 8,
                        paddingLeft: 8
                    },
                    styles.bodyPrimaryBackground
                ]}
                key={index}
            >
                <View style={{ flex: 3 }}>
                    <Text style={styles.text}>
                        {_.upperFirst(academicQualification.establishmentName)}
                    </Text>
                </View>
                <View style={{ flex: 1, marginVertical: -8, marginLeft: 2 }}>
                    <View
                        style={{ flex: 1, backgroundColor: "#00ff00" }}
                    ></View>
                </View>
            </View>
        ))}
    </View>
);

export default CheckStatus;
