import React, { useEffect, useState } from 'react';

const GeraEntregaForm = ({ onAddEntrega, pedidos }) => {
  const [pedidosSelecionados, setPedidosSelecionados] = useState([]);
  const [pedido, setPedido] = useState({
    idPedido: 0,
    idCliente: 0,
    idEntrega: null,
    nf: '',
    entrega_ou_servico: '',
    status: '',
    valor:'',
    peso:'',
    DataPedido: '01-01-1990'
  });

  const handleSubmit = event => {
    event.preventDefault();
      onAddEntrega(pedidosSelecionados);
      setPedidosSelecionados([]);
  };

  const handleAddPedido = () => {
    const newItem = pedido.idPedido;
    const newItems = [...pedidosSelecionados, newItem];
    setPedidosSelecionados(newItems);
  }

  return (
    <div>

      <div className="modal fade" id="geraEntregaModal" tabIndex="-1" aria-labelledby="geraEntregaModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="geraEntregaModalLabel">
              Criar Entrega
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="idCliente" className="form-label">IdPedido</label>
                  <select 
                    className='form-select'
                    id='idPedido'
                    name='idPedido'
                    value={pedido.idPedido}
                    onChange={(event) => {setPedido(prevPedido => ({
                      ...prevPedido,
                      [event.target.name]: event.target.value}))}}
                  >            
                        <option value={''}>  </option>       
                    {pedidos.map((pedido) => (
                      <option key={pedido.idPedido} value={pedido.idPedido}> {pedido.idPedido} </option>
                    ))}
                  </select>             
                    <button type="button" onClick={handleAddPedido} className="btn btn-primary">
                  Adicionar
                </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="idClientes" className="form-label">Pedidos Selecionados: </label>
                  {pedidosSelecionados.map((pedido) => (" "+pedido+", "))}
                </div>
                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                  Criar Entrega
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeraEntregaForm;
