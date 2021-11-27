import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ClientsPages } from './directorPages/ClientsPages'
import { CostsPages } from './directorPages/CostsPages'
import { AuthPage } from './directorPages/DirectorAuth'
import { Sayt } from '../Sayt/sayt'

export const DirectorRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/director" exact >
                    <ClientsPages />
                </Route>
                <Route path="/director/costs" >
                    <CostsPages />
                </Route>
                <Route path="/sayt" >
                    <Sayt />
                </Route>
                <Redirect to="/director" />
            </Switch>
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
