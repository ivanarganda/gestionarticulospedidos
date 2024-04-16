import React, { useState, useReducer, useEffect, useContext } from 'react';
import { reducer, initialState } from '../customHooks/useReducer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MsgContext } from '../context/messageContext';

export default function CrearPedido() {
  const [ selectedItem , setSelectedItem ] = useState(false);
  const { useMessage } = useContext(MsgContext);
  const [ addNewItem, setAddNewItem ] = useState(false);
  const API_ARTICLE = `http://localhost:3000/articulos`;
  const API_CREATE_BUDGET = `http://localhost:3000/pedidos`;
  const API_LAST_ID_BUDGET = `http://localhost:3000/pedidos?_sort=id&_order=desc&_limit=1`;
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const [ objectItems , setObjectItems ] = useState([]);

  const [ fieldsBudgets, setFieldsBudget ] = useState({
    id: 0,
    items: [],
    precioTotalSinImpuestos: 0,
    precioTotalConImpuestos: 0
  });

  const writeMessage = ( message , type ) =>{
    useMessage(message, type, 2000, 'top', 'center');
  };

  useEffect(() => {
    axios.get(API_LAST_ID_BUDGET).then((response) => {
      setFieldsBudget({
        ...fieldsBudgets,
        id: response.data.length === 0 ? 1 : response.data[0].id + 1
      });
    });
  }, []);

  useEffect(() => {
    axios.get(API_ARTICLE)
      .then((response) => {
        dispatch({ type: 'FETCH_ARTICLES', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const onSubmitEditBudget = (event) => {
    event.preventDefault();
    axios.post(API_CREATE_BUDGET, fieldsBudgets)
      .then(response => {
        console.log('Budget created successfully:', response.data);
        writeMessage('Pedido creado correctamente', 'success');
      })
      .catch(error => {
        console.error('Error creating budget:', error);
        writeMessage('Error en crear el pedido', 'error');
      });
  };

  const calculateTotalPrice = (items, priceType) => {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      if (priceType === 'precioTotalSinImpuestos') {
        sum += items[i].precioTotalSinImpuestos;
      } else if (priceType === 'precioTotalConImpuestos') {
        sum += items[i].precioTotalConImpuestos;
      }
    }
    return sum;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = parseFloat(value); // Parse the input value to a float

    if (!isNaN(parsedValue)) { // Check if the parsed value is a valid number
      setFieldsBudget({
        ...fieldsBudgets,
        [name]: parsedValue // Use the parsed value directly
      });
    } else {
      // Handle non-numeric inputs separately, for example setting the value to zero
      setFieldsBudget({
        ...fieldsBudgets,
        [name]: 0
      });
    }
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    const item = JSON.parse(event.target.value);
    const referencia_item = item.referencia;
  
    if (referencia_item !== "") {
      const existingItemIndex = fieldsBudgets.items.findIndex((item_) => item_.referencia === referencia_item);
  
      if (existingItemIndex !== -1) {
        // Item already exists in the list, increment quantity
        const updatedItems = [...fieldsBudgets.items];
        updatedItems[existingItemIndex].cantidad = updatedItems[existingItemIndex].cantidad + 1,
        updatedItems[existingItemIndex].precioUnitarioSinImpuestos = item.precioSinImpuestos,
        updatedItems[existingItemIndex].impuestoPorcentaje = item.impuestoAplicable * 100,
        updatedItems[existingItemIndex].precioTotalSinImpuestos = parseFloat(item.precioSinImpuestos) * ( updatedItems[existingItemIndex].cantidad);
        updatedItems[existingItemIndex].precioTotalConImpuestos = (parseFloat(item.precioSinImpuestos) * updatedItems[existingItemIndex].cantidad) + 
        (parseFloat(item.precioSinImpuestos)) * (parseFloat(item.impuestoAplicable) / 100)
  
        setFieldsBudget({
          ...fieldsBudgets,
          items: updatedItems,
          precioTotalSinImpuestos: calculateTotalPrice(updatedItems, 'precioTotalSinImpuestos'),
          precioTotalConImpuestos: calculateTotalPrice(updatedItems, 'precioTotalConImpuestos'),
        });
      } else {
        // Item does not exist, add it to the list
        setFieldsBudget({
          ...fieldsBudgets,
          items: [
            ...fieldsBudgets.items,
            {
              referencia: item.referencia,
              cantidad: 1,
              precioUnitarioSinImpuestos:item.precioSinImpuestos,
              impuestoPorcentaje:item.impuestoAplicable * 100,
              precioTotalSinImpuestos: parseFloat(item.precioSinImpuestos) || 0,
              precioTotalConImpuestos: parseFloat(item.precioSinImpuestos) * (1 + parseFloat(item.impuestoAplicable) / 100) || 0
            }
          ],
          precioTotalSinImpuestos: calculateTotalPrice([...fieldsBudgets.items, {
            referencia: item.referencia,
            cantidad: 1,
            precioTotalSinImpuestos: parseFloat(item.precioSinImpuestos) || 0,
            precioTotalConImpuestos: parseFloat(item.precioSinImpuestos) * (1 + parseFloat(item.impuestoAplicable) / 100) || 0
          }], 'precioTotalSinImpuestos'),
          precioTotalConImpuestos: calculateTotalPrice([...fieldsBudgets.items, {
            referencia: item.referencia,
            cantidad: 1,
            precioTotalSinImpuestos: parseFloat(item.precioSinImpuestos) || 0,
            precioTotalConImpuestos: parseFloat(item.precioSinImpuestos) * (1 + parseFloat(item.impuestoAplicable) / 100) || 0
          }], 'precioTotalConImpuestos'),
        });
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10">
      <legend className="bg-gray-600 p-3 text-white font-bold-400">Nuevo pedido</legend>
      <br />
      <form className="grid gap-6" onSubmit={onSubmitEditBudget}>
        <div className="space-y-2">
          <label htmlFor="reference">Items </label> <span className='cursor-pointer' onClick={() => setAddNewItem(!addNewItem)}>
            { addNewItem ? 'X' : 'Añadir' }
          </span><br />
          {addNewItem && (
            <select onChange={handleOnChange} name="items" id="items">
              <option key={0} value={''}>Elige el articulo</option>
              {state.articles.map((item) => (
                <option key={item.referencia} value={JSON.stringify(item)}>{item.referencia}</option>
              ))}
            </select>
          )}
          <ul>
            {fieldsBudgets.items.map((item) => (
              <li key={item.referencia}>Referencia: {item.referencia} - Cantidad: {item.cantidad} - Precio sin IVA: {item.precioTotalSinImpuestos}€ Precio con IVA: {item.precioTotalConImpuestos}€</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 space-x-2">
          <label htmlFor="precioTotalSinImpuestos">Total</label>
          <input id="precioTotalSinImpuestos" name="precioTotalSinImpuestos" onChange={handleChange} className="bg-gray-200 w-1/5 rounded-md px-4 p-2 outline-none" value={fieldsBudgets.precioTotalSinImpuestos} placeholder="Enter the price" type="text" />€
        </div>
        <div className="space-y-2 space-x-2">
          <label htmlFor="precioTotalConImpuestos">Total con IVA</label>
          <input id="precioTotalConImpuestos" name="precioTotalConImpuestos" onChange={handleChange} className="bg-gray-200 w-1/5 rounded-md px-4 p-2 outline-none" value={fieldsBudgets.precioTotalConImpuestos} placeholder="Enter the price" type="text" />€
        </div>
        <button className="w-full bg-black text-white p-2" type="submit">
          Crear
        </button>
      </form>
    </div>
  );
}
