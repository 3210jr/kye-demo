import React, { Fragment} from "react";
import { TextField} from "@material-ui/core";
import {connect} from "react-redux";

const InputField = ({label, value, id, type, className, onChange, inputValidation}) => (
    <Fragment>
        <TextField
            label={label}
            value={value}
            type={type}
            onChange={onChange}
            id={id}
            className={className}/>
    </Fragment>
);



// NewOrder.propTypes = {
//     classes: PropTypes.object.isRequired
// };

const mapState = (state, props) => ({
    inputValidation: state.inputValidation, ...props
});

export default connect(mapState)(InputField);

