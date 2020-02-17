import React, { useState } from 'react';
const [Lat, setLat] = useState(-23.632919);
const [Lng, setLng] = useState(-46.69945)

function SearchLocation(addreas) {
  let key = 'AIzaSyDtExJ9D8rvkn6gzhwsNuTB2TDOY07-6WA';
  let url_google = `https://maps.googleapis.com/maps/api/geocode/json?address=${addreas}&key=${key}`;
  axios.get(url_google)
    .then(results => {
      return results.data.results[0].geometry.location.lat, results.data.results[0].geometry.location.lng
    }).catch(error => {
      return localStorage.setItem('Error', true), history.push('/');
    });
}

export default SearchLocation();