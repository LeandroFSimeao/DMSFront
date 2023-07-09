import React, { useEffect, useState } from 'react';
import ClienteItem from './ClienteItem';
import { Col, Container, Row, Table } from 'reactstrap';
import ClienteForm from './ClienteForm';
import { CSVLink } from "react-csv"
import { useNavigate } from 'react-router-dom';
import MapContainer from '../MapContainer';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    fetch('http://localhost:5233/Cliente')
      .then(response => response.json())
      .then(data => setClientes(data));
  };

  const handleSelectCLiente = cliente => {
    setSelectedClient(cliente);
  };

  const handleClickMap = () => {
    setShowMap(true);
  };

  const handleLimpaSelectedCliente = () => {
    setSelectedClient(null);
  }

  const goHome = () => {
    navigate("/")
  }

  const handleAddCliente = cliente => {
    fetch('http://localhost:5233/Cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Novo cliente adicionado:', data);
        fetchClientes(); // Buscar novamente a lista de clientes após a adição
        setSelectedClient(null);
      });
  };

  const handleEditCliente = cliente => {
    fetch('http://localhost:5233/Cliente', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Cliente editado com sucesso.');
          fetchClientes(); // Buscar novamente a lista de clientes após a remoção
          setSelectedClient(null);
        } else {
          console.log('Erro ao editar o cliente.');
        }
      })
      .catch(error => {
        console.log('Erro ao editar o cliente:', error);
      });
  };

  const handleDeleteCliente = idCliente => {
    fetch(`http://localhost:5233/Cliente/${idCliente}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Cliente removido com sucesso.');
          fetchClientes(); // Buscar novamente a lista de clientes após a remoção
        } else {
          console.log('Erro ao remover o cliente.');
        }
      })
      .catch(error => {
        console.log('Erro ao remover o cliente:', error);
      });
  };

  const handleGeocodificaCliente = cliente => {
    // Fazer a requisição PATCH para a API para Geocodificar o Cliente
    fetch(`http://localhost:5233/Cliente/Geocodifica/${cliente.idCliente}`, {
      method: 'PATCH',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Cliente geocodificado:', data);
        // Atualizar a lista de clientes
        fetchClientes();
        setSelectedClient(data);
        handleClickMap(); // Buscar novamente a lista de clientes após a remoção
      });
      
  };

  return (
    <>
      <div>
        <Container className='App'>
          <Row>
            <Col>
              <h1 style={{ margin: "20px 0" }}>Clientes</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>CNPJ</th>
                    <th scope='col'>Logradouro</th>
                    <th scope='col'>Numero</th>
                    <th scope='col'>Latitude</th>
                    <th scope='col'>Longitude</th>
                    <th scope='col'>Actions</th>
                    <th scope='col'> </th>
                    <th scope='col'> </th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map(cliente => (
                    <ClienteItem
                      key={cliente.idCliente}
                      cliente={cliente}
                      onDelete={handleDeleteCliente}
                      onPatch={handleGeocodificaCliente}
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
                data={clientes}>
                Download CSV
              </CSVLink>
              <ClienteForm
                onAddCliente={handleAddCliente}
                onEditCliente={handleEditCliente}
                clienteInicial={selectedClient}
                onLimpaCliente={handleLimpaSelectedCliente}
              />
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#clienteModal">
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
                    <MapContainer latitude={selectedClient.latitude} longitude={selectedClient.longitude} />
                    ) : ('')}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ClienteList;