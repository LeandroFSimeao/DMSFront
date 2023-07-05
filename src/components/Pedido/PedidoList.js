import React, { useEffect, useState } from 'react';
import PedidoItem from './PedidoItem';
import { Col, Container, Row, Table } from 'reactstrap';
import PedidoForm from './PedidoForm';
import { CSVLink } from "react-csv"
import { useNavigate } from 'react-router-dom';

const PedidoList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchPedidos();
    fetchClientes();
  }, []);

  const fetchPedidos = () => {
    fetch('http://localhost:5233/Pedido')
      .then(response => response.json())
      .then(data => setPedidos(data));
  };

  const fetchClientes = () => {
    fetch('http://localhost:5233/Pedido')
      .then(response => response.json())
      .then(data => setClientes(data));
  };

  const handleSelectCLiente = pedido => {
    setSelectedPedido(pedido);
  };

  const handleLimpaSelectedPedido = () => {
    setSelectedPedido(null);
  }

  const goHome = () => {
    navigate("/")
  }

  const handleAddPedido = pedido => {
    fetch('http://localhost:5233/Pedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Novo pedido adicionado:', data);
        fetchPedidos(); // Buscar novamente a lista de pedidos após a adição
        setSelectedPedido(null);
      });
  };

  const handleEditPedido = pedido => {
    fetch('http://localhost:5233/Pedido', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Pedido editado com sucesso.');
          fetchPedidos(); // Buscar novamente a lista de pedidos após a remoção
          setSelectedPedido(null);
        } else {
          console.log('Erro ao editar o pedido.');
        }
      })
      .catch(error => {
        console.log('Erro ao editar o pedido:', error);
      });
  };

  const handleDeletePedido = idPedido => {
    fetch(`http://localhost:5233/Pedido/${idPedido}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Pedido removido com sucesso.');
          fetchPedidos(); // Buscar novamente a lista de pedidos após a remoção
        } else {
          console.log('Erro ao remover o pedido.');
        }
      })
      .catch(error => {
        console.log('Erro ao remover o pedido:', error);
      });
  };

  const handleGeocodificaPedido = idPedido => {
    // Fazer a requisição PATCH para a API para Geocodificar o Pedido
    fetch(`http://localhost:5233/Pedido/Geocodifica/${idPedido}`, {
      method: 'PATCH',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Pedido geocodificado:', data);
        // Atualizar a lista de pedidos
        fetchPedidos(); // Buscar novamente a lista de pedidos após a remoção
      });
  };

  return (
    <>
      <div>
        <Container className='App'>
          <Row>
            <Col>
              <h1 style={{ margin: "20px 0" }}>Pedidos</h1>
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
                    <th scope='col'>DataPedido</th>
                    <th scope='col'> </th>
                    <th scope='col'> </th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map(pedido => (
                    <PedidoItem
                      key={pedido.idPedido}
                      pedido={pedido}
                      onDelete={handleDeletePedido}
                      onPatch={handleGeocodificaPedido}
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
                data={pedidos}>
                Download CSV
              </CSVLink>
              <PedidoForm
                onAddPedido={handleAddPedido}
                onEditPedido={handleEditPedido}
                pedidoInicial={selectedPedido}
                onLimpaPedido={handleLimpaSelectedPedido}
                clientesprop = {clientes}
              />
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pedidoModal">
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

export default PedidoList;