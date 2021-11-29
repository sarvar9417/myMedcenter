import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ClientsPages } from './directorPages/ClientsPages'
import { AuthPage } from './directorPages/DirectorAuth'
import { Sayt } from '../Sayt/sayt'
import { Home } from '../Director/directorPages/Home'
import { AddDoctor } from './directorPages/AddDoctor'

export const DirectorRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <div style={{ marginTop: "57px" }}>
                <Switch>
                    <Route path="/director" exact >
                        <Home />
                    </Route>
                    <Route path="/director/adddoctor" exact >
                        <AddDoctor/>
                    </Route>
                    <Route path="/sayt" >
                        <Sayt />
                    </Route>
                    <Redirect to="/director" />
                </Switch>
            </div>
        )
    }
    return (
        <Switch>
            <Route path="/director"  >
                <AuthPage />
            </Route>
            <Redirect to="/director" />
        </Switch>
    )
}
