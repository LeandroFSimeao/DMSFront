import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

const CardItemPedido = () => {
    return (
<Card
  style={{
    width: '18rem'
  }}
>
  <img
    alt="Sample"
    src="https://radio93fm.com.br/wp-content/uploads/2019/02/produto.png"
  />
  <CardBody>
    <CardTitle tag="h5">
    Itens do pedido
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Tela de gerenciamento de Itens do pedido
    </CardSubtitle>
    <CardText>
      Nesta tela voce pode cadastrar, vizualizar, editar e excluir seus Itens do pedido.
    </CardText>
    <Link to="/itemPedido" className="btn btn-primary">
        Acessar
     </Link>
  </CardBody>
</Card>
);
}

export default CardItemPedido;