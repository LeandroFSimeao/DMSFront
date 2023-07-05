import React from 'react';
import { Button } from 'reactstrap';

const ItemPedidoItem = ({ itemPedido, onDelete, onPatch, onEdit }) => {

  const handleSetItemPedidoSelecionado = () => {
    onEdit(itemPedido);
  }

  const handleDelete = () => {
    onDelete(itemPedido.idItemPedido);
  };

  return (
    <>
      <tr key={itemPedido.IdItemPedido}>
        <><th scope="row">{itemPedido.idItemPedido}</th>
          <td>{itemPedido.idCliente}</td>
          <td>{itemPedido.idEntrega}</td>
          <td>{itemPedido.nf}</td>
          <td>{itemPedido.entrega_ou_servico}</td>
          <td>{itemPedido.status}</td>
          <td>{itemPedido.valor}</td>
          <td>{itemPedido.peso}</td>
          <td>{itemPedido.dataItemPedido.substring(0,10)}</td>
          <td>
            <div style={{ width: "110px" }}>
              {' '}
              <button type="button" onClick={handleSetItemPedidoSelecionado} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#itemPedidoModal">
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

export default ItemPedidoItem;
