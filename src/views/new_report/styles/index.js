import {
    StyleSheet,
} from "@react-pdf/renderer";

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
        // textAlign: "center",
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
        borderBottomWidth: 0,
        textAlign:"left"
    },
    innerTableContentPadding: {
        padding: 15
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
        borderTopWidth: 0,
        // alignItems:"left"
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
        fontSize: 10,
        textAlign:"left"
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


export default styles