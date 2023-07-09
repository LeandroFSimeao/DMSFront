import React from 'react';
import { Button } from 'reactstrap';

const EntregaItem = ({ entrega, onDelete, onEdit }) => {

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
          <td>{entrega.motorista}</td>
          <td>{entrega.veiculo}</td>
          <td>{entrega.duracao}</td>
          <td>{entrega.distancia}</td>
          <td>
            <div style={{ width: "110px" }}>
              {' '}
              <button type="button" onClick={handleSetEntregaSelecionado} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#entregaModal">
                Abrir Rota
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
