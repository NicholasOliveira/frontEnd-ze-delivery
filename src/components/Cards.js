import React, { useState } from 'react';

export default function Cards({ data, AddCart }) {
  return (
    <main className="cards">
      {data.poc.products.map(({ title, id, productVariants, images }) => (
        <article key={id} className="card" >
          <img src={`${images[0].url}`} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x500" }} />
          <div className="text">

            <h3>{id}: {title}</h3>
            <p>R$: {productVariants[0].price}</p>
            <p>
              Invetário: {productVariants[0].inventoryItemId}
              <br />
              Volume: {productVariants[0].volume}
            </p>
            <button onClick={() => {
              AddCart(id, title, productVariants[0].price, images[0].url, 1)
            }}>Adicionar</button>
          </div>
        </article>))}
    </main >)
}