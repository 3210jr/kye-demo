// @ts-check
import React, {
    Component,
    useState,
    useEffect,
    createRef,
    Fragment
} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuidV1 from "uuid/v1";
import _ from "lodash";
import { keys, map, omit } from "lodash";
import {
    Paper,
    Typography,
    Button,
    TextField,
    MenuItem,
    Grid,
    FormControlLabel,
    Checkbox,
    withStyles
} from "@material-ui/core";
import {
    persistOrderResults,
    persistOrderEmbeddedResults,
    uploadFile,
    isCompleteForm,
    updateOrderFields,
    isValidDate
} from "../../../../utils";

const EMPLOYMENT_HISTORY_TEMPLATE = {
    organization: "",
    referenceMethod: "",
    dateProduced: "",
    positionHeldCandidate: "",
    positionHeldReferee: "",
    employmentStartDateCandidate: "",
    employmentStartDateReferee: "",
    employmentEndDateCandidate: "",
    employmentEndDateReferee: "",
    employmentHistoryScore: "",
    disciplinaryAction: false,
    disciplinaryInfo: "",
    reasonForLeaving: "",
    conduct: "",
    grossSalary: 0,
    liabilities: false,
    liabilitiesInfo: "",
    rehirePossibility: "",
    comments: "",
    additionalInformation: "",
    supportingDocsURL: "",
    loading: false
};

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "green"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "green"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "red"
            },
            "&:hover fieldset": {
                borderColor: "yellow"
            },
            "&.Mui-focused fieldset": {
                borderColor: "green"
            }
        }
    }
})(TextField);

function EmploymentHistory({ order, type, snackbar, toggleSnackBar }) {
    const [state, setState] = useState({
        [uuidV1()]: {
            ...EMPLOYMENT_HISTORY_TEMPLATE,
            loading: false,
            uploadingAttachment: false
        },
        comments: ""
    });

    useEffect(() => {
        const initialState = {
            ...order[type],
            ...state,
            comments: order[type].comments
        };
        setState(initialState);
    }, []);

    function insertNewResult() {
        state[uuidV1()] = {
            ...EMPLOYMENT_HISTORY_TEMPLATE,
            loading: false,
            uploadingAttachment: false
        };
        setState({ ...state });
    }

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

    function saveEmplymentHistoryCheck(resultKey) {
        const { loading, uploadingAttachment, comments } = { ...state };
        const currentState = omit(state[resultKey], [
            "loading",
            "uploadingAttachment"
        ]);
        if (loading || uploadingAttachment) return;

        if (
            !isValidDate([
                currentState.dateProduced,
                currentState.employmentStartDateCandidate,
                currentState.employmentEndDateReferee,
                currentState.employmentEndDateCandidate,
                currentState.employmentStartDateReferee
            ])
        ) {
            return alert("Please verify the dates you have entered.");
        }

        if (
            !currentState.supportingDocsURL ||
            currentState.supportingDocsURL.length < 5
        ) {
            alert("Please upload the supporting documents");
            return;
        }

        const exceptions = [];
        if (!currentState.liabilities) exceptions.push("liabilitiesInfo");
        if (!currentState.disciplinaryAction)
            exceptions.push("disciplinaryInfo");
        if (!isCompleteForm(currentState, exceptions)) {
            alert("Please fill in all the appropriate fields");
            return;
        }

        state[resultKey].loading = true;
        setState({ ...state });

        persistOrderEmbeddedResults(order.id, type, resultKey, {
            ...currentState
        })
            .then(res => {
                updateOrderFields(order.id, { [`${type}.comments`]: comments });
                toggleSnackBar({
                    message: "Emploment Reports updated successfully!"
                });
            })
            .catch(error => {
                toggleSnackBar({
                    message:
                        "Error. There was an error updating the Emploment report."
                });
                console.log("Error: ", error);
            })
            .finally(() => {
                state[resultKey].loading = false;
                setState({ ...state });
            });
    }

    return (
        <Paper style={{ padding: "1em", marginTop: 15 }}>
            <Typography variant="h6">
                Employment History and References
            </Typography>

            <Grid justify="space-between" container spacing={24}>
                <Grid item></Grid>

                <Grid item>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={insertNewResult}
                    >
                        Add another result
                    </Button>
                </Grid>
            </Grid>

            <Grid container>
                <Grid xs item>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Overall Observations (Brief Summary)"
                        value={state.comments}
                        onChange={({ target }) =>
                            setState({ ...state, comments: target.value })
                        }
                        id=""
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            {/* first row */}

            {map(_.omit(state, ["comments"]), (result, key) => {
                let fileUploaderRef = createRef();
                return (
                    <div
                        key={key}
                        style={{
                            marginBottom: `${
                                keys(state).length > 1 ? 50 : 15
                            }px`,
                            marginTop: 10,
                            paddingBottom: 10,
                            paddingTop: `${keys(state).length > 1 ? 50 : 10}px`,
                            borderTop: `${
                                keys(state).length > 1 ? 3 : 0
                            }px solid #ccc`
                        }}
                    >
                        <Grid container spacing={3} style={{ marginTop: 5 }}>
                            <Grid
                                item
                                xs
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <CssTextField
                                    id="outlined-name"
                                    value={result.organization}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "organization",
                                            target.value
                                        )
                                    }
                                    required
                                    label="Organization"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    style={{ margin: 3 }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    id="outlined-name"
                                    label="Reference method"
                                    value={result.referenceMethod}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "referenceMethod",
                                            target.value
                                        )
                                    }
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    style={{ margin: 3 }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    id="outlined-name"
                                    label="Date Produced"
                                    value={result.dateProduced}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "dateProduced",
                                            target.value
                                        )
                                    }
                                    fullWidth
                                    margin="normal"
                                    type="date"
                                    variant="outlined"
                                    style={{ margin: 3 }}
                                />
                            </Grid>
                        </Grid>

                        {/* second row */}

                        <p style={{ paddingLeft: 6 }}>Position held</p>
                        <Grid container spacing={3} style={{ marginTop: 5 }}>
                            <Grid
                                item
                                xs
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    id="outlined-name"
                                    label="Candidate"
                                    value={result.positionHeldCandidate}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "positionHeldCandidate",
                                            target.value
                                        )
                                    }
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    style={{ margin: 3 }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    id="outlined-name"
                                    label="Referee"
                                    value={result.positionHeldReferee}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "positionHeldReferee",
                                            target.value
                                        )
                                    }
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    style={{ margin: 3 }}
                                />
                            </Grid>
                        </Grid>
                        {/* second row ends */}

                        {/* third row */}
                        <Grid container spacing={3} style={{ marginTop: 5 }}>
                            <Grid
                                item
                                xs
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <Grid item xs={4}>
                                    <p style={{ paddingLeft: 6 }}>
                                        Employment Start Date
                                    </p>
                                </Grid>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={6}
                                        style={{
                                            paddingLeft: 3,
                                            paddingRight: 3
                                        }}
                                    >
                                        <TextField
                                            id="outlined-name"
                                            label="Candidate"
                                            type="date"
                                            value={
                                                result.employmentStartDateCandidate
                                            }
                                            onChange={({ target }) =>
                                                handleChange(
                                                    key,
                                                    "employmentStartDateCandidate",
                                                    target.value
                                                )
                                            }
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            style={{ margin: 3 }}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={6}
                                        style={{
                                            paddingLeft: 3,
                                            paddingRight: 3
                                        }}
                                    >
                                        <TextField
                                            id="outlined-name"
                                            label="Referee"
                                            type="date"
                                            value={
                                                result.employmentStartDateReferee
                                            }
                                            onChange={({ target }) =>
                                                handleChange(
                                                    key,
                                                    "employmentStartDateReferee",
                                                    target.value
                                                )
                                            }
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            style={{ margin: 3 }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <Grid item xs={4}>
                                    <p style={{ paddingLeft: 6 }}>
                                        Employment End Date
                                    </p>
                                </Grid>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={6}
                                        style={{
                                            paddingLeft: 3,
                                            paddingRight: 3
                                        }}
                                    >
                                        <TextField
                                            id="outlined-name"
                                            label="Candidate"
                                            type="date"
                                            value={
                                                result.employmentEndDateCandidate
                                            }
                                            onChange={({ target }) =>
                                                handleChange(
                                                    key,
                                                    "employmentEndDateCandidate",
                                                    target.value
                                                )
                                            }
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            style={{ margin: 3 }}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={6}
                                        style={{
                                            paddingLeft: 3,
                                            paddingRight: 3
                                        }}
                                    >
                                        <TextField
                                            id="outlined-name"
                                            label="Referee"
                                            type="date"
                                            value={
                                                result.employmentEndDateReferee
                                            }
                                            onChange={({ target }) =>
                                                handleChange(
                                                    key,
                                                    "employmentEndDateReferee",
                                                    target.value
                                                )
                                            }
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            style={{ margin: 3 }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* third row ends */}

                            {/* Extras start */}
                            <Grid
                                container
                                spacing={3}
                                style={{ marginTop: 5 }}
                            >
                                <Grid item sm={12} style={{ paddingLeft: 6 }}>
                                    <FormControlLabel
                                        style={{ fontSize: 18 }}
                                        control={
                                            <Checkbox
                                                checked={
                                                    result.disciplinaryAction
                                                }
                                                onChange={({ target }) =>
                                                    handleChange(
                                                        key,
                                                        "disciplinaryAction",
                                                        !result.disciplinaryAction
                                                    )
                                                }
                                                // value=""
                                            />
                                        }
                                        label="Involved in any Disciplinary Action"
                                    />
                                </Grid>
                                {result.disciplinaryAction && (
                                    <Fragment>
                                        <Grid
                                            item
                                            md={12}
                                            style={{
                                                paddingLeft: 3,
                                                paddingRight: 3,
                                                marginTop: 10
                                            }}
                                        >
                                            <TextField
                                                id="outlined-name"
                                                label="Disciplinary Action Comments (if any)"
                                                value={result.disciplinaryInfo}
                                                onChange={({ target }) =>
                                                    handleChange(
                                                        key,
                                                        "disciplinaryInfo",
                                                        target.value
                                                    )
                                                }
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                style={{ margin: 3 }}
                                            />
                                        </Grid>
                                    </Fragment>
                                )}

                                <Grid item sm={12} style={{ paddingLeft: 6 }}>
                                    <FormControlLabel
                                        style={{ fontSize: 18 }}
                                        control={
                                            <Checkbox
                                                checked={result.liabilities}
                                                onChange={({ target }) =>
                                                    handleChange(
                                                        key,
                                                        "liabilities",
                                                        !result.liabilities
                                                    )
                                                }
                                            />
                                        }
                                        label="Involved in any Liabilities"
                                    />
                                </Grid>

                                {result.liabilities && (
                                    <Grid
                                        item
                                        md={12}
                                        style={{
                                            paddingLeft: 3,
                                            paddingRight: 3,
                                            marginTop: 10
                                        }}
                                    >
                                        <TextField
                                            id="outlined-name"
                                            label="Liability Comments (if any)"
                                            value={result.liabilitiesInfo}
                                            onChange={({ target }) =>
                                                handleChange(
                                                    key,
                                                    "liabilitiesInfo",
                                                    target.value
                                                )
                                            }
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            style={{ margin: 3 }}
                                        />
                                    </Grid>
                                )}

                                <Grid
                                    item
                                    md={12}
                                    style={{
                                        paddingLeft: 3,
                                        paddingRight: 3,
                                        marginTop: 10
                                    }}
                                >
                                    <TextField
                                        id="outlined-name"
                                        label="Reason for leaving"
                                        value={result.reasonForLeaving}
                                        onChange={({ target }) =>
                                            handleChange(
                                                key,
                                                "reasonForLeaving",
                                                target.value
                                            )
                                        }
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        style={{ margin: 3 }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={12}
                                    style={{
                                        paddingLeft: 3,
                                        paddingRight: 3,
                                        marginTop: 10
                                    }}
                                >
                                    <TextField
                                        id="outlined-name"
                                        label="Employee conduct during Employment"
                                        value={result.conduct}
                                        onChange={({ target }) =>
                                            handleChange(
                                                key,
                                                "conduct",
                                                target.value
                                            )
                                        }
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        style={{ margin: 3 }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={12}
                                    style={{
                                        paddingLeft: 3,
                                        paddingRight: 3,
                                        marginTop: 10
                                    }}
                                >
                                    <TextField
                                        id="outlined-name"
                                        label="Gross Salary (Optional)"
                                        value={result.grossSalary}
                                        onChange={({ target }) =>
                                            handleChange(
                                                key,
                                                "grossSalary",
                                                target.value
                                            )
                                        }
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        style={{ margin: 3 }}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={12}
                                    style={{
                                        paddingLeft: 3,
                                        paddingRight: 3,
                                        marginTop: 10
                                    }}
                                >
                                    <TextField
                                        id="outlined-name"
                                        label="Posibility of being rehired by the organization"
                                        value={result.rehirePossibility}
                                        onChange={({ target }) =>
                                            handleChange(
                                                key,
                                                "rehirePossibility",
                                                target.value
                                            )
                                        }
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        style={{ margin: 3 }}
                                    />
                                </Grid>
                            </Grid>
                            {/* Extras end */}

                            {/* forth row */}

                            <Grid
                                container
                                spacing={3}
                                style={{ marginTop: 5 }}
                            >
                                <Grid item xs={6} sm={6}>
                                    <p style={{ paddingLeft: 6 }}>
                                        Employment history and references -
                                        System score
                                    </p>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sm={6}
                                    style={{ paddingLeft: 6 }}
                                >
                                    <TextField
                                        id="outlined-name"
                                        select
                                        value={result.employmentHistoryScore}
                                        onChange={({ target }) =>
                                            handleChange(
                                                key,
                                                "employmentHistoryScore",
                                                target.value
                                            )
                                        }
                                        style={{ margin: 3 }}
                                        className="wide"
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        <MenuItem value="good">Good</MenuItem>
                                        <MenuItem value="average">
                                            Average
                                        </MenuItem>
                                        <MenuItem value="bad">Bad</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* forth row ends */}

                        {/* comments section */}
                        <Grid container spacing={3} style={{ marginTop: 5 }}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    fullWidth
                                    value={result.comments}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "comments",
                                            target.value
                                        )
                                    }
                                    label="Comments"
                                    id="outlined-dense-multiline"
                                    margin="dense"
                                    variant="outlined"
                                    multiline
                                    rowsMax="4"
                                />
                            </Grid>
                        </Grid>

                        {/* comments section ends */}

                        {/* Addition information section */}
                        <Grid container spacing={3} style={{ marginTop: 5 }}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    fullWidth
                                    value={result.additionalInformation}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "additionalInformation",
                                            target.value
                                        )
                                    }
                                    label="Additional information"
                                    id="outlined-dense-multiline"
                                    margin="dense"
                                    variant="outlined"
                                    multiline
                                    rowsMax="4"
                                />
                            </Grid>
                        </Grid>

                        {/* Addition information ends */}

                        {/* save button section */}

                        <Grid container spacing={3} style={{ marginTop: 5 }}>
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
                                    onClick={() =>
                                        saveEmplymentHistoryCheck(key)
                                    }
                                >
                                    {result.loading ? "Loading ..." : "Save"}
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={3}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <Button
                                    fullWidth
                                    variant={
                                        result.supportingDocsURL &&
                                        result.supportingDocsURL.length > 0
                                            ? "text"
                                            : "contained"
                                    }
                                    onClick={() =>
                                        fileUploaderRef.current.click()
                                    }
                                    color="primary"
                                >
                                    {result.uploadingAttachment
                                        ? "Uploading..."
                                        : result.supportingDocsURL &&
                                          result.supportingDocsURL.length > 0
                                        ? "Update Supporting Documents"
                                        : "Upload Supporting Documents"}
                                </Button>
                            </Grid>
                            {keys(_.omit(state, ["comments"])).length > 1 && (
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
                        </Grid>

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

            {/* save button section ends */}
        </Paper>
    );
}

const mapState = state => ({
    snackbar: state.snackbar
});

const mapDispatch = ({ snackbar: { asyncToggleSnackBar } }) => ({
    toggleSnackBar: payload => asyncToggleSnackBar(payload)
});

export default connect(mapState, mapDispatch)(EmploymentHistory);
