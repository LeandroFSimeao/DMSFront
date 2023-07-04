import React from 'react';
import { Button } from 'reactstrap';

const ClienteItem = ({ cliente, onDelete, onPatch, onEdit }) => {

const handleSetClienteSelecionado = () => {
  onEdit(cliente);
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
              <button type="button" onClick={handleSetClienteSelecionado} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#clienteModal">
                Editar
              </button>
            </div>
          </td>
          <td>
            <div style={{ width: "110px" }}>
              <Button color="danger" onClick={handleDelete}> Remover</Button>
              {' '}
            </div>
          </td>
        </>
      </tr>
    </>
  );
};

export default ClienteItem;
