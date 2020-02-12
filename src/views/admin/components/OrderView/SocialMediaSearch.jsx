// @ts-check
import React, { Component, useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { storage } from "firebase";
import { upperFirst, clone, map, omit } from "lodash";
import uuidV1 from "uuid/v1";
import Select from "react-select";
import {
    Paper,
    Typography,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Input
} from "@material-ui/core";
import InputField from "../../../../components/FormValidation/InputField";
import {
    persistOrderResults,
    uploadFile,
    friendlyFormatDate,
    isCompleteForm
} from "../../../../utils";
import { keys } from "@material-ui/core/styles/createBreakpoints";

const socialNetworks = [
    "facebook",
    "instagram",
    "twitter",
    "public domain",
    "newspapers",
    "other"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

function SocialMediaSearch({ order, type, toggleSnackBar, setErrors }) {
    const date = new Date();
    const [state, setstate] = useState({
        networks: [],
        dateOfSearch: "",
        handles: "",
        comments: "",
        score: "",
        supportingDocsURL: "",
        uploadingAttachment: false,
        loading: false
    });

    console.log("Date: ", state.dateOfSearch);

    let fileUploaderRef = createRef();
    useEffect(() => {
        const initialState = { ...state, ...order[type] };
        setstate(initialState);
    }, []);

    function uploadAttachment(evt) {
        if (state.uploadingAttachment) return;
        const file = evt.target.files[0];

        setstate({ ...state, uploadingAttachment: true });
        uploadFile(file, "supporting-documents")
            .then(res => {
                res.ref.getDownloadURL().then(url =>
                    setstate({
                        ...state,
                        uploadingAttachment: false,
                        supportingDocsURL: url
                    })
                );
            })
            .catch(error => {
                alert(
                    "There was an error uploading your assets, please try again"
                );
                console.log(error);
                setstate({ ...state, uploadingAttachment: false });
            });
    }

    function updateComments(evt) {
        setstate({ ...state, comments: evt.target.value });
    }

    // function updateHandles(target) {
    //     const { value } = target;
    //     const handles = value.split(",").map(handle => handle.trim());
    //     setstate({ ...state, handles });
    // }

    function saveSocialMediaSearch() {
        const { loading, comments, networks, handles } = state;
        if (loading) return;

        const currentState = omit(state, [
            "loading",
            "comments",
            "score",
            "networks",
            "supportingDocsURL",
            "uploadingAttachment"
        ]);

        const emptyField = Object.keys(currentState).filter(
            key => currentState[key].length === 0
        );
        setErrors(
            emptyField.map(field => ({
                id: field,
                message: "This field can not be empty"
            }))
        )

        if (networks.length === 0) {
            return alert(
                "Please choose at least one social network that was searched"
            );
        }

        if (!isCompleteForm(state)) {
            return alert(
                "Please fill out all the forms before saving the report"
            );
        }

        setstate({ ...state, loading: true });

        persistOrderResults(order.id, type, {
            ...omit(state, ["loading", "uploadingAttachment"]),
            handles: handles
                .toString()
                .split(",")
                .map(h => h.trim())
        })
            .then(res => {
                toggleSnackBar({
                    message: "Social Media Search Report updated successfully!"
                });
            })
            .catch(error => {
                toggleSnackBar({
                    message:
                        "Error. There was an error updating the social media report."
                });
                console.log("Error: ", error);
            })
            .finally(() => {
                setstate({ ...state, loading: false });
            });
    }

    const handleChange = event => {
        const { value } = event.target;
        setstate({ ...state, networks: value });
    };

    return (
        <Paper style={{ padding: "1em", marginTop: 15 }}>
            <Typography variant="h6">Social Media Search</Typography>

            <Grid container style={{ marginTop: 5 }}>
                <Grid
                    item
                    xs
                    md={6}
                    lg={4}
                    style={{ paddingLeft: 3, paddingRight: 3 }}
                >
                    <div variant="outlined" fullWidth>
                        <InputLabel
                            variant="outlined"
                            id="demo-mutiple-name-label"
                        >
                            Networks searched
                        </InputLabel>
                        <Select
                            multiple
                            closeMenuOnSelect={false}
                            isMulti
                            fullWidth
                            onChange={(item, meta) => {
                                setstate({ ...state, networks: item.value });
                            }}
                            options={socialNetworks.map(name => ({
                                value: name,
                                label: name
                            }))}
                        />
                        {/* <Select
                            // labelid="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            variant="outlined"
                            multiple
                            fullWidth
                            value={state.networks}
                            onChange={handleChange}
                            input={<Input fullWidth />}
                            MenuProps={MenuProps}
                        >
                            {socialNetworks.map(name => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    // style={getStyles(name, personName, theme)}
                                >
                                    {upperFirst(name)}
                                </MenuItem>
                            ))}
                        </Select> */}
                    </div>
                </Grid>
            </Grid>

            <Grid container style={{ marginTop: 5 }}>
                <Grid item md={4} style={{ margin: 2 }}>
                    <TextField
                        id="outlined-name"
                        label="Score"
                        select
                        // style={{ margin: 3 }}
                        className="wide"
                        value={state.score}
                        onChange={({ target }) =>
                            setstate({ ...state, score: target.value })
                        }
                        variant="outlined"
                    >
                        <MenuItem value="bad">Bad</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="good">Good</MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={4} style={{ margin: 2 }}>
                    <InputField
                        className="wide"
                        magin="normal"
                        multiline
                        value={state.handles}
                        label="Handle Names (comma separated)"
                        placeholder="@name255, name_255"
                        onChange={({ target }) =>
                            setstate({ ...state, handles: target.value })
                        }
                        id="handles"
                    />
                </Grid>
                <Grid item md={3} style={{ margin: 2 }}>
                    <InputField
                        className="wide"
                        magin="normal"
                        multiline
                        type="date"
                        value={state.dateOfSearch}
                        label="Date of search"
                        placeholder="Date of search"
                        onChange={({ target }) =>
                            setstate({ ...state, dateOfSearch: target.value })
                        }
                        id="dateOfSearch"
                    />
                </Grid>
            </Grid>

            <Grid container style={{ marginTop: 5 }}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    style={{ paddingLeft: 3, paddingRight: 3 }}
                >
                    <TextField
                        fullWidth
                        label="Comments & Findings"
                        value={state.comments}
                        onChange={updateComments}
                        id="outlined-dense-multiline"
                        margin="dense"
                        variant="outlined"
                        multiline
                        rowsMax="4"
                        rows="3"
                    />
                </Grid>
            </Grid>

            <Grid container style={{ marginTop: 5 }}>
                <Grid
                    item
                    xs={2}
                    sm={2}
                    style={{ paddingLeft: 3, paddingRight: 3 }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={saveSocialMediaSearch}
                    >
                        {state.loading ? "Loading" : "Save"}
                    </Button>
                </Grid>
                <Grid item xs={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
                    <Button
                        variant={
                            state.supportingDocsURL.length > 0
                                ? "text"
                                : "contained"
                        }
                        color="primary"
                        onClick={() => fileUploaderRef.current.click()}
                    >
                        {state.uploadingAttachment
                            ? "Uploading..."
                            : state.supportingDocsURL.length > 0
                            ? "Update Supporting Documents"
                            : "Upload Supporting Documents"}
                    </Button>
                </Grid>
            </Grid>

            <input
                type="file"
                accept="application/pdf,application/vnd.ms-excel,application/zip,application/x-zip,application/x-zip-compressed"
                ref={fileUploaderRef}
                onChange={uploadAttachment}
                id="attachmentUploader"
                className="hidden"
            />
        </Paper>
    );
}

const mapState = state => ({
    snackbar: state.snackbar
});

const mapDispatch = ({
    snackbar: { asyncToggleSnackBar },
    inputValidation: { setErrors }
}) => ({
    toggleSnackBar: payload => asyncToggleSnackBar(payload),
    setErrors
});

export default connect(mapState, mapDispatch)(SocialMediaSearch);
