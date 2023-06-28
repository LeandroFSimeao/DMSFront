import React, { useEffect, useState } from 'react';
import ClienteItem from './ClienteItem';

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5233/Cliente')
            .then(response => response.json())
            .then(data => setClientes(data));
    }, []);

    return (
        <div className="container">
        <h2>Clientes</h2>
        <ul className="list-group">
          {clientes.map(cliente => (
            <ClienteItem 
                key = {cliente.idCliente}
                cliente = {cliente}/>           
          ))}
        </ul>
      </div>
    );
};

export default ClienteList;