// @ts-check
import React, { Component, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    Grid,
    Typography,
    FormControl,
    TextField,
    InputLabel,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import RSelect from "react-select";
import DateFnsUtils from "@date-io/date-fns";
import _ from "lodash";
import { uploadFile, createOrder, isValidDate } from "../utils";
import { countryList } from "../constants/countries";
import KYCOrderForm from "./orders/KYCOrderForm";

const styles = theme => ({
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

class NewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openMonthPicker: false,
            orderType: "kye", // "not-set", // kyc, kye, not-set
            firstName: "",
            lastName: "",
            middleName: "",
            telephone: "",
            telephoneCode: "+255",
            // nidaNumber: "",
            dateOfBirth: "",
            // monthOfBirth: "january",
            // yearOfBirth: 1990,
            // address: "",
            idType: "national-identification",
            idNumber: "",
            idExpiry: "",
            country: "tanzania, united republic of",
            region: "",
            box: "",
            district: "",
            gender: "male",
            screeningTypes: [],
            assetsURL: "",
            uploadingAssets: false,
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.fileUploaderRef = React.createRef();
    }
    uploadZippedFolder = evt => {
        const file = evt.target.files[0];
        this.setState({ uploadingAssets: true });
        uploadFile(file, "kye-order-assets")
            .then(res => {
                res.ref.getDownloadURL().then(url =>
                    this.setState({
                        uploadingAssets: false,
                        assetsURL: url
                    })
                );
            })
            .catch(error => {
                alert(
                    "There was an error uploading your assets, please try again"
                );
                console.log(error);
                this.setState({ uploadingAssets: false });
            });
    };
    toggleScreeningType = type => {
        const { screeningTypes } = this.state;
        if (screeningTypes.includes(type)) {
            screeningTypes.splice(screeningTypes.indexOf(type), 1);
        } else {
            screeningTypes.push(type);
        }
        this.setState({ screeningTypes });
    };
    handleChange(field, evt) {
        // if (field === "dateOfBirth") {
        // 	return this.setState(prevState => (prevState[field] = evt));
        // }
        const update = evt.target.value;
        this.setState(prevState => (prevState[field] = update));
    }
    toggleMonthDropDown = () => {
        this.setState(prevState => ({
            openMonthPicker: !prevState.openMonthPicker
        }));
    };
    createOrder = () => {
        const {
            firstName,
            lastName,
            middleName,
            dateOfBirth,
            telephoneCode,
            // monthOfBirth,
            // yearOfBirth,
            // address,
            gender,
            screeningTypes,
            assetsURL,
            loading,
            telephone,
            idType,
            idNumber,
            country,
            region,
            box,
            district,
            idExpiry,
            uploadingAssets
        } = this.state;
        const { profile, history } = this.props;
        if (loading || uploadingAssets) {
            alert("Please wait while loading");
            return;
        }

        if (!isValidDate([idExpiry, dateOfBirth])) {
            return alert("Please verify the expiry date and the date of birth");
        }

        if (assetsURL.length < 5) {
            alert(
                "Please upload the zipped folder with all required documents"
            );
            return;
        }

        if (screeningTypes.length === 0) {
            return alert(
                "Please choose at least one screening type to perform."
            );
        }

        const emptyFields = Object.keys(
            _.omit(this.state, ["district", "region", "box"])
        ).filter(key => this.state[key].length === 0);
        if (emptyFields.length > 0) {
            alert("Please fill in all the appropriate fields");
            return;
        }

        if (
            idNumber.length < 5 &&
            !window.confirm(
                "Are you sure you want to continue without entering a valid NIDA Number?"
            )
        ) {
            return;
        }

        this.setState({ loading: true });
        createOrder({
            firstName,
            lastName,
            middleName,
            telephoneCode,
            telephone,
            dateOfBirth: new Date(dateOfBirth),
            // address,
            gender,
            screeningTypes,
            assetsURL,
            idType,
            idNumber,
            country,
            region,
            box,
            district,
            idExpiry,
            organizationId: profile.organizationId,
            organizationName: profile.organizationName
        })
            .then(res => {
                this.setState({ loading: false });
                if (profile.admin) {
                    return history.push("/admin");
                }
                history.push("/dashboard/my-orders");
            })
            .catch(error => {
                alert("There was an error creating a new order!");
                console.log("Error: ", error);
                this.setState({ loading: false });
            });
    };
    render() {
        const { classes, history, profile } = this.props;
        const {
            orderType,
            open,
            openMonthPicker,
            firstName,
            lastName,
            middleName,
            telephoneCode,
            telephone,
            idType,
            idNumber,
            idExpiry,
            country,
            region,
            district,
            box,
            dateOfBirth,
            // monthOfBirth,
            // yearOfBirth,
            // address,
            gender,
            screeningTypes,
            uploadingAssets,
            loading
        } = this.state;
        const { serviceOptions } = this.props;
        return (
            <div>
                <Grid container style={{ marginBottom: 15 }}>
                    <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                    >
                        New Order:
                    </Typography>
                </Grid>
                <Card className={classes.cardSection}>
                    <CardContent>
                        <Typography variant="h5" component="h4">
                            Order Type
                        </Typography>
                        <Typography>
                            Please choose they type of order/investigation you
                            want to perform. We support customer and employee
                            verificaion, profiling and vetting for all your
                            needs.
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <InputLabel
                            id="order-type-picker-label"
                            style={{ marginRight: 10 }}
                        >
                            Order Type:{" "}
                        </InputLabel>

                        <Select
                            // labelId="order-type-picker-label"
                            id="order-type-picker"
                            value={orderType}
                            style={{ width: 200 }}
                            onChange={evt =>
                                this.setState({ orderType: evt.target.value })
                            }
                        >
                            <MenuItem value={"not-set"}>
                                Choose order Type
                            </MenuItem>
                            <MenuItem value={"kye"}>
                                Know Your Employee
                            </MenuItem>
                            <MenuItem value={"kyc"}>
                                Know Your Customer
                            </MenuItem>
                        </Select>
                    </CardContent>
                </Card>

                {orderType === "kyc" && (
                    <KYCOrderForm
                        classes={classes}
                        profile={profile}
                        history={history}
                    />
                )}

                {orderType === "kye" && (
                    <div>
                        <Card className={classes.cardSection}>
                            <CardContent>
                                <Typography variant="h5" component="h4">
                                    Candidate Details
                                </Typography>

                                <form
                                    className={classes.container}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="first-name"
                                                variant="outlined"
                                                label="First Name"
                                                className={classes.textField}
                                                value={firstName}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "firstName",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="middle-name"
                                                variant="outlined"
                                                label="Middle Name"
                                                className={classes.textField}
                                                value={middleName}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "middleName",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="last-name"
                                                label="Last Name"
                                                variant="outlined"
                                                className={classes.textField}
                                                value={lastName}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "lastName",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={4} md={2} lg={1}>
                                            <TextField
                                                id="telephoneCode"
                                                label="Tel. Code"
                                                variant="outlined"
                                                className={classes.textField}
                                                value={telephoneCode}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "telephoneCode",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={8} md={2} lg={3}>
                                            <TextField
                                                id="telephone"
                                                label="Telephone Number"
                                                variant="outlined"
                                                className={classes.textField}
                                                value={telephone}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "telephone",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="dateOfBirth"
                                                label="Date of Birth"
                                                type="date"
                                                variant="outlined"
                                                className={classes.textField}
                                                value={dateOfBirth}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "dateOfBirth",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12} md={4}>
                                            <FormControl
                                                className={classes.formControl}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="demo-controlled-open-select">
                                                    Gender
                                                </InputLabel>
                                                <Select
                                                    open={open}
                                                    variant="outlined"
                                                    onClose={
                                                        this
                                                            .toggleGenderDropDown
                                                    }
                                                    onOpen={
                                                        this
                                                            .toggleGenderDropDown
                                                    }
                                                    value={gender}
                                                    onChange={evt =>
                                                        this.handleChange(
                                                            "gender",
                                                            evt
                                                        )
                                                    }
                                                    inputProps={{
                                                        name: "gender",
                                                        id:
                                                            "demo-controlled-open-select"
                                                    }}
                                                >
                                                    <MenuItem value={"male"}>
                                                        Male
                                                    </MenuItem>
                                                    <MenuItem value={"female"}>
                                                        Female
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid> */}
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "gender",
                                                        evt
                                                    )
                                                }
                                                label="Gender"
                                                value={gender}
                                                variant="outlined"
                                                fullWidth
                                                select
                                            >
                                                <MenuItem value={"male"}>
                                                    Male
                                                </MenuItem>
                                                <MenuItem value={"female"}>
                                                    Female
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "idType",
                                                        evt
                                                    )
                                                }
                                                label="ID Type"
                                                variant="outlined"
                                                value={idType}
                                                fullWidth
                                                select
                                            >
                                                <MenuItem
                                                    value={
                                                        "national-identification"
                                                    }
                                                >
                                                    National Identification
                                                    (NIDA)
                                                </MenuItem>
                                                <MenuItem value={"passport"}>
                                                    Passport
                                                </MenuItem>
                                                <MenuItem value={"voter-id"}>
                                                    Voters ID
                                                </MenuItem>
                                                <MenuItem
                                                    value={"birth-certificate"}
                                                >
                                                    Birth Certificate
                                                </MenuItem>
                                                <MenuItem
                                                    value={"drivers-license"}
                                                >
                                                    Drivers License
                                                </MenuItem>
                                                <MenuItem value={"school-id"}>
                                                    School ID
                                                </MenuItem>
                                                <MenuItem
                                                    value={"social-security"}
                                                >
                                                    Social Security Number
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="nida-number"
                                                label="Identification Number"
                                                variant="outlined"
                                                className={classes.textField}
                                                value={idNumber}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "idNumber",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="id-expiry"
                                                label="Identification Expiry Date"
                                                variant="outlined"
                                                className={classes.textField}
                                                type="date"
                                                value={idExpiry}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "idExpiry",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12} md={4}>
											<TextField
												id="address"
												label="Address"
												className={classes.textField}
												value={address}
												onChange={evt => this.handleChange("address", evt)}
												margin="normal"
											/>
										</Grid> */}
                                        <Grid item xs={12} md={4}>
                                            <RSelect
                                                options={countryList.map(
                                                    country => ({
                                                        value: country.toLowerCase(),
                                                        label: country
                                                    })
                                                )}
                                                onChange={item =>
                                                    this.setState({
                                                        country: item.value
                                                    })
                                                }
                                                className="country-selector"
                                                value={{
                                                    value: country,
                                                    label: country
                                                        .split(" ")
                                                        .map(c =>
                                                            _.upperFirst(c)
                                                        )
                                                        .join(" ")
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="region"
                                                label="Region (optional)"
                                                variant="outlined"
                                                className={classes.textField}
                                                value={region}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "region",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="district"
                                                label="District (optional)"
                                                variant="outlined"
                                                className={classes.textField}
                                                value={district}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "district",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="pobox"
                                                label="P.O.Box (optional)"
                                                variant="outlined"
                                                className={classes.textField}
                                                value={box}
                                                onChange={evt =>
                                                    this.handleChange(
                                                        "box",
                                                        evt
                                                    )
                                                }
                                                margin="normal"
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                        <Card className={classes.cardSection}>
                            <CardContent>
                                <Typography variant="h5" component="h4">
                                    Screening Types
                                </Typography>

                                <Grid container spacing={24}>
                                    {serviceOptions.includes(
                                        "identification"
                                    ) && (
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={screeningTypes.includes(
                                                            "identification"
                                                        )}
                                                        onChange={() =>
                                                            this.toggleScreeningType(
                                                                "identification"
                                                            )
                                                        }
                                                        value="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label="Identification"
                                            />
                                        </Grid>
                                    )}
                                    {serviceOptions.includes(
                                        "employment-history"
                                    ) && (
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={screeningTypes.includes(
                                                            "employment-history"
                                                        )}
                                                        onChange={() =>
                                                            this.toggleScreeningType(
                                                                "employment-history"
                                                            )
                                                        }
                                                        value="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label="Employment history & verification"
                                            />
                                        </Grid>
                                    )}

                                    {serviceOptions.includes(
                                        "academic-qualifications"
                                    ) && (
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={screeningTypes.includes(
                                                            "academic-qualifications"
                                                        )}
                                                        onChange={evt =>
                                                            this.toggleScreeningType(
                                                                "academic-qualifications"
                                                            )
                                                        }
                                                        value="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label="Academic Qualifications"
                                            />
                                        </Grid>
                                    )}

                                    {serviceOptions.includes(
                                        "professional-qualifications"
                                    ) && (
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={screeningTypes.includes(
                                                            "professional-qualifications"
                                                        )}
                                                        onChange={evt =>
                                                            this.toggleScreeningType(
                                                                "professional-qualifications"
                                                            )
                                                        }
                                                        value="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label="Professional Qualifications"
                                            />
                                        </Grid>
                                    )}

                                    {serviceOptions.includes(
                                        "police-reports"
                                    ) && (
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={screeningTypes.includes(
                                                            "police-reports"
                                                        )}
                                                        onChange={evt =>
                                                            this.toggleScreeningType(
                                                                "police-reports"
                                                            )
                                                        }
                                                        value="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label="Police Reports"
                                            />
                                        </Grid>
                                    )}

                                    {serviceOptions.includes(
                                        "gaps-reports"
                                    ) && (
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={screeningTypes.includes(
                                                            "gaps-reports"
                                                        )}
                                                        onChange={evt =>
                                                            this.toggleScreeningType(
                                                                "gaps-reports"
                                                            )
                                                        }
                                                        value="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label="Gaps Reports"
                                            />
                                        </Grid>
                                    )}

                                    {serviceOptions.includes(
                                        "civil-litigation"
                                    ) && (
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={screeningTypes.includes(
                                                            "civil-litigation"
                                                        )}
                                                        onChange={evt =>
                                                            this.toggleScreeningType(
                                                                "civil-litigation"
                                                            )
                                                        }
                                                        value="litigation"
                                                        color="primary"
                                                    />
                                                }
                                                label="Civil Litigation"
                                            />
                                        </Grid>
                                    )}

                                    {serviceOptions.includes(
                                        "social-media"
                                    ) && (
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={screeningTypes.includes(
                                                            "social-media"
                                                        )}
                                                        onChange={evt =>
                                                            this.toggleScreeningType(
                                                                "social-media"
                                                            )
                                                        }
                                                        value="social-media"
                                                        color="primary"
                                                    />
                                                }
                                                label="Social Media"
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card className={classes.cardSection}>
                            <CardContent>
                                <Typography variant="h5" component="h4">
                                    Supporting Documents
                                </Typography>

                                <Typography variant="h6" component="p">
                                    Please send us a copy of the following
                                    documents
                                </Typography>

                                <ol>
                                    <li>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                        >
                                            Applicant Signing of Consent forms
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                        >
                                            Proof of identity and address
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                        >
                                            Details of Education and employment
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                        >
                                            Professional Certificates
                                        </Typography>
                                    </li>
                                </ol>

                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            this.fileUploaderRef.current.click()
                                        }
                                        disabled={uploadingAssets}
                                    >
                                        {uploadingAssets
                                            ? "Uploading Assets ..."
                                            : "Zipped and PDF Only"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div
                            style={{
                                display: "flex",
                                flex: 1,
                                alignItems: "flex-end",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button
                                variant="contained"
                                disabled={uploadingAssets || loading}
                                color="primary"
                                onClick={this.createOrder}
                            >
                                {uploadingAssets || loading
                                    ? "Uploading files ... "
                                    : "Confirm Order"}
                            </Button>
                        </div>

                        <input
                            ref={this.fileUploaderRef}
                            className="hidden"
                            accept="application/pdf,application/vnd.ms-excel,application/zip,application/x-zip,application/x-zip-compressed"
                            type="file"
                            onChange={this.uploadZippedFolder}
                        />
                    </div>
                )}
            </div>
        );
    }
}

NewOrder.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapState = state => ({
    profile: state.profile,
    serviceOptions:
        (state.organizations.myOrganization &&
            state.organizations.myOrganization.services) ||
        []
});

export default connect(mapState)(withStyles(styles)(NewOrder));
