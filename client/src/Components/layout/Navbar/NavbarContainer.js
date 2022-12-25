import React from 'react';
import {connect} from "react-redux";

import {logout} from "../../../redux/actions/auth"

import Navbar from "./Navbar";

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default LoginContainer;
