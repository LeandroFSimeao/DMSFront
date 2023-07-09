import React, { useEffect, useState } from 'react';

const EntregaForm = ({ onAddEntrega, onEditEntrega, entregaInicial, onLimpaEntrega }) => {
  const [entrega, setEntrega] = useState({
    motorista: '',
    veiculo: '',
    polyline: '',
    duracao: 0,
    distancia: 0,
  });

  useEffect(() => {
    if(entregaInicial){
      setEntrega(entregaInicial);
      console.log(entregaInicial)
    }
  }, [entregaInicial]);

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
      motorista: '',
      veiculo: '',
      polyline: '',
      duracao: 0,
      distancia: 0,
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
                  <label htmlFor="motorista" className="form-label">motorista</label>
                  <input
                    name='motorista'
                    type="text"
                    className="form-control"
                    id="motorista"
                    value={entrega.motorista}
                    onChange={handleChange}
                    placeholder="motorista da entrega"
                  />
                </div>                
                <div className="mb-3">
                  <label htmlFor="veiculo" className="form-label">veiculo</label>
                  <input
                    name='veiculo'
                    type="text"
                    className="form-control"
                    id="veiculo"
                    value={entrega.veiculo}
                    onChange={handleChange}
                    placeholder="veiculo da entrega"
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
