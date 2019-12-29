// @ts-check

//codes in this file are to be moved to different files in later commits
import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { SectionHeader } from "./Headers";

const AdditionInformation = ({ data }) => {
    return (
        <>
            <Grid container style={{ marginBottom: 14 }}>
                <Grid item xs={12} sm={12}>
                    <SectionHeader label="Additional Information" />
                </Grid>
            </Grid>

            <Grid container style={{ marginBottom: "1em" }} className="observations-container">
                {data.map((text, index) => {
                    return (
                        <Grid item xs={12} sm={12} key={index}>
                            <Typography variant="body1" component="body1">
                                {text}
                            </Typography>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default AdditionInformation;
