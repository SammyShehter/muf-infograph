import React from 'react';
import {connect} from "react-redux";

import {asyncLoadUser} from "../../redux/actions/auth"

import Main from "./Main";

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => dispatch(asyncLoadUser()),
    };
};

const MainPageContainer = connect(null, mapDispatchToProps)(Main)

export default MainPageContainer;
