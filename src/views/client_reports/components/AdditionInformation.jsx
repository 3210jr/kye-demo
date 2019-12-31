import React from "react";
import {
    Text,
    View,

} from "@react-pdf/renderer";
import styles from '../styles'


const AdditionInformation = () => (
    <View style={styles.section} break>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>Additional Information</Text>
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



export default AdditionInformation