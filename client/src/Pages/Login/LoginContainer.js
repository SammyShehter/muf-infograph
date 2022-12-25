import React from 'react';
import {connect} from "react-redux";

import {login} from "../../redux/actions/auth"
import {setAlert} from "../../redux/actions/alert";

import Login from "./Login";

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username,password) => dispatch(login(username,password)),
        setAlert: (msg) => dispatch(setAlert(msg)),
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer;
