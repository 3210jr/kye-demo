import React from "react";
import { InputLabel, TextField, Typography } from "@material-ui/core";
import {connect} from "react-redux";

const InputField = ({label, value, id, type, className, onChange, errorObj, hasErrorById}) => (
    <>
        <TextField
            variant="outlined"
            label={label}
            value={value}
            type={type}
            onChange={onChange}
            id={id}
            className={className}/>
            {errorObj && <Typography style={{
                color: "#ff0000",
                fontSize: "12px",
                fontStyle: "italic"
            }}>
                {errorObj.message}
            </Typography>}
    </>
);
// NewOrder.propTypes = {
//     classes: PropTypes.object.isRequired
// };

const mapState = (state, props) => ({
    errorObj: state.inputValidation.find(obj => obj.id === props.id), ...props
});

const mapActions = ({ inputValidation: { hasErrorById } }) => ({
    pushFormError: hasErrorById
});

export default connect(mapState, mapActions)(InputField);

