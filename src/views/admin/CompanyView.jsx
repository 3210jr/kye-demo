// @ts-check
import React, { Component } from "react";
import CompanyForm from "./components/CompanyForm";
import CompanyStaff from "../CompanyStaff";
import { connect, useSelector } from "react-redux";

const CompanyView = ({ organizations, profile, match }) => {
    let organization = useSelector(
        state => state.organizations.organizations.find(o => o.id === match.params.companyId)
    );
    if (!organization) {
		return <div>Loading ....</div>
	}
    return (
        <div>
            <CompanyForm closeForm={() => {}} organization={organization} title="Company Details" />

            <div style={{ marginTop: "3.5em" }}>
                <CompanyStaff />
            </div>
        </div>
    );
};

const mapState = (state, ...rest) => ({
    profile: state.profile,
    organization: state.organizations.organizations,
    ...rest
});

export default connect(mapState)(CompanyView);
