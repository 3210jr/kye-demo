import React from "react";
import * as logoImg from "../assets/mwema_logo.png";

const drawerWidth = 240;

export const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flex: 1
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: 0,
        width: "100%"
    },
    cardSection: {
        paddingRight: theme.spacing.unit,
        width: "100%",
        marginBottom: 15
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    formControl: {
        margin: 0,
        minWidth: 120,
        width: "100%"
    }
});

export const viewOrderStyle = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: "auto"
    }
});

export const layoutStyle = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    // appBarShift: {
    // 	marginLeft: drawerWidth,
    // 	width: `calc(100% - ${drawerWidth}px)`,
    // 	transition: theme.transitions.create(["width", "margin"], {
    // 		easing: theme.transitions.easing.sharp,
    // 		duration: theme.transitions.duration.enteringScreen
    // 	})
    // },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9 + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    drawerPaper: {
        width: drawerWidth,
    },
});

export const borders = {
    left: {
        borderLeft: "1px solid #ececec"
    },
    right: {
        borderRight: "1px solid #ececec"
    },
    left_right: {
        borderLeft: "1px solid #ececec",
        borderRight: "1px solid #ececec"
    },
    top: {
        borderTop: "1px solid #ececec"
    }
};

export const headers = {
    marginTopBottom: {
        marginTop: "40px",
        marginBottom: "40px"
    }
};

