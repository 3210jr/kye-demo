// @ts-check
import React, { Component, createRef, Fragment, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    Paper,
    IconButton,
    Tooltip,
    Toolbar,
    Typography,
    Table,
    TableSortLabel,
    TablePagination,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Grid,
    Button,
    TextField,
    MenuItem
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { upperFirst, omit } from "lodash";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { connect } from "react-redux";
import { Timeline, Event } from "react-timeline-scribble";
import {
    fullFormatDate,
    friendlyFormatDate,
    uploadFile,
    addCaseUpdate
} from "../../utils";
import {
    CloudDownload,
    Delete as DeleteIcon,
    FilterList as FilterListIcon,
    AttachFile as AttachFileIcon
} from "@material-ui/icons";
import firebase from "firebase";

class PreLitigationCaseView extends Component {
    state = {
        addingUpdates: false,
        showUpdateForm: false,
        updates: [],
        title: "",
        comments: "",
        description: "",
        attachmentURL: "",
        loadingUpdates: true,
        uploadingAttachment: false
    };

    componentDidMount() {
        const { profile, cases, match } = this.props;
        const { caseId } = match.params;
        this.updatesListener = firebase
            .firestore()
            .collection("preLitigationCases")
            .doc(caseId)
            .collection("updates")
            .onSnapshot(snap => {
                const updates = snap.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                this.setState({ loadingUpdates: false, updates });
            });
    }

    toggleUpdateForm = () => {
        this.setState({ showUpdateForm: !this.state.showUpdateForm });
    };

    handleChange = (field, evt) => {
        const { value } = evt.target;
        this.setState({ [field]: value });
    };

    render() {
        const { profile, cases, match } = this.props;
        const { caseId } = match.params;
        const litigationCase = cases.filter(c => c.id === caseId)[0];
        if (!litigationCase) {
            return null;
        }
        const state = this.state;
        return (
            <div className="">
                <Paper style={{ padding: "1em" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <p style={{ fontSize: 26, fontWeight: 500 }}>
                                {litigationCase.customerName}
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <Grid item xs={12} md={4} lg={2} xl={2}>
                                    <div
                                        style={{
                                            // flex: 1,
                                            lineHeight: 1.8,
                                            fontSize: 20,
                                            fontWeight: 500
                                        }}
                                    >
                                        <div>Department: </div>
                                        <div>Company Asignee: </div>
                                        <div>MA Asignee: </div>
                                        <div>Date Initiated: </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4} lg={2} xl={2}>
                                    <div
                                        style={{
                                            // flex: 8,
                                            lineHeight: 1.8,
                                            fontSize: 20
                                        }}
                                    >
                                        <div>{litigationCase.department}</div>
                                        <div>
                                            {litigationCase.companyPointPerson}
                                        </div>
                                        <div>
                                            {litigationCase.MAPointPerson}
                                        </div>
                                        <div>
                                            {litigationCase.createdAt &&
                                                friendlyFormatDate(
                                                    litigationCase.createdAt.toDate()
                                                )}
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                            <div
                                style={{
                                    fontSize: 20,
                                    lineHeight: 1.5,
                                    marginTop: 10
                                }}
                            >
                                <span style={{ fontWeight: 500 }}>
                                    Case Description:
                                </span>
                                <br />
                                {litigationCase.description} <br />
                            </div>

                            <div
                                style={{
                                    fontSize: 20,
                                    lineHeight: 1.5,
                                    marginTop: 10,
                                    fontWeight: 500,
                                    marginBottom: 5
                                }}
                            >
                                Suspects:
                            </div>
                            {litigationCase.suspects &&
                                litigationCase.suspects.map(
                                    (suspect, index) => (
                                        <div
                                            key={`suspect___${suspect.fName}`}
                                            style={{
                                                fontSize: 18,
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {/* {index + 1}: {suspect.fName}{" "} */}
                                            {suspect.mName} {suspect.lName}{" "}
                                            <br />
                                            <div style={{ fontSize: 14, paddingLeft: 10 }}>
												{
													suspect.nidaNumber && suspect.nidaNumber.length > 3 && ("NIDA Number: " + suspect.nidaNumber)
												}
												<br />
												{
													suspect.telephone && suspect.telephone.length > 3 && ("Telephone: " + suspect.telephone)
												}
												<br />
												{
													suspect.votersIdNumber && suspect.votersIdNumber.length > 3 && ("Voters ID: " + suspect.votersIdNumber)
												}
												{/* <br /> */}
                                            </div>
                                        </div>
                                    )
                                )}

                            <div
                                style={{
                                    fontSize: 20,
                                    lineHeight: 1.5,
                                    marginTop: 15,
                                    fontWeight: 500,
                                    marginBottom: 5
                                }}
                            >
                                <Button
                                    onClick={this.toggleUpdateForm}
                                    variant="contained"
                                >
                                    {state.showUpdateForm
                                        ? "Cancel Update"
                                        : "Add Update"}
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

                {state.showUpdateForm && (
                    <CaseUpdateForm
                        caseId={caseId}
                        toggleUpdateForm={this.toggleUpdateForm}
                    />
                )}

                <Paper style={{ padding: "1em", marginTop: 25 }}>
                    <CaseUpdatesTable
                        toggleUpdateForm={this.toggleUpdateForm}
                        loadingUpdates={state.loadingUpdates}
                        updates={state.updates}
                    />
                </Paper>
            </div>
        );
        return (
            <div>
                <p style={{ fontSize: 24 }}>{litigationCase.customerName}</p>
                <Timeline>
                    <Event
                        interval={friendlyFormatDate(
                            litigationCase.createdAt.toDate()
                        )}
                        title={"Case Opened"}
                        subtitle={""}
                    >
                        {litigationCase.description}
                        <br />
                        {litigationCase.comments}

                        {litigationCase.attachmentURL.length > 3 && (
                            <>
                                <br />
                                <br />
                                <Button
                                    variant="text"
                                    color="primary"
                                    onClick={() =>
                                        this.downloadAtt(
                                            litigationCase.attachmentURL
                                        )
                                    }
                                >
                                    <CloudDownload /> &nbsp;&nbsp; Download
                                    Attachments
                                </Button>
                            </>
                        )}
                    </Event>
                    {/* Other events */}
                    {state.updates
                        .sort((a, b) => {
                            if (a.createdAt && b.createdAt) {
                                return a.createdAt > b.createdAt ? 1 : -1;
                            }
                            return -1;
                        })
                        .map(update => (
                            <Event
                                interval={
                                    update.createdAt &&
                                    friendlyFormatDate(
                                        update.createdAt.toDate()
                                    )
                                }
                                key={update.id}
                                title={update.title}
                                subtitle={""}
                            >
                                {update.description}
                                <br />
                                {update.comments}

                                {update.attachmentURL.length > 3 && (
                                    <>
                                        <br />
                                        <br />
                                        <Button
                                            variant="text"
                                            color="primary"
                                            onClick={() =>
                                                this.downloadAtt(
                                                    litigationCase.attachmentURL
                                                )
                                            }
                                        >
                                            <CloudDownload /> &nbsp;&nbsp;
                                            Download Attachments
                                        </Button>
                                    </>
                                )}
                            </Event>
                        ))}
                    {match.path.indexOf("admin") > -1 &&
                        profile &&
                        profile.admin && (
                            <Event
                                interval={friendlyFormatDate(
                                    new Date().getTime()
                                )}
                                title={"Add Update"}
                                subtitle={
                                    "Want to create a new update to the case?"
                                }
                            >
                                {state.showUpdateForm ? (
                                    <div>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                style={styles.inputs}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Update Title"
                                                    value={state.title}
                                                    onChange={evt =>
                                                        this.handleChange(
                                                            "title",
                                                            evt
                                                        )
                                                    }
                                                    id=""
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            style={{ marginTop: 5 }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={6}
                                                style={styles.inputs}
                                            >
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    label="Description"
                                                    value={state.description}
                                                    onChange={evt =>
                                                        this.handleChange(
                                                            "description",
                                                            evt
                                                        )
                                                    }
                                                    id=""
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            style={{ marginTop: 5 }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={6}
                                                style={styles.inputs}
                                            >
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    label="Notes"
                                                    value={state.comments}
                                                    onChange={evt =>
                                                        this.handleChange(
                                                            "comments",
                                                            evt
                                                        )
                                                    }
                                                    id=""
                                                    margin="dense"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Button
                                                variant={
                                                    state.attachmentURL.length >
                                                    0
                                                        ? "text"
                                                        : "contained"
                                                }
                                                onClick={() =>
                                                    this.fileUploaderRef.current.click()
                                                }
                                                color="primary"
                                            >
                                                {state.uploadingAttachment
                                                    ? "Uploading..."
                                                    : "Upload Attachments"}
                                            </Button>
                                        </Grid>
                                        <Grid
                                            container
                                            style={{ marginTop: 25 }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.saveCaseUpdate}
                                            >
                                                {state.addingUpdates
                                                    ? "Loading ..."
                                                    : "Save Update"}
                                            </Button>
                                            <Button
                                                variant="text"
                                                color="primary"
                                                onClick={this.toggleUpdateForm}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </div>
                                ) : (
                                    <Button
                                        variant="text"
                                        color="primary"
                                        onClick={this.toggleUpdateForm}
                                    >
                                        New Update
                                    </Button>
                                )}
                            </Event>
                        )}
                </Timeline>
            </div>
        );
    }
}

function CaseUpdateForm({ toggleUpdateForm, caseId }) {
    const [state, setstate] = useState({
        status: "in progress",
        comments: "",
        attachmentURL: "",
        uploadingAttachment: false,
        addingUpdates: false
    });
    const fileUploaderRef = createRef();

    function handleChange(field, evt) {
        const { value } = evt.target;
        setstate({ ...state, [field]: value });
    }

    function uploadAttachment(evt, key) {
        if (state.uploadingAttachment) return;
        const file = evt.target.files[0];

        setstate({ ...state, uploadingAttachment: true });

        uploadFile(file, "supporting-documents")
            .then(res => {
                res.ref.getDownloadURL().then(url => {
                    setstate({
                        ...state,
                        uploadingAttachment: false,
                        attachmentURL: url,
                        notes: ""
                    });
                });
            })
            .catch(error => {
                alert(
                    "There was an error uploading your assets, please try again"
                );
                console.log(error);
                setstate({ ...state, uploadingAttachment: false });
            });
    }

    function saveCaseUpdate() {
        const { uploadingAttachment, addingUpdates } = state;
        if (uploadingAttachment || addingUpdates) return;
        const { status, comments, attachmentURL } = omit(state, [
            "loading",
            "uploadingAttachment",
            "showUpdateForm",
            "addingUpdates",
            "loadingUpdates"
        ]);

        setstate({ ...state, addingUpdates: true });

        addCaseUpdate({
            caseId,
            status,
            comments,
            attachmentURL
        })
            .then(res => {
                alert("Update Added!");
                setstate({
                    status: "",
                    comments: "",
                    attachmentURL: "",
                    uploadingAttachment: false,
                    addingUpdates: false
                });
                toggleUpdateForm();
            })
            .catch(error => {
                alert(
                    "There was an error saving your update. Please try again."
                );
                console.log("Error: ", error);
            });
    }
    return (
        <Paper style={{ padding: "1em", marginTop: 25 }}>
            <p style={{ fontSize: 22 }}>{friendlyFormatDate(new Date())}</p>
            <div>
                <Grid container>
                    <Grid item xs={12} sm={12} md={4} style={styles.inputs}>
                        <TextField
                            fullWidth
                            label="Status"
                            value={state.status}
                            onChange={evt => handleChange("status", evt)}
                            id=""
                            margin="dense"
                            select
                            variant="outlined"
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="in progress">In Progress</MenuItem>
                            <MenuItem value="closed">Closed</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: 5 }}>
                    <Grid item xs={12} sm={12} md={6} style={styles.inputs}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Comments"
                            value={state.comments}
                            onChange={evt => handleChange("comments", evt)}
                            id=""
                            margin="dense"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Button
                        variant={
                            state.attachmentURL.length > 0
                                ? "text"
                                : "contained"
                        }
                        onClick={() => fileUploaderRef.current.click()}
                        color="primary"
                    >
                        {state.uploadingAttachment
                            ? "Uploading..."
                            : "Upload Attachments"}
                    </Button>
                </Grid>
                <Grid container style={{ marginTop: 25 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={saveCaseUpdate}
                    >
                        {state.addingUpdates ? "Loading ..." : "Save Update"}
                    </Button>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={toggleUpdateForm}
                    >
                        Cancel
                    </Button>
                </Grid>
            </div>

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

function CaseUpdatesTable({ updates = [], toggleUpdateForm, loadingUpdates }) {
    function downloadAtt(url) {
        window.open(url, "_blank");
    }
    return (
        <Fragment>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Updated By</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Comments</TableCell>
                        <TableCell>Attachments</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {updates.map(update => (
                        <TableRow key={update.id}>
                            <TableCell component="th" scope="row">
                                {update.createdAt &&
                                    friendlyFormatDate(
                                        update.createdAt.toDate()
                                    )}
                            </TableCell>
                            <TableCell>{update.updatedByName}</TableCell>
                            <TableCell>{update.status}</TableCell>
                            <TableCell>{update.comments}</TableCell>
                            <TableCell>
                                {update.attachmentURL ? (
                                    <Icon
                                        className="pointer"
                                        onClick={() =>
                                            downloadAtt(update.attachmentURL)
                                        }
                                    >
                                        file_copy
                                    </Icon>
                                ) : (
                                    <span style={{ fontStyle: "italic" }}>
                                        No Attachment
                                    </span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {updates.length === 0 && !loadingUpdates && (
                <div
                    style={{
                        marginTop: 50,
                        marginBottom: 30,
                        color: "#4e4e4e",
                        fontStyle: "italic",
                        textAlign: "center"
                    }}
                >
                    There are no updates yet! <br />
                    <Button onClick={toggleUpdateForm} type="button">
                        Create new update
                    </Button>
                </div>
            )}
        </Fragment>
    );
}

const styles = {
    inputs: { paddingLeft: 3, paddingRight: 3 }
};

const mapState = state => ({
    profile: state.profile,
    cases: state.litigationCases.cases
});

export default connect(mapState)(PreLitigationCaseView);
