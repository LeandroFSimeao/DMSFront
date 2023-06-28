import React, { useState } from 'react';

const ClienteForm = () => {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    // Fazer a requisição POST para a API e adicionar um novo cliente
    fetch('http://localhost:5233/Cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, cnpj }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Novo cliente adicionado:', data);
        setNome('');
        setCnpj('');
      });
  };

  return (
    <div className="container">
      <h2>Adicionar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={event => setNome(event.target.value)}
            placeholder="Nome do cliente"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cnpj" className="form-label">CNPJ</label>
          <input
            type="text"
            className="form-control"
            id="cnpj"
            value={cnpj}
            onChange={event => setCnpj(event.target.value)}
            placeholder="CNPJ do cliente"
          />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>
    </div>
  );
};

export default ClienteForm;
