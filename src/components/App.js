import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Routes from "../routes";
import Header from "./Header";
import Footer from "./Footer";
import Options, { Option } from "../config";
import './styles.css';


export default function Index() {

  return (
    <main className="Container">
      <Routes CategoryOrProduct={Option} />
    </main>
  );
}