import React from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "../styles";

const AdditionInformation = ({ infos }) => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>Additional Information</Text>
            </View>
        </View>

        <View
            style={[
                styles.bodyPrimaryBackground,
                styles.nonTableContentPadding
            ]}
        >
            {infos.map((employmentHistory, index) => (
                <View key={index}>
                    <Text style={styles.text}>
                        {employmentHistory.additionalInformation}
                    </Text>
                </View>
            ))}
        </View>
    </View>
);

export default AdditionInformation;
