import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Routes from "../routes";
import './styles.css';

export default function Index() {

  return (
    <main className="Container">
      <header className="MenuDefault">

        <div className="HeaderLogo">
          <img className="logo" src="https://www.stickpng.com/assets/images/584830e8cef1014c0b5e4aa0.png" />
          <ul>
            <li className="btn"><a href="/">Home</a></li>
          </ul>
        </div>

        <div className="BarSearch">
          <form>
            <input readOnly id="cep" className="inputSearch" placeholder="Busque seu produto..." type="text" />
            <button type="submit" className="btn"><img src="https://oticaisabeladias.com.br/Images/searchIcon.png" /></button>
          </form>
        </div>

        <ul className="cart">
          <li className="btn">
            Carrinho (0) <img className="img_cart" src="https://reddingdesigns.com/images/icons/icon-ecommerce-grey.png"></img>
          </li>
        </ul>

      </header>

      <section className="General">
        <Routes />
      </section>

      <footer className="MenuDefault">

        <div className="HeaderLogo">
          <ul>
            <li className="btn"><a href="/">Link info 1</a></li>
            <li className="btn"><a href="/">Link info 2</a></li>
            <li className="btn"><a href="/">Link info 3</a></li>
            <li className="btn"><a href="/">Link info 4</a></li>
            <li className="btn"><a href="/">Link info 5</a></li>
          </ul>
        </div>

      </footer>

    </main>
  );
}