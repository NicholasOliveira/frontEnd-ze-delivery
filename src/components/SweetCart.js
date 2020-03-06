import React from 'react';

export default function SweetCart({ Cart, setCart }) {
  (localStorage.getItem('cart')) ? Cart = JSON.parse(localStorage.getItem('cart')) : '';
  function DeleteItem(id) {
    var foundIndex = null;
    var i = 0;

    while (Cart.length > 0) {
      if (Cart[i].id == id) {
        foundIndex = i;
        let CartNew = [...Cart];
        CartNew.splice(foundIndex, 1);
        setCart(CartNew);
        break;
      }
      i += 1
    }
  }
  return (
    <ul className="cart">

      <li className="btn">
        Carrinho ({(Cart) ? Cart.length : '0'}) <img className="img_cart" src="https://reddingdesigns.com/images/icons/icon-ecommerce-grey.png"></img>
      </li>

      {
        ((Cart) && (Cart.length > 0)) ?
          <div className="block-cart">
            {Cart.map(product => (
              <div key={product.id}>
                <p><img src={product.img} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/50x50" }} width="50"></img></p>
                <p>{product.title}</p>
                <p>Qtd: {(product.qtd) ? product.qtd : 1}</p>
                <p>R$: {product.price * product.qtd}</p>
                <p><button className="btnDeleteProd" onClick={() => (DeleteItem(product.id))}>Excluir</button></p>
              </div>
            ))}
          </div> : ''}
    </ul >)
}