import React, { useEffect , useReducer } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { reducer , initialState } from '../customHooks/useReducer';

export default function TableArticles() {
    const API_ARTICLES = 'http://localhost:3000/articulos';
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get(API_ARTICLES).then((response) => {
            dispatch({ type: 'FETCH_ARTICLES', payload: response.data });
        });
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Lista de Artículos</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-center">Referencia</th>
                            <th className="px-4 py-2 text-center">Nombre</th>
                            <th className="px-4 py-2 text-center">Precio sin impuestos</th>
                            <th className="px-4 py-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.articles.map((article) => (
                            <tr key={article.referencia} className="border-b">
                                <td className="px-4 py-2 text-center">{article.referencia}</td>
                                <td className="px-4 py-2 text-center">{article.nombre}</td>
                                <td className="px-4 py-2 text-center">{article.precioSinImpuestos}</td>
                                <td className="px-4 py-2 text-center">
                                    <Link to={`/ver-articulo/${article.referencia}`} className="text-blue-500 mr-2">Ver</Link>
                                    <Link to={`/editar-articulo/${article.id}`} className="text-green-500">Editar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
