import React from 'react';
import { Col, Container, Row, Table } from 'reactstrap';
import CardCliente from './CardCliente';
import CardPedido from './CardPedido';
import CardItemPedido from './CardItemPedido';
import CardEntrega from './CardEntrega';

const Home = () => {
  return (

    <Container className='App'>
          <Row>
            <Col>
              <h1 style={{ margin: "20px 0" }}>Faster DMS</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <CardCliente />
            </Col>
            <Col>
              <CardPedido />
            </Col>
            <Col>
              <CardItemPedido />
            </Col>
            <Col>
              <CardEntrega />
            </Col>
          </Row>
    </Container>
  );
}

export default Home;