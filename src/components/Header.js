import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './styles.css';

export default function Header({ Cart }) {

  (localStorage.getItem('cart')) ? Cart = JSON.parse(localStorage.getItem('cart')) : '';

  const [Term, setTerm] = useState('');

  function SearchProductTerm(event) {
    event.preventDefault();
  }
  function setOption() {
    localStorage.setItem('option', 'product')
  }

  return (
    <header className="MenuDefault" >
      <div className="HeaderLogo">
        <img className="logo" src="https://www.stickpng.com/assets/images/584830e8cef1014c0b5e4aa0.png" />
        <ul>
          <li className="btn"><a href="/">Home</a></li>
        </ul>
      </div>

      <div className="BarSearch">
        <form onSubmit={SearchProductTerm}>
          <input value={Term} onChange={term => setTerm(event.target.value)} id="cep" className="inputSearch" placeholder="Busque seu produto..." type="text" />
          <Link to={`/products/product/${Term}`}>
            <button onClick={setOption} type="submit" className="btn"><img src="https://oticaisabeladias.com.br/Images/searchIcon.png" /></button>
          </Link>
        </form>
      </div>

      <ul className="cart">
        <li className="btn">
          Carrinho ({(Cart) ? Cart.length : '0'}) <img className="img_cart" src="https://reddingdesigns.com/images/icons/icon-ecommerce-grey.png"></img>
        </li>

        {
          ((Cart) && (Cart.length > 0)) ?
            <div className="block-cart">
              {Cart.map(product => (
                <div key={product.id}>
                  <p><img src={product.img} width="50"></img></p>
                  <p>{product.title}, R$: {product.price}</p>
                  <p>Qtd: {(product.qtd) ? product.qtd : 1}</p>
                  <p><a href="#">Excluir</a></p>
                </div>
              ))}
            </div> : ''}


      </ul >

    </header >
  )
}
