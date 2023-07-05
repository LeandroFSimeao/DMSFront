import React, { useEffect, useState } from 'react';
import EntregaItem from './EntregaItem';
import { Col, Container, Row, Table } from 'reactstrap';
import EntregaForm from './EntregaForm';
import { CSVLink } from "react-csv"
import { useNavigate } from 'react-router-dom';

const EntregaList = () => {
  const [entregas, setEntregas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedEntrega, setSelectedEntrega] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchEntregas();
    fetchClientes();
  }, []);

  const fetchEntregas = () => {
    fetch('http://localhost:5233/Entrega')
      .then(response => response.json())
      .then(data => setEntregas(data));
  };

  const fetchClientes = () => {
    fetch('http://localhost:5233/Entrega')
      .then(response => response.json())
      .then(data => setClientes(data));
  };

  const handleSelectCLiente = entrega => {
    setSelectedEntrega(entrega);
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

  const handleGeocodificaEntrega = idEntrega => {
    // Fazer a requisição PATCH para a API para Geocodificar o Entrega
    fetch(`http://localhost:5233/Entrega/Geocodifica/${idEntrega}`, {
      method: 'PATCH',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Entrega geocodificado:', data);
        // Atualizar a lista de entregas
        fetchEntregas(); // Buscar novamente a lista de entregas após a remoção
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
                    <th scope='col'>IdCliente</th>
                    <th scope='col'>IdEntrega</th>
                    <th scope='col'>Nf</th>
                    <th scope='col'>Entrega ou serviço</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>valor</th>
                    <th scope='col'>Peso</th>
                    <th scope='col'>DataEntrega</th>
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
                      onPatch={handleGeocodificaEntrega}
                      onEdit={handleSelectCLiente}
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
                clientesprop = {clientes}
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
        </Container>
      </div>
    </>
  );
};

export default EntregaList;