import React from 'react';
import ClienteList from './components/Cliente/ClienteList';
import { Col, Container, Row } from 'reactstrap';
import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='cliente' element={<ClienteList />} />
      <Route path='pedido' element={<PedidoList />} />
    </Routes>
  );
};

export default App;
