import React from "react";
import {
    Text,
    View,

} from "@react-pdf/renderer";
import styles from '../styles'


const Observations = ({observations}) => (
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
                <Text style={styles.text}>{observations}</Text>
            </View>
        </View>
    </View>
);



export default Observations