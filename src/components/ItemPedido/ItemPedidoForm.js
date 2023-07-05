import React, { useEffect, useState } from 'react';

const ItemPedidoForm = ({ onAddItemPedido, onEditItemPedido, itemPedidoInicial, onLimpaItemPedido }) => {
  const [itemPedido, setItemPedido] = useState({
    idCliente: 0,
    idEntrega: null,
    nf: '',
    entrega_ou_servico: '',
    status: '',
    valor:'',
    peso:'',
    dataItemPedido: ''
  });
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    if(itemPedidoInicial){
      setItemPedido(itemPedidoInicial);
      console.log(itemPedidoInicial)
    }
  }, [itemPedidoInicial]);

  useEffect(() => {
    fetch('http://localhost:5233/Cliente')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.log(error));
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setItemPedido(prevItemPedido => ({
      ...prevItemPedido,
      [name]: value
    }));
  };

  const handleLimpaItemPedido = () => {
    onLimpaItemPedido();
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (itemPedidoInicial) {
      onEditItemPedido(itemPedido);
    } else {
      onAddItemPedido(itemPedido);
    }
    setItemPedido({
    idCliente: 0,
    idEntrega: null,
    nf: '',
    entrega_ou_servico: '',
    status: '',
    valor:'',
    peso:'',
    dataItemPedido: ''
    });
  };

  return (
    <div>

      <div className="modal fade" id="itemPedidoModal" tabIndex="-1" aria-labelledby="itemPedidoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="itemPedidoModalLabel">
              {itemPedidoInicial ? 'Editar ItemPedido' : 'Adicionar ItemPedido'}
              </h5>
              <button type="button" onClick={handleLimpaItemPedido} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="idCliente" className="form-label">IdCliente</label>
                  <select 
                    className='form-select'
                    id='idCliente'
                    name='idCliente'
                    value={itemPedido.idCliente}
                    onChange={(event) => {setItemPedido(prevItemPedido => ({
                      ...prevItemPedido,
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
                    value={itemPedido.nf}
                    onChange={handleChange}
                    placeholder="nf do itemPedido"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="entrega_ou_servico" className="form-label">Entrega ou serviço</label>
                  <select 
                    className='form-select'
                    id='entrega_ou_servico'
                    name='entrega_ou_servico'
                    value={itemPedido.entrega_ou_servico}
                    onChange={(event) => {setItemPedido(prevItemPedido => ({
                      ...prevItemPedido,
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
                    value={itemPedido.status}
                    onChange={(event) => {setItemPedido(prevItemPedido => ({
                      ...prevItemPedido,
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
                    value={itemPedido.valor}
                    onChange={handleChange}
                    placeholder="valor do itemPedido"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="peso" className="form-label">peso</label>
                  <input
                    name='peso'
                    type="number"
                    className="form-control"
                    id="peso"
                    value={itemPedido.peso}
                    onChange={handleChange}
                    placeholder="peso do itemPedido"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dataItemPedido" className="form-label">dataItemPedido</label>
                  <input
                    name='dataItemPedido'
                    type="date"
                    className="form-control"
                    id="dataItemPedido"
                    value={itemPedido.dataItemPedido.substring(0,10)}
                    onChange={handleChange}
                    placeholder="data do itemPedido"
                  />
                </div>
                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                  {itemPedidoInicial ? 'Editar ItemPedido' : 'Adicionar ItemPedido'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPedidoForm;
