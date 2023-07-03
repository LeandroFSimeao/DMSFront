import React, { useState } from 'react';
import { Button } from 'reactstrap';
import ClienteForm from './ClienteForm';

const ClienteItem = ({ cliente, onDelete, onPatch, onEdit }) => {

  const handleSaveEdit = clienteEditado => {
    onEdit(clienteEditado);
  }

  const handleDelete = () => {
    onDelete(cliente.idCliente);
  };

  const handleGeocodifica = () => {
    onPatch(cliente.idCliente);
  };

  return (
    <>
        <tr key={cliente.IdCliente}>
          <><th scope="row">{cliente.idCliente}</th>
          <td>{cliente.nome}</td>
          <td>{cliente.cnpj}</td>
          <td>{cliente.logradouro}</td>
          <td>{cliente.numero}</td>
          <td>{cliente.latitude}</td>
          <td>{cliente.longitude}</td>
          <td>
            <div style={{ width: "110px" }}>
              {' '}
              <Button color="primary" onClick={handleGeocodifica}>Geocodificar</Button>
            </div>
          </td><td>
              <div style={{ width: "110px" }}>
                {' '}
                <ClienteForm clienteInicial={cliente} onEditCliente={handleSaveEdit} />
              </div>
            </td>
            <td>
              <div style={{ width: "110px" }}>
                <Button color="danger" outline onClick={handleDelete}> Remover</Button>
                {' '}
              </div>
            </td>
            </>
            </tr>
    </>
  );
};

export default ClienteItem;
