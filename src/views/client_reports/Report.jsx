import React from "react";
import {
    Document,
} from "@react-pdf/renderer";


//importing other reports
import CVAnalysisReport from './CVAnalysis'
import EmploymentHistoryReport from './EmploymentHistory'
import GapAnalysisReport from './GapAnalysis'
import IDAnalysisReport from './IDAnalysis'
import ProfessionAnalysisReport from './ProfessionAnalysis'
import AcademicAnalysisReport from './AcademicAnalysis'



const Quixote = () => (
    
    <Document style={{ height: "100%" }}>
        <AcademicAnalysisReport/>
        <CVAnalysisReport/>
        <EmploymentHistoryReport/>
        <GapAnalysisReport/>
        <IDAnalysisReport/>
        <ProfessionAnalysisReport/>

    </Document>
);


export default Quixote;
