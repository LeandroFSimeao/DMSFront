import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

const CardPedido = () => {
    return (
<Card
  style={{
    width: '18rem'
  }}
>
  <img
    alt="Sample"
    src="https://bigarsolucion.es/wp-content/uploads/2018/05/3.jpg"
  />
  <CardBody>
    <CardTitle tag="h5">
    Pedidos
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Tela de gerenciamento de Pedidos
    </CardSubtitle>
    <CardText>
      Nesta tela voce pode cadastrar, vizualizar, editar e excluir seus pedidos, também adicionar itens do pedido. E acessar a funcionalidade de gerar entregas otimizadas.
    </CardText>
    <Link to="/pedido" className="btn btn-primary">
        Acessar
     </Link>
  </CardBody>
</Card>
);
}

export default CardPedido;