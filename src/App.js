import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header'; 
import Libros from './components/Libros';
import NuevoLibro from './components/NuevoLibro';
import EditarLibro from './components/EditarLibro';


function App() {
    return (
        <Router>
            <Provider store={store}>
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Libros}/>
                        <Route exact path="/libros/nuevo" component={NuevoLibro}/>
                        <Route exact path="/libros/editar/:id" component={EditarLibro}/>
                    </Switch>
                </div>
            </Provider>
        </Router>
    );
}

export default App;
