import React, { useEffect, useState } from 'react';
import EntregaItem from './EntregaItem';
import { Button, Col, Container, Row, Table } from 'reactstrap';
import EntregaForm from './EntregaForm';
import { CSVLink } from "react-csv"
import { useNavigate } from 'react-router-dom';
import MapRota from '../MapRota';

const EntregaList = () => {
  const [entregas, setEntregas] = useState([]);
  const [selectedEntrega, setSelectedEntrega] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchEntregas();
  }, []);

  const fetchEntregas = () => {
    fetch('http://localhost:5233/Entrega')
      .then(response => response.json())
      .then(data => setEntregas(data));
  };

  const handleSelectEntrega = entrega => {
    setSelectedEntrega(entrega);
  };

  const handleClickMap = (entrega) => {
    setSelectedEntrega(entrega)
    setShowMap(true);
  };

  const handleLimpaSelectedEntrega = () => {
    setSelectedEntrega(null);
  }

  const goHome = () => {
    navigate("/")
  }

  const handleAddEntrega = entrega => {
    fetch('http://localhost:5233/Entrega', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entrega),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Novo entrega adicionado:', data);
        fetchEntregas(); // Buscar novamente a lista de entregas após a adição
        setSelectedEntrega(null);
      });
  };

  const handleEditEntrega = entrega => {
    fetch('http://localhost:5233/Entrega', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entrega),
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Entrega editado com sucesso.');
          fetchEntregas(); // Buscar novamente a lista de entregas após a remoção
          setSelectedEntrega(null);
        } else {
          console.log('Erro ao editar o entrega.');
        }
      })
      .catch(error => {
        console.log('Erro ao editar o entrega:', error);
      });
  };

  const handleDeleteEntrega = idEntrega => {
    fetch(`http://localhost:5233/Entrega/${idEntrega}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Entrega removido com sucesso.');
          fetchEntregas(); // Buscar novamente a lista de entregas após a remoção
        } else {
          console.log('Erro ao remover o entrega.');
        }
      })
      .catch(error => {
        console.log('Erro ao remover o entrega:', error);
      });
  };

  return (
    <>
      <div>
        <Container className='App'>
          <Row>
            <Col>
              <h1 style={{ margin: "20px 0" }}>Entregas</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Motorista</th>
                    <th scope='col'>Veiculo</th>
                    <th scope='col'>Duração (minutos)</th>
                    <th scope='col'>Distância (km)</th>
                    <th scope='col'> </th>
                    <th scope='col'> </th>
                  </tr>
                </thead>
                <tbody>
                  {entregas.map(entrega => (
                    <EntregaItem
                      key={entrega.idEntrega}
                      entrega={entrega}
                      onDelete={handleDeleteEntrega}
                      onEdit={handleSelectEntrega}
                      onClickMap={handleClickMap}
                    />
                  ))}
                </tbody>
              </Table>
              <CSVLink
                filename={"db.csv"}
                color="primary"
                style={{ float: "left", marginRight: "10px" }}
                className="btn btn-primary"
                data={entregas}>
                Download CSV
              </CSVLink>
              <EntregaForm
                onAddEntrega={handleAddEntrega}
                onEditEntrega={handleEditEntrega}
                entregaInicial={selectedEntrega}
                onLimpaEntrega={handleLimpaSelectedEntrega}
              />
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#entregaModal">
                Adicionar
              </button>
              {'  '}
              <button type="button" className='btn btn-secondary' onClick={goHome}>
                Voltar para Home
              </button>
            </Col>
          </Row>
          <Row>
            <Col>
                    {showMap ? ( 
                    <MapRota 
                    encodedPolyline={selectedEntrega.polyline}
                    />
                    ) : ('')}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EntregaList;