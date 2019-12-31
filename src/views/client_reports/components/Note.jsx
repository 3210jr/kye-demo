import React from "react";
import {
    Text,
    View,

} from "@react-pdf/renderer";
import styles from '../styles'


const Note = () => (
    <View style={styles.section}>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>Note</Text>
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



export default Note