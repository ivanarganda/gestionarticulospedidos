import React, { useState, useReducer, useEffect, useContext } from 'react';
import { reducer, initialState } from '../customHooks/useReducer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MsgContext } from '../context/messageContext';

export default function EditarPedido() {
  const { id } = useParams();
  const [ selectedItem , setSelectedItem ] = useState( false );
  const { useMessage } = useContext(MsgContext);
  const [addNewItem, setAddNewItem] = useState(false);
  const API_BUDGET = `http://localhost:3000/pedidos?id=${id}`;
  const API_ARTICLE = `http://localhost:3000/articulos`;
  const API_UPDATE_BUDGET = `http://localhost:3000/pedidos/${id}`;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fieldsBudgets, setFieldsBudget] = useState({
    id: id,
    items: [],
    precioTotalSinImpuestos: 0,
    precioTotalConImpuestos: 0
  });

  const writeMessage = ( message , type ) =>{
    useMessage(message,type,2000,'top','center');
  }

  useEffect(() => {
    axios.get(API_ARTICLE)
      .then((response) => {
        dispatch({ type: 'FETCH_ARTICLES', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(API_BUDGET)
      .then((response) => {
        dispatch({ type: 'FETCH_BUDGET', payload: response.data });
        const budget = response.data[0]; // Assuming API returns an array and you want the first element
        setFieldsBudget({
          ...fieldsBudgets,
          id: budget.id,
          items: budget.items,
          precioTotalSinImpuestos: budget.precioTotalSinImpuestos,
          precioTotalConImpuestos: budget.precioTotalConImpuestos
        });
      })
      .catch((error) => {
        console.error('Error fetching budget:', error);
      });
  }, [id]); // Removed state.budget.items from dependencies

  

  const onSubmitEditBudget = (event) => {
    event.preventDefault();
    dispatch({ type: 'EDIT_BUDGET', payload: fieldsBudgets });
    axios.put(API_UPDATE_BUDGET, fieldsBudgets)
      .then(response => {
        console.log('Budget updated successfully:', response.data);
        writeMessage('Pedido editado correctamente', 'success');
      })
      .catch(error => {
        console.error('Error updating budget:', error);
        writeMessage('Error en editar el pedido', 'error');
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

  const handleChange = ( event )=>{
  
    if ( !event.target.value ){
      setFieldsBudget({
       ...fieldsBudgets,
        [event.target.name]: 0
      })
    } else {
      setFieldsBudget({
        ...fieldsBudgets,
      [event.target.name]: event.target.value.replace(/[a-zA-Z]/g,'').replace(/[,]/g,'.')
      })
    }
  }

  const handleOnChange = (event) => {
    event.preventDefault();
    const item = JSON.parse(event.target.value);
    const referencia_item = item.referencia;
    if (referencia_item !== "") {
      setSelectedItem(true); // Set selectedItem to true when adding a new item
      let articleBudget = fieldsBudgets.items.find((item_) => item_.referencia === referencia_item);
      if (articleBudget) {
        setFieldsBudget({
          ...fieldsBudgets,
          items: fieldsBudgets.items.map((item_) => {
            if (item_.referencia === articleBudget.referencia) {
              return {
                ...item_,
                cantidad: item_.cantidad + 1,
                precioTotalSinImpuestos: (item_.precioUnitarioSinImpuestos * ( item_.cantidad + 1 )),
                precioTotalConImpuestos:
                  ( item_.precioUnitarioSinImpuestos * ( item_.cantidad + 1 ) ) +
                  ((item_.precioUnitarioSinImpuestos * ( item_.cantidad + 1 )) * ( item_.impuestoPorcentaje / 100 )),
              };
            } else {
              return item_;
            }
          }),
          precioTotalSinImpuestos: calculateTotalPrice(fieldsBudgets.items, 'precioTotalSinImpuestos'),
          precioTotalConImpuestos: calculateTotalPrice(fieldsBudgets.items, 'precioTotalConImpuestos'),
        });
      } else {
        setFieldsBudget({
          ...fieldsBudgets,
          items: [...fieldsBudgets.items, {
            referencia: item.referencia,
            cantidad: 1,
            precioUnitarioSinImpuestos:item.precioSinImpuestos,
            impuestoPorcentaje:item.impuestoAplicable * 100,
            precioTotalSinImpuestos: parseFloat(item.precioSinImpuestos) || 0,
            precioTotalConImpuestos: parseFloat(item.precioSinImpuestos) * (1 + parseFloat(item.impuestoAplicable) / 100) || 0
          }],
          precioTotalSinImpuestos: calculateTotalPrice(fieldsBudgets.items, 'precioTotalSinImpuestos'),
          precioTotalConImpuestos: calculateTotalPrice(fieldsBudgets.items, 'precioTotalConImpuestos'),
        });
      }

      console.log( fieldsBudgets.precioTotalSinImpuestos );
      console.log( fieldsBudgets.precioTotalConImpuestos );
  
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10">
      <legend className="bg-gray-600 p-3 text-white font-bold-400">Pedido {id}</legend>
      <br />
      <form key={id} className="grid gap-6" onSubmit={onSubmitEditBudget}>
        <input type="hidden" name="id" id='id' value={id} />
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
          Editar
        </button>
      </form>
    </div>
  );
}
