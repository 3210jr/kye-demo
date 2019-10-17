// @ts-check


//codes in this file are to be moved to different files in later commits
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

// import Pdf from "react-to-pdf";


import Pdf from "react-to-pdf";

import * as logoImg from '../../assets/mwema_logo.png'
import './Reports.css';



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


const Logo=()=>(
	<div className="center">
		<div style={{ textAlign: "center" }}>
			<img alt="" style={{  }} src={logoImg} />
		</div>
	</div>
)
const ReportsHeader = ()=>{
	return(
		<div>
			<Grid container style={{ marginBottom: "1em",}}>
				<Table >
				<TableBody>
					<TableRow style={borders.top}>
					<TableCell style={borders.left}>
						<FieldsTitle label="Subject Name" />
					</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left_right} rowSpan={2}>
						<Logo/>
					</TableCell>
					</TableRow>
					<TableRow>
					<TableCell style={borders.left}>
						<FieldsTitle label="ARS Ref No" />
					</TableCell>
						<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					</TableRow>
				</TableBody>
				</Table>
			
			</Grid>
		</div>
	)
}

const FieldsTitle=({label})=>(
	<Typography variant="subtitle2">
		{label}
	</Typography>
)

const SectionHeader=({label})=>(
	<Typography variant="h5" align="center" style={headers.marginTopBottom}>{label}</Typography>

)
const TableHeaderText=({label})=>(
	<Typography variant="h6" align="center" >{label}</Typography>
)

const FirstPage =(props)=>{
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
					<TableCell style={borders.left}>
						<FieldsTitle label="ARS No" />
					</TableCell>
					<TableCell style={borders.left_right} colSpan={3}></TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>
						<FieldsTitle label="Class start date" />
					</TableCell>
					<TableCell style={borders.left}>{"Lorem Ipsum"}</TableCell>
					<TableCell style={borders.left}>
						<FieldsTitle label="Report Severity" />
					</TableCell>
					<TableCell style={borders.left_right}>{"Lorem Ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>
						<FieldsTitle label="Report Date" />
					</TableCell>
					<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
					<TableCell style={borders.left}>
						<FieldsTitle label="Report Status" />
					</TableCell>
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
					<TableCell style={borders.left}>
						<FieldsTitle label="Name of subject" />
					</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>
						<FieldsTitle label="Employment ID" />
					</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>
						<FieldsTitle label="Process Name" />
					</TableCell>
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
					<TableCell style={borders.left}>
						<FieldsTitle label="Name of subject" />
					</TableCell>
					<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
					</TableRow>

					<TableRow>
					<TableCell style={borders.left}>
						<FieldsTitle label="Process Name" />
					</TableCell>
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
					<TableCell style={borders.left_right}>
						<FieldsTitle label="All Check are clear" />
					</TableCell>
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
			<TableCell style={borders.left}>
				<FieldsTitle label="S No" />
			</TableCell>
			<TableCell style={borders.left}>
				<FieldsTitle label="Check Name" />
			</TableCell>
			<TableCell style={borders.left}>
				<FieldsTitle label="Verified By/At" />
			</TableCell>
			<TableCell style={borders.left}>
				<FieldsTitle label="Check Status" />
			</TableCell>
			<TableCell style={borders.left}>
				<FieldsTitle label="Check Severity" />
			</TableCell>
			<TableCell style={borders.left}>
				<FieldsTitle label="Page" />
			</TableCell>
			<TableCell style={borders.left_right}>
				<FieldsTitle label="Annexure" />
			</TableCell>
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
			<TableCell style={borders.left}>
				<FieldsTitle label="College/Institute/University/Location" />
			</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>


			<TableRow>
			<TableCell style={borders.left}>
				<FieldsTitle label="Roll No / Registration No/ Enrollment No." />
			</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>


			<TableRow>
			<TableCell style={borders.left}>
				<FieldsTitle label="Course Name / Qualification" />
			</TableCell>
			<TableCell style={borders.left}>{"Lorem ipsum"}</TableCell>
			<TableCell style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell style={borders.left}>
				<FieldsTitle label="Year of Passing" />
			 </TableCell>
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
			<TableCell style={borders.left}>
				<FieldsTitle label="Mode of verification " />
			</TableCell>
			<TableCell colSpan={2} style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>
			

			<TableRow>
			<TableCell style={borders.left}>
				<FieldsTitle label="Verifier's Comments" />
			</TableCell>
			<TableCell colSpan={2} style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell style={borders.left}>
				<FieldsTitle label="Final Disposition" />
			</TableCell>
			<TableCell colSpan={2} style={borders.left_right}>{"Lorem ipsum"}</TableCell>
			</TableRow>

			<TableRow>
			<TableCell style={borders.left}>
				<FieldsTitle label="Check Severity " />
			</TableCell>
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
		<SectionHeader label="Disclaimer & Limitations of Research"/>
		<Grid container style={{ marginBottom: "1em"}}>
			<Typography variant="subtitle1">
				{"Disclaimer message"}
			</Typography>
		</Grid>

</div>
	)
}





const ref = React.createRef();

const Reports = () => {
	return (
		<div className="report_print_form" 
			// ref={ref}
		>

		<Pdf targetRef={ref} filename="code-example.pdf">
			{({ toPdf }) => <button onClick={toPdf}>Test</button>}
		</Pdf>
		<div ref={ref} style={{width:794,padding:20}}>
			<FirstPage />
		</div>



			{/* <FirstPage /> */}

			{/* <SecondPage />  */}
			{/* <ThirdPage /> */}
			{/* <FourthPage />  */}
			
		</div>

		
	);
};



export default Reports;
