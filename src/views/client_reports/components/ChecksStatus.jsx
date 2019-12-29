// @ts-check

//codes in this file are to be moved to different files in later commits
import React from "react";
import {
	Grid,
} from "@material-ui/core";
import {SectionHeader,FieldsTitle } from './Headers'



const CheckStatus= ({data }) => {
   

	return (
		<div>
            <Grid container style={{marginBottom:14}}>
                <Grid item xs={12} sm={12}>
                   <SectionHeader label="Report Details" />
                </Grid>
                <Grid item xs={10} sm={10}>
                   <FieldsTitle label="Background Check Included Within This Report" />
                </Grid>
                <Grid item xs={2} sm={2}>
                   <FieldsTitle label="Status"/>
                </Grid>
            </Grid>
                {data.map((item,index)=>{
                     return(

                        <Grid container key={index} style={{ marginBottom: "1em" }}>
                            <Grid item xs={12} sm={10}>
                                <FieldsTitle label={item.name} />
                            </Grid>
                            <Grid item xs={12} sm={2} style={{backgroundColor:item.color}}>
                                
                            </Grid>
                        </Grid>
                        
                       
                     )
                })}
		</div>
	);
};




export default CheckStatus;
