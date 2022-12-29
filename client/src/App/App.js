import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Main from "../Pages/Main"
import Admin from "../Pages/Admin"
import "../Styles/main.scss"

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Main} exact />
                <Route path="/admin" exact>
                    <Admin />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
