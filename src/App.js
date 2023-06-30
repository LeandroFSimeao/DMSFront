import React from 'react';
import ClienteList from './components/ClienteList';
import ClienteForm from './components/ClienteForm';
import { Col, Container, Row } from 'reactstrap';

const App = () => {
  return (
    <div>
      <Container className='App'>
        <Row>
          <Col>
          <h1 style={{margin: "20px 0"}}>CRUD Clientes</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ClienteList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
