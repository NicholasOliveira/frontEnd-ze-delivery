import React, { useState, useEffect } from 'react';

export function client() {
  cliente = new ApolloClient({
    uri: 'https://api.code-challenge.ze.delivery/public/graphql',
  });
}

export function key() {
  const key = 'AIzaSyDtExJ9D8rvkn6gzhwsNuTB2TDOY07-6WA';
}

export function Options() {
  return [Option, setOption] = useState(localStorage.getItem('option'));
}