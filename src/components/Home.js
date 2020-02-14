import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

export default function Home({ history }) {
  const [End, setEnd] = useState('');

  function ObError() {
    return <div id="ErrorClass">
      <div className="spacer">&nbsp;</div>
      <div className="invalid_end">Endereço não encontrado (: </div>
    </div>
  }
  function ObError2() {
    return <div id="ErrorClass">
      <div className="spacer">&nbsp;</div>
      <div className="invalid_end">Desculpe, não atendemos este endereço (: </div>
    </div>
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('Endereco', End)
    history.push('/products/0')
  }

  return (
    <div className="ContainerHome">
      <form onSubmit={handleSubmit}>
        <label htmlFor="cep">Digite seu Endereço: </label>
        <input id="cep" placeholder="Digite seu endereço" onChange={e => setEnd(e.target.value)} value={End} type="text" />
        <button type="submit" className="btn">
          Encontrar produtos
        </button>
        {localStorage.getItem('Error') ? (localStorage.removeItem('Error'), <ObError />) : ''}
        {localStorage.getItem('Error2') ? (localStorage.removeItem('Error2'), <ObError2 />) : ''}
      </form>
    </div>
  )

}