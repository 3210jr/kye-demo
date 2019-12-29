// @ts-check

//codes in this file are to be moved to different files in later commits
import React from "react";


import ReportIntro from './components/ReportIntro'
import CheckStatus from './components/ChecksStatus'
import Observations from './components/Observations'

const CVAnalysisReport= () => {
 
    const analysisData=[
        {name:"Cv Analysis Check",color:"#00ff00"}
    ]

    const observationsData=[
        "No irregularity noted"
    ]

    return(
        <>  
            <ReportIntro/>
            <Observations data={observationsData}/>   
            <CheckStatus data={analysisData}/>
            
        </>
    )
}






export default CVAnalysisReport;
