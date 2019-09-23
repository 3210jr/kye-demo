// @ts-check
import React, { Component } from "react";
import CompanyForm from "./components/CompanyForm";
import CompanyStaff from "../CompanyStaff";

const CompanyView = () => {
	return (
		<div>
			<CompanyForm title="Company Details" />

			<div style={{ marginTop: "3.5em" }}>
				<CompanyStaff />
			</div>
		</div>
	);
};

export default CompanyView;
