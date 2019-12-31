// @ts-check

//codes in this file are to be moved to different files in later commits
import React from "react";
import {
    Typography,
} from "@material-ui/core";

import '../Style.css'

const FieldsTitle = ({ label }) => (
	<Typography variant="subtitle2">{label}</Typography>
);

const SectionHeader = ({ label }) => (
	<h3 className="section-header">{label}</h3>
);
const TableHeaderText = ({ label }) => (
	<Typography variant="h6" align="left">
		{label}
	</Typography>
);




export {FieldsTitle,SectionHeader,TableHeaderText}
