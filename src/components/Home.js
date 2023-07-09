import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/cliente" className="nav-link">
            Clientes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/pedido" className="nav-link">
            Pedidos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/itemPedido" className="nav-link">
            Itens dos pedidos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entregas" className="nav-link">
            Entregas
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Home;