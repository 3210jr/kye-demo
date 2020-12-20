// @ts-check
import React, { Component } from "react";
import {
    Grid,
    Typography,
    Fab,
    TextField,
    Button,
    FormControlLabel,
    FormControl,
    Switch as SwitchButton,
    FormLabel,
    Paper
} from "@material-ui/core";
import _ from "lodash";
import PropTypes from "prop-types";
import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";
import SimpleTable from "../components/SimpleTable";
import { registerOrganizationMember } from "../utils";

const permissionsList = ["kyc", "kye", "legal"];

export default class CompanyStaff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addStaffForm: false,
            fullName: "",
            email: "",
            password: "",
            permissions: [],
            telephone: "+255",
            loading: false
        };

        this.toggleRegistrationForm = this.toggleRegistrationForm.bind(this);
    }
    toggleRegistrationForm() {
        this.setState(prevState => ({ addStaffForm: !prevState.addStaffForm }));
    }
    registerPerson = () => {
        if (this.state.loading) return;
        const state = _.omit({ ...this.state }, ["loading", "addStaffForm"]);
        const { organizationId } = this.props;
        console.log("Profile: ", {
            fullName: state.fullName,
            email: state.email,
            password: state.password,
            permissions: state.permissions,
            telephone: state.telephone,
            organizationId: organizationId
        });
        this.setState({ loading: true });
        registerOrganizationMember({
            fullName: state.fullName,
            email: state.email,
            password: state.password,
            permissions: state.permissions,
            telephone: state.telephone,
            organizationId: organizationId
        }).then(result => {
            this.setState({ loading: false });
            if (!result.error) this.toggleRegistrationForm();
            alert(result.message);
        });
    };
    togglePermissions = permission => {
        const { permissions } = { ...this.state };
        if (permissions.includes(permission)) {
            permissions.splice(permissions.indexOf(permission), 1);
        } else {
            permissions.push(permission);
        }
        this.setState({ permissions });
    };
    render() {
        const {
            fullName,
            email,
            password,
            telephone,
            loading,
            addStaffForm,
            permissions
        } = this.state;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" component="h5">
                            Company Staff
                        </Typography>

                        <div style={{ height: 10 }} />

                        <SimpleTable
                            titles={["Full Name", "Telephone", "Email"]}
                            data={userData}
                        />
                    </Grid>

                    {addStaffForm && (
                        <Grid item xs={12} md={12} style={{ marginTop: "2em" }}>
                            <Paper style={{ padding: 15 }}>
                                <Typography variant="h6" component="h6">
                                    New user registration
                                </Typography>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="full-name"
                                            label="Full Name"
                                            className="wide"
                                            variant="outlined"
                                            value={fullName}
                                            autoFocus
                                            onChange={evt =>
                                                this.setState({
                                                    fullName: evt.target.value
                                                })
                                            }
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="email"
                                            label="Email"
                                            className="wide"
                                            variant="outlined"
                                            value={email}
                                            onChange={evt =>
                                                this.setState({
                                                    email: evt.target.value
                                                })
                                            }
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="telephone"
                                            label="Telephone"
                                            className="wide"
                                            variant="outlined"
                                            value={telephone}
                                            onChange={evt =>
                                                this.setState({
                                                    telephone: evt.target.value
                                                })
                                            }
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="password"
                                            label="Password"
                                            className="wide"
                                            variant="outlined"
                                            value={password}
                                            onChange={evt =>
                                                this.setState({
                                                    password: evt.target.value
                                                })
                                            }
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                                <div style={{ marginTop: 20 }}>
                                    <Typography variant="h6" component="h5">
                                        Permission Information
                                    </Typography>
                                    <Grid container>
                                        <Grid
                                            item
                                            style={{
                                                padding: "0 0.5em 0.5em 0"
                                            }}
                                            xs={12}
                                            md={4}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <SwitchButton
                                                        checked={permissions.includes(
                                                            "kye"
                                                        )}
                                                        onChange={() =>
                                                            this.togglePermissions(
                                                                "kye"
                                                            )
                                                        }
                                                        value="kye"
                                                    />
                                                }
                                                label="Know Your Employee (KYE)"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            style={{
                                                padding: "0 0.5em 0.5em 0"
                                            }}
                                            xs={12}
                                            md={4}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <SwitchButton
                                                        checked={permissions.includes(
                                                            "kyc"
                                                        )}
                                                        onChange={() =>
                                                            this.togglePermissions(
                                                                "kyc"
                                                            )
                                                        }
                                                        value="kyc"
                                                    />
                                                }
                                                label="Know Your Customer (KYC)"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            style={{
                                                padding: "0 0.5em 0.5em 0"
                                            }}
                                            xs={12}
                                            md={4}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <SwitchButton
                                                        checked={permissions.includes(
                                                            "legan"
                                                        )}
                                                        onChange={() =>
                                                            this.togglePermissions(
                                                                "legan"
                                                            )
                                                        }
                                                        value="legan"
                                                    />
                                                }
                                                label="Legal Team"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <Button
                                        variant="contained"
                                        onClick={this.registerPerson}
                                        color="primary"
                                    >
                                        {loading
                                            ? "Loading ..."
                                            : "Register new user"}
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
                <Fab
                    style={{ position: "fixed", bottom: 35, right: 35 }}
                    color="primary"
                    aria-label="Add"
                    className="primary"
                    onClick={this.toggleRegistrationForm}
                >
                    {addStaffForm ? <CloseIcon /> : <AddIcon />}
                </Fab>
            </div>
        );
    }
}

const userData = [
    ["Ally Jr Salim", "+255 766 439 764", "ally@inspiredideas.io"],
    ["Edgar Mboki", "+255 686 349 661", "ally@inspiredideas.io"],
    ["Fred Taton", "+255 754 640 731", "ally@inspiredideas.io"]
];

CompanyStaff.propTypes = {
    organizationId: PropTypes.string.isRequired
};
