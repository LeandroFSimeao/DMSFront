import React, { useEffect, useState } from 'react';

const PedidoForm = ({ onAddPedido, onEditPedido, pedidoInicial, onLimpaPedido }) => {
  const [pedido, setPedido] = useState({
    idCliente: 0,
    idEntrega: null,
    nf: '',
    entrega_ou_servico: '',
    status: '',
    valor:'',
    peso:'',
    DataPedido: '01-01-1990'
  });
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    if(pedidoInicial){
      setPedido(pedidoInicial);
      console.log(pedidoInicial)
    }
  }, [pedidoInicial]);

  useEffect(() => {
    fetch('http://dmsback-env.eba-dsmce2qe.us-east-1.elasticbeanstalk.com/Cliente')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.log(error));
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setPedido(prevPedido => ({
      ...prevPedido,
      [name]: value
    }));
  };

  const handleLimpaPedido = () => {
    onLimpaPedido();
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (pedidoInicial) {
      onEditPedido(pedido);
    } else {
      onAddPedido(pedido);
    }
    setPedido({
    idCliente: 0,
    idEntrega: null,
    nf: '',
    entrega_ou_servico: '',
    status: '',
    valor:'',
    peso:'',
    dataPedido: '01-01-1990'
    });
  };

  return (
    <div>

      <div className="modal fade" id="pedidoModal" tabIndex="-1" aria-labelledby="pedidoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="pedidoModalLabel">
              {pedidoInicial ? 'Editar Pedido' : 'Adicionar Pedido'}
              </h5>
              <button type="button" onClick={handleLimpaPedido} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="idCliente" className="form-label">IdCliente</label>
                  <select 
                    className='form-select'
                    id='idCliente'
                    name='idCliente'
                    value={pedido.idCliente}
                    onChange={(event) => {setPedido(prevPedido => ({
                      ...prevPedido,
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
                    value={pedido.nf}
                    onChange={handleChange}
                    placeholder="nf do pedido"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="entrega_ou_servico" className="form-label">Entrega ou serviço</label>
                  <select 
                    className='form-select'
                    id='entrega_ou_servico'
                    name='entrega_ou_servico'
                    value={pedido.entrega_ou_servico}
                    onChange={(event) => {setPedido(prevPedido => ({
                      ...prevPedido,
                      [event.target.name]: event.target.value}))}}
                  >                   
                    <option value="">  </option>
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
                    value={pedido.status}
                    onChange={(event) => {setPedido(prevPedido => ({
                      ...prevPedido,
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
                    value={pedido.valor}
                    onChange={handleChange}
                    placeholder="valor do pedido"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="peso" className="form-label">peso</label>
                  <input
                    name='peso'
                    type="number"
                    className="form-control"
                    id="peso"
                    value={pedido.peso}
                    onChange={handleChange}
                    placeholder="peso do pedido"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dataPedido" className="form-label">dataPedido</label>
                  <input
                    name='dataPedido'
                    type="date"
                    className="form-control"
                    id="dataPedido"
                    value={ typeof pedido.dataPedido === 'string' ? pedido.dataPedido.substring(0,10) : ''}
                    onChange={handleChange}
                    placeholder="data do pedido"
                  />
                </div>
                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                  {pedidoInicial ? 'Editar Pedido' : 'Adicionar Pedido'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoForm;
