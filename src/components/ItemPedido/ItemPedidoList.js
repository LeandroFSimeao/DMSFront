import React, { useEffect, useState } from 'react';
import ItemPedidoItem from './ItemPedidoItem';
import { Col, Container, Row, Table } from 'reactstrap';
import ItemPedidoForm from './ItemPedidoForm';
import { CSVLink } from "react-csv"
import { useNavigate } from 'react-router-dom';

const ItemPedidoList = () => {
  const [itemPedidos, setItemPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedItemPedido, setSelectedItemPedido] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchItemPedidos();
    fetchClientes();
  }, []);

  const fetchItemPedidos = () => {
    fetch('http://localhost:5233/ItemPedido')
      .then(response => response.json())
      .then(data => setItemPedidos(data));
  };

  const fetchClientes = () => {
    fetch('http://localhost:5233/ItemPedido')
      .then(response => response.json())
      .then(data => setClientes(data));
  };

  const handleSelectCLiente = itemPedido => {
    setSelectedItemPedido(itemPedido);
  };

  const handleLimpaSelectedItemPedido = () => {
    setSelectedItemPedido(null);
  }

  const goHome = () => {
    navigate("/")
  }

  const handleAddItemPedido = itemPedido => {
    fetch('http://localhost:5233/ItemPedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemPedido),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Novo itemPedido adicionado:', data);
        fetchItemPedidos(); // Buscar novamente a lista de itemPedidos após a adição
        setSelectedItemPedido(null);
      });
  };

  const handleEditItemPedido = itemPedido => {
    fetch('http://localhost:5233/ItemPedido', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemPedido),
    })
      .then(response => {
        if (response.status === 204) {
          console.log('ItemPedido editado com sucesso.');
          fetchItemPedidos(); // Buscar novamente a lista de itemPedidos após a remoção
          setSelectedItemPedido(null);
        } else {
          console.log('Erro ao editar o itemPedido.');
        }
      })
      .catch(error => {
        console.log('Erro ao editar o itemPedido:', error);
      });
  };

  const handleDeleteItemPedido = idItemPedido => {
    fetch(`http://localhost:5233/ItemPedido/${idItemPedido}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          console.log('ItemPedido removido com sucesso.');
          fetchItemPedidos(); // Buscar novamente a lista de itemPedidos após a remoção
        } else {
          console.log('Erro ao remover o itemPedido.');
        }
      })
      .catch(error => {
        console.log('Erro ao remover o itemPedido:', error);
      });
  };

  const handleGeocodificaItemPedido = idItemPedido => {
    // Fazer a requisição PATCH para a API para Geocodificar o ItemPedido
    fetch(`http://localhost:5233/ItemPedido/Geocodifica/${idItemPedido}`, {
      method: 'PATCH',
    })
      .then(response => response.json())
      .then(data => {
        console.log('ItemPedido geocodificado:', data);
        // Atualizar a lista de itemPedidos
        fetchItemPedidos(); // Buscar novamente a lista de itemPedidos após a remoção
      });
  };

  return (
    <>
      <div>
        <Container className='App'>
          <Row>
            <Col>
              <h1 style={{ margin: "20px 0" }}>ItemPedidos</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>IdPedido</th>
                    <th scope='col'>Descricao</th>
                    <th scope='col'>Peso</th>
                    <th scope='col'>Valor</th>
                    <th scope='col'> </th>
                    <th scope='col'> </th>
                  </tr>
                </thead>
                <tbody>
                  {itemPedidos.map(itemPedido => (
                    <ItemPedidoItem
                      key={itemPedido.idItemPedido}
                      itemPedido={itemPedido}
                      onDelete={handleDeleteItemPedido}
                      onPatch={handleGeocodificaItemPedido}
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
                data={itemPedidos}>
                Download CSV
              </CSVLink>
              <ItemPedidoForm
                onAddItemPedido={handleAddItemPedido}
                onEditItemPedido={handleEditItemPedido}
                itemPedidoInicial={selectedItemPedido}
                onLimpaItemPedido={handleLimpaSelectedItemPedido}
                clientesprop = {clientes}
              />
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#itemPedidoModal">
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

export default ItemPedidoList;