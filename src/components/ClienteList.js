import React, { useEffect, useState } from 'react';
import ClienteItem from './ClienteItem';
import {Table, Button} from 'reactstrap';
import ClienteForm from './ClienteForm';

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = () =>{
      fetch('http://localhost:5233/Cliente')
            .then(response => response.json())
            .then(data => setClientes(data));
    };

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

    const handleGeocodificaCliente = idCliente => {
      // Fazer a requisição PATCH para a API para Geocodificar o Cliente
      fetch(`http://localhost:5233/Cliente/Geocodifica/${idCliente}`, {
        method: 'PATCH',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente geocodificado:', data);
          // Atualizar a lista de clientes
          fetchClientes(); // Buscar novamente a lista de clientes após a remoção
        });
    };

    return (
      <>
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
        </tr>
      </thead>
      <tbody>
        {clientes.map(cliente => (
          <ClienteItem
            key={cliente.idCliente}
            cliente={ cliente}
            onDelete = {handleDeleteCliente}
            onPatch = {handleGeocodificaCliente}/>
        ))}
      </tbody>
    </Table>
    <ClienteForm onAddCliente={handleAddCliente} />
    </>
    );
};

export default ClienteList;