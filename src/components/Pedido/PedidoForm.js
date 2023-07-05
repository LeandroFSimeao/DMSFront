import React, { useEffect, useState } from 'react';

const EntregaForm = ({ onAddEntrega, onEditEntrega, entregaInicial, onLimpaEntrega }) => {
  const [entrega, setEntrega] = useState({
    idCliente: 0,
    idEntrega: null,
    nf: '',
    entrega_ou_servico: '',
    status: '',
    valor:'',
    peso:'',
    dataEntrega: ''
  });
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    if(entregaInicial){
      setEntrega(entregaInicial);
      console.log(entregaInicial)
    }
  }, [entregaInicial]);

  useEffect(() => {
    fetch('http://localhost:5233/Cliente')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.log(error));
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setEntrega(prevEntrega => ({
      ...prevEntrega,
      [name]: value
    }));
  };

  const handleLimpaEntrega = () => {
    onLimpaEntrega();
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (entregaInicial) {
      onEditEntrega(entrega);
    } else {
      onAddEntrega(entrega);
    }
    setEntrega({
    idCliente: 0,
    idEntrega: null,
    nf: '',
    entrega_ou_servico: '',
    status: '',
    valor:'',
    peso:'',
    dataEntrega: ''
    });
  };

  return (
    <div>

      <div className="modal fade" id="entregaModal" tabIndex="-1" aria-labelledby="entregaModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="entregaModalLabel">
              {entregaInicial ? 'Editar Entrega' : 'Adicionar Entrega'}
              </h5>
              <button type="button" onClick={handleLimpaEntrega} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="idCliente" className="form-label">IdCliente</label>
                  <select 
                    className='form-select'
                    id='idCliente'
                    name='idCliente'
                    value={entrega.idCliente}
                    onChange={(event) => {setEntrega(prevEntrega => ({
                      ...prevEntrega,
                      [event.target.name]: event.target.value}))}}
                  >                   
                    {clientes.map((cliente) => (
                      <option key={cliente.idCliente} value={cliente.idCliente}> {cliente.nome} </option>
                    ))}
                  </select>             
                </div>
                <div className="mb-3">
                  <label htmlFor="nf" className="form-label">NF</label>
                  <input
                    name='nf'
                    type="text"
                    className="form-control"
                    id="nf"
                    value={entrega.nf}
                    onChange={handleChange}
                    placeholder="nf do entrega"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="entrega_ou_servico" className="form-label">Entrega ou serviço</label>
                  <select 
                    className='form-select'
                    id='entrega_ou_servico'
                    name='entrega_ou_servico'
                    value={entrega.entrega_ou_servico}
                    onChange={(event) => {setEntrega(prevEntrega => ({
                      ...prevEntrega,
                      [event.target.name]: event.target.value}))}}
                  >                   
                    <option value="Entrega"> Entrega </option>
                    <option value="Servico"> Servico </option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">status</label>
                  <select 
                    className='form-select'
                    id='status'
                    name='status'
                    value={entrega.status}
                    onChange={(event) => {setEntrega(prevEntrega => ({
                      ...prevEntrega,
                      [event.target.name]: event.target.value}))}}
                  >                   
                    <option value="Pendente"> Pendente </option>
                    <option value="Em processamento"> Em processamento </option>
                    <option value="pago"> Pago </option>
                    <option value="Enviado"> Enviado </option>
                    <option value="Entregue"> Entregue </option>
                    <option value="Cancelado"> Cancelado </option>
                    <option value="Devolvido"> Devolvido </option>
                  </select>                 
                </div>
                <div className="mb-3">
                  <label htmlFor="valor" className="form-label">valor</label>
                  <input
                    name='valor'
                    type="number"
                    className="form-control"
                    id="valor"
                    value={entrega.valor}
                    onChange={handleChange}
                    placeholder="valor do entrega"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="peso" className="form-label">peso</label>
                  <input
                    name='peso'
                    type="number"
                    className="form-control"
                    id="peso"
                    value={entrega.peso}
                    onChange={handleChange}
                    placeholder="peso do entrega"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dataEntrega" className="form-label">dataEntrega</label>
                  <input
                    name='dataEntrega'
                    type="date"
                    className="form-control"
                    id="dataEntrega"
                    value={entrega.dataEntrega.substring(0,10)}
                    onChange={handleChange}
                    placeholder="data do entrega"
                  />
                </div>
                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                  {entregaInicial ? 'Editar Entrega' : 'Adicionar Entrega'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntregaForm;
