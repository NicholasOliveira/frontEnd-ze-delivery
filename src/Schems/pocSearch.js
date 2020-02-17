import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { SearchLocation } from "../components/SearchLocation";

console.log(SearchLocation(localStorage.getItem('Endereco')))

const DateNow = new Date().toISOString();
const Algorithm = "NEAREST";

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

export default pocFriend;