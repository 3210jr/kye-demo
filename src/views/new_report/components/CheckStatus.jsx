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

import styles from '../styles'

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

export default CheckStatus

