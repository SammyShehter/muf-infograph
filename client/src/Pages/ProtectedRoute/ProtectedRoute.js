import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({component: Component, isAuthentecated, loading, ...rest}) => {
    return (
        <Route {...rest} render={(props)=> (
            isAuthentecated && !loading ? <Component {...props}/> : <Redirect to='/login'/>
        )} />
        );
};

export default ProtectedRoute;
