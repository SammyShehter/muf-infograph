import React from 'react';
import {connect} from "react-redux";

import {asyncRegisterUser} from "../../redux/actions/auth"
import {setAlert} from "../../redux/actions/alert"

import Register from "./Register";

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: (username, email, password) => dispatch(asyncRegisterUser(username, email, password)),
        setAlert: (msg) => dispatch(setAlert(msg)),
    };
};

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register)

export default RegisterContainer;
