import React from 'react';
import './styles.css';

export default function Header() {

  return (
    <header>
      <div className="HeaderLogo">
        <img className="logo" src="https://www.stickpng.com/assets/images/584830e8cef1014c0b5e4aa0.png" />
        <ul>
          <li className="btn margin-right-0"><a href="/">Home</a></li>
        </ul>
      </div>
    </header>
  )
}
