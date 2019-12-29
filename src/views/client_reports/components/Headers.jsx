// @ts-check

//codes in this file are to be moved to different files in later commits
import React from "react";
import {
    Typography,
} from "@material-ui/core";


const FieldsTitle = ({ label }) => (
	<Typography variant="subtitle2">{label}</Typography>
);

const SectionHeader = ({ label }) => (
	<Typography variant="h5" align="left">
		{label}
	</Typography>
);
const TableHeaderText = ({ label }) => (
	<Typography variant="h6" align="left">
		{label}
	</Typography>
);




export {FieldsTitle,SectionHeader,TableHeaderText}
