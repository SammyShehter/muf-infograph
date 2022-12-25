import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "../Components/layout/Navbar";
import Alerts from "../Components/layout/Alerts";
import Main from "../Pages/Main";
import ProtectedRoute from "../Pages/ProtectedRoute";
import Admin from "../Pages/Admin";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PropTypes from 'prop-types';
import setAuthToken from "../utils/setAuthToken";

import '../Styles/main.scss'

if (localStorage.token){
    setAuthToken(localStorage.token)
}

const App = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                {/* <Navbar/> */}
                <Alerts/>
                <Switch>
                    <Route path='/' component={Main} exact/>
                    <Route path='/register' component={Register} exact/>
                    <Route path='/login' component={Login} exact/>
                    {/* <ProtectedRoute exact path='/admin' component={Admin}/> */}
                    
                    <Route path='/admin' exact>
                       <Admin />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
};

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App;
