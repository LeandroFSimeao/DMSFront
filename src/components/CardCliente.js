import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

const CardCliente = () => {
    return (
<Card
  style={{
    width: '18rem'
  }}
>
  <img
    alt="Sample"
    src="https://blog.acelerato.com/wp-content/uploads/2015/11/clientes.png"
  />
  <CardBody>
    <CardTitle tag="h5">
    Clientes
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Tela de gerenciamento de Clientes
    </CardSubtitle>
    <CardText>
      Nesta tela voce pode cadastrar, vizualizar, editar e excluir seus clientes. E acessar a funcionalidade de geocodificar
    </CardText>
    <Link to="/cliente" className="btn btn-primary">
        Acessar
     </Link>
  </CardBody>
</Card>
);
}

export default CardCliente;