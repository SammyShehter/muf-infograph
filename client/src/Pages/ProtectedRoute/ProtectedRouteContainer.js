import React from 'react';
import {connect} from "react-redux";

import ProtectedRoute from "./ProtectedRoute";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading,
    };
};

const ProtectedRouteContainer = connect(mapStateToProps, null)(ProtectedRoute)

export default ProtectedRouteContainer;
