import React, { useEffect, useState } from 'react';

const ClienteForm = ({ onAddCliente, onEditCliente, clienteInicial }) => {
  const [cliente, setCliente] = useState({
    nome: '',
    cnpj: '',
    logradouro: '',
    numero: 0,
  });

  useEffect(() => {
    if(clienteInicial){
      setCliente(clienteInicial);
      console.log(clienteInicial)
    }
  }, [clienteInicial]);

  const handleChange = event => {
    const { name, value } = event.target;
    setCliente(prevCliente => ({
      ...prevCliente,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (clienteInicial) {
      onEditCliente(cliente);
    } else {
      onAddCliente(cliente);
    }
    setCliente({
      nome: '',
      cnpj: '',
      logradouro: '',
      numero: 0,
    });
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#clienteModal">
        {clienteInicial ? 'Editar' : 'Adicionar Cliente'}
      </button>

      <div className="modal fade" id="clienteModal" tabIndex="-1" aria-labelledby="clienteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="clienteModalLabel">
              {clienteInicial ? 'Editar Cliente' : 'Adicionar Cliente'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                <button type="submit" className="btn btn-primary">
                  {clienteInicial ? 'Editar CLiente' : 'Adicionar Cliente'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteForm;
