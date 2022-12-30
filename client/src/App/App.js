import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Main from "../Pages/Main"
import Admin from "../Pages/Admin"
import "../Styles/main.scss"

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/room/:id" component={Main} exact />
                <Route path="/room/admin/:id" component={Admin} exact />
            </Switch>
        </Router>
    )
}

export default App
