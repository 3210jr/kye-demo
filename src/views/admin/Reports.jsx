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

const borders={
	left:{
		borderLeft:"1px solid #ececec"
	},
	right:{
		borderRight:"1px solid #ececec"
	},
	left_right:{
		borderLeft:"1px solid #ececec",
		borderRight:"1px solid #ececec"
	},
	top:{
		borderTop:"1px solid #ececec",
	}
}


const headers={
	marginTopBottom:{
		marginTop:"40px",
		marginBottom:"40px" 
	}
}

const ReportsHeader = ()=>{
	return(
		<div>
			<Grid container style={{ marginBottom: "1em",}}>
				<Table >
				<TableBody>
					<TableRow style={borders.top}>
					<TableCell style={borders.left}>Subject Name</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left_right} rowSpan={2}>Logo</TableCell>
					</TableRow>
					<TableRow>
					<TableCell style={borders.left}>ARS Ref No</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					</TableRow>
				</TableBody>
				</Table>
			
			</Grid>
		</div>
	)
}

const SectionHeader=({label})=>(
	<Typography variant="h5" align="center" style={headers.marginTopBottom}>{label}</Typography>

)
const TableHeaderText=({label})=>(
	<Typography variant="h6" align="center" >{label}</Typography>
)

const FirstPage =()=>{
	return(
		<div>

			<ReportsHeader/>

			<SectionHeader label="Background verification Report" />
			<Grid container 
				style={{ marginBottom: "1em" }}
			>
				<Table >
				<TableBody style={borders.top}>
					<TableRow>
					<TableCell colSpan={4} style={borders.left_right}>
						<TableHeaderText label="Report Details"/>
				
					</TableCell>
					</TableRow>
					<TableRow>
					<TableCell style={borders.left}>ARS No</TableCell>
					<TableCell style={borders.left_right} colSpan={3}></TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>Class start date</TableCell>
					<TableCell style={borders.left}>{"Lorem Ipsum"}</TableCell>
					<TableCell style={borders.left}>Report Severity</TableCell>
					<TableCell style={borders.left_right}>{"Lorem Ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>Report Date</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>Report Status</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>
				</TableBody>
				</Table>
				
			</Grid>

			<Grid container>
				<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
				<Table >
				<TableBody style={borders.top}>
					<TableRow>
					<TableCell colSpan={2} style={borders.left_right}>
						<TableHeaderText label="Candidate Details"/>
					</TableCell>
					</TableRow>
					<TableRow>
					<TableCell style={borders.left}>Name of subject</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>Employment ID</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>Process Name</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>
				</TableBody>
				</Table>

				</Grid>
				<Grid item xs={6} style={{paddingLeft:3,paddingRight:3}}>
				<Table >
				<TableBody style={borders.top}>
					<TableRow>
					<TableCell colSpan={2} style={borders.left_right} >
						<TableHeaderText label="Client Details"/>
					</TableCell>
					</TableRow>
					<TableRow>
					<TableCell style={borders.left}>Name of subject</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>Process Name</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>
				</TableBody>
				</Table>
				</Grid>
			</Grid>


			<Grid container style={{paddingLeft:3,paddingRight:3,marginTop:5,marginBottom:5}}>
				<Grid item xs={12}>
				<Table >
				<TableBody style={borders.top}>
					<TableRow>
					<TableCell style={borders.left_right}>All Check are clear</TableCell>
					</TableRow>
				</TableBody>
				</Table>
				</Grid>
			</Grid>



			<Grid container>
				<Grid item xs={12} style={{paddingLeft:3,paddingRight:3}}>
				<Table >
				<TableBody style={borders.top}>
					<TableRow>
					<TableCell colSpan={6} style={borders.left_right}>
						<TableHeaderText label="Severity Legend"/>
					</TableCell>
					</TableRow>
					<TableRow>
					<TableCell style={borders.left}>Discrepant</TableCell>
					<TableCell style={borders.left}>Minor Discrepant</TableCell>
					<TableCell style={borders.left}>Attention Required</TableCell>
					<TableCell style={borders.left}>Insufficient</TableCell>
					<TableCell style={borders.left}>No response received</TableCell>
					<TableCell style={borders.left_right}>Clear</TableCell>
					</TableRow>



					<TableRow>
					<TableCell 	style={borders.left}></TableCell>
					<TableCell 	style={borders.left}></TableCell>
					<TableCell	style={borders.left}></TableCell>
					<TableCell	style={borders.left}></TableCell>
					<TableCell	style={borders.left}></TableCell>
					<TableCell 	style={borders.left_right}></TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
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
	<div style={{marginTop:30}}>
		<ReportsHeader/>
		<Grid container style={{ marginBottom: "1em"}}>
		<Table >
		<TableBody style={borders.top}>
			<TableRow>
			<TableCell colSpan={7} style={borders.left_right}>
				<TableHeaderText label="Executive Summary"/>
			</TableCell>
			</TableRow>
			<TableRow>
			<TableCell style={borders.left}>S No</TableCell>
			<TableCell style={borders.left}>Check Name</TableCell>
			<TableCell style={borders.left}>Verified By/At</TableCell>
			<TableCell style={borders.left}>Check Status</TableCell>
			<TableCell style={borders.left}>Check Severity</TableCell>
			<TableCell style={borders.left}>Page</TableCell>
			<TableCell style={borders.left_right}>Annexure</TableCell>
			</TableRow>

			<TableRow>
			<TableCell style={borders.left}>{"1"}</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell colSpan={7} style={borders.left_right}></TableCell>
			</TableRow>

			
		</TableBody>
		</Table>
		
	</Grid>

</div>
	)
}



const ThirdPage =()=>{
	return(
	<div style={{marginTop:50}}>
		<ReportsHeader/>
		<SectionHeader label="Check 1"/>
		<SectionHeader label="Education Verification Written"/>
		
		<Grid container style={{ marginBottom: "1em"}}>
		<Table >
		<TableBody style={borders.top}>
			<TableRow>
			<TableCell style={borders.left}>
				<TableHeaderText label="Details of Education"/>
			</TableCell>
			<TableCell style={borders.left}>
				<TableHeaderText label="Antecedents Started"/>
			</TableCell>
			<TableCell style={borders.left_right}>
				<TableHeaderText label="Antecedents verified"/>
			</TableCell>

			</TableRow>

			<TableRow>
			<TableCell style={borders.left}>College/Institute/University/Location</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>


			<TableRow>
			<TableCell style={borders.left}>Roll No / Registration No/ Enrollment No.</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>


			<TableRow>
			<TableCell style={borders.left}>Course Name / Qualification</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell style={borders.left}>Year of Passing </TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell style={borders.left}>
				<TableHeaderText label="Details "/>
			</TableCell>
			<TableCell colSpan={2} style={borders.left_right}>
				<TableHeaderText label="Antecedents Verified "/>
			</TableCell>
			</TableRow>


			<TableRow>
			<TableCell style={borders.left}>Mode of verification </TableCell>
			<TableCell colSpan={2} style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>
			

			<TableRow>
			<TableCell style={borders.left}>Verifier's Comments </TableCell>
			<TableCell colSpan={2} style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell style={borders.left}>Final Disposition </TableCell>
			<TableCell colSpan={2} style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell style={borders.left}>Check Severity </TableCell>
			<TableCell colSpan={2} style={borders.left_right}>{"Clear"}</TableCell>
			</TableRow>
		</TableBody>
		</Table>

	</Grid>
	<SectionHeader label="End of Checks"/>
</div>
	)
}


const FourthPage =()=>{
	return(
	<div style={{}}>
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
