import React from "react";
import { MenuItem} from "@material-ui/core"
import _ from "lodash";
import * as logoImg from "../../assets/mwema_logo.png";

export const renderYear = () => (
    <div>
        {_.times(
            100,
            n => new Date().getFullYear() - n
        ).map(year => (
            <MenuItem
                value={year}
                key={`reference__${year}`}
            >
                {year}
            </MenuItem>
        ))}
    </div>
)

export const Logo = () => (
    <div className="center">
        <div style={{ textAlign: "center" }}>
            <img alt="" style={{}} src={logoImg} />
        </div>
    </div>
);

