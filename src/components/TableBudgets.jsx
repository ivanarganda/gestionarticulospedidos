import React, { useState, useEffect , useReducer } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { reducer , initialState } from '../customHooks/useReducer';

export default function TableBudgets() {
    const API_ARTICLES = 'http://localhost:3000/pedidos';
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get(API_ARTICLES).then((response) => {
            dispatch({ type: 'FETCH_BUDGETS', payload: response.data });
        });
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Lista de pedidos</h1> <Link to="/crear-pedido">Agregar nuevo pedido</Link>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-center">Referencia</th>
                            <th className="px-4 py-2 text-center">Precio sin impuestos</th>
                            <th className="px-4 py-2 text-center">Precio con impuestos</th>
                            <th className="px-4 py-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.budgets.map((budget) => (
                            <React.Fragment key={budget.id}>
                                <tr className="border-b">
                                    <td className="px-4 py-2 text-center">{budget.id}</td>
                                    <td className="px-4 py-2 text-center">{budget.precioTotalSinImpuestos}€</td>
                                    <td className="px-4 py-2 text-center">{budget.precioTotalConImpuestos}€</td>
                                    <td className="px-4 py-2 text-center">
                                        <Link to={`/ver-pedido/${budget.id}`} className="text-blue-500 mr-2">Ver</Link>
                                        <Link to={`/editar-pedido/${budget.id}`} className="text-green-500">Editar</Link>
                                    </td>
                                </tr>
                                <tr id={`${budget.id}`} key={`${budget.id}-items`}>
                                    <th colSpan={1}>Items del pedido {budget.id} {'('} {budget.items.length} {')'}</th>
                                </tr>                      
                                {budget.items.map((item, index) => (
                                    <tr key={`${item.referencia}-items`} rowSpan={1}>
                                        <td className="px-4 py-2 text-center" colSpan={1}>
                                            Referencia: {item.referencia}  
                                        </td>
                                        <td colSpan={1}>
                                            Cantidad: {item.cantidad}
                                        </td>
                                    </tr>
                                ))}
                                        
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
