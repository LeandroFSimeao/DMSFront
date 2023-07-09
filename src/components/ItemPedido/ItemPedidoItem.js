import React from 'react';
import { Button } from 'reactstrap';

const ItemPedidoItem = ({ itemPedido, onDelete, onEdit }) => {

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
          <td>{itemPedido.idPedido}</td>
          <td>{itemPedido.descricao}</td>
          <td>{itemPedido.peso}</td>
          <td>{itemPedido.valor}</td>
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
