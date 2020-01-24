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

import styles from "../styles";

const CheckStatus = ({ score }) => (
    <View style={styles.section}>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
                <Text style={styles.subtitle}>
                    Background Check Included in this Report
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center"
                }}
            >
                <Text style={styles.subtitle}>Status : </Text>
                <ColorBlock score={score} />
            </View>
        </View>

        {/* QUESTION: Why is the statuses an array? */}
        {/* {statuses.map((status,index) => (
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
                    <Text style={styles.text}>{status&&status}</Text>
                </View>
                <View style={{ flex: 1, marginVertical: -8, marginLeft: 2 }}>
                    <View
                        style={{ flex: 1, backgroundColor: "#00ff00" }}
                    ></View>
                </View>
            </View>
        ))} */}
    </View>
);

export default CheckStatus;

function ColorBlock({ score }) {
    let color = score === "bad" ? "red" : "white";
    if (score && score.length > 0 && color === "white") {
        color =
            score === "risk" ? "red" : score === "medium" ? "orange" : "green";
    }

    // console.log("Color: ", color, score)

    return <View style={{ height: 25, backgroundColor: color, flex: 1 }} />;
}
