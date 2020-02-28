import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Routes from "../routes";
import './styles.css';


export default function Index() {
  const [Option, setOption] = useState(localStorage.getItem('option'));
  return (
    <main className="Container">
      <Routes CategoryOrProduct={Option} />
    </main>
  );
}