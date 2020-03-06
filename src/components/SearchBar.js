import React, { useState } from 'react';

export default function SearchBar() {
  const [Term, setTerm] = useState('');

  function SearchProductTerm(event) {
    event.preventDefault();
  }
  function setOption() {
    localStorage.setItem('option', 'product')
  }
  return (
    <div className="BarSearch">
      <form onSubmit={SearchProductTerm}>
        <input value={Term} onChange={term => setTerm(event.target.value)} id="cep" className="inputSearch" placeholder="Busque seu produto..." type="text" />
        <a onClick={setOption} href={`/products/product/${Term}`}>
          <button onClick={setOption} type="button" className="btn"><img src="https://oticaisabeladias.com.br/Images/searchIcon.png" /></button>
        </a>
      </form>
    </div>)
}