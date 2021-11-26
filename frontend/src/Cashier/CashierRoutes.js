import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AuthPage } from './cashierPages/CashierAuth'
import { CreateCheck } from './cashierPages/CreateCheck'
import { Home } from './cashierPages/Home'

export const CashierRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <div style={{ marginTop: "90px" }} >
                <Switch >
                    <Route path="/cashier" exact >
                        <Home />
                    </Route>
                    <Route path="/cashier/pay/:id" >
                        <CreateCheck />
                    </Route>
                    
                </Switch>
            </div>
        )
    }
    return (
        <Switch>
            <Route path="/cashier" >
                <AuthPage />
            </Route>
            <Redirect to="/cashier" />
        </Switch>
    )
}
