import React from 'react';

const ClienteItem = ({ cliente }) => {
  const handleDelete = () => {
    // Fazer a requisição DELETE para a API para remover o Cliente
    fetch(`http://localhost:5233/Cliente/${cliente.IdCliente}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Cliente removido:', data);
        // Atualizar a lista de clientes
      });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {cliente.nome} - CNPJ: {cliente.cnpj}
      <button onClick={handleDelete} className="btn btn-danger">Remover</button>
    </li>
  );
};

export default ClienteItem;
