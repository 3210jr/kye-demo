// @ts-check
import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Paper,
    FormControlLabel,
    FormControl,
    FormLabel,
    Switch as SwitchButton,
    FormGroup,
    Button,
    TextField,
    MenuItem
} from "@material-ui/core";
import _ from "lodash";
import { registerOrganization, updateOrganization } from "../../../utils";

const companyDetails = {
    name: "",
    email: "",
    telephone: "",
    fax: "",
    address: "",
    country: "",
    services: [],
    packageType: "standard",
    features: ["pdf-export", "general-ratings"]
};

const CompanyForm = ({
    title = "Company Details",
    closeForm,
    organization = {}
}) => {
    const [state, setstate] = useState({
        ...companyDetails,
        loading: false,
        editMode: false
    });
    useEffect(() => {
        const initialState = {
            ...companyDetails,
            loading: false,
            editMode: Object.keys(organization).length > 0,
            ...organization
        };
        setstate(initialState);
    }, []);
    function handleChange(name, evt) {
        setstate({ ...state, [name]: evt.target.value });
    }
    function toggleService(serviceName) {
        const { services } = { ...state };
        if (services.includes(serviceName)) {
            services.splice(services.indexOf(serviceName), 1);
        } else {
            services.push(serviceName);
        }
        setstate({ ...state, services });
    }
    function toggleFeature(featureName) {
        const { features } = { ...state };
        if (features.includes(featureName)) {
            features.splice(features.indexOf(featureName), 1);
        } else {
            features.push(featureName);
        }
        setstate({ ...state, features });
    }
    function updateCompany() {
        if (state.loading) return;
        const organization = _.omit({ ...state }, ["loading", "editMode"]);
        setstate({ ...state, loading: true });
        updateOrganization({ ...organization }, organization.id)
            .then(res => {
                setstate({ ...state, loading: false });
                closeForm();
            })
            .catch(error => {
                alert("Error updating this organization");
                console.log("Error: ", error);
                setstate({ ...state, loading: false });
            });
    }
    function registerCompany() {
        if (state.loading) return;
        const organization = _.omit({ ...state }, ["loading", "editMode"]);
        setstate({ ...state, loading: true });
        registerOrganization({ ...organization })
            .then(res => {
                setstate({ ...state, loading: false });
                closeForm();
            })
            .catch(error => {
                alert("Error registering this organization");
                setstate({ ...state, loading: false });
            });
    }
    return (
        <Grid container style={{ marginBottom: "1em" }}>
            <Paper className="wide" style={{ padding: "1em" }}>
                <Typography variant="h5" component="h3">
                    {title}
                </Typography>
                <Typography component="p">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum vitae officia cum provident, commodi labore,
                    mollitia, facere.
                </Typography>

                <form style={{ marginTop: "2em" }}>
                    <Typography variant="h6" component="h5">
                        Basic Information
                    </Typography>
                    <Grid container>
                        <Grid
                            item
                            style={{ padding: "0 0.5em 0.5em 0" }}
                            xs={12}
                            md={4}
                        >
                            <TextField
                                id="company-name"
                                label="Company Name"
                                style={{ margin: 1 }}
                                className="wide"
                                autoFocus
                                value={state.name}
                                onChange={evt => handleChange("name", evt)}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            style={{ padding: "0 0.5em 0.5em 0" }}
                            xs={12}
                            md={4}
                        >
                            <TextField
                                id="company-email"
                                label="Company Email"
                                style={{ margin: 1 }}
                                className="wide"
                                value={state.email}
                                onChange={evt => handleChange("email", evt)}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            style={{ padding: "0 0.5em 0.5em 0" }}
                            xs={12}
                            md={4}
                        >
                            <TextField
                                id="company-telephone"
                                label="Company Telephone"
                                style={{ margin: 1 }}
                                className="wide"
                                value={state.telephone}
                                onChange={evt => handleChange("telephone", evt)}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid
                            item
                            style={{ padding: "0 0.5em 0.5em 0" }}
                            xs={12}
                            md={4}
                        >
                            <TextField
                                id="company-fax"
                                label="Company Fax"
                                style={{ margin: 1 }}
                                className="wide"
                                value={state.fax}
                                onChange={evt => handleChange("fax", evt)}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            style={{ padding: "0 0.5em 0.5em 0" }}
                            xs={12}
                            md={4}
                        >
                            <TextField
                                id="company-address"
                                label="Company Address"
                                style={{ margin: 1 }}
                                className="wide"
                                value={state.address}
                                onChange={evt => handleChange("address", evt)}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            style={{ padding: "0 0.5em 0.5em 0" }}
                            xs={12}
                            md={4}
                        >
                            <TextField
                                id="company-country"
                                label="Company Country"
                                style={{ margin: 1 }}
                                className="wide"
                                value={state.country}
                                onChange={evt => handleChange("country", evt)}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            style={{ padding: "0 0.5em 0.5em 0" }}
                            xs={12}
                            md={4}
                        >
                            <TextField
                                id="package-type"
                                label="Package Type"
                                style={{ margin: 1 }}
                                className="wide"
                                value={state.packageType}
                                onChange={evt => handleChange("packageType", evt)}
                                margin="normal"
                                select
                                variant="outlined"
                            >
                                <MenuItem value="extended">Extended (14 Days)</MenuItem>
                                <MenuItem value="standard">Standard (21 Days)</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                    <div style={{ marginTop: 20 }}>
                        <Typography variant="h6" component="h5">
                            Screening Settings
                        </Typography>
                        <Grid container>
                            <Grid
                                item
                                style={{ padding: "0.5em 0.5em 0.5em 0" }}
                                xs={12}
                                md={4}
                            >
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Basic Package
                                    </FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <SwitchButton
                                                    checked={state.services.includes(
                                                        "identification"
                                                    )}
                                                    onChange={() =>
                                                        toggleService(
                                                            "identification"
                                                        )
                                                    }
                                                    value="identification"
                                                />
                                            }
                                            label="ID Document Check"
                                        />
                                        <FormControlLabel
                                            control={
                                                <SwitchButton
                                                    checked={state.services.includes(
                                                        "employment-history"
                                                    )}
                                                    onChange={() =>
                                                        toggleService(
                                                            "employment-history"
                                                        )
                                                    }
                                                    value="employment-history"
                                                />
                                            }
                                            label="Employment History & References"
                                        />
                                        <FormControlLabel
                                            control={
                                                <SwitchButton
                                                    checked={state.services.includes(
                                                        "gaps-reports"
                                                    )}
                                                    onChange={() =>
                                                        toggleService(
                                                            "gaps-reports"
                                                        )
                                                    }
                                                    value="gaps-reports"
                                                />
                                            }
                                            label="Gap Analysis"
                                        />
                                        <FormControlLabel
                                            control={
                                                <SwitchButton
                                                    checked={state.services.includes(
                                                        "academic-qualifications"
                                                    )}
                                                    onChange={() =>
                                                        toggleService(
                                                            "academic-qualifications"
                                                        )
                                                    }
                                                    value="academic-qualifications"
                                                />
                                            }
                                            label="Academic Qualifications"
                                        />
                                        <FormControlLabel
                                            control={
                                                <SwitchButton
                                                    checked={state.services.includes(
                                                        "professional-qualifications"
                                                    )}
                                                    onChange={() =>
                                                        toggleService(
                                                            "professional-qualifications"
                                                        )
                                                    }
                                                    value="professional-qualifications"
                                                />
                                            }
                                            label="Professional Qualifications"
                                        />
                                        <FormControlLabel
                                            control={
                                                <SwitchButton
                                                    checked={state.services.includes(
                                                        "cv-analysis"
                                                    )}
                                                    onChange={() =>
                                                        toggleService(
                                                            "cv-analysis"
                                                        )
                                                    }
                                                    value="cv-analysis"
                                                />
                                            }
                                            label="CV Analysis"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                style={{ padding: "0.5em 0.5em 0.5em 0" }}
                                xs={12}
                                md={4}
                            >
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Extended Package
                                    </FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <SwitchButton
                                                    checked={state.services.includes(
                                                        "police-reports"
                                                    )}
                                                    onChange={() =>
                                                        toggleService(
                                                            "police-reports"
                                                        )
                                                    }
                                                    value="police-reports"
                                                />
                                            }
                                            label="Criminal Check"
                                        />
                                        <FormControlLabel
                                            control={
                                                <SwitchButton
                                                    checked={state.services.includes(
                                                        "social-media"
                                                    )}
                                                    onChange={() =>
                                                        toggleService(
                                                            "social-media"
                                                        )
                                                    }
                                                    value="jason"
                                                />
                                            }
                                            label="Adverse Media Search"
                                        />
                                        <FormControlLabel
                                            control={
                                                <SwitchButton
                                                    checked={state.services.includes(
                                                        "compliance-database"
                                                    )}
                                                    onChange={() =>
                                                        toggleService(
                                                            "compliance-database"
                                                        )
                                                    }
                                                    value="compliance-database"
                                                />
                                            }
                                            label="Compliance Database"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <Typography variant="h6" component="h5">
                            Features
                        </Typography>
                        <Grid container>
                            <Grid
                                item
                                style={{ padding: "0 0.5em 0.5em 0" }}
                                xs={12}
                                md={4}
                            >
                                <FormControlLabel
                                    control={
                                        <SwitchButton
                                            checked={state.features.includes(
                                                "average-ratings"
                                            )}
                                            onChange={() =>
                                                toggleFeature("average-ratings")
                                            }
                                            value="average-ratings"
                                        />
                                    }
                                    label="Show Average Ratings"
                                />
                            </Grid>
                            <Grid
                                item
                                style={{ padding: "0 0.5em 0.5em 0" }}
                                xs={12}
                                md={4}
                            >
                                <FormControlLabel
                                    control={
                                        <SwitchButton
                                            checked={state.features.includes(
                                                "general-ratings"
                                            )}
                                            onChange={() =>
                                                toggleFeature("general-ratings")
                                            }
                                            value="general-ratings"
                                        />
                                    }
                                    label="Show General Ratings"
                                />
                            </Grid>
                            <Grid
                                item
                                style={{ padding: "0 0.5em 0.5em 0" }}
                                xs={12}
                                md={4}
                            >
                                <FormControlLabel
                                    control={
                                        <SwitchButton
                                            checked={state.features.includes(
                                                "excel-export"
                                            )}
                                            onChange={() =>
                                                toggleFeature("excel-export")
                                            }
                                            value="excel-export"
                                        />
                                    }
                                    label="Allow Excel Export"
                                />
                            </Grid>
                            <Grid
                                item
                                style={{ padding: "0 0.5em 0.5em 0" }}
                                xs={12}
                                md={4}
                            >
                                <FormControlLabel
                                    control={
                                        <SwitchButton
                                            checked={state.features.includes(
                                                "pdf-export"
                                            )}
                                            onChange={() =>
                                                toggleFeature("pdf-export")
                                            }
                                            value="pdf-export"
                                        />
                                    }
                                    label="Allow PDF Export"
                                />
                            </Grid>
                            <Grid
                                item
                                style={{ padding: "0 0.5em 0.5em 0" }}
                                xs={12}
                                md={4}
                            >
                                <FormControlLabel
                                    control={
                                        <SwitchButton
                                            checked={state.features.includes(
                                                "show-statistics"
                                            )}
                                            onChange={() =>
                                                toggleFeature("show-statistics")
                                            }
                                            value="show-statistics"
                                        />
                                    }
                                    label="Show Statistics"
                                />
                            </Grid>
                            <Grid
                                item
                                style={{ padding: "0 0.5em 0.5em 0" }}
                                xs={12}
                                md={4}
                            >
                                <FormControlLabel
                                    control={
                                        <SwitchButton
                                            checked={state.features.includes(
                                                "biometric-results"
                                            )}
                                            onChange={() =>
                                                toggleFeature(
                                                    "biometric-results"
                                                )
                                            }
                                            value="biometric-results"
                                        />
                                    }
                                    label="Show Biometrics Results"
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={state.loading}
                        onClick={
                            state.editMode ? updateCompany : registerCompany
                        }
                        style={{ marginTop: 10 }}
                    >
                        {state.loading
                            ? "Loading ..."
                            : state.editMode
                            ? "Update Company"
                            : "Register Company"}
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default CompanyForm;
