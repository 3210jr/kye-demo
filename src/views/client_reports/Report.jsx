import React from "react";
import { Document } from "@react-pdf/renderer";
import { Provider } from "react-redux";
import store from "../../store";
//importing other reports
import CVAnalysisReport from "./CVAnalysis";
import EmploymentHistoryReport from "./EmploymentHistory";
import GapAnalysisReport from "./GapAnalysis";
import IDAnalysisReport from "./IDAnalysis";
import ProfessionAnalysisReport from "./ProfessionAnalysis";
import AcademicAnalysisReport from "./AcademicAnalysis";
import LitigationReport from "./Litigation";
import SocialMediaReport from './SocialMedia'

const Report = ({screeningType}) => {
    
    // conesole.log("Current  :",screeningType);

    return (
        <Provider store={store}>
            <Document style={{ height: "100%" }}>
                {screeningType === "academic-qualifications" && (
                    <AcademicAnalysisReport />
                )}
                {screeningType === "police-reports" && <CVAnalysisReport />}
                {screeningType === "employment-history" && (
                    <EmploymentHistoryReport />
                )}
                {screeningType === "gaps-reports" && <GapAnalysisReport />}
                {screeningType === "identification" && <IDAnalysisReport />}
                {screeningType === "civil-litigation" && <LitigationReport/>}
                {screeningType === "social-media" && <SocialMediaReport/>}
                {screeningType === "" && <ProfessionAnalysisReport />}
            </Document>
         </Provider>
    );
};

export default Report;
