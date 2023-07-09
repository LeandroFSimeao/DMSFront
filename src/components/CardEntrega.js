import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

const CardEntrega = () => {
    return (
<Card
  style={{
    width: '18rem'
  }}
>
  <img
    alt="Sample"
    src="https://www.acamargo.com/media/wysiwyg/entregas.png"
  />
  <CardBody>
    <CardTitle tag="h5">
    Entregas
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Tela de gerenciamento de Entregas
    </CardSubtitle>
    <CardText>
      Nesta tela voce pode cadastrar, vizualizar, editar e excluir suas entregas. E acessar a funcionalidade de gerar a rota de entrega no mapa.
    </CardText>
    <Link to="/entregas" className="btn btn-primary">
        Acessar
     </Link>
  </CardBody>
</Card>
);
}

export default CardEntrega;