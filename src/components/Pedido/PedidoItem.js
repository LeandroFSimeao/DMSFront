import React from 'react';
import { Button } from 'reactstrap';

const PedidoItem = ({ pedido, onDelete, onEdit, onAddItem }) => {

  const handleSetPedidoSelecionado = () => {
    onEdit(pedido);
  }

  const handelAddItem = () => {
    onAddItem(pedido.idPedido);
  }

  const handleDelete = () => {
    onDelete(pedido.idPedido);
  };

  return (
    <>
      <tr key={pedido.IdPedido}>
        <><th scope="row">{pedido.idPedido}</th>
          <td>{pedido.idCliente}</td>
          <td>{pedido.idEntrega}</td>
          <td>{pedido.nf}</td>
          <td>{pedido.entrega_ou_servico}</td>
          <td>{pedido.status}</td>
          <td>{pedido.valor}</td>
          <td>{pedido.peso}</td>
          <td>{pedido.dataPedido.substring(0,10)}</td>
          <td>
            <div style={{ width: "110px" }}>
              {' '}
              <button type="button" onClick={handleSetPedidoSelecionado} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pedidoModal">
                Editar
              </button>
            </div>
          </td>
          <td>
            <div style={{ width: "110px" }}>
              {' '}
              <button type="button" onClick={handelAddItem} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#itemPedidoModal">
                Add item
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

export default PedidoItem;
