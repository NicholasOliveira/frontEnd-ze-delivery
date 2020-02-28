import React, { useState, useEffect } from 'react';

function client() {
  cliente = new ApolloClient({
    uri: 'https://api.code-challenge.ze.delivery/public/graphql',
  });
}

function key() {
  const key = 'AIzaSyDtExJ9D8rvkn6gzhwsNuTB2TDOY07-6WA';
}

export { client, key }