import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link, useParams } from 'react-router-dom';
import Home from './components/Home'
import Products from './components/Products'

export default function Routes() {
  //<Products Addreas={Addreas} />
  /*
  <ul className="MenuDefault">
          <li>
            <Link to="/">Inicio </Link>
          </li>
          <li>
            <Link to="/products">Produtos</Link>
          </li>
        </ul>
        */
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}>
          </Route>
          <Route path="/products/:category" component={Products}>
          </Route>

        </Switch>
      </ BrowserRouter>
    </>
  );
}
