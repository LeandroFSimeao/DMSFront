import React, { useState } from 'react';

const ClienteForm = ({ onAddCliente }) => {
  const [cliente, setCliente] = useState({
    nome: '',
    cnpj: '',
    logradouro: '',
    numero: 0,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setCliente(prevCliente => ({
      ...prevCliente,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAddCliente(cliente);
    setCliente({
      nome: '',
      cnpj: '',
      logradouro: '',
      numero: 0,
    });
  };

  return (
    <div className="container">
      <h2>Adicionar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            name='nome'
            type="text"
            className="form-control"
            id="nome"
            value={cliente.nome}
            onChange={handleChange}
            placeholder="Nome do cliente"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cnpj" className="form-label">CNPJ</label>
          <input
            name='cnpj'
            type="text"
            className="form-control"
            id="cnpj"
            value={cliente.cnpj}
            onChange={handleChange}
            placeholder="CNPJ do cliente"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="logradouro" className="form-label">Logradouro</label>
          <input
            name='logradouro'
            type="text"
            className="form-control"
            id="logradouro"
            value={cliente.logradouro}
            onChange={handleChange}
            placeholder="Logradouro do cliente"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numero" className="form-label">Numero</label>
          <input
            name='numero'
            type="number"
            className="form-control"
            id="numero"
            value={cliente.numero}
            onChange={handleChange}
            placeholder="Numero do endereço"
          />
        </div>       
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>
    </div>
  );
};

export default ClienteForm;
