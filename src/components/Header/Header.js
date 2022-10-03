import React from 'react';
import logo from '../../img/logo_192.jpg';
import './header.css';

export function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" width="100px" />
      <h1 className="title">MEET-APP</h1>
    </div>
  );
}
