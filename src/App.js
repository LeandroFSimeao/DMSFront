import React from 'react';
import ClienteList from './components/Cliente/ClienteList';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PedidoList from './components/Pedido/PedidoList';
import ItemPedidoList from './components/ItemPedido/ItemPedidoList';
import EntregaList from './components/Entrega/EntregaList';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='cliente' element={<ClienteList />} />
      <Route path='pedido' element={<PedidoList />} />
      <Route path='itemPedido' element={<ItemPedidoList />} />
      <Route path='entregas' element={<EntregaList />} />
    </Routes>
  );
};

export default App;
