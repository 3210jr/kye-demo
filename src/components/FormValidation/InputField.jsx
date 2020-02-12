import React, {Component} from "react";
import {TextField, InputLabel} from "@material-ui/core"


export default class InputField extends Component{
    constructor(props) {
        super(props)
        this.state = {
            required: false,
            type: "text",
            id: ""
        }
    }
    componentDidMount = () => {}
    handleChange = (event) => {}

    render() {
        return (
            <div>
                <TextField
                    label={this.props.label}
                    value={this.props.value}
                    type={this.props.type}
                />
                {/* Show errors */}
            </div>
        )
    }
}
