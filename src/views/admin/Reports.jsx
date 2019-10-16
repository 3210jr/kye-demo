// @ts-check
import React from "react";
import {
	Grid,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Table,
	Typography,

} from "@material-ui/core";


const ReportsHeader = ()=>{
	return(
		<div>
			<Grid container style={{ marginBottom: "1em" }}>
				<Table >
				<TableBody>
					<TableRow>
					<TableCell>Subject Name</TableCell>
					<TableCell>{"Lorem ipsum"}</TableCell>
					<TableCell rowSpan={2}>Logo</TableCell>
					</TableRow>
					<TableRow>
					<TableCell>ARS Ref No</TableCell>
					<TableCell>{"Lorem ipsum"}</TableCell>
					</TableRow>
				</TableBody>
				</Table>
			
			</Grid>
		</div>
	)
}

const FirstPage =()=>{
	return(
		<div>

			<ReportsHeader/>
	
			<Grid container 
				style={{ marginBottom: "1em" }}
				 alignItems="center"
			>
				<Typography variant="h6">Background verification Report</Typography>

				<Table >
				<TableBody>
					<TableRow>
					<TableCell colSpan={4}>Report Details</TableCell>
					</TableRow>
					<TableRow>
					<TableCell>ARS No</TableCell>
					<TableCell colSpan={3}></TableCell>
					</TableRow>

					<TableRow>
					<TableCell>Class start date</TableCell>
					<TableCell></TableCell>
					<TableCell>Report Severity</TableCell>
					<TableCell></TableCell>
					</TableRow>

					<TableRow>
					<TableCell>Report Date</TableCell>
					<TableCell></TableCell>
					<TableCell>Report Status</TableCell>
					<TableCell></TableCell>
					</TableRow>
				</TableBody>
				</Table>
				
			</Grid>

			<Grid container>
				<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
				<Table >
				<TableBody>
					<TableRow>
					<TableCell colSpan={2}>Candidate Details</TableCell>
					</TableRow>
					<TableRow>
					<TableCell>Name of subject</TableCell>
					<TableCell></TableCell>
					</TableRow>

					<TableRow>
					<TableCell>Employment ID</TableCell>
					<TableCell></TableCell>
					</TableRow>

					<TableRow>
					<TableCell>Process Name</TableCell>
					<TableCell></TableCell>
					</TableRow>
				</TableBody>
				</Table>

				</Grid>
				<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
				<Table >
				<TableBody>
					<TableRow>
					<TableCell colSpan={2}>Client Details</TableCell>
					</TableRow>
					<TableRow>
					<TableCell>Name of subject</TableCell>
					<TableCell></TableCell>
					</TableRow>

					<TableRow>
					<TableCell>Process Name</TableCell>
					<TableCell></TableCell>
					</TableRow>
				</TableBody>
				</Table>
				</Grid>
			</Grid>


			<Grid container style={{paddingLeft:3,paddingRight:3,marginTop:5,marginBottom:5}}>
				<Grid item xs={12}>
				<Table >
				<TableBody>
					<TableRow>
					<TableCell>All Check are clear</TableCell>
					</TableRow>
				</TableBody>
				</Table>
				</Grid>
			</Grid>



			<Grid container>
				<Grid item xs={12} style={{paddingLeft:3,paddingRight:3}}>
				<Table >
				<TableBody>
					<TableRow>
					<TableCell colSpan={6}>Severity Legend</TableCell>
					</TableRow>
					<TableRow>
					<TableCell>Discrepant</TableCell>
					<TableCell>Minor Discrepant</TableCell>
					<TableCell>Attention Required</TableCell>
					<TableCell>Insufficient</TableCell>
					<TableCell>No response received</TableCell>
					<TableCell>Clear</TableCell>
					</TableRow>



					<TableRow>
					<TableCell></TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
					</TableRow>

					<TableRow>
					<TableCell>{"Lorem ipsum"}</TableCell>
					<TableCell>{"Lorem ipsum"}</TableCell>
					<TableCell>{"Lorem ipsum"}</TableCell>
					<TableCell>{"Lorem ipsum"}</TableCell>
					<TableCell>{"Lorem ipsum"}</TableCell>
					<TableCell>{"Lorem ipsum"}</TableCell>
					</TableRow>


				</TableBody>
				</Table>

				</Grid>
			</Grid>

		
		
		</div>
	)
}

const SecondPage =()=>{
	return(
	<div style={{backgroundColor:"red" }}>
		<ReportsHeader/>
		<Grid container style={{ marginBottom: "1em"}}>
		<Table >
		<TableBody>
			<TableRow>
			<TableCell colSpan={7}>Executive Summary</TableCell>
			</TableRow>
			<TableRow>
			<TableCell>S No</TableCell>
			<TableCell>Check Name</TableCell>
			<TableCell>Verified By/At</TableCell>
			<TableCell>Check Status</TableCell>
			<TableCell>Check Severity</TableCell>
			<TableCell>Page</TableCell>
			<TableCell>Annexure</TableCell>
			</TableRow>

			<TableRow>
			<TableCell>{"1"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell colSpan={7}>Footer</TableCell>
			</TableRow>

			
		</TableBody>
		</Table>
		
	</Grid>

</div>
	)
}



const ThirdPage =()=>{
	return(
	<div >
		<ReportsHeader/>
		<Grid container style={{ marginBottom: "1em"}}>
		<Table >
		<TableBody>
			<TableRow>
			<TableCell>Details of Education</TableCell>
			<TableCell>Antecedents Started</TableCell>
			<TableCell>Antecedents verified</TableCell>

			</TableRow>

			<TableRow>
			<TableCell>College/Institute/University/Location</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			</TableRow>


			<TableRow>
			<TableCell>Roll No / Registration No/ Enrollment No.</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			</TableRow>


			<TableRow>
			<TableCell>Course Name / Qualification</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell>Year of Passing </TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			<TableCell>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell>Details </TableCell>
			<TableCell colSpan={2}>Antecedents Verified</TableCell>
			</TableRow>


			<TableRow>
			<TableCell>Mode of verification </TableCell>
			<TableCell colSpan={2}>{"Lorem ipsum"}</TableCell>
			</TableRow>
			

			<TableRow>
			<TableCell>Verifier's Comments </TableCell>
			<TableCell colSpan={2}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell>Final Disposition </TableCell>
			<TableCell colSpan={2}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell>Check Severity </TableCell>
			<TableCell colSpan={2}>{"Clear"}</TableCell>
			</TableRow>
		</TableBody>
		</Table>

		<Typography variant="h6">End of Checks</Typography>
	</Grid>

</div>
	)
}


const FourthPage =()=>{
	return(
	<div style={{backgroundColor:"red"}}>
		<ReportsHeader/>
		<Grid container style={{ marginBottom: "1em"}}>
			<Typography variant="h6">Disclaimer & Limitations of Research</Typography>
	
		</Grid>

		<Grid container style={{ marginBottom: "1em"}}>
			<Typography variant="subtitle1">
				{"Disclaimer message"}
			</Typography>
	
		</Grid>

</div>
	)
}






const Reports = () => {
	return (
		<div>
			<FirstPage/>
			<SecondPage/>
			<ThirdPage/>
			<FourthPage/>
		</div>

		
	);
};

export default Reports;
