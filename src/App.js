import React from 'react';
import ClienteList from './components/Cliente/ClienteList';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PedidoList from './components/Pedido/PedidoList';

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
