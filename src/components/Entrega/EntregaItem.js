import React from 'react';
import { Button } from 'reactstrap';

const EntregaItem = ({ entrega, onDelete, onClickMap }) => {


  const handleClickMap = () => {
    onClickMap(entrega);
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
          <td>{entrega.duracao/60}</td>
          <td>{entrega.distancia/1000}</td>
          <td>
            <div style={{ width: "110px" }}>
              {' '}
              <button type="button" onClick={handleClickMap} className="btn btn-primary">
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
