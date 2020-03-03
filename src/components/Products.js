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
  });

  const [IdFriend, setIdFriend] = useState("532");
  const [IdCategory, setIdCategory] = useState(0)
  const [Lat, setLat] = useState(-23.632919);
  const [Lng, setLng] = useState(-46.69945)
  const [SearchTerm, setSearchTerm] = useState("")
  const [FilterString, setFilterString] = useState('categoryId: 98, search: ""')

  const DateNow = new Date().toISOString();
  const Algorithm = "NEAREST";


  /*function FilterProduct() {
    setFilterString((IdCategory) != 0 ? `categoryId:${IdCategory}` : `search: "${SearchTerm}"`);
  }*/

  function FilterProduct() {
    let { product } = useParams();
    let { category } = useParams();
    let { valor } = useParams();

    setFilterString((IdCategory) != 0 && category != undefined ? `categoryId:${IdCategory}` : (product) != undefined ? `search: "${valor}"` : `search: ""`)

  }

  function SearchTerms(TermInput) {
    let { valor } = useParams();
    (valor) != "" ? setSearchTerm(TermInput) : '';
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

  const pocFriend = gql`{
    pocSearch(
     now: "${DateNow}", 
     algorithm: "${Algorithm}", 
     lat: "${Lat}", 
     long: "${Lng}") {
      __typename
      id
      status
      tradingName
      officialName
      deliveryTypes {
        __typename
        pocDeliveryTypeId
        deliveryTypeId
        price
        title
        subtitle
        active
      }
      paymentMethods {
        __typename
        pocPaymentMethodId
        paymentMethodId
        active
        title
        subtitle
      }
      pocWorkDay {
        __typename
        weekDay
        active
        workingInterval {
          __typename
          openingTime
          closingTime
        }
      }
      address {
        __typename
        address1
        address2
        number
        city
        province
        zip
        coordinates
      }
      phone {
        __typename
        phoneNumber
      }
    }
  }`

  const pocProduct = gql`{
      poc(id: "${IdFriend}") {
        id
        products(${FilterString}) {
          id
          title
          rgb
          images {
            url
          }
          productVariants {
            availableDate
            productVariantId
            price
            inventoryItemId
            shortDescription
            title
            published
            volume
            volumeUnit
            description
            subtitle
            components {
              id
              productVariantId
              productVariant {
                id
                title
                description
                shortDescription
              }
            }
          }
        }
      }
    }`

  const pocCategory = gql`
    query allCategoriesSearch{
      allCategory{
        title
        id
      }
    }`;

  function LoadingError(loading, error) {
    if (loading) return <p className="loader">Carregando...</p>;
    if (error) return <p>Error :(</p>;
  }

  function SearchCategory() {
    let { valor } = useParams();
    setIdCategory(valor);
  }

  function SearchFriends() {
    const { loading, error, data } = useQuery(pocFriend);
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
      {data.allCategory.map(({ title, id }) => (
        <a key={id} onClick={setOption} href={`/products/category/${id}`}>
          <li className="btn">
            {id}: {title}
          </li>
        </a>
      ))
      }
    </ul >
  }

  function RenderProduct() {
    SearchFriends();
    SearchCategory();
    SearchTerms();
    FilterProduct();

    const { loading, error, data } = useQuery(pocProduct);
    if (loading) return <p className="loader">Carregando...</p>;
    if (error) return <p>Error :(</p>;


    if (data.poc.products.length == 0) {
      return <h1 className="productsNotFound">Nenhum produto encontrado!</h1>;
    }
    // /cart/add/${id}
    // /cart/remove/${id}
    return <main className="cards">
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
        </article>

      ))
      }
    </main >
  }

  return (
    <>
      <Header Cart={Cart} setCart={setCart} />
      <ApolloProvider client={client}>
        <div>
          <RenderCategory />
          <RenderProduct />
        </div>
      </ApolloProvider>
      <Footer />
    </>
  );
}