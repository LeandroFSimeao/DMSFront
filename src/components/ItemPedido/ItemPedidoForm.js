import React, { useEffect, useState } from 'react';

const ItemPedidoForm = ({ onAddItemPedido, onEditItemPedido, itemPedidoInicial, onLimpaItemPedido }) => {
  const [itemPedido, setItemPedido] = useState({
    idPedido: 0,
    descricao: null,
    peso: '',
    valor: ''
  });
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if(itemPedidoInicial){
      setItemPedido(itemPedidoInicial);
      console.log(itemPedidoInicial)
    }
  }, [itemPedidoInicial]);

  useEffect(() => {
    fetch('http://localhost:5233/Pedido')
      .then(response => response.json())
      .then(data => setPedidos(data))
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
      idPedido: 0,
      descricao: null,
      peso: '',
      valor: ''
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
                  <label htmlFor="idPedido" className="form-label">idPedido</label>
                  <select 
                    className='form-select'
                    id='idPedido'
                    name='idPedido'
                    value={itemPedido.idPedido}
                    onChange={(event) => {setItemPedido(prevItemPedido => ({
                      ...prevItemPedido,
                      [event.target.name]: event.target.value}))}}
                  >                   
                    {pedidos.map((pedido) => (
                      <option key={pedido.idPedido} value={pedido.idPedido}> {pedido.idPedido} </option>
                    ))}
                  </select>             
                </div>
                <div className="mb-3">
                  <label htmlFor="descricao" className="form-label">descricao</label>
                  <input
                    name='descricao'
                    type="text"
                    className="form-control"
                    id="descricao"
                    value={itemPedido.descricao}
                    onChange={handleChange}
                    placeholder="descricao do itemPedido"
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
