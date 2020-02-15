// @ts-check
import React, { useState, useEffect, createRef } from "react";
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
    Grid
} from "@material-ui/core";
import {
    persistOrderEmbeddedResults,
    uploadFile,
    updateOrderFields,
    isValidDate
} from "../../../../utils";
import InputField from "../../../../components/FormValidation/InputField";

const ACADEMIC_REPORTS_TEMPLATE = {
    establishmentName: "",
    referenceMethod: "",
    dateSupplied: "",
    didCandidateStudyInTheEstablishment: true,
    attendanceDateCandidate: new Date().getFullYear(),
    attendanceDateReference: new Date().getFullYear(),
    nameOfCourseStudiedCandidate: "",
    nameOfCourseStudiedReference: "",
    qualificationAndGradedAwardedCandidate: "",
    qualificationAndGradedAwardedReference: "",
    supportingDocsURL: "",
    academicQualificationScore: "",
    comments: ""
};

function AcademicReports({ order, type, snackbar, toggleSnackBar, setErrors }) {
    const [state, setState] = useState({
        [uuidV1()]: {
            ...ACADEMIC_REPORTS_TEMPLATE,
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
            ...ACADEMIC_REPORTS_TEMPLATE,
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

    function handleChange(key, field, value) {
        const stateField = field.substring(0, field.indexOf("-"));
        state[key][stateField] = value;
        return setState({ ...state });
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

    function saveAcademicReports(resultKey) {
        const { loading, uploadingAttachment, comments } = state;
        const currentState = omit(state[resultKey], [
            "loading",
            "uploadingAttachment"
        ]);
        if (loading) return;
        if (!isValidDate(currentState.dateSupplied)) {
            return alert("Please enter a valid date");
        }
        const emptyFields = Object.keys(currentState).filter(
            key => currentState[key].length === 0
        );

        setErrors(
            emptyFields.map(field => ({
                id: `${field}-${resultKey}`,
                message: "This Field can not be empty"
            }))
        );

        if (emptyFields.length > 0) {
            alert("Please fill in all the appropriate fields");
            return;
        }
        if (
            !currentState.supportingDocsURL ||
            currentState.supportingDocsURL.length < 5
        ) {
            alert("Please upload the supporting documents");
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
                    message: "Academic Reports updated successfully!"
                });
            })
            .catch(error => {
                toggleSnackBar({
                    message:
                        "Error. There was an error updating the Academic report."
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
            <Typography variant="h6">Academic Qualification</Typography>
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
                    <InputField
                        fullWidth
                        magin="dense"
                        multiline
                        rows={4}
                        value={state.comments}
                        label="Overall Observations (Brief Summary)"
                        onChange={({ target }) =>
                            setState({ ...state, comments: target.value })
                        }
                        id=""
                    />
                </Grid>
            </Grid>

            {map(_.omit(state, ["comments"]), (result, key) => {
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
                        <Grid container style={{ marginTop: 5 }}>
                            <Grid
                                item
                                xs={3}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <InputField
                                    fullWidth
                                    magin="normal"
                                    multiline
                                    value={result.establishmentName}
                                    label="Estabilish name"
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            `establishmentName-${key}`,
                                            target.value
                                        )
                                    }
                                    style={{ margin: 3 }}
                                    id={`establishmentName-${key}`}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={3}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <InputField
                                    fullWidth
                                    magin="normal"
                                    multiline
                                    value={result.referenceMethod}
                                    label="Reference method"
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            `referenceMethod-${key}`,
                                            target.value
                                        )
                                    }
                                    style={{ margin: 3 }}
                                    id={`referenceMethod-${key}`}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={3}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <InputField
                                    fullWidth
                                    magin="normal"
                                    multiline
                                    type="date"
                                    value={result.dateSupplied}
                                    label="Date supplied"
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            `dateSupplied-${key}`,
                                            target.value
                                        )
                                    }
                                    style={{ margin: 3 }}
                                    id={`dateSupplied-${key}`}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={3}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    id=""
                                    label="Did candidate study at this Establishment?"
                                    value={
                                        result.didCandidateStudyInTheEstablishment
                                    }
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "didCandidateStudyInTheEstablishment",
                                            target.value
                                        )
                                    }
                                    select
                                    style={{ margin: 3 }}
                                    className="wide"
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        {/* education details headers */}
                        <Grid container style={{ marginTop: 10 }}>
                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            ></Grid>

                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <Typography variant="h6">Candidate</Typography>
                            </Grid>

                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <Typography variant="h6">Reference</Typography>
                            </Grid>
                        </Grid>

                        {/* education details headers ends */}

                        {/* education details headers contents */}
                        <Grid container style={{ marginTop: 10 }}>
                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <p>Attendance Date (Year)</p>
                            </Grid>

                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    id=""
                                    value={result.attendanceDateCandidate}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "attendanceDateCandidate",
                                            target.value
                                        )
                                    }
                                    fullWidth
                                    select
                                    margin="normal"
                                    variant="outlined"
                                    style={{ margin: 3 }}
                                >
                                    {_.times(
                                        100,
                                        n => new Date().getFullYear() - n
                                    ).map(year => (
                                        <MenuItem
                                            value={year}
                                            key={`candidate__${year}`}
                                        >
                                            {year}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    id=""
                                    value={result.attendanceDateReference}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            "attendanceDateReference",
                                            target.value
                                        )
                                    }
                                    fullWidth
                                    select
                                    margin="normal"
                                    variant="outlined"
                                    style={{ margin: 3 }}
                                >
                                    {_.times(
                                        100,
                                        n => new Date().getFullYear() - n
                                    ).map(year => (
                                        <MenuItem
                                            value={year}
                                            key={`reference__${year}`}
                                        >
                                            {year}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container style={{ marginTop: 10 }}>
                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <p>Name of course(s) studied</p>
                            </Grid>

                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <InputField
                                    rows={4}
                                    fullWidth
                                    magin="dense"
                                    multiline
                                    value={result.nameOfCourseStudiedCandidate}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            `nameOfCourseStudiedCandidate-${key}`,
                                            target.value
                                        )
                                    }
                                    style={{ margin: 3 }}
                                    id={`nameOfCourseStudiedCandidate-${key}`}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                            <InputField
                                    rows={4}
                                    fullWidth
                                    magin="dense"
                                    multiline
                                    value={result.nameOfCourseStudiedReference}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            `nameOfCourseStudiedReference-${key}`,
                                            target.value
                                        )
                                    }
                                    style={{ margin: 3 }}
                                    id={`nameOfCourseStudiedReference-${key}`}
                                />
                            </Grid>
                        </Grid>

                        <Grid container style={{ marginTop: 10 }}>
                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <p>Qualificication and grade awarded</p>
                            </Grid>

                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                            <InputField
                                    fullWidth
                                    magin="normal"
                                    multiline
                                    value={result.qualificationAndGradedAwardedCandidate}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            `qualificationAndGradedAwardedCandidate-${key}`,
                                            target.value
                                        )
                                    }
                                    style={{ margin: 3 }}
                                    id={`qualificationAndGradedAwardedCandidate-${key}`}
                                />
                            
                            </Grid>

                            <Grid
                                item
                                xs={4}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                            <InputField
                                    fullWidth
                                    magin="normal"
                                    multiline
                                    value={result.qualificationAndGradedAwardedReference}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            `qualificationAndGradedAwardedReference-${key}`,
                                            target.value
                                        )
                                    }
                                    style={{ margin: 3 }}
                                    id={`qualificationAndGradedAwardedReference-${key}`}
                                />
                            </Grid>
                        </Grid>

                        <Grid container style={{ marginTop: 10 }}>
                            <Grid
                                item
                                xs={6}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <p>Qualification check - System score</p>
                            </Grid>

                            <Grid
                                item
                                xs={6}
                                style={{ paddingLeft: 3, paddingRight: 3 }}
                            >
                                <TextField
                                    id=""
                                    value={result.academicQualificationScore}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            `academicQualificationScore-${key}`,
                                            target.value
                                        )
                                    }
                                    select
                                    style={{ margin: 3 }}
                                    className="wide"
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem value="good">Good</MenuItem>
                                    <MenuItem value="average">Average</MenuItem>
                                    <MenuItem value="bad">Bad</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container style={{ marginTop: 5 }}>
                            <Grid xs item>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Comments"
                                    value={result.comments}
                                    onChange={({ target }) =>
                                        handleChange(
                                            key,
                                            `comments-${key}`,
                                            target.value
                                        )
                                    }
                                    id="outlined-dense-multiline"
                                    margin="dense"
                                    variant="outlined"
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
                                    onClick={() => saveAcademicReports(key)}
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
                        {/* education details headers ends */}

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

const mapDispatch = ({
    snackbar: { asyncToggleSnackBar },
    inputValidation: { setErrors }
}) => ({
    toggleSnackBar: payload => asyncToggleSnackBar(payload),
    setErrors
});

export default connect(mapState, mapDispatch)(AcademicReports);
