import React from 'react';
import {connect} from "react-redux";

import Alerts from "./Alerts";

const mapStateToProps = state => {
    return {
        alerts: state.alert.alerts,
    };
};

const AlertsContainer = connect(mapStateToProps, null)(Alerts)

export default AlertsContainer;
