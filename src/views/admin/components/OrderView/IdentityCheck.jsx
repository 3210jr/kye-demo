// @ts-check
import React, { Component, useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import uuidV1 from "uuid/v1";
import _, { omit, clone, map, keys } from "lodash";
import {
    Paper,
    Typography,
    Button,
    TextField,
    MenuItem,
    Grid
} from "@material-ui/core";
import {
    persistOrderEmbeddedResults,
    uploadFile,
    isValidDate
} from "../../../../utils";
import { identificationTypes } from "../../../../constants";
import { countryList } from "../../../../constants/countries";

const IDENTIFICATION_REPORT_TEMPLATE = {
    documentType: "national-identification",
    countryOfIssue: "tanzania, united republic of",
    dateOfCheck: "",
    expiryDate: "",
    result: "not-genuine",
    dateOfBirthConsisntency: "no",
    identityScore: "risk", // risk, medium, good
    comments: "",
    supportingDocsURL: "",
    uploadingAttachment: false,
    loading: false
};

function IdentityCheck({ order, type, snackbar, toggleSnackBar }) {
    const [state, setState] = useState({
        [uuidV1()]: {
            ...IDENTIFICATION_REPORT_TEMPLATE
        }
    });

    // let fileUploaderRef = createRef();

    function uploadAttachment(evt, key) {
        if (state[key].uploadingAttachment) return;
        const file = evt.target.files[0];

        state[key].uploadingAttachment = true;
        setState({ ...state });

        uploadFile(file, "supporting-documents")
            .then(res => {
                res.ref.getDownloadURL().then(url => {
                    state[key].uploadingAttachment = false;
                    state[key].supportingDocsURL = url;
                    setState({ ...state });
                });
            })
            .catch(error => {
                alert(
                    "There was an error uploading your assets, please try again"
                );
                console.log(error);
                state[key].uploadingAttachment = false;
                setState({ ...state });
            });
    }

    useEffect(() => {
        const initialState = { ...order[type], ...state };
        setState(initialState);
    }, []);

    function insertNewResult() {
        state[uuidV1()] = {
            ...IDENTIFICATION_REPORT_TEMPLATE,
            loading: false,
            uploadingAttachment: false
        };
        setState({ ...state });
    }

    function removeReport(key) {
        const stateClone = { ...state };
        if (
            window.confirm(
                "Are you sure you want to delete this part of the report? This action is IRREVERSIBLE."
            )
        ) {
            delete stateClone[key];
            setState({ ...stateClone });
        }
        return;
    }

    function handleChange(key, field, value) {
        state[key][field] = value;
        return setState({ ...state });
    }

    function saveIdentityCheck(resultKey) {
        const { loading } = state[resultKey];
        const currentState = omit(state[resultKey], ["loading"]);
        if (loading) return;
        if (!isValidDate([currentState.expiryDate, currentState.dateOfCheck])) {
            return alert("Please validate the dates entered");
        }
        const emptyFields = Object.keys(currentState).filter(
            key => currentState[key].length === 0
        );
        if (emptyFields.length > 0) {
            alert("Please fill in all the appropriate fields");
            return;
        }

        state[resultKey].loading = true;
        setState(clone(state));

        persistOrderEmbeddedResults(order.id, type, resultKey, {
            ...currentState
        })
            .then(res => {
                toggleSnackBar({
                    message: "Identity Check updated successfully!"
                });
            })
            .catch(error => {
                toggleSnackBar({
                    message:
                        "Error. There was an error updating the identity check."
                });
                console.log("Error: ", error);
            })
            .finally(() => {
                state[resultKey].loading = false;
                setState(clone(state));
            });
    }

    return (
        <Paper style={{ padding: "1em", marginTop: 15 }}>
            <Typography variant="h6">Identification Check</Typography>

            <Grid justify="space-between" container spacing={24}>
                <Grid item></Grid>

                <Grid item>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={insertNewResult}
                    >
                        Add another Result
                    </Button>
                </Grid>
            </Grid>

            {map(state, (result, key) => {
                let fileUploaderRef = createRef();
                return (
                    <div
                        key={key}
                        style={{
                            marginBottom: 15,
                            marginTop: 5,
                            paddingBottom: 10,
                            paddingTop: 10,
                            borderTop: `${
                                keys(state).length > 1 ? 1 : 0
                            }px solid #ccc`
                        }}
                    >
                        <div className="flex-row" style={{ marginTop: 5 }}>
                            <div style={{ flex: 1, display: "flex" }}>
                                <TextField
                                    id="outlined-name"
                                    label="Document Type"
                                    style={{ margin: 3 }}
                                    select
                                    className="wide"
                                    value={result.documentType}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "documentType",
                                            target.value
                                        )
                                    }
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {map(
                                        identificationTypes,
                                        (label, value) => (
                                            <MenuItem key={value} value={value}>
                                                {label}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    paddingTop: 3
                                }}
                            >
                                <div className="wide">
                                    <Select
                                        options={countryList.map(country => ({
                                            value: country.toLowerCase(),
                                            label: country
                                        }))}
                                        onChange={item =>
                                            handleChange(
                                                key,
                                                "countryOfIssue",
                                                item.value
                                            )
                                        }
                                        className="country-selector"
                                        value={{
                                            value: result.countryOfIssue,
                                            label: result.countryOfIssue
                                                .split(" ")
                                                .map(c => _.upperFirst(c))
                                                .join(" ")
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ flex: 1, display: "flex" }}>
                                <TextField
                                    id="outlined-name"
                                    label="Date of Check"
                                    style={{ margin: 3 }}
                                    className="wide"
                                    type="date"
                                    value={result.dateOfCheck}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "dateOfCheck",
                                            target.value
                                        )
                                    }
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div style={{ flex: 1, display: "flex" }}>
                                <TextField
                                    id="outlined-name"
                                    label="Expiry Date"
                                    style={{ margin: 3 }}
                                    className="wide"
                                    value={result.expiryDate}
                                    type="date"
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "expiryDate",
                                            target.value
                                        )
                                    }
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div style={{ flex: 1, display: "flex" }}>
                                <TextField
                                    id="outlined-name"
                                    label="Result"
                                    style={{ margin: 3 }}
                                    select
                                    className="wide"
                                    value={result.result}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "result",
                                            target.value
                                        )
                                    }
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem value="genuine">Genuine</MenuItem>
                                    <MenuItem value="not-genuine">
                                        Not genuine
                                    </MenuItem>
                                </TextField>
                            </div>
                        </div>

                        <div className="flex-row" style={{ marginTop: 20 }}>
                            <div style={{ flex: 1 }}>
                                <TextField
                                    id="outlined-name"
                                    label="Appearence on Document Matches Age?"
                                    select
                                    style={{ margin: 3 }}
                                    className="wide"
                                    value={result.dateOfBirthConsisntency}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "dateOfBirthConsisntency",
                                            target.value
                                        )
                                    }
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </TextField>
                            </div>
                            <div style={{ flex: 1, paddingLeft: 10 }}>
                                <TextField
                                    id="outlined-name"
                                    label="Identity Check - System Score"
                                    select
                                    style={{ margin: 3 }}
                                    className="wide"
                                    value={result.identityScore}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "identityScore",
                                            target.value
                                        )
                                    }
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem value="risk">Risk</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="good">Good</MenuItem>
                                </TextField>
                            </div>
                            <div style={{ flex: 1 }} />
                        </div>

                        <div className="flex-row" style={{ marginTop: 10 }}>
                            <TextField
                                id="outlined-name"
                                label="Comments"
                                multiline
                                // style={{ margin: 3 }}
                                className="wide"
                                value={result.comments}
                                onChange={({ target }) =>
                                    handleChange(key, "comments", target.value)
                                }
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div className="flex-row" style={{ marginTop: 10 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => saveIdentityCheck(key)}
                                style={{ marginRight: 10 }}
                            >
                                {result.loading ? "Loading ..." : "Save"}
                            </Button>
                            <Button
                                variant={
                                    result.supportingDocsURL &&
                                    result.supportingDocsURL.length > 0
                                        ? "text"
                                        : "contained"
                                }
                                color="primary"
                                onClick={() => fileUploaderRef.current.click()}
                            >
                                {result.uploadingAttachment
                                    ? "Uploading..."
                                    : result.supportingDocsURL &&
                                      result.supportingDocsURL.length > 0
                                    ? "Update Supporting Documents"
                                    : "Upload Supporting Documents"}
                            </Button>
                            {keys(omit(state, ["comments"])).length > 1 && (
                                <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    style={{ paddingLeft: 3, paddingRight: 3 }}
                                >
                                    <Button
                                        fullWidth
                                        variant="text"
                                        color="secondary"
                                        onClick={() => removeReport(key)}
                                    >
                                        Remove
                                    </Button>
                                </Grid>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="application/pdf,application/vnd.ms-excel,application/zip,application/x-zip,application/x-zip-compressed"
                            ref={fileUploaderRef}
                            onChange={evt => uploadAttachment(evt, key)}
                            id="attachmentUploader"
                            className="hidden"
                        />
                    </div>
                );
            })}
        </Paper>
    );
}

const mapState = state => ({
    snackbar: state.snackbar
});

const mapDispatch = ({ snackbar: { asyncToggleSnackBar } }) => ({
    toggleSnackBar: payload => asyncToggleSnackBar(payload)
});

export default connect(mapState, mapDispatch)(IdentityCheck);
