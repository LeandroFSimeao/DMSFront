import React from 'react';
import { Link } from 'react-router-dom';

const Home = () =>{
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/cliente" className="nav-link">
            Clientes
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/produtos" className="nav-link">
            Pedidos
          </Link>
        </li> */}
        {/* Adicione links para outras entidades aqui */}
      </ul>
    </nav>
  );
}

export default Home;