import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import ApolloClient from 'apollo-boost';
import axios from 'axios';
import './styles.css';

export default function Products({ history }) {
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

  function FilterProduct() {
    setFilterString((IdCategory) != 0 ? `categoryId:${IdCategory}` : `search: "${SearchTerm}"`);
  }

  function SearchTerms(TermInput) {
    (TermInput) != "" ? setSearchTerm(TermInput) : '';
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
    let { category } = useParams();
    setIdCategory(category);
  }

  function SearchFriends() {
    const { loading, error, data } = useQuery(pocFriend);
    if (loading) return <p className="loader">Carregando...</p>;
    if (error) return <p>Error :(</p>;
    setIdFriend(data.pocSearch[0].id);
  }

  function RenderCategory() {
    const { loading, error, data } = useQuery(pocCategory);
    if (loading) return <p className="loader">Carregando...</p>;
    if (error) return <p>Error :(</p>;



    return <ul className="Category">
      {data.allCategory.map(({ title, id }) => (
        <a key={id} href={`/products/${id}`} >
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
    SearchTerms("");
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
          <img src={`${images[0].url}`} alt="Imagem do produto" />
          <div className="text">

            <h3>{id}: {title}</h3>
            <p>R$: {productVariants[0].price}</p>
            <p>
              Invetário: {productVariants[0].inventoryItemId}
              <br />
              Volume: {productVariants[0].volume}
            </p>
            <button>Adicionar / Remover</button>
          </div>
        </article>

      ))
      }
    </main >
  }

  return (
    <ApolloProvider client={client}>
      <div>
        <RenderCategory />
        <RenderProduct />
      </div>
    </ApolloProvider>
  );
}