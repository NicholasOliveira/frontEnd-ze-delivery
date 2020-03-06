import React from 'react';
import { gql } from "apollo-boost";

const DateNow = new Date().toISOString();
const Algorithm = "NEAREST";

const pocCategory = gql`
    query allCategoriesSearch{
      allCategory{
        title
        id
      }
    }`;

const pocFriend = gql`
      query PocSearch($Lng: String, $Lat: String)
      {pocSearch(
           now: "${DateNow}", 
           algorithm: "${Algorithm}", 
           lat: "$Lat", 
           long: "$Lng") {
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


const pocProduct = gql`
  query poc($id: ID!, $categoryId: Int, $Search: String){
    poc(id: $id) {
        id
        products(categoryId: $categoryId, search: $Search) {
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

export { pocCategory, pocFriend, pocProduct };