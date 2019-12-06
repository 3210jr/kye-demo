// @ts-check
import React, { Component, useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { storage } from "firebase";
import { upperFirst, clone, map, omit } from "lodash";
import uuidV1 from "uuid/v1";
import {
	Paper,
	Typography,
	Button,
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Input
} from "@material-ui/core";
import {
	persistOrderResults,
	uploadFile,
	friendlyFormatDate
} from "../../../../utils";

const socialNetworks = ["facebook", "instagram", "twitter"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

function SocialMediaSearch({ order, type, toggleSnackBar }) {
	const [state, setstate] = useState({
		networks: [],
		comments: "",
		loading: false
	});

	useEffect(() => {
		const initialState = { ...state, ...order[type] };
		setstate(initialState);
	}, []);

	function updateComments(evt) {
		setstate({ ...state, comments: evt.target.value });
	}

	function saveSocialMediaSearch() {
		const { loading, comments, networks } = state;
		if (loading) return;

		if (networks.length === 0) {
			return alert(
				"Please choose at least one social network that was searched"
			);
		}

		setstate({ ...state, loading: true });

		persistOrderResults(order.id, type, omit(state, ["loading"]))
			.then(res => {
				toggleSnackBar({
					message: "Social Media Search Report updated successfully!"
				});
			})
			.catch(error => {
				toggleSnackBar({
					message: "Error. There was an error updating the social media report."
				});
				console.log("Error: ", error);
			})
			.finally(() => {
				setstate({ ...state, loading: false });
			});
	}

	const handleChange = event => {
		const { value } = event.target;
		setstate({ ...state, networks: value });
	};

	return (
		<Paper style={{ padding: "1em", marginTop: 15 }}>
			<Typography variant="h6">Social Media Search</Typography>

			<Grid container style={{ marginTop: 5 }}>
				<Grid item xs md={6} lg={4} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel variant="outlined" id="demo-mutiple-name-label">
							Networks searched
						</InputLabel>
						<Select
							labelId="demo-mutiple-name-label"
							id="demo-mutiple-name"
							variant="outlined"
							multiple
							fullWidth
							value={state.networks}
							onChange={handleChange}
							input={<Input fullWidth />}
							MenuProps={MenuProps}
						>
							{socialNetworks.map(name => (
								<MenuItem
									key={name}
									value={name}
									// style={getStyles(name, personName, theme)}
								>
									{upperFirst(name)}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>

			<Grid container style={{ marginTop: 5 }}>
				<Grid item xs={12} sm={12} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<TextField
						fullWidth
						label="Comments & Findings"
						value={state.comments}
						onChange={updateComments}
						id="outlined-dense-multiline"
						margin="dense"
						variant="outlined"
						multiline
						rowsMax="4"
						rows="3"
					/>
				</Grid>
			</Grid>

			<Grid container style={{ marginTop: 5 }}>
				<Grid item xs={2} sm={2} style={{ paddingLeft: 3, paddingRight: 3 }}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={saveSocialMediaSearch}
					>
						{state.loading ? "Loading" : "Save"}
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}

const mapState = state => ({
	snackbar: state.snackbar
});

const mapDispatch = ({ snackbar: { asyncToggleSnackBar } }) => ({
	toggleSnackBar: payload => asyncToggleSnackBar(payload)
});

export default connect(mapState, mapDispatch)(SocialMediaSearch);
