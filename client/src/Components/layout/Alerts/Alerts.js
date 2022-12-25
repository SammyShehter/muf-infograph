import React from 'react';
import M from "materialize-css"

const Alerts = ({alerts}) => {
    return (
        alerts && alerts.length>0 ? alerts.map(alert=> {
            console.log(alert)
            M.toast({html: alert.msg})
        }) : null
    );
};

export default Alerts;
