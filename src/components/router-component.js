import { Route, Switch } from 'react-router-dom'
import React, { Component } from "react";
import ListClientes from "../components/clientes/lista-clientes-component";
import Login from "../components/users/login-component";
import Register from "../components/users/register-component";
import Profile from "../components/users/profile-component";
import AddCliente from "../components/clientes/add-cliente-component";
import EditCliente from "../components/clientes/edit-cliente-component";


const AppRouter = () => {


    return (
        <div style={style}>
            <Switch>
                <Route exact path={["/", "/home"]} component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/clientes" component={ListClientes} />
                <Route path="/add-cliente" component={AddCliente} />
                <Route path="/edit-cliente" component={EditCliente} />

            </Switch>
        </div>
    )


}

const style = {
    marginTop: '20px'
}

export default AppRouter;