import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link, useParams } from 'react-router-dom';
import Home from './components/Home'
import Products from './components/Products'
import './components/styles.css';

export default function Routes({ CategoryOrProduct }) {
  return (
    <section className="General">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}>
          </Route>
          <Route path={`/products/:${CategoryOrProduct}/:valor`} component={Products}>
          </Route>
        </Switch>
      </ BrowserRouter>
    </section>
  );
}
