// @ts-check
import React, { useState } from "react";
import { omit } from "lodash";
import {
    Grid,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    MenuItem
} from "@material-ui/core";
import _ from "lodash";
import Select from "react-select";
import { uploadFile, createKYCOrder } from "../../utils";
import { countryList } from "../../constants/countries";

const newOrderFileUploader = React.createRef();

export default function KYCOrderForm({ classes, profile, history }) {
    const [state, setstate] = useState({
        customerName: "",
        registeretedOrganization: true,
        registrationNumber: "",
        tinNumber: "",
        attachmentURL: "",
        address: "",
        country: "tanzania",
        region: "",
        box: "",
        district: "",
        uploadingAttachment: false,
        notes: "",
        loading: false
    });

    function updateText(field, evt) {
        return setstate({ ...state, [field]: evt.target.value });
    }

    // FIXME: Abstract out! Repeated way too much time!
    function uploadZippedFolder(evt) {
        const file = evt.target.files[0];
        setstate({ ...state, loading: true, uploadingAttachment: true });
        uploadFile(file, "kyc-order-assets")
            .then(res => {
                res.ref.getDownloadURL().then(url =>
                    setstate({
                        ...state,
                        uploadingAttachment: false,
                        attachmentURL: url
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

    function createOrder() {
        if (state.uploadingAttachment || state.loading) return;
        const order = omit(state, ["uploadingAttachment", "loading"]);
        if (state.attachmentURL.length < 5) {
            return alert("Please attach supporting documents");
        }
        const emptyFields = Object.keys(
            _.omit(state, ["district", "region", "box", "notes", "address"])
        ).filter(key => state[key].length === 0);
        if (emptyFields.length > 0) {
            return alert("Please fill in all the appropriate fields");
        }

        setstate({ ...state, loading: true });
        return createKYCOrder({
            ...order,
            organizationId: profile.organizationId,
            organizationName: profile.organizationName
        })
            .then(res => {
                setstate({ ...state, loading: false });
                alert("New Order Created");
                if (profile.admin) {
                    return history.push("/admin");
                }
                history.push("/dashboard/my-orders");
            })
            .catch(error => {
                console.log("Error: ", error);
                alert("Error creating new order");
                setstate({ ...state, loading: false });
            });
    }

    return (
        <div>
            <Card className={classes.cardSection}>
                <CardContent>
                    <Typography variant="h5" component="h4">
                        Customer Details
                    </Typography>

                    <form
                        className={classes.container}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={24}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="customer-name"
                                    label="Customer Name"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={state.customerName}
                                    onChange={evt =>
                                        updateText("customerName", evt)
                                    }
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="registrations-number"
                                    label="Registration Number"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={state.registrationNumber}
                                    onChange={evt =>
                                        updateText("registrationNumber", evt)
                                    }
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="tin-number"
                                    label="Tin Number"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={state.tinNumber}
                                    onChange={evt =>
                                        updateText("tinNumber", evt)
                                    }
                                    margin="normal"
                                />
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
								<TextField
									id="address"
                                    label="Address"
                                    variant="outlined"
									className={classes.textField}
									value={state.address}
									onChange={evt => updateText("address", evt)}
									margin="normal"
								/>
							</Grid> */}
                            <Grid item xs={12} md={4}>
                                <Select
                                    options={countryList.map(country => ({
                                        value: country.toLowerCase(),
                                        label: country
                                    }))}
                                    onChange={item =>
                                        setstate({
                                            ...state,
                                            country: item.value
                                        })
                                    }
                                    className="country-selector"
                                    value={{
                                        value: state.country,
                                        label: state.country
                                            .split(" ")
                                            .map(c => _.upperFirst(c))
                                            .join(" ")
                                    }}
                                />
                                {/* <TextField
                                    onChange={evt => updateText("country", evt)}
                                    label="Country"
                                    value={state.country}
                                    fullWidth
                                    select
                                >
                                    {countryList.map(country => (
                                        <MenuItem
                                            key={country}
                                            value={country.toLowerCase()}
                                        >
                                            {country}
                                        </MenuItem>
                                    ))}
                                </TextField> */}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="region"
                                    label="Region (optional)"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={state.region}
                                    onChange={evt => updateText("region", evt)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="district"
                                    label="District (optional)"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={state.district}
                                    onChange={evt =>
                                        updateText("district", evt)
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
                                    value={state.box}
                                    onChange={evt => updateText("box", evt)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    id="notes"
                                    label="Notes"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={state.notes}
                                    onChange={evt => updateText("notes", evt)}
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
                        Supporting Documents
                    </Typography>

                    <Typography variant="h6" component="p">
                        Please send us a copy of any relevant supporting
                        documents if available. This could include:
                    </Typography>

                    <ol>
                        <li>
                            <Typography variant="body1" component="p">
                                Any agreements and contracts
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1" component="p">
                                Any certificates (BRELA, TRA, etc)
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1" component="p">
                                Memorandum & Articles of Associaion
                            </Typography>
                        </li>
                    </ol>

                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => newOrderFileUploader.current.click()}
                            disabled={state.uploadingAttachment}
                            // className={[classes.button, "primary"]}
                        >
                            {state.uploadingAttachment
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
                    disabled={state.uploadingAttachment || state.loading}
                    color="primary"
                    onClick={createOrder}
                    // className={[classes.button, "primary"]}
                >
                    {state.uploadingAttachment || state.loading
                        ? "Uploading files ... "
                        : "Confirm Order"}
                </Button>
            </div>

            <input
                ref={newOrderFileUploader}
                className="hidden"
                accept="application/pdf,application/vnd.ms-excel,application/zip,application/x-zip,application/x-zip-compressed"
                type="file"
                onChange={uploadZippedFolder}
            />
        </div>
    );
}
