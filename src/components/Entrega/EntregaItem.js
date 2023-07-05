import React from 'react';
import { Button } from 'reactstrap';

const EntregaItem = ({ entrega, onDelete, onPatch, onEdit }) => {

  const handleSetEntregaSelecionado = () => {
    onEdit(entrega);
  }

  const handleDelete = () => {
    onDelete(entrega.idEntrega);
  };

  return (
    <>
      <tr key={entrega.IdEntrega}>
        <><th scope="row">{entrega.idEntrega}</th>
          <td>{entrega.idCliente}</td>
          <td>{entrega.idEntrega}</td>
          <td>{entrega.nf}</td>
          <td>{entrega.entrega_ou_servico}</td>
          <td>{entrega.status}</td>
          <td>{entrega.valor}</td>
          <td>{entrega.peso}</td>
          <td>{entrega.dataEntrega.substring(0,10)}</td>
          <td>
            <div style={{ width: "110px" }}>
              {' '}
              <button type="button" onClick={handleSetEntregaSelecionado} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#entregaModal">
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

export default EntregaItem;
