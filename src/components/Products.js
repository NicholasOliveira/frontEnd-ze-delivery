import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import ApolloClient from 'apollo-boost';
import axios from 'axios';
import './styles.css';
import Header from "./Header";
import Footer from "./Footer";
import SweetCart from './SweetCart';
import SearchBar from './SearchBar';
import Cards from './Cards';
import { pocCategory, pocFriend, pocProduct } from '../Schems/pocSearch';

export default function Products({ history }) {

  const [Cart, setCart] = useState((localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []);

  function AddCart(id, title, price, img, qtd) {

    var foundIndex = null;
    var i = 0;

    while (Cart.length > 0) {
      if (Cart[i].id == id) {
        foundIndex = i;
        break;
      }
      i += 1
      if (i >= Cart.length) {
        break;
      }
    }

    if (foundIndex != null) {
      const CartNew = [...Cart];
      CartNew[foundIndex] = { ...CartNew[foundIndex], qtd: CartNew[foundIndex].qtd + 1 };
      setCart(CartNew);
    } else {
      setCart([...Cart, { id, title, price, img, qtd }])
    }
  }

  localStorage.setItem('cart', JSON.stringify(Cart))

  const client = new ApolloClient({
    uri: 'https://api.code-challenge.ze.delivery/public/graphql',
  })

  const [IdFriend, setIdFriend] = useState("532");
  const [IdCategory, setIdCategory] = useState()
  const [Lat, setLat] = useState(-23.632919);
  const [Lng, setLng] = useState(-46.69945)
  const [SearchTerm, setSearchTerm] = useState("")
  const [FilterString, setFilterString] = useState('categoryId: 98, search: ""')

  function FilterProduct() {
    let { product, category, valor } = useParams();

    (product != undefined && valor != undefined || category != undefined && valor == undefined || valor == 0 ? setIdCategory(null) : '')

    category != 'product' && IdCategory != null ? setIdCategory(valor) : product != undefined ? setSearchTerm(valor) : ""

    console.log(IdCategory, valor, product, category)
  }


  function SearchLocation(addreas) {
    let key = 'AIzaSyDtExJ9D8rvkn6gzhwsNuTB2TDOY07-6WA';
    let url_google = `https://maps.googleapis.com/maps/api/geocode/json?address=${addreas}&key=${key}`;
    axios.get(url_google)
      .then(results => {
        setLat(results.data.results[0].geometry.location.lat)
        setLng(results.data.results[0].geometry.location.lng)
      }).catch(error => {
        return localStorage.setItem('Error', true), history.push('/');
      });
  }

  SearchLocation(localStorage.getItem('Endereco'));

  function SearchCategory() {
    let { valor } = useParams();
    setIdCategory(valor);
  }

  function SearchFriends() {
    const { loading, error, data } = useQuery(pocFriend, {
      variables: { Lat, Lng },
    });
    if (loading) return <p className="loader">Carregando...</p>;
    if (error) return <p>Error :(</p>;

    if (data.pocSearch.length == 0) {
      return localStorage.setItem('Error2', true), history.push('/');
    } else {
      setIdFriend(data.pocSearch[0].id);
    }
  }

  function setOption() {
    localStorage.setItem('option', 'category')
  }

  function RenderCategory() {
    const { loading, error, data } = useQuery(pocCategory);
    if (loading) return <p className="loader">Carregando...</p>;
    if (error) return <p>Error :(</p>;

    return <ul className="Category">
      <a onClick={setOption} href='/products/category/0'>
        <li className="btn">
          Ver todos
          </li>
      </a>
      {data.allCategory.map(({ title, id }) => (
        <a key={id} onClick={setOption} href={`/products/category/${id}`}>
          <li className="btn">
            {title}
          </li>
        </a>
      ))
      }
    </ul >
  }

  function RenderProduct() {
    SearchFriends();
    SearchCategory();
    FilterProduct();

    const { loading, error, data } = useQuery(pocProduct, {
      variables: {
        "id": IdFriend,
        "Search": SearchTerm,
        "categoryId": IdCategory
      }
    });

    if (loading) return <p className="loader">Carregando...</p>;
    if (error) return <p>Error :(</p>;


    if (data.poc.products.length == 0) {
      return <h1 className="productsNotFound">Nenhum produto encontrado!</h1>;
    }

    return <Cards data={data} AddCart={AddCart} />
  }
  return (
    <>
      <section className="MenuDefault">
        <Header />
        <SearchBar />
        <SweetCart Cart={Cart} setCart={setCart} />
      </section>

      <ApolloProvider client={client}>
        <RenderCategory />
        <RenderProduct />
      </ApolloProvider>
      <Footer />
    </>
  );
}